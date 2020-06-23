---
title: Architecture
tags: protocol-overview, documentation
---

Uniswap is an _automated liquidity protocol_ powered by a <Link to="/docs/v2/core-concepts/math">constant product formula</Link> and implemented in a system of non-upgradeable smart contracts on the [Ethereum](https://ethereum.org/) blockchain. It obviates the need for trusted intermediaries, prioritizing **decentralization**, **censorship resistance**, and **security**. Uniswap is **open-source software** licensed under the [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License).

Each Uniswap smart contract, or pair, manages a liquidity pool made up of reserves of two [ERC-20](https://eips.ethereum.org/EIPS/eip-20) tokens. Pairs act as **automated market makers**, facilitating trades of one token for the other as long as several basic conditions are met.

# Sustainable Ecosystem

The Uniswap ecosystem is primarily comprised of three types of users: liquidity providers, traders, and developers. Liquidity providers are incentivized to contribute [ERC-20](https://eips.ethereum.org/EIPS/eip-20) tokens to common liquidity pools. Traders can swap these tokens for one another for a fixed <Link to="/docs/v2/core-concepts/fees">0.30% fee</Link> (which goes to liquidity providers). Developers can integrate directly with Uniswap smart contracts to power new and exciting investment opportunities, trading interfaces, retail experiences, and more.

In total, interactions between these classes create a positive feedback loop, fueling digital economies by DeFining a common language through which tokens can be pooled, traded and used.

# Protocol Participants

## Liquidity Providers

Liquidity providers, or LPs, are not a homogenous group:

- Retail LPs are token holders who wish to passively invest their assets to accumulate trading fees.

- Professional LPs are focused on market making as their primary strategy. They usually develop custom tools and ways of tracking their liquidity positions across different DeFi projects.

- Token projects sometimes choose to become LPs to increase the availability of their token on the market. This allows tokens to be more widely distributed, and unlocks interopability with other DeFi projects via Uniswap.

- Finally, some DeFi pioneers are exploring complex LPs interactions like incentivized liquidity, liquidity locks, and other experimental strategies. Uniswap is the perfect protocol for projects to experiment with these kinds of ideas.

## Traders

There are a several categories of traders in the protocol ecosystem:

- Retail traders use a variety of community built tools and products to swap tokens using liquidity pulled from the Uniswap protocol.

- Arbitrage bots seek profits by comparing prices across exchanges to find an edge. (Though it might seem extractive, these bots actually help equalize prices across broader Ethereum markets and keep things fair.)

- Smart contracts that execute trades on the protocol by implementing swap functionality (from products like DEX aggregators to custom Solidity scripts).

In all cases, trades are subject to the same flat fee for trading on the protocol. Each is important for increasing the accuracy of prices and incentivizing liquidity.

## Developers/Projects

There are far too many ways Uniswap is used in the wider Ethereum ecosystem to count, but a few stand out:

- The open-source, accessible nature of Uniswap means there are countless UX experiments and front-ends built to offer access to Uniswap functionality. You can find Uniswap functions in most of the major DeFi dashboard projects. There are also many [Uniswap-specific tools](https://github.com/Uniswap/universe) built by the community.

- Wallets often integrate swap and pool functionality as a core offering of their product.

- DEX (decentralized exchange) aggregators pull liquidity from many liquidity protocols to offer traders the best prices but splitting their trades. Uniswap is the biggest single decentralized liquidity source for these projects.

- Smart contract developers use the suite of functions available to invent new DeFi tools and other various experimental ideas. See projects like [Unisocks](https://unisocks.exchange/) or [Zora](https://ourzora.com/), among many, many others.

## Uniswap Team

The Uniswap team is responsible for driving the development of the protocol.

# The Nitty-Gritty

Uniswap is made up of a series of smart contracts, each the venue for a unique ERC-20⇄ERC-20 pair. Pair smart contracts hold reserves (balances) of their constituent tokens and define rules around how these reserves can be changed. Anyone can become a liquidity provider for a pair by depositing an equivalent value of each underlying token in exchange for pool tokens. These tokens track pro-rata LP shares of the total reserves, and can be redeemed for the underlying assets at any time.

Pairs act as automated market makers, standing ready to accept one token for the other as long as the “constant product” formula is preserved. This formula, most simply expressed as `x * y = k`, states that trades must not change the product (`k`) of a pair’s reserve balances (`x` and `y`). Because `k` remains unchanged from the reference frame of a trade, it is often referred to as the invariant. This formula has the desirable property that larger trades (relative to reserves) execute at exponentially worse rates than smaller ones.

In practice, Uniswap applies a 0.30% fee to trades, which is added to reserves. As a result, each trade actually increases `k`. This functions as a payout to LPs, which is realized when they burn their pool tokens to withdraw their portion of total reserves. In the future, this fee may be reduced to 0.25%, with the remaining 0.05% withheld as a protocol-wide charge.

Because the relative price of the two pair assets can only be changed through trading, divergences between the Uniswap price and external prices create arbitrage opportunities. This mechanism ensures that Uniswap prices always trend toward the market-clearing price.

# Further reading

To see how token swaps work in practice, and to walk through the lifecycle of a swap, check out <Link to="/docs/v2/swaps">Swaps</Link>. Or, to see how liquidity pools work, see <Link to="/docs/v2/pools">Pools</Link>.

Ultimately, of course, the Uniswap protocol is just smart contract code running on Ethereum. To understand how they work, head over to <Link to="/docs/v2/protocol-overview/smart-contracts/">Smart Contracts</Link>.
