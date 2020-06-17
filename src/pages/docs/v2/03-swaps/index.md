---
title: Overview
subtitle: Learn about the core functionality of the uniswap protocol. Token Swaps.
---

<Info>Looking for help using the interface? &nbsp; <Link to="/docs/v2/web-app/trading/">Check out the web app guides</Link>.</Info>

Token swaps are a simple way to exchange one ERC-20 token for another.

For end-users, swapping is intuitive: pick an input token, an output token, an input amount, and execute a market-price swap with one click. Beneath the surface, token swaps are fulfilled by a system of smart contracts used by marketplace of participants.

Swaps can also be executed between programs, enabled by developers writing code that interacts directly with the Uniswap smart contracts. Unlike traditional exchanges, Uniswap does not use an order book to represent liquidity or determine prices. Uniswap uses an automated market maker mechanism to provide instant feedback on exchange rates and slippage.

## Understanding tokens swap

<div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-start', marginBottom: '2rem'}}>
<InlineCard title="Anatomy of a Swap" tag="guide" description="The lifecycle of an exchange between two tokens and illustrates the mechanisms and agents in play" to="/docs/v2/token-swaps/anatomy-of-a-swap/" />
<InlineCard title="Trading via Smart contract" tag="tutorial" description="guides developers looking to integrate swaps into their projects." to="/docs/v2/flash-swaps/no-capital-arbitrage" />
<InlineCard title="How prices are determined" tag="guide" description="how the constant product formula affects prices and how the mechanism behaves under different market conditions." to="/docs/v2/flash-swaps" />

</div>

## Developer resources

<InlineBoxLink title="Contributing to the web app" to="/docs/v2/web-app/developing-locally/" />
<InlineBoxLink title="Flash Swaps" to="/docs/v2/flash swaps" />
