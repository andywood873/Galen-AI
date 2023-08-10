const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Contract = await hre.ethers.getContractFactory('AvalonV2');
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log('AvalonV2 contract deployed to:', contract.address);
}

// AvalonV2 contract deployed to: 0x7E7006b18873bcddc2158Ea50dC862737ad87d87

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
