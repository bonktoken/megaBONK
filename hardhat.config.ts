import dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/types";
import { subtask } from "hardhat/config";
import { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } from "hardhat/builtin-tasks/task-names";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";

const privKey = process.env.PRIVATE_KEY;
const providerRopsten = process.env.PROVIDER_ROPSTEN;
const providerMainnet = process.env.PROVIDER_MAINNET;

const needsProvider =
  process.env.npm_config_argv &&
  (process.env.npm_config_argv.includes("rinkeby") ||
    process.env.npm_config_argv.includes("ropsten") ||
    process.env.npm_config_argv.includes("mainnet"));

if (needsProvider && (!privKey || !providerRopsten)) {
  throw new Error("Please set PRIVATE_KEY and PROVIDER_ROPSTEN for ropsten deployments.");
}

const networks: Record<string, any> = {
  hardhat: {},
};

if (providerRopsten) {
  networks.ropsten = {
    url: providerRopsten,
    accounts: privKey ? [privKey] : [],
  };
}

if (providerMainnet) {
  networks.mainnet = {
    url: providerMainnet,
    accounts: privKey ? [privKey] : [],
  };
}

subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD).setAction(
  async ({ solcVersion }: { solcVersion: string }) => {
    const version = solcVersion.replace(/^[^\d]*/, "");
    const compilerPackage = version.startsWith("0.5.")
      ? "solc-0-5-16"
      : "solc-0-7-5";

    return {
      compilerPath: require.resolve(`${compilerPackage}/soljson.js`),
      isSolcJs: true,
      version,
      longVersion: `solc ${version}`,
    };
  }
);

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
  networks,
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
