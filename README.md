# zkSync Messenger L1->L2 Example

> Send a message from L1 Goerli to L2 zkSync testnet.

## Example

There's two contracts; `L1Contract.sol` and `L2Contract.sol`

The L1 contract has a method `sendGreetingMessageToL2` that sends a message to L2 contract to set a greeting message on L2 contract.
It sends the encoded calldata to execute `setGreeting` on L2 which can only be called if the message was sent by the L1 contract.

### Files

- [`L2Contract.sol`](./contracts/L2Contract.sol)
- [`L1Contract.sol`](./contracts/L1Contract.sol)
- [`deployL1.js`](./scripts/deployL1.js)
- [`deployL2.js`](./deploy/deploy.js)
- [`sendL1ToL2Message.js`](./scripts/sendL1ToL2Message.js)
- [`waitForInclusion.js`](./scripts/waitForInclusion.js)
- [`getGreetingOnL2.js`](./scripts/getGreetingOnL2.js)

## Install

```sh
git clone https://github.com/miguelmota/zksync-messenger-l1-to-l2-example.git
cd zksync-messenger-l1-to-l2-example
npm install
```

### Set Signer

Create `.env`

```sh
PRIVATE_KEY=123...
```

Make sure private key has funds on both zkSync testnet and Goerli.

### Compile Contracts

```sh
npx hardhat compile
```

### Deploy L1 Contract

Command

```sh
npx hardhat run --network goerli scripts/deployL1.js
```

Output

```sh
deployed to 0xbb027F3d45CEb4c9F8F1FaB6c7Bad5053A66c9b0
```

### Deploy L2 Contract

Command

```sh
L1_CONTRACT=0xbb027F3d45CEb4c9F8F1FaB6c7Bad5053A66c9b0 \
npx hardhat deploy-zksync --network zksync
```

Output

```sh
deployed to 0xdA90933EAC728c6e9AF0f5403514439a4Bb6ae90
```

### Send L1->L2 Message

Command (replace env vars with your values)


```sh
GREETING="hello world" \
L1_CONTRACT=0xbb027F3d45CEb4c9F8F1FaB6c7Bad5053A66c9b0 \
L2_CONTRACT=0xdA90933EAC728c6e9AF0f5403514439a4Bb6ae90 \
npx hardhat run --network goerli scripts/sendL1ToL2Message.js
```

Output

```sh
sent tx hash 0x70b1c11f608a2319fd07dc64f6a0de35ce4e1d483fe0c2a8f09be45c61fb035b
https://goerli.etherscan.io/tx/0x70b1c11f608a2319fd07dc64f6a0de35ce4e1d483fe0c2a8f09be45c61fb0
```

### Wait for L1 Block Inclusion

Command

```sh
L1_TX_HASH=0x70b1c11f608a2319fd07dc64f6a0de35ce4e1d483fe0c2a8f09be45c61fb035b \
npx hardhat run --network zksync scripts/waitForInclusion.js
```

Output

```sh
Waiting for L2 block inclusion (this may take up to 20 minutes)...
{
  to: '0xdA90933EAC728c6e9AF0f5403514439a4Bb6ae90',
  from: '0xbb027F3d45CEb4c9F8F1FaB6c7Bad5053A66c9b0',
  contractAddress: null,
  transactionIndex: 0,
  ...
  l1BatchNumber: 626758,
  l1BatchTxIndex: 123,
  l2ToL1Logs: [ ... ],
  byzantium: true
}
```

### Get Greeting on L2

Command

```sh
L2_CONTRACT=0xdA90933EAC728c6e9AF0f5403514439a4Bb6ae90 \
npx hardhat run --network zksync scripts/getGreetingOnL2.js
```

Output

```sh
greeting: hello world
```

## License

[MIT](./LICENSE) @ [Miguel Mota](https://github.com/miguelmota)
