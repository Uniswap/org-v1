---
title: Overview
tags:
  - pools
  - documentation
---

Uniswap is unique in that it doesn’t use an order book to derive the price of an asset or to match buyers and sellers of tokens. Instead, Uniswap uses what are called Liquidity Pools.

On traditional exchanges, liquidity is typically represented by discrete orders placed by indvidials onto a centrally operated order book. A participant looking to provide liquidity or make markets must actively manage their orders, continuously updating them in response to the activity of others in the marketplace.

While order books are foundational to finance and work great for certain usecases, they suffer from a few important limitations that are especially magnified when applied to a decentralized or blockchain-native setting. Order books require intermediary infrastructure to host the orderbook and match orders. This creates points of control and adds additional layers of complexity. They also require active participation and management from market makers who usually use sophsticated infrastructure and algorithms, limiting participation to advanced traders. Order books were invented in a world with relatively few assets being exchanged, so it is not surprising they aren't ideal for an ecosystem where anyone can create their own token and those tokens usually have low liquidity. In sum, with the infrastrucural trade-offs presented by a platform like Ethereum, order books are not the native architecture for implementing exchange on a blockchain.

Uniswap focuses on the strengths of Ethereum to reimagine token swaps from first principles.

A blockchain-native exchange should take advantage of the trusted code execution environment, the autonomous and perpetually running virtual machine, and an open, permissionless, and inclusive access model that produces an exponentially growing ecosystem of virtual assets.

Enter Uniswap and its underlying core mechanism of Liquidity Pools.

The goal of a liquidity provider is to earn fees from making markets (enabling the exchange) for some asset. Instead of requiring liquidity providers to place discrete orders onto an order book, Uniswap combines (or pools) all available liquidity between two tokens in an Ethereum smart contract called a Liquidity Pool.

A liquidity pool is an autonomous program (smart contract) that holds a supply of two different tokens and enforces a novel set of rules about how those tokens can be added or removed.

These rules enable functionality one might expect from a token exchange.

Users can swap one token for another by depositing a token into one side of the pool and withdrawing tokens from the other side. The price is determined automatically by the pool based on a predetermined formula.

Liquidity providers can earn fees by supplying an equal proportion of tokens to the pool.

It is important to reiterate that a Pool is just a smart contract, operated by users calling functions on it. Swapping tokens is calling `swap` on the pool, providing liquidity is calling `deposit`.

In the same way end-users can interact with the Uniswap protocol through the Interface (which in turn interacts with the underlying contracts), developers can interact directly with the smart contracts and integrate Uniswap functionality into their own applications without relying on intermediaries or needing permission.

In a similar fashion, new liquidity pools by can be deployed by any users without permission to support any unique pair of tokens.

To understand how Liquidity Pools work in practice, you can proceed to the [Anatomy of a Liquidity Pool]().
