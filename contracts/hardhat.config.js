const { task } = require('hardhat/config');

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@openzeppelin/hardhat-upgrades');

const dotenv = require('dotenv').config();
const privateKey =
  '0xd5e7d2bbc7cc960d1c27708e7f4183c2c2bee24b39be4bb80d0177169602c044';

task('accounts', 'Prints The List Of Accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    hardhat: {
      // See its defaults
    },
    zoraGoerli: {
      url: 'https://testnet.rpc.zora.energy/',
      accounts: [privateKey],
      chainId: 999,
      gasPrice: 8000000000, // 8 Gwei
    },
    modeTestnet: {
      url: 'https://sepolia.mode.network/',
      accounts: [privateKey],
      chainId: 919,
      gasPrice: 8000000000, // 8 Gwei
    },
  },
  solidity: {
    version: '0.8.10',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // etherscan: {
  //   apiKey: {
  //     goerli: ,
  //   },
  // },
};
