// deploy.js
const { ethers } = require('hardhat');

async function main() {
  // Deploying the NFTMarketplace contract
  const GalenPromptMarketplace = await ethers.getContractFactory(
    'GalenPromptMarketplace'
  );
  const galenPromptMarketplace = await GalenPromptMarketplace.deploy('');

  await galenPromptMarketplace.deployed();

  console.log(
    'GalenPromptMarketplace contract deployed to:',
    galenPromptMarketplace.address
  );
}

// 0x647B24DFDbbD41A9FBe96fdC8f4C9c985b1Ea252

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
