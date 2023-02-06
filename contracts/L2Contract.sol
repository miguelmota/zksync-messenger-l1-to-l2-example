// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract L2Contract {
    address l1Contract;
    string private greeting;

    constructor (address _l1Contract) {
      l1Contract = _l1Contract;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        require(msg.sender == l1Contract);
        greeting = _greeting;
    }
}
