const hre = require('hardhat');

// We recommend this setting for Hardhat's task and script system,
// but it's not necessary.
async function main() {
  // We get the contract to deploy
  const AvalonV2 = await hre.ethers.getContractFactory('AvalonV2');

  const avalon = await AvalonV2.deploy('AvalonV2', 'AVL');

  // We wait for our contract to be mined.
  await avalon.deployed();

  console.log('Avalon deployed to:', avalon.address);
}

// Avalon deployed to: 0x8aDF529f6A7912e25EAf131089c050e2D8b62847

// We recommend this for testing and debugging.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
