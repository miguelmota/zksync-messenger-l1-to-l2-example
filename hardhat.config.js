require('@matterlabs/hardhat-zksync-deploy')
require('@matterlabs/hardhat-zksync-solc')
require('@nomicfoundation/hardhat-toolbox')
require('hardhat-deploy')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY

if (!privateKey) {
  throw new Error('PRIVATE_KEY not set')
}

module.exports = {
  zksolc: {
    version: '1.2.2',
    compilerSource: 'binary',
    settings: {},
  },
  defaultNetwork: 'zksync',
  networks: {
    zksync: {
      url: 'https://zksync2-testnet.zksync.dev',
      ethNetwork: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      zksync: true,
      accounts: [privateKey]
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [privateKey]
    },
  },
  solidity: {
    version: '0.8.17',
  },
};
