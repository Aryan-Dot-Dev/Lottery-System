// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public players;
    address payable public winner;

    constructor() payable  {
        manager = msg.sender;
    }

    function enter(uint256 _amount) public payable {
        require(msg.value <= _amount * 10**15, "Minimum Amount to enter the lottery is 0.01 ether");
        players.push(msg.sender);   
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, players)));
    }

    function pickWinner() public restricted returns (address) {
    require(players.length > 0, "No players in the lottery");
    uint winnerIndex = random() % players.length;
    winner = payable(players[winnerIndex]);
    uint256 prize = address(this).balance;
    delete players;
    (bool sent, ) = payable(winner).call{value: prize}("");
    require(sent, "Failed to transfer prize to the winner");
    return winner;
}

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
