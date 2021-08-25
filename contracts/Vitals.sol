// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Vitals {
  string hash; /*state variable, written to blockchain*/

  mapping (address => string) public records;

  function set(string memory _hash) public {
    /*hash = _hash;*/
    records[msg.sender] = _hash;
  }

  /* not needed b/c of records
    function get() public view returns (string memory) {
      return records[msg.sender];
    }
  */
}
