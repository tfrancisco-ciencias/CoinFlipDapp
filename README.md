# README

Easy decentralized app game. You play against the contract FlipDapp.sol
placing bets.

Outcome of bet is determined by the iterations of a "tent-map" type function
with domain [0,97]. The number of iterations is determined by
(bet+time) mod 101, and the initial point by (bet+time)%97, where:
* bet= msg.value (amount bet in wei)
* time = block.timestamp  (current block timestamp as seconds since unix epoch)
