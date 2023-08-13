// deploy.js
const { ethers } = require('hardhat');

async function main() {
  // Deploying the NFTMarketplace contract
  const AvalonPromptMarketplace = await ethers.getContractFactory(
    'AvalonPromptMarketplace'
  );
  const avalonPromptMarketplace = await AvalonPromptMarketplace.deploy(
    '0x473966B257eAD2c43894b65d9BB87f1f23AE7786'
  );

  await avalonPromptMarketplace.deployed();

  console.log(
    'AvalonPromptMarketplace contract deployed to:',
    avalonPromptMarketplace.address
  );
}

// 0x647B24DFDbbD41A9FBe96fdC8f4C9c985b1Ea252

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
