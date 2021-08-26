// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Vitals {
  string[] hashes;

  mapping (address => string[]) public records;

  function set(string memory _hash) public {
    records[msg.sender].push(_hash);
  }

  function get(address _address) public view returns (string[] memory) {
    return records[_address];
  }
}
