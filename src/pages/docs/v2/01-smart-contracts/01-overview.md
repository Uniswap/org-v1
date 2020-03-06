---
title: Overview
---

import { Link } from "gatsby"

# Smart Contract Architecture

Uniswap V2 is a binary system composed of two interrelated networks of smart contracts. [Core](#core) contracts provides fundamental safety guarantees for all parties interacting with Uniswap. [Periphery](#periphery) contracts interact with one or more core contracts but are not themselves part of the core.

# Core

[Source code](https://github.com/Uniswap/uniswap-v2-core)

The core consists of a singleton [factory](#factory) and many [exchanges](#exchanges), which the factory is responsible for creating and indexing. These contracts are best described as minimalist, even brutalist. A simple rationale explains this: contracts with a smaller surface area are easier to reason about, less bug-prone, and more functionally elegant. One beneficial consequence of this design is that many desired properties of the system can be asserted directly in the code, leaving little room for error.

The biggest downside to this approach is that the core is somewhat user-unfriendly. In fact, interacting directly with these contracts is not recommended, and can be unsafe (for the user, not the core). Periphery contracts are responsible for ensuring user safety.

## Factory

<Link to='/docs/v2/smart-contracts/factory'>Reference documentation</Link>

The factory ensures that for a given pair, one and only one exchange exists.

## Exchanges

<Link to='/docs/v2/smart-contracts/exchange'>Reference documentation</Link>

Exchanges are venues for ERC-20⇄ERC-20 pairs. Unlike exchanges in Uniswap V1, V2 exchanges do not support ETH directly, so ETH⇄ERC-20 pairs must be emulated with WETH. This is not as onerous as it may seem, as it's trivial for periphery contracts to handle ETH⇄WETH conversions.

Eacxh exchange is also an ERC-20 token which denominates liquidity provider shares for that pair.

# Periphery

[Source code](https://github.com/Uniswap/uniswap-v2-periphery)

The periphery is a constellation of smart contracts designed to support domain-specific interactions with the core.

## Helper

## Router
