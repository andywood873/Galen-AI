// deploy.js
const { ethers } = require('hardhat');

async function main() {
  const GalenV2 = await ethers.getContractFactory('GalenV2');
  const galenV2 = await GalenV2.deploy('GalenV2', 'GVL2');
  await galenV2.deployed();

  console.log('GalenV2 deployed to:', galenV2.address);

  // Deploy GalenV3 contract
  const GalenV3 = await ethers.getContractFactory('GalenV3');
  const galenV3 = await GalenV3.deploy('GalenV3', 'AVL3');
  await galenV3.deployed();

  console.log('GalenV3 deployed to:', galenV3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
