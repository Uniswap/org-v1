---
title: No-Capital Arbitrage
tags: flash-swaps, documentation
---

One particularly interesting use case for flash swaps is capital-free arbitrage. It's well-known that an integral part of Uniswap's design is to create incentives for arbitrageurs to trade the Uniswap price to a "fair" market price. While game-theoretically sound, this strategy is accessible only to those with sufficient capital to take advantage of arbitrage opportunities. Flash swaps remove this barrier entirely, effectively democratizing arbitrage.

Imagine a scenario where the cost of buying 1 ETH on Uniswap is 200 DAI (which is calculated by calling `getAmountIn` with 1 ETH specified as an exact output), and on Oasis (or any other trading venue), 1 ETH buys 220 DAI. To anyone with 200 DAI available, this situation represents a risk-free profit of 20 DAI. Unfortunately, you may not have 200 DAI lying around. With flash swaps, however, this risk-free profit is available for anyone to take as long as they're able to pay gas fees.

# Withdrawing ETH from Uniswap

The first step is to _optimistically_ withdraw 1 ETH from Uniswap via a flash swap. This will serve as the capital that we use to execute our arbitrage. Note that in this scenario, we're assuming that:

- 1 ETH is the pre-calculated profit-maximizing trade
- The price has not changed on Uniswap or Oasis since our calculation

It may be the case that we'd like to calculate the profit-maximizing trade on-chain at the moment of execution, which is robust to price movements. This can be somewhat complex, depending on the strategy being executed. However, one common strategy is trading as profitably as possible _against a fixed external price_. (This price may be e.g. the average execution price of one or more orders on Oasis.) If the Uniswap market price is far enough above or below this external price, the following example contains code that calculates the amount to trade over Uniswap for maximum profit: [`ExampleSwapToPrice.sol`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleSwapToPrice.sol).

<Github link="https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleSwapToPrice.sol">ExampleSwapToPrice.sol</Github>

# Trade at External Venue

Once we've obtained our temporary capital of 1 ETH from Uniswap, we now can trade this for 220 DAI on Oasis. Once we've received the DAI, we need to pay Uniswap back. We've mentioned that the amount required to cover 1 ETH is 200 DAI, calculated via `getAmountIn`. So, after sending 200 of the DAI back to the Uniswap pair, you're left with 20 DAI of profit!
