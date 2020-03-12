---
title: Uniswap Documentation
---

import { Link } from "gatsby"

You've arrived! The pages that follow contain comprehensive documentation of the Uniswap V2 ecosystem. Briefly, Uniswap is a protocol for exchanging [ERC-20](https://eips.ethereum.org/EIPS/eip-20) tokens on [Ethereum](https://ethereum.org/). It eliminates trusted intermediaries and unnecessary forms of rent extraction, allowing for **fast**, **efficient** exchange. Where it makes tradeoffs **decentralization**, **censorship resistance**, and **security** are prioritized. Uniswap is open-source software licensed under [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License).

You may be wondering: what about Uniswap V1? The first version of the protocol, [launched in November 2018](https://twitter.com/haydenzadams/status/1058376395108376577) at Devcon 4, is still around. In fact, because of its permissionless nature, it will exist for as long as Ethereum does! However, V2 includes a number of tangible improvements over V1, which this documentation will explore in depth.

# V2 Features

- ERC-20⇄ERC-20 pairs
- Decentralized, manipulation-resistant price oracles
- Flash Swaps
- Broad support for standard and non-conformant ERC20 tokens

# Resources

- <Link to='/'>Protocol Website</Link>
- <Link to='/whitepaper.pdf'>Whitepaper</Link>
- [GitHub](https://github.com/Uniswap)
- [Twitter](https://twitter.com/UniswapExchange)
- [Discord](https://discord.gg/Y7TF6QA)
- [Reddit](https://reddit.com/r/Uniswap)
- [Email](mailto:contact@uniswap.io)

# How it all Works

Uniswap is made up of a series of exchanges, each the venue for a unique ERC-20⇄ERC-20 pair. Exchanges hold **reserves** (balances) of their pair tokens, and define rules around how these reserves can be changed. Anyone can become a **liquidity provider** for a pair by depositing an equivalent value of each token in exchange for **pool tokens**. These tokens track liquidity providers' pro-rata shares of the total reserves, and can be redeemed for the underlying assets at any time.

Exchanges act as **automated market makers**, standing ready to accept one pair token for the other as long as the "constant product" formula is preserved. This formula, most simply expressed as `x * y = k`, states that trades must not change the product of an exchange's reserve balances. Because `k` is constant from the reference frame of a trade, it is often referred to as the **invariant**. This formula has the desirable property that larger trades (relative to reserves) execute at exponentially worse rates than smaller ones.

In practice, Uniswap applies a 0.30% fee to trades, which is added to reserves. As a results each trade actually causes `k` to increase. This functions as a payout to liquidity providers, which is realized when they burn their pool tokens to withdraw their portion of total reserves. In the future, this fee may be reduced to 0.25%, with the remaining 0.05% withheld as a protocol-wide charge.

Because the relative price of the two assets in an exchange can only be changed through trading, divergences between the Uniswap price and external prices create **arbitrage opportunities**. This mechanism ensures that Uniswap prices always trend toward the market-clearing price.
