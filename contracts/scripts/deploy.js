// deploy.js
const { ethers } = require('hardhat');

async function main() {
  const AvalonV2 = await ethers.getContractFactory('AvalonV2');
  const avalonV2 = await AvalonV2.deploy('AvalonV2', 'AVL2');
  await avalonV2.deployed();

  console.log('AvalonV2 deployed to:', avalonV2.address);

  // Deploy AvalonV3 contract
  const AvalonV3 = await ethers.getContractFactory('AvalonV3');
  const avalonV3 = await AvalonV3.deploy('AvalonV3', 'AVL3');
  await avalonV3.deployed();

  console.log('AvalonV3 deployed to:', avalonV3.address);
}

// AvalonV2 deployed to: 0xC3305EA7dcCC31fBb3fF2E4AC39C152B5F0CB35a
// AvalonV3 deployed to: 0x473966B257eAD2c43894b65d9BB87f1f23AE7786
// AvalonPromptMarketplace contract deployed to: 0xD96084067694f38B29676F6034CF3aB5e7911c2d

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
