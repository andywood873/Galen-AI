// deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Deploy AvalonV3 contract
  const AvalonV3 = await ethers.getContractFactory("AvalonV3");
  const avalonV3 = await AvalonV3.deploy("Avalon", "AVL");
  await avalonV3.deployed();

  console.log("AvalonV3 deployed to:", avalonV3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
