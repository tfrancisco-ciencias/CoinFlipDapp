var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi,
        "0xdFB87CF326D87DA5DE473df39eD1c041E38dD44D",
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
