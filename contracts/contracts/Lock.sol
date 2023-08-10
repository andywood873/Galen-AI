// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    address private _owner;
    bool private _locked;

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can call this function");
        _;
    }

    modifier isUnlocked() {
        require(!_locked, "The contract is locked");
        _;
    }

    constructor() {
        _owner = msg.sender;
        _locked = false;
    }

    function lock() public onlyOwner {
        _locked = true;
    }

    function unlock() public onlyOwner {
        _locked = false;
    }

    function doSomething() public isUnlocked {
        // Some code here
    }
}
