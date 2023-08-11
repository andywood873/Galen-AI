// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTMarketplace is ERC1155Holder {
    using SafeMath for uint256;

    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price;
        uint256 quantity;
        bool active;
    }

    mapping(uint256 => Listing) public listings;

    address public tokenContract; // Address of the ERC1155 token contract

    event ListingCreated(
        address indexed seller,
        uint256 indexed tokenId,
        uint256 price,
        uint256 quantity
    );
    event ListingCancelled(uint256 indexed tokenId);
    event SaleCompleted(
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price,
        uint256 quantity
    );

    constructor(address _tokenContract) {
        tokenContract = _tokenContract;
    }

    function createListing(
        uint256 tokenId,
        uint256 price,
        uint256 quantity
    ) external {
        IERC1155(tokenContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            quantity,
            ""
        );

        listings[tokenId] = Listing({
            seller: msg.sender,
            tokenId: tokenId,
            price: price,
            quantity: quantity,
            active: true
        });

        emit ListingCreated(msg.sender, tokenId, price, quantity);
    }

    function cancelListing(uint256 tokenId) external {
        require(listings[tokenId].active, "Listing is not active");
        require(
            listings[tokenId].seller == msg.sender,
            "Only the seller can cancel the listing"
        );

        IERC1155(tokenContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            listings[tokenId].quantity,
            ""
        );

        delete listings[tokenId];

        emit ListingCancelled(tokenId);
    }

    function buyToken(uint256 tokenId, uint256 quantity) external payable {
        require(listings[tokenId].active, "Listing is not active");
        require(
            msg.value >= listings[tokenId].price.mul(quantity),
            "Insufficient funds"
        );
        require(
            listings[tokenId].quantity >= quantity,
            "Insufficient quantity available"
        );

        address seller = listings[tokenId].seller;
        uint256 price = listings[tokenId].price;

        IERC1155(tokenContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            quantity,
            ""
        );

        payable(seller).transfer(price.mul(quantity));

        listings[tokenId].quantity = listings[tokenId].quantity.sub(quantity);
        if (listings[tokenId].quantity == 0) {
            delete listings[tokenId];
        }

        emit SaleCompleted(msg.sender, tokenId, price, quantity);
    }
}
