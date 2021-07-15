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
  // game, it is external visibility since it is used only by external contract
  // at time of initial deposit

  function initialDeposit() payable external {
  }

  // function that get balance of contract address
  function getBalance()  public view returns (uint){
    return  address(this).balance;
  }

  // function that gets the last flip result for a given address
  function getLastFlip(address player)  public view returns (bool){
    return lastFlip[player];
  }


// tent map

  function tentMap(uint x) public pure returns (uint result){
    require(x <= 97);
    if( x <=  48){
      result= 2*x;
    }
    else{
      result = 2*(97-x);
    }
  }

// iterations for tent Map
 function interationTentMap(uint _initialValue, uint _lenght) public pure returns (uint result){
     uint y=_initialValue;
     for(uint i=0; i < _lenght ; i++){
     y=tentMap(y);
     }
     result = y;
     return result;
 }



// function that actually performs the flip
function flip() payable public{
    require(msg.value <= 2000000000000000000, "Bet must be below 2");
    uint time = block.timestamp;
    uint bet = msg.value;
    string memory outcome;
    uint z=0;

    z=interationTentMap((bet+time)% 97 , (bet + time) % 101);

    if(z <= 48){
      msg.sender.transfer(bet*2);
      lastFlip[msg.sender] = true;
      outcome ="win";
      z=0;
    }
    else{
      lastFlip[msg.sender] = false;
      outcome = "lose";
      z=0;
    }
    assert(z==0);
    emit lastGameOutcome(outcome,bet);
  }
}
