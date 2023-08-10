import 'hardhat/console.sol';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Avalon', function () {
  let avalon;
  let owner;
  let recipient;

  beforeEach(async function () {
    const Avalon = await ethers.getContractFactory('Avalon');
    [owner, recipient] = await ethers.getSigners();

    avalon = await Avalon.deploy(100, 10);
    await avalon.deployed();
  });

  it('should create an original prompt token', async function () {
    const tokenURI = 'ipfs://QmTokenURI';
    const tokenId = await avalon.createOriginalPrompt(
      tokenURI,
      recipient.address
    );

    expect(await avalon.ownerOf(tokenId)).to.equal(recipient.address);
    expect(await avalon.getOriginalToken(tokenId)).to.equal(tokenId);
  });

  it('should create a derivative prompt token', async function () {
    const originalTokenId = 1;
    const tokenURI = 'ipfs://QmTokenURI';
    const tokenId = await avalon.createDerivativePrompt(
      tokenURI,
      recipient.address,
      originalTokenId
    );

    expect(await avalon.ownerOf(tokenId)).to.equal(recipient.address);
    expect(await avalon.getOriginalToken(tokenId)).to.equal(originalTokenId);
  });

  it('should return the royalty fee', async function () {
    const royaltyFee = await avalon.getRoyaltyFee();

    expect(royaltyFee).to.equal(10);
  });

  it('should calculate royalty info correctly', async function () {
    const tokenId = 1;
    const salePrice = ethers.utils.parseEther('1');
    const [receiver, royaltyAmount] = await avalon.royaltyInfo(
      tokenId,
      salePrice
    );

    expect(receiver).to.equal(owner.address);
    expect(royaltyAmount).to.equal(salePrice.mul(10).div(100));
  });
});
