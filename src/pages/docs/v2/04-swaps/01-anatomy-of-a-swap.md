---
title: Anatomy of a Swap
tags: swaps, documentation
---

At the most basic level, all swaps in Uniswap V2 happen within a single function, aptly named `swap`:

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data);
```

# Receiving tokens

As is probably clear from the function signature, Uniswap requires `swap` callers to _specify how many output tokens they would like to receive_ via the `amount{0,1}Out` parameters, which correspond to the desired amount of `token{0,1}`.

# Sending Tokens

What's not as clear is how Uniswap _receives_ tokens as payment for the swap. Typically, smart contracts which need tokens to perform some functionality require callers to first make an approval on the token contract, then call a function that in turn calls transferFrom on the token contract. This is _not_ how V2 pairs accept tokens. Instead, pairs check their token balances at the _end_ of every interaction. Then, at the beginning of the _next_ interaction, current balances are differenced against the stored values to determine the amount of tokens that were sent by the current interactor. See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> for a justification of why this is the case.

The takeaway is that **tokens must be transferred to pairs before swap is called** (the one exception to this rule is <Link to='/docs/v2/flash-swaps'>Flash Swaps</Link>). This means that to safely use the `swap` function, it must be called from _another smart contract_. The alternative (transferring tokens to the pair and then calling `swap`) is not safe to do non-atomically because the sent tokens would be vulnerable to arbitrage.

At this point you may be wondering how to calculate the amount of tokens to send for a given output amount. This is explained in the next section: Pricing.
