// SPDX-License-Identifier: MIT
// pragma solidity >=0.8.0 <0.9.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/interfaces/IERC2981.sol";

// contract Avalon is ERC721URIStorage, Ownable, IERC2981 {
//     uint256 public tokenCounter;
//     uint256 public maxSupply;
//     uint256 public royaltyFee;

//     mapping(uint256 => uint256) public originalPromptOf;

//     constructor(
//         uint256 _maxSupply,
//         uint256 _royaltyFee
//     ) ERC721("Avalon", "AVA") {
//         require(_royaltyFee <= 100, "Royalty fee cannot be more than 100%");
//         tokenCounter = 0;
//         maxSupply = _maxSupply;
//         royaltyFee = _royaltyFee;
//     }

//     function createOriginalPrompt(
//         string memory tokenURI,
//         address recipient
//     ) public onlyOwner returns (uint256) {
//         require(
//             maxSupply == 0 || tokenCounter < maxSupply,
//             "Max supply reached"
//         );
//         uint256 newItemId = tokenCounter;
//         _safeMint(recipient, newItemId);
//         _setTokenURI(newItemId, tokenURI);
//         originalPromptOf[newItemId] = newItemId;
//         tokenCounter = tokenCounter + 1;
//         return newItemId;
//     }

//     function createDerivativePrompt(
//         string memory tokenURI,
//         address recipient,
//         uint256 originalTokenId
//     ) public onlyOwner returns (uint256) {
//         require(
//             maxSupply == 0 || tokenCounter < maxSupply,
//             "Max supply reached"
//         );
//         uint256 newItemId = tokenCounter;
//         _safeMint(recipient, newItemId);
//         _setTokenURI(newItemId, tokenURI);
//         originalPromptOf[newItemId] = originalTokenId;
//         tokenCounter = tokenCounter + 1;
//         return newItemId;
//     }

//     function getRoyaltyFee() external view returns (uint256) {
//         return royaltyFee;
//     }

//     function royaltyInfo(
//         uint256 tokenId,
//         uint256 salePrice
//     ) external view override returns (address receiver, uint256 royaltyAmount) {
//         // Logic to determine royalty receiver and amount based on tokenId and sale price
//         // Set the receiver address and royalty amount accordingly
//         receiver = ownerOf(tokenId);
//         royaltyAmount = (salePrice * royaltyFee) / 100;
//         return (receiver, royaltyAmount);
//     }

//     function getOriginalToken(uint256 tokenId) public view returns (uint256) {
//         return originalPromptOf[tokenId];
//     }

//     function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal override(ERC721URIStorage) {
//         require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
//         super._setTokenURI(tokenId, _tokenURI);
//     }

//     function tokenURI(uint256 tokenId) public view override(ERC721URIStorage) returns (string memory) {
//         require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
//         return super.tokenURI(tokenId);
//     }
// }
