const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");

const dotenv = require("dotenv").config();
const privateKey =
  "0x3d18f1c0cf830d673ab31b23347c52c71001221be614578a5d841b52b75aa772";

task("accounts", "Prints The List Of Accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      // See its defaults
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/_WbTkyNvmx_ay8v1kgmIdns9E_Bgu1X1",
      accounts: [privateKey],
      chainId: 11155111,
      // gasPrice: 8000000000, // 8 Gwei
    },
    avalancheFuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [privateKey],
      chainId: 43113,
      // gasPrice: 8000000000, // 8 Gwei
    },
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      modeTestnet: "abc",
    },
    customChains: [
      {
        network: "modeTestnet",
        chainId: 919,
        urls: {
          apiURL: "https://sepolia.explorer.mode.network/api",
          browserURL: "https://sepolia.explorer.mode.network/",
        },
      },
    ],
  },
};
