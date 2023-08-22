// deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Deploy GalenV3 contract
  const GalenV3 = await ethers.getContractFactory("GalenV3");
  const galenV3 = await GalenV3.deploy("GalenV3", "GVL3");
  await galenV3.deployed();

  console.log("GalenV3 deployed to:", galenV3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
