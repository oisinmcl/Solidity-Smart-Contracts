//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    
   function Inbox (string _initialMessage) public {
        message = _initialMessage;
    }

    function setMessage (string newMessage) public {
        message = newMessage;
    }

    function getMessage () public view returns (string){
        return message;
    }

    function doMath(int a, int b) public pure{
        a + b;
        b - a;
        a * b;
        a == 0;
    }
}
