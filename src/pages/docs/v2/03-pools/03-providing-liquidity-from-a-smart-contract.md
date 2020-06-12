---
title: 'Providing liquidity via smart contract'
---

Liquidity providers are also able to deposit liquidity into an exchange contract by calling the ‘addLiquidity()’ function. In exchange for supplying liquidity, liquidity providers will receive a share of transaction fees when a trade is executed.

The exchange contract requires some initial token deposits in order to provide certain liquidity as an exchange. To this end, we need to first approve the exchange contract to withdraw ERC20 tokens from our wallet and then invoke addLiquidity function in the exchange contract to deposit both ERC20 tokens and ETH as following:

1. token.approve(exchange_address, TOKEN_RESERVE)

2. exchange.addLiquidity(0, TOKEN_RESERVE, DEADLINE, transact={'value': ETH_RESERVE})

First, we use `$node cript/3.approve.exchange.js` to approve the Exchange contract to withdraw ERC20 tokens from our wallet. [Source file]:

![](providing-liquidity-contract-1.jpg)

Javascript to approve exchange to withdraw ERC20 tokens
Then, we add liquidity to the exchange contract by depositing 15 ERC20 tokens and 0.1 ETH using \$node script/4.add.liquidity.js [Source file].

![](providing-liquidity-contract-2.jpg)

Javascript to add liquidity to exchange contract
We can check the contract balance in Etherscan to verify the deposits.

![](providing-liquidity-contract-3.jpg)
