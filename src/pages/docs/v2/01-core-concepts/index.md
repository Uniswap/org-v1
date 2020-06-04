---
title: Core concepts
subtitle: Learn about the core functionality of the uniswap protocol. Token Swaps.
---

Token swaps are a simple way to exchange one ERC-20 token for another.

For end-users, swapping is intuitive: pick an input token, an output token, an input amount, and execute a market-price swap with one click.

[Trading via Interface](/trading-via-interface/) guides users looking to swap tokens in a Uniswap interface.

Beneath the surface, token swaps are fulfilled by a system of smart contracts used by marketplace of participants.

[Anatomy of a Swap](/docs/v2/token-swaps/guides/anatomy-of-a-swap/) describes the lifecycle of an exchange between two tokens and illustrates the mechanisms and agents in play.

Swaps can also be executed between programs, enabled by developers writing code that interacts directly with the Uniswap smart contracts.

[Trading via Contract](https://www.notion.so/Trading-Contract-3cf098e5dabd4f8a905d783585cb8258) guides developers looking to integrate swaps into their projects.

Unlike traditional exchanges, Uniswap does not use an order book to represent liquidity or determine prices. Uniswap uses an automated market maker mechanism to provide instant feedback on exchange rates and slippage.

[Determining prices](https://www.notion.so/Determining-prices-576d5169a6b34448aa240b1bb670928e) explains how the constant product formula affects prices and how the mechanism behaves under different market conditions.

[Flash swaps](https://www.notion.so/flash-swaps-ff298fea281241ddb500104cdd21d46c) are a new feature in uniswap that removes upfront capital requirements for multi-step transactions, enabling powerful new exchange strategies.

<div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-start'}}>
<InlineCard title="Trading from an interface" description="Trade tokens, add liquidity and create pools." to="docs/v2/token-swaps/guides/trading-from-an-interface/" />
<InlineCard title="Trading from an interface" description="Trade tokens, add liquidity and create pools." to="docs/v2/token-swaps/guides/trading-from-an-interface/" />
<InlineCard title="Trading from an interface" description="Trade tokens, add liquidity and create pools." to="docs/v2/token-swaps/guides/trading-from-an-interface/" />
</div>
