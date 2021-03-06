// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.5;

interface ICallable {

    function tokenCallback(address _from, uint _tokens, bytes calldata _data) external returns (bool);

}

