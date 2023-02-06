const { Wallet, utils } = require('zksync-web3')
const { Deployer } = require('@matterlabs/hardhat-zksync-deploy')
require('dotenv').config()

async function main(hre) {
  if (!hre) {
    return
  }

  const l1ContractAddress = process.env.L1_CONTRACT
  const wallet = new Wallet(process.env.PRIVATE_KEY)
  const deployer = new Deployer(hre, wallet)
  const artifact = await deployer.loadArtifact('L2Contract')
  const l2Contract = await deployer.deploy(artifact, [l1ContractAddress])

  console.log(
    `deployed to ${l2Contract.address}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

module.exports = main
