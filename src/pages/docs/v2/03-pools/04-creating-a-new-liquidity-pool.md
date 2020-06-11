---
title: Creating a pool
---

**The Exchange contract can support **any** ERC20 token. But how do we set up an exchange for a particular ERC20? With one method call from the Factory.**

**By calling the createExchange method from the Factory contract, an Exchange contract is then deployed for a particular ERC20 token you specify.**

Every ERC20 token therefore, by design, utilizes its own Exchange smart contract.

**The “Factory” smart contract contains an exchange registry, and a method to deploy an “Exchange” contract for a particular ERC20 token. An exchange can be created for any valid ERC20 token.**

**The graphic below is an example of when DAI was added to Uniswap.** Someone first called the `createExchange` function in the Factory contract with DAI’s contract address. Then the Factory contract checks it’s registry to see if an Exchange contract has been created for that token address. If no Exchange address is listed, the factory contract deploys an Exchange contract and records the Exchange address in its registry.

![creating new pool](https://docs.ethhub.io/assets/images/uniswap_guide/new_pool_creation.png)

The factory contract can be used to deploy a new exchange contract, thus, any ERC20 token that does not yet have an exchange contract can create one using the factory contract. The `createExchange()` function allows any user on Ethereum to deploy an exchange contract using the factory contract.

It is also important to note that the factory contract serves as a registry for Uniswap exchange contracts, meaning that the factory contract can be used to look up all token and exchange addresses that have been added to the system. The factory contract does not carry out checks on a token when an exchange contract is launched (aside from the one-contract-exchange-per-token limit), thus, users should only interact with exchange contracts that they have full confidence in.

As mentioned earlier, the first deposit of liquidity into an exchange contract is not determined by an exchange rate. Instead, the liquidity provider will deposit an amount of ETH and ERC20 tokens that reflect what they think the exchange rate between ETH and the ERC20 token is. If the value of ETH and the ERC20 token is regarded as being too cheap or too expensive, then arbitrage traders will be incentivised to bring that value to a point that the market deems as correct.

To create a new exchange contract for the ERC20 token, we need to send a signed transaction createExchange to the deployed Uniswap Factory contract in the Rinkeby network. A developer can choose to either run a local Ethereum client (e.g., [Geth](https://github.com/ethereum/go-ethereum) or [Parity](https://www.parity.io/ethereum/)) or send through [Infura](https://infura.io/) in order to sign the transaction with the private key. For simplicity, we use Infura to send signed raw transactions.

Anyone can create a liquidity pool (just not one that is already represented!) in any ERC20 token using the smart contact templates that are provided by the exchange. These are simplified so that you only need to input the required parameters and not do any coding. Unlike other DEXs there are no listing fees, just the ETH required for the gas fees.
