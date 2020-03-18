---
title: Architecture
---

import { Link } from "gatsby"

Uniswap V2 is a binary smart contract system. [Core](#core) contracts provide fundamental safety guarantees for all parties interacting with Uniswap. [Periphery](#periphery) contracts interact with one or more core contracts but are not themselves part of the core.

# Core

[Source code](https://github.com/Uniswap/uniswap-v2-core)

The core consists of a singleton [factory](#factory) and many [pairs](#pairs), which the factory is responsible for creating and indexing. These contracts are quite minimal, even brutalist. The simple rationale for this is that contracts with a smaller surface area are easier to reason about, less bug-prone, and more functionally elegant. Perhaps the biggest upside of this design is that many desired properties of the system can be asserted directly in the code, leaving little room for error. One downside, however, is that core contracts are somewhat user-unfriendly. In fact, interacting directly with these contracts is not recommended for most use cases. Instead, a periphery contract should be used.

## Factory

<Link to='/docs/v2/smart-contracts/factory'>Reference documentation</Link>

The factory holds the generic bytecode responsible for powering pairs. Its primary job is to create one and only one smart contract per unique token pair. It also contains logic to turn on the protocol charge.

## Pairs

<Link to='/docs/v2/smart-contracts/pair'>Reference documentation</Link>
<br />
<Link to='/docs/v2/smart-contracts/pair-erc-20'>Reference documentation (ERC-20)</Link>

Pairs have two primary purposes: serving as automated market makers and keeping track of pool token balances. They also expose data which can be used to build decentralized price oracles.

# Periphery

[Source code](https://github.com/Uniswap/uniswap-v2-periphery)

The periphery is a constellation of smart contracts designed to support domain-specific interactions with the core. Because of Uniswap's permissionless nature, the contracts described below have no special privileges, and are in fact only a small subset of the universe of possible periphery-like contracts. However, they are useful examples of how to safely and efficiently interact with Uniswap V2.

## Library

<Link to='/docs/v2/smart-contracts/library'>Reference documentation</Link>

The library is a contract that can be inherited from to provide access to a variety of convenience functions for fetching data and pricing.

## Router

<Link to='/docs/v2/smart-contracts/router'>Reference documentation</Link>

The router, which inherits the library, fully supports all the basic requirements of a front-end offering trading and liquidity management functionality. Notably, it natively supports multi-pair trades (e.g. x to y to z), treats ETH as a first-class citizen, and offers meta-transactions for removing liquidity.

# Design Decisions

The following sections describe some of the notable design decisions made in Uniswap V2. These are safe to skip unless you're interested in gaining a deep technical understanding of how V2 works under the hood, or writing smart contract integrations!

## Sending Tokens

Typically, smart contracts which need tokens to perform some functionality require would-be interactors to first make an approval on the token contract, then call a function that in turn calls transferFrom on the token contract. This is _not_ how V2 pairs accept tokens. Instead, pairs check their token balances at the _end_ of every interaction. Then, at the beginning of the _next_ interaction, current balances are differenced against the stored values to determine the amount of tokens that were sent by the current interactor. See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> for a justification of why this is the case, but the takeaway is that **tokens must be transferred to the pair before calling any token-requiring method** (the one exception to this rule is <Link to='/docs/v2/technical-considerations/flash-swaps'>Flash Swaps</Link>).

## Pricing

In Uniswap V1, trades are always executed at the "best possible" price, calcuated at execution time. Somewhat confusingly, this calculation is actually accomplished with one of two different formulas, depending on whether the trade specifies an exact _input_ or _output_ amount. Functionally, the difference between these two functions is fairly miniscule, but the very existence of a difference increases conceptual complexity. Initial attempts to support both functions in V2 proved inelegant, and the decision was made to **not provide any pricing functions in the core**. Instead, pairs directly check whether the invariant was satisfied (accounting for fees) after every trade. This means that rather than relying on a pricing fuction to _also_ enforce the invariant, V2 pairs simply and transparently ensure their own safety, a nice separation of concerns. One downstream benefit is that V2 pairs will more naturally support other flavors of trades which may emerge, (e.g. trading to a specific price at execution time).

A similar pattern exists for adding liquidity. V2 pairs **do not return tokens added at an incorrect price**. As an example, if the ratio of x:y in a pair is 10:2 (i.e. the price is 5), and someone naively adds liquidity at 5:2 (a price of 2.5), the contract will simply accept all tokens (changing the price to 3.75 and opening up the market to arbitrage), but only issue pool tokens entitling the sender to the amount of assets sent at the proper ratio, in this case 5:1. To avoid donating to arbitrageurs, it is imperative to add liquidity at the current price.

So, in Uniswap V2, trades and liquidity provisions must be priced in the periphery. The good news is that the library provides a variety of functions designed to make this quite simple, and the router does this by default.

## Oracles

See <Link to='/docs/v2/technical-considerations/oracles'>Oracles</Link>.

## WETH

Unlike Uniswap V1 exchanges, V2 pairs do not support ETH directly, so ETH⇄ERC-20 pairs must be emulated with WETH. The motivation behind this choice was to remove ETH-specific code in the core, resulting in a leaner codebase. End users can be kept fully ignorant of this implementation detail, however, by simply wrapping/unwrapping ETH in the periphery.

The router fully supports interacting with any WETH pair via ETH.

## Minimum Liquidity

To ameliorate rounding errors and increase the theoretical minimum tick size for liquidity provision, pairs burn the first <Link to='/docs/v2/smart-contracts/pair#minimum_liquidity'>MINIMUM_LIQUIDITY</Link> pool tokens. For the vast majority of pairs, this will represent a trivial value. The burning happens automatically during the first liquidity provision, after which point the <Link to='/docs/v2/smart-contracts/pair-erc-20#totalsupply'>totalSupply</Link> is forevermore bounded.

## Protocol Charge Calculation

In the future, it is possible that a protocol-wide charge of 0.05% per trade will take effect. This represents ⅙th (16.6̅%) of the 0.30% fee. The fee is in effect if <Link to='/docs/v2/smart-contracts/factory/#feeto'>feeTo</Link> is not `address(0)` (`0x0000000000000000000000000000000000000000`), indicating that feeTo is the recipient of the charge.

Rather than calculating this charge on swaps, which would significantly increase gas costs for all users, the charge is instead calculated when liquidity is added or removed. See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> for more details.
