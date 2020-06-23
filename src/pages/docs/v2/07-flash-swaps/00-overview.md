---
title: Overview
tags: flash-swaps, documentation
---

Uniswap flash swaps allow you to withdraw up to the full reserves of any ERC20 token on Uniswap and execute arbitrary logic at no upfront cost, provided that by the end of the transaction you either:

- pay for the withdrawn ERC20 tokens with the corresponding pair tokens
- return the withdrawn ERC20 tokens along with a small fee

Flash swaps are incredibly useful because they obviate upfront capital requirements and unnecessary order-of-operations constraints for multi-step transactions involving Uniswap.

## Capital Free Arbitrage

An example use case for flash swaps is capital-free arbitrage. Imagine a scenario where you could sell 200 DAI for 1 ETH on Uniswap, and 1 ETH for 220 DAI on Oasis for a profit of 20 DAI. Unfortunately, you don't have any DAI in your wallet.

With flash swaps, you could optimistically withdraw 1 ETH from Uniswap, sell it on Oasis for 220 DAI, and then pay for the ETH on Uniswap with 200 of the DAI you just purchased (plus the standard 0.3% LP fee), all in one transaction.

Uniswap lets you "borrow" the tokens because a successful transaction execution on your end guarantees that you'll pay for and/or return a satisfactory quantity of tokens to Uniswap.

<InlineBoxLink title="Guide to No-Capital Arbitrage" to="/docs/v2/flash-swaps/no-capital-arbitrage" />

## Instant Leverage

Another example is improving the efficiency of repeated uses of lending protocols to achieve a leveraged position, using Uniswap for ERC20 token conversions. Without flash swaps, this could be done in the following way:

- add ETH to Maker
- borrow DAI from Maker against the ETH collateral
- swap the DAI for ETH on Uniswap
- repeat steps 1–3 multiple times until you reach desired leverage

With flash swaps, you could pre-calculate exactly how much ETH the final leveraged position would require, subtract this from the principal, withdraw that from Uniswap, deposit it into Maker, draw DAI against the collateral, and repay Uniswap in a single transaction.

<InlineBoxLink title="Guide to Instant Leverage" to="/docs/v2/flash-swaps/instant-leverage" />

## Flash Swap Developer resources

<InlineBoxLink title="Solidity Example" href="https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleFlashSwap.sol" />
<InlineBoxLink title="SDK Swap reference" href="https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleFlashSwap.sol" />
