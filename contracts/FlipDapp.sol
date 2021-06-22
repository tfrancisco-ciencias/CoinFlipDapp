pragma solidity 0.5.12;

contract FlipDapp {
  address owner;
  // map that stores last flip result for a given address
  mapping(address => bool) lastFlip;


  constructor() public{
    owner = msg.sender;
  }

  // event

  event lastGameOutcome(string outcome, uint bet);

  // function that recevies initial deposit of contrat to have cash to initiate
  // game

  function initialDeposit() payable public {
  }


  // function that get balance of contract address
  function getBalance()  public view returns (uint){
    return  address(this).balance;
  }

  // function that gets the last flip result for a given address
  function getLastFlip(address player)  public view returns (bool){
    return lastFlip[player];
  }

  // function that actually performs the flip

  function flip() payable public{
    require(msg.value <= 2000000000000000000, "Bet must be below 2");
    uint time = block.timestamp;
    uint bet = msg.value;
    string memory outcome='a';


    if(time % 2 == 0){
      msg.sender.transfer(bet*2);
      lastFlip[msg.sender] = true;
      outcome ="win";
    }
    else{
      lastFlip[msg.sender] = false;
      outcome = "lose";
    }
    emit lastGameOutcome(outcome,bet);
  }
}
