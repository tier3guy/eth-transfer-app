// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Transactions {

    uint256 public transactionsCounter;

    event Transfer (address sender, address reciever, uint256 amount, string message);

    struct TransferStruct {
        address sender;
        address reciever;
        uint256 amount;
        string message;
    }

    TransferStruct[] public transactions;

    function sendMoney(address reciever, uint256 amount, string memory message) public {
        transactions.push(TransferStruct(
            msg.sender,
            reciever,
            amount,
            message
        ));
        emit Transfer (msg.sender, reciever, amount, message);
        transactionsCounter++;
    }

}