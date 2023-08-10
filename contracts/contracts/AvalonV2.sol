// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./lib/NFT1155.sol";
import "./lib/NFT1155URIStorage.sol";

/**
 * @title Hybrid Permission-based NFTs represent any creative works
 */

contract Item is NFT1155, NFT1155URIStorage, ReentrancyGuard, Pausable {
    using Address for address;
    using SafeERC20 for IERC20;

    enum Role {
        UNAUTHORIZED,
        ADMIN
    }

    enum TokenType {
        ERC20,
        ETHER
    }

    // enum ContentType {
    //     ART,
    //     BOOK,
    //     AUDIO,
    //     VIDEO
    // }

    struct Price {
        TokenType tokenType;
        address asset;
        uint256 tokenIdOrAmount;
    }

    struct Token {
        Price price;
        // ContentType contentType;
        uint256 currentSupply;
        uint256 maxSupply; // can't be changed
    }

    // maps to the owner of each token ID
    mapping(uint256 => address) public tokenOwners;
    // Mapping to keep track of the derivative NFTs
    mapping(uint256 => uint256[]) public derivativeNFTs;
    uint256 public tokenOwnerCount;
    // token data
    mapping(uint256 => Token) public tokens;
    // ACL
    mapping(address => Role) private permissions;
    // Dev address
    address public devAddress;
    // For the royalty fee
    uint256 public royaltyFee;
    // maps to lock / unlock states
    mapping(uint256 => bool) public lockable;

    event Authorised(uint256 indexed tokenId, address owner);

    event Sold(uint256 tokenId, address tokenAddress, uint256 amount);

    // Event to track minting of derivative NFTs
    event DerivativeMinted(
        uint256 indexed originalTokenId,
        uint256 derivativeTokenId
    );

    constructor() {
        devAddress = msg.sender;
        permissions[msg.sender] = Role.ADMIN;
        // Set royalty fee
        royaltyFee = 1000; // 10%
    }

    /// @notice check token price for the given token ID
    function tokenPrice(
        uint256 _tokenId
    ) external view returns (TokenType, address, uint256) {
        return (
            tokens[_tokenId].price.tokenType,
            tokens[_tokenId].price.asset,
            tokens[_tokenId].price.tokenIdOrAmount
        );
    }

    /// @notice check token's current supply for the given token ID
    function tokenSupply(uint256 _tokenId) external view returns (uint256) {
        return (tokens[_tokenId].currentSupply);
    }

    /// @notice check token's max supply for the given token ID
    function tokenMaxSupply(uint256 _tokenId) external view returns (uint256) {
        return (tokens[_tokenId].maxSupply);
    }

    /// @notice check token's content type for the given ID
    // function tokenContenttype(uint256 _tokenId) external view returns (ContentType) {
    //     return (  tokens[_tokenId].contentType );
    // }

    /// @notice authorise to issue a token
    function authorise(
        string memory _tokenURI,
        uint256 _initialAmount,
        TokenType _priceTokenType,
        address _priceAsset,
        uint256 _priceTokenIdOrAmount,
        uint256 _maxSupply
    ) external nonReentrant whenNotPaused {
        require(_initialAmount > 0, "Initial Amount must be greater than zero");
        require(
            _maxSupply >= _initialAmount,
            "Max Supply should be greater then Initial Amount"
        );
        tokenOwnerCount += 1;
        tokenOwners[tokenOwnerCount] = _msgSender();

        // first mint
        _mint(_msgSender(), tokenOwnerCount, _initialAmount, "");
        _setURI(tokenOwnerCount, _tokenURI);

        lockable[tokenOwnerCount] = true;

        // set the price
        tokens[tokenOwnerCount].price.asset = _priceAsset;
        tokens[tokenOwnerCount].price.tokenIdOrAmount = _priceTokenIdOrAmount;
        tokens[tokenOwnerCount].price.tokenType = _priceTokenType;

        // set other params
        tokens[tokenOwnerCount].maxSupply = _maxSupply;
        tokens[tokenOwnerCount].currentSupply = _initialAmount;

        emit Authorised(tokenOwnerCount, _msgSender());
    }

    /// @notice set the token URI (only be called by the token owner)
    function setTokenURI(
        uint256 _tokenId,
        string memory _tokenURI
    ) external nonReentrant whenNotPaused {
        require(tokenOwners[_tokenId] == _msgSender(), "Not authorised to set");
        _setURI(_tokenId, _tokenURI);
    }

    /// @notice set the token price (only be called by the token owner)
    function setTokenPrice(
        uint256 _tokenId,
        TokenType _priceType,
        address _priceAsset,
        uint256 _priceTokenIdOrAmount
    ) external nonReentrant whenNotPaused {
        require(tokenOwners[_tokenId] == _msgSender(), "Not authorised to set");

        tokens[_tokenId].price.tokenType = _priceType;
        tokens[_tokenId].price.asset = _priceAsset;
        tokens[_tokenId].price.tokenIdOrAmount = _priceTokenIdOrAmount;
    }

    /// @notice transfer token owner
    function transferTokenOwner(
        uint256 _tokenId,
        address _newOwnerAddress
    ) external nonReentrant whenNotPaused {
        require(
            tokenOwners[_tokenId] == _msgSender(),
            "Not authorised to transfer"
        );

        tokenOwners[_tokenId] = _newOwnerAddress;
    }

    /// @notice mint tokens
    /// @param _to recipient to be received
    /// @param _tokenId token ID
    /// @param _value amount of the token to be minted
    /// @param _data aux data
    function mint(
        address _to,
        uint256 _tokenId,
        uint256 _value,
        bytes memory _data
    ) external nonReentrant whenNotPaused {
        require(
            tokens[_tokenId].maxSupply >=
                (tokens[_tokenId].currentSupply + _value),
            "Max Supply Exceeded"
        );

        address tokenOwner = tokenOwners[_tokenId];
        tokens[_tokenId].currentSupply += _value;

        if (tokenOwner == _msgSender()) {
            // free mint for the owner
            _mint(_to, _tokenId, _value, _data);
        } else {
            address priceAsset = tokens[_tokenId].price.asset;
            uint256 priceAmount = tokens[_tokenId].price.tokenIdOrAmount;

            require(
                tokens[_tokenId].price.tokenType == TokenType.ERC20,
                "Only ERC20 here"
            );
            require(_value == 1, "One token only");

            // only one token is minted

            // taking royalty fee for the creator
            if (royaltyFee != 0) {
                uint256 fee = (priceAmount * royaltyFee) / 10000;
                IERC20(priceAsset).safeTransferFrom(
                    _msgSender(),
                    tokenOwner,
                    fee
                );
                priceAmount -= fee;
            }

            // Locking in the contract until Admin releases it
            IERC20(priceAsset).safeTransferFrom(
                _msgSender(),
                tokenOwner,
                priceAmount
            );

            _mint(_to, _tokenId, 1, _data);

            emit Sold(_tokenId, priceAsset, priceAmount);
        }
    }

    /// @notice mint tokens with ETH
    function mintWithEth(
        address _to,
        uint256 _tokenId,
        uint256 _value,
        bytes memory _data
    ) external payable nonReentrant whenNotPaused {
        require(tokenOwners[_tokenId] != _msgSender(), "Owner is not allowed");
        require(
            tokens[_tokenId].price.tokenType == TokenType.ETHER,
            "PriceAsset must be ETH"
        );
        require(_value == 1, "One token only");
        require(
            tokens[_tokenId].maxSupply >=
                (tokens[_tokenId].currentSupply + _value),
            "Max Supply Exceeded"
        );

        // only one token is minted
        uint256 amount = msg.value;
        uint256 priceAmount = tokens[_tokenId].price.tokenIdOrAmount;
        tokens[_tokenId].currentSupply += _value;

        require(amount == priceAmount, "Invalid amount");

        // taking royalty fees
        if (royaltyFee != 0) {
            uint256 fee = (priceAmount * (royaltyFee)) / (10000);
            (bool successRoyalty, ) = devAddress.call{value: fee}("");
            require(successRoyalty, "Failed to send Ether to Owner");
            priceAmount -= fee;
        }

        (bool success, ) = tokenOwners[_tokenId].call{value: priceAmount}("");
        require(success, "Failed to send Ether to creator");

        _mint(_to, _tokenId, 1, _data);

        emit Sold(
            _tokenId,
            0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE,
            priceAmount
        );
    }

    // Function to mint a secondary NFT Prompt derived from the original NFT
    function mintDerivativeNFT(
        uint256 _originalTokenId,
        string memory _tokenURI,
        uint256 _initialAmount,
        TokenType _priceTokenType,
        address _priceAsset,
        uint256 _priceTokenIdOrAmount,
        uint256 _maxSupply
    ) external nonReentrant whenNotPaused {
        // Ensure the caller owns the original NFT
        require(
            tokenOwners[_originalTokenId] == _msgSender(),
            "Not an holder of the original NFT"
        );

        // Create a new derivative NFT
        tokenOwnerCount += 1;
        uint256 derivativeTokenId = tokenOwnerCount;
        tokenOwners[derivativeTokenId] = _msgSender();

        // Mint the derivative NFT
        _mint(_msgSender(), derivativeTokenId, _initialAmount, "");
        _setURI(derivativeTokenId, _tokenURI);

        // Link the derivative to the original NFT
        derivativeNFTs[_originalTokenId].push(derivativeTokenId);

        lockable[derivativeTokenId] = true;

        // Set the price and other parameters for the derivative NFT
        tokens[derivativeTokenId].price.asset = _priceAsset;
        tokens[derivativeTokenId].price.tokenIdOrAmount = _priceTokenIdOrAmount;
        tokens[derivativeTokenId].price.tokenType = _priceTokenType;
        tokens[derivativeTokenId].maxSupply = _maxSupply;
        tokens[derivativeTokenId].currentSupply = _initialAmount;

        emit DerivativeMinted(_originalTokenId, derivativeTokenId);
    }

    /// @notice burn tokens
    /// @param owner owner of the token
    /// @param id token ID
    /// @param value amount of the token to be burned
    function burn(
        address owner,
        uint256 id,
        uint256 value
    ) external nonReentrant {
        _burn(owner, id, value);
    }

    /// @notice return the token URI
    /// @param tokenId token ID
    function uri(
        uint256 tokenId
    )
        public
        view
        virtual
        override(NFT1155, NFT1155URIStorage)
        returns (string memory)
    {
        return NFT1155URIStorage.uri(tokenId);
    }

    /// @notice lock the token to not be transfered
    /// @param tokenId token ID
    function lock(uint256 tokenId) external onlyAdmin {
        lockable[tokenId] = true;
    }

    /// @notice unlock the token
    /// @param tokenId token ID
    function unlock(uint256 tokenId) external onlyAdmin {
        lockable[tokenId] = false;
    }

    // update dev address
    function setDevAddress(address _devAddress) external onlyAdmin {
        devAddress = _devAddress;
    }

    // give a specific permission to the given address
    function grant(address _address, Role _role) external onlyAdmin {
        require(_address != _msgSender(), "You cannot grant yourself");
        permissions[_address] = _role;
    }

    // remove any permission binded to the given address
    function revoke(address _address) external onlyAdmin {
        require(_address != _msgSender(), "You cannot revoke yourself");
        permissions[_address] = Role.UNAUTHORIZED;
    }

    function setPaused(bool _paused) external onlyAdmin {
        if (_paused) {
            _pause();
        } else {
            _unpause();
        }
    }

    // withdraw locked funds
    function withdrawErc20(
        address _tokenAddress,
        address _toAddress,
        uint256 _amount
    ) external nonReentrant onlyAdmin {
        IERC20(_tokenAddress).safeTransfer(_toAddress, _amount);
    }

    // widthdraw ETH
    function withdraw(
        address _toAddress,
        uint256 _amount
    ) external nonReentrant onlyAdmin {
        (bool sent, ) = _toAddress.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    // update fees
    function setFees(uint256 _royaltyFee) external onlyAdmin {
        royaltyFee = _royaltyFee;
    }

    modifier onlyAdmin() {
        require(
            permissions[msg.sender] == Role.ADMIN,
            "Caller is not the admin"
        );
        _;
    }

    function versionRecipient() public pure returns (string memory) {
        return "2.2.5";
    }

    function _msgSender() internal view override returns (address) {
        return msg.sender;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; i++) {
            if (
                to != address(this) &&
                from != address(0) &&
                to != address(0) &&
                permissions[to] != Role.ADMIN &&
                permissions[from] != Role.ADMIN &&
                permissions[operator] != Role.ADMIN
            ) {
                require(
                    lockable[ids[i]] == false,
                    "Not allowed to be transferred"
                );
            }
        }
    }
}
