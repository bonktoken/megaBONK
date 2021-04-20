import dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "@openzeppelin/hardhat-upgrades";

const privKey = process.env.PRIVATE_KEY;
const providerRopsten = process.env.PROVIDER_ROPSTEN;

const needsProvider =
  process.env.npm_config_argv &&
  (process.env.npm_config_argv.includes("rinkeby") ||
    process.env.npm_config_argv.includes("ropsten") ||
    process.env.npm_config_argv.includes("mainnet"));

if ((!privKey || !providerRopsten) && needsProvider) {
  console.error("Please set a private key and provider.");
  process.exit(0);
}

const privKeyExists = privKey as string;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.7.5",
      },
      {
        version: "0.5.16",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    ropsten: {
      url: providerRopsten,
      accounts: [privKeyExists]
    }
  },
  // defaultNetwork: "hardhat",
  // networks: {
  //   localhost: {
  //     chainId: 1337,
  //   },
  // },
};

export default config;