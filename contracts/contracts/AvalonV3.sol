// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract AvalonV3 is ERC1155 {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIdCounter;

//     string private _name;
//     string private _symbol;

//     mapping(uint256 => uint256) private _tokenSupply;
//     mapping(uint256 => string) private _tokenURIs;

//     constructor(string memory name_, string memory symbol_) ERC1155("") {
//         _name = name_;
//         _symbol = symbol_;
//         _tokenIdCounter.increment();
//     }

//     function name() public view returns (string memory) {
//         return _name;
//     }

//     function symbol() public view returns (string memory) {
//         return _symbol;
//     }

//     function createNFT(
//         uint256 initialSupply,
//         string memory tokenURI
//     ) external returns (uint256) {
//         uint256 tokenId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();

//         _mint(msg.sender, tokenId, initialSupply, "");

//         _tokenSupply[tokenId] = initialSupply;
//         _tokenURIs[tokenId] = tokenURI;

//         return tokenId;
//     }

//     function setMaxSupply(uint256 tokenId, uint256 maxSupply) external {
//         require(
//             maxSupply >= _tokenSupply[tokenId],
//             "Max supply must be greater than or equal to current supply"
//         );

//         _tokenSupply[tokenId] = maxSupply;
//     }

//     function setTokenURI(uint256 tokenId, string memory tokenURI) external {
//         _tokenURIs[tokenId] = tokenURI;
//     }

//     function uri(uint256 tokenId) public view override returns (string memory) {
//         return _tokenURIs[tokenId];
//     }
// }
