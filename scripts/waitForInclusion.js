const { Provider } = require('zksync-web3')
require('dotenv').config()

async function main() {
  const l1TransactionHash = process.env.L1_TX_HASH

  const zkSyncProvider = new Provider('https://zksync2-testnet.zksync.dev')
  const ethereumProvider = new ethers.providers.StaticJsonRpcProvider('https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  const tx = await ethereumProvider.getTransaction(l1TransactionHash)
  console.log('Waiting for L2 block inclusion (this may take up 20 minutes)...')

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
