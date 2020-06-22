---
title: Architecture
tags: protocol-overview, documentation
---

## Uniswap at a glance

Uniswap is an on-chain system of smart contracts on the Ethereum blockchain, implementing an automated liquidity protocol based on a <Link to="/docs/v2/core-concepts/math"> “constant product formula” </Link>. Each Uniswap pair stores pooled reserves of two ERC20 Tokens, and provides liquidity for those two assets, maintaining the invariant that the product of the reserves cannot decrease. Traders pay a <Link to="/docs/v2/core-concepts/fees"> 30-basis-point fee </Link> on trades, which goes to liquidity providers. The contracts are non-upgradeable.

## Sustainable Ecosystem

Uniswap has three major users that keep the ecosystem healthy. Traders, Liquidity providers and Developers. Traders swap tokens with a fixed <Link to="/docs/v2/core-concepts/fees"> low fee </Link> bringing volume to the protocol. Liquidity providers are incentivized to pool tokens to capture a portion of those fees leading to better prices and lower slippage for traders. Developers can integrate with the Uniswap protocol by implementing functionality within the smart contracts leading to new interfaces, integrations and experiences increasing the potential traders and LPs in the system.

These interactions drive a positive feedback loop and increase the ability for the token economy to thrive by defining a common language by which to pool, trade and develop on top of liquidity.

## Protocol Participants

### Traders

There are a few categories of traders that exist in the protocol ecosystem:

- Retail traders who use a variety of community built tools and products to swap tokens where liquidity is pulled from the Uniswap protocol.
- Arbitrage bots that seek profits by comparing prices across exchanges to find an edge. (Though it might seem extractive, these bots actually help equalize prices across the broader ethereum markets and keep things fair.)
- Smart contracts that execute trades on the protocol by implementing swap functions (from products like DEX aggragators to custom solitidity scripts)

Each of these use the same tools and pay the same flat fee for trading on the protocol. Each is important for increasing the accuracy of the price and incentivizing liquidity.

### LPs

As with traders, Liquidity providers are not a homogenous group:

- Retail LPs are token users who choose to provide liquidity as a strategy to accumulate fees on top of their token holdings. This strategy is usually paired with other Defi products to achieve different goals.
- Professional LPs are focused on market making as their primary strategy. They usually develop custom tools and ways of tracking their liquidity positions across different defi projects
- Token projects sometimes choose to become LPs to increase the available tokens on the market. This increases the availability and usefulness by making access to the token able to be integrated in any other Defi projects by developers using the uniswap protocol.

Sometimes there are complex interactions between LPs and projects with experimental ideas like incentivized liquidity, liquidity locks and other various strategies. Uniswap is the perfect protocol for projects to experiment with these types of ideas given it's open and simple nature.

### Developers/Projects

There are too many diferrent ways Uniswap is used to count but a few stand out:

- The open source and open access nature of Uniswap means there are countless UX experiments and frontends built to offer access to Uniswap functionality. You can find uniswap functions in most of the major Defi dashboard projects. There are also many [uniswap specific tools](https://github.com/Uniswap/universe) built by the community.
- Wallets often integrate swap and pool functionality as a core offering of their product.
- DEX (decentralized exchange) aggregators pull liquidity from many liquidity protocols to offer traders the best prices but splitting their trades. Uniswap is the biggest single decentralized liquidity source for these projects.
- Smart contract developers use the suite of functions available to invent new Defi tools and other various experimental ideas. See projects like Unisocks or [Ourzora](https://ourzora.com/) among many many others.

### Uniswap Team

The Uniswap team is responsible for driving the development of the protocol.
