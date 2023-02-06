require('dotenv').config()

async function main() {
  const l2ContractAddress = process.env.L2_CONTRACT

  const L2Contract = await hre.ethers.getContractFactory('L2Contract')
  const l2Contract = L2Contract.attach(l2ContractAddress)
  const greeting = await l2Contract.greet()
  console.log(`greeting: ${greeting}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
