---
title: Fees
tags: protocol-overview, documentation
---

## Liquidity provider fees

There is a **0.3%** fee for swapping tokens. **This fee is split by liquidity providers proportional to their contribution to liquidity reserves.**

Swapping fees are immediately deposited into liquidity reserves. This increases the value of liquidity tokens, functioning as a payout to all liquidity providers proportional to their share of the pool. Fees are collected by burning liuqidity tokens to remove a porportional share of the underlying reserves.

Since fees are added to liquidity pools, the invariant increases at the end of every trade. Within a single transaction, the invariant represents `token0_pool / token1_pool` at the end of the previous transaction.

There are many community developed tools to determine returns. You can also read more in the docs about how to think about LP returns:

<InlineBoxLink title="Understanding LP returns" to="/docs/v2/liquidity-pools/understanding-uniswap-returns/" />

## Protocol Fees

At the moment there are no protocol fees. However, it is possible for a 0.05% fee to be turned on in the future.

More information about a potential future protocol fee can be found [here](https://uniswap.org/blog/uniswap-v2/#path-to-sustainability).
