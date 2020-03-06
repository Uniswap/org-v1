---
title: Overview
---

# Smart Contract Architecture

Uniswap V2 consists of two interrelated systems of smart contracts: [Core](#core) and [Periphery](#periphery). The core contracts provide fundamental safety guarantees for all parties interacting with Uniswap. They were designed from a security-first perspective, and thus are quite minimal. The periphery consists of contracts which interact with one or more core contracts but are not themselves part of the core.

# Core

The [Uniswap V2 Core](https://github.com/Uniswap/uniswap-v2-core) consists of a singleton [Factory](#factory) contract responsible for creating and indexing [Exchanges](#exchanges). Each exchange is a venue for a particular ERC-20⇄ERC-20 pair. The factory ensures that there is a single exchange per pair. Exchanges do not support ETH directly, so ETH⇄ERC-20 pairs must use WETH. This is not as onerous as it may seem, as typically it's trivial for periphery contracts to handle the ETH⇄WETH conversions.

## Factory

[test](../factory/)

## Exchanges

[test](../exchange/). Exchanges are also ERC-20 tokens.

# Periphery

The [Uniswap V2 Periphery](https://github.com/Uniswap/uniswap-v2-periphery) consists of smart contracts that interact with core with a specific purpose in mind. This documentation will focus on several concrete examples, contracts interact with

- arbitrage bots, etc.
