// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@matterlabs/zksync-contracts/l1/contracts/zksync/interfaces/IZkSync.sol";

contract L1Contract {
    event MessageSent(bytes32 indexed txHash, address indexed zkSyncAddress, address indexed l2ContractAddress, bytes message);

    // zkSyncAddress is the address of the zkSync smart contract.
    // It is not recommended to hardcode it during the alpha testnet as regenesis may happen.
    function sendGreetingMessageToL2(address zkSyncAddress, address l2ContractAddress, string memory greeting) payable external returns(bytes32 txHash) {
        bytes memory message = abi.encodeWithSignature(
            "setGreeting(string)",
            greeting
        );

        IZkSync zksync = IZkSync(zkSyncAddress);

        // calling L2 smart contract from L1 Example contract
        txHash = zksync.requestL2Transaction{value: msg.value}(
            // The address of the L2 contract to call
            l2ContractAddress,
            // We pass no ETH with the call
            0,
            // Encoded calldata for contract to execute
            message,
            // Ergs limit
            100000,
            // factory dependencies
            new bytes[](0)
        );

        emit MessageSent(txHash, zkSyncAddress, l2ContractAddress, message);

        return txHash;
    }
}
