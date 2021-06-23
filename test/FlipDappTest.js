const FlipDapp = artifacts.require("FlipDapp");
const truffleAssert  = require("truffle-assertions");

contract("FlipDapp", async function(accounts){
  it("deployment should set contract address at 5 eth", async function(){
    let instance = await FlipDapp.deployed();
    let balance = await web3.eth.getBalance(instance.address);
    assert(balance=== web3.utils.toWei("5","ether"));
  });
  it("should update player balance", async function(){
    let instance = await FlipDapp.deployed();
    let beforePlayerBalance = parseFloat(await web3.eth.getBalance(accounts[1]));
    await instance.flip({value: web3.utils.toWei("1","ether"), from :accounts[1]});
    let flipResult = await instance.getLastFlip(accounts[1]);
    let afterPlayerBalance = parseFloat(await web3.eth.getBalance(accounts[1]));
    assert( ( (flipResult == true) && (beforePlayerBalance< afterPlayerBalance ) )
    || ((flipResult == false) && (afterPlayerBalance < beforePlayerBalance )))
  });
  it("should update player balance", async function(){
    let instance = await FlipDapp.deployed();
    let testValue1 = await instance.tentMap(0);
    assert(testValue1 === 0);
  });


});
