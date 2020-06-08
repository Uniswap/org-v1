---
title: Flash Swaps
---

Uniswap flash swaps allow you to withdraw any amount of any ERC20 token on Uniswap at no upfront cost and to execute any Ethereum transaction, provided that by the end of the transaction, you either:

- pay for all ERC20 tokens withdrawn
- pay for a percentage of ERC20 tokens and return the rest
- return all ERC20 tokens withdrawn

It is often the case that a series of transactions on Ethereum has a high upfront cost but ultimately a low net cost or is even net profitable by the end of the series. Flash swaps are incredibly useful because they remove upfront capital requirements and unnecessary constraints on order-of-operations for multi-step transactions that use Uniswap.

[How flash swaps work](https://www.notion.so/Anatomy-of-a-swap-4871e158dfa54557bfee3485baf2cdc0)

One example using flash swaps is arbitrage with no upfront capital. Imagine a scenario where you can sell 200 DAI for 1 ETH on Uniswap and then sell that 1 ETH on Oasis for 220 DAI at a 20 DAI profit. But, unfortunately, you don’t have any DAI in your wallet.

With flash swaps you could withdraw 1 ETH from Uniswap, sell it on Oasis for 220 DAI and then pay for the ETH on Uniswap with 200 of the DAI you just purchased, all in one transaction.

Uniswap lets you "borrow" the tokens because a successful transaction execution on your end guarantees that you'll pay for and/or return a satisfactory quantity of tokens to Uniswap.

[Arbitrage without upfront capital](https://www.notion.so/Arbitrage-without-upfront-capital-b17aa4c87a454513a1b0837e5dbe0bb4)

Another example use case is improving the efficiency of margin trading protocols that borrow from lending protocols and use Uniswap for ERC20 token conversion. This is currently done with the following process:

- add user ETH to Maker,
- borrow DAI from Maker
- swap DAI for ETH on Uniswap
- repeat steps 1–3 multiple times until you reached desired leverage

With flash swaps, you can get maximum leverage via Maker in a single transaction.

[Margin trading](https://www.notion.so/Margin-trading-0b4db971799840d5841830865e05fadb)
