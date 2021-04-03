var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi,
        "0x1057aeb6da7B86eD383C505386731E022F685C8e",
        {from: accounts[0]}
      );
      console.log(contractInstance);
      $("#submit").click(sendFlip);
      contractInstance.methods.getBalance().call().then(function(res){
        $("#balance").text(res);
      });
    });
});

function sendFlip(){
  var bet=$("#bet").val();
  var config = {
    value: bet
  }

  contractInstance.methods.flip().send(config).then(function(out){
    console.log(out.events.lastGameOutcome.returnValues.outcome);
    $("#result").text(out.events.lastGameOutcome.returnValues.outcome);
    contractInstance.methods.getBalance().call().then(function(res){
        $("#balance").text(res);
  });



});
}
