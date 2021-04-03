const FlipDapp = artifacts.require("FlipDapp");

module.exports = function(deployer,network, accounts) {
  deployer.deploy(FlipDapp).then(function(instance){
    // initial deposit so that contract have funds to work
    instance.initialDeposit({value:web3.utils.toWei("5","ether"), from:accounts[0]});

  });
};
