const { BigNumber } = require('ethers')
const { Wallet, Provider, Contract, utils } = require('zksync-web3')
require('dotenv').config()

async function main() {
  const privateKey = process.env.PRIVATE_KEY
  const greeting = process.env.GREETING
  const l1ContractAddress = process.env.L1_CONTRACT
  const l2ContractAddress = process.env.L2_CONTRACT

  const L1Contract = await hre.ethers.getContractFactory('L1Contract')
  const l1Contract = L1Contract.attach(l1ContractAddress)
  await l1Contract.deployed()

  const zkSyncProvider = new Provider('https://zksync2-testnet.zksync.dev')
  const ethereumProvider = new ethers.providers.StaticJsonRpcProvider('https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  const wallet = new Wallet(privateKey, zkSyncProvider, ethereumProvider)
  const zkSyncAddress = await zkSyncProvider.getMainContractAddress()
  const gasPrice = await wallet.providerL1.getGasPrice()
  const ergsLimit = BigNumber.from(100000)

  const l2ContractAbi = require('../artifacts/contracts/L2Contract.sol/L2Contract.json').abi
  const iface = new ethers.utils.Interface(l2ContractAbi)
  const message = iface.encodeFunctionData('setGreeting', [greeting])

  const zkSyncContract = new Contract(zkSyncAddress, utils.ZKSYNC_MAIN_ABI, ethereumProvider)
  const baseCost = await zkSyncContract.l2TransactionBaseCost(gasPrice, ergsLimit, ethers.utils.hexlify(message).length)

  const tx = await l1Contract.sendGreetingMessageToL2(zkSyncAddress, l2ContractAddress, greeting, {
    value: baseCost,
    gasPrice
  })

  await tx.wait()
  console.log(`sent tx hash ${tx.hash}`)
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)

  // Getting the TransactionResponse object for the L2 transaction corresponding to the execution call
  const l2Response = await zkSyncProvider.getL2TransactionFromPriorityOp(tx)

  // The receipt of the L2 transaction corresponding to the call to the counter contract's Increment method
  const l2Receipt = await l2Response.wait()
  console.log(l2Receipt)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
