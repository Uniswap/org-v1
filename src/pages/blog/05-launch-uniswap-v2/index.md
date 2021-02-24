---
title: 'Uniswap V2 Mainnet Launch!'
date: '2020-05-18'
author: 'Hayden Adams'
featuredImage: ./featured.png
previewText: 'Uniswap V2 the second iteration of the Uniswap protocol has been deployed to the Ethereum mainnet!'
---

Uniswap V2, the second iteration of the Uniswap protocol, has been [deployed to the Ethereum mainnet](https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#code)!

An [audit report and formal verification](https://uniswap.org/audit.html) has already been released and the [Uniswap V2 Bug Bounty](https://twitter.com/Uniswap/status/1250474233131495424) has been running for over a month.

Developers can begin building on Uniswap V2 immediately! Initial [docs](http://uniswap.org/docs/v2) and [example projects](http://github.com/Uniswap/uniswap-v2-periphery/tree/master/contracts/examples) are already available.

Today, the following open source projects are also being released:

- A [migration portal](https://migrate.app.uniswap.org/) for moving liquidity from Uniswap V1 to Uniswap V2
- An updated [interface](https://app.uniswap.org/) for swapping and liquidity provision on Uniswap V2
- An updated [info site](https://uniswap.info/) for Uniswap V2 analytics

Uniswap V2 has many new features and technical improvements compared with Uniswap V1 including:

- ERC20 / ERC20 Pairs
- Price Oracles
- Flash Swaps
- And much more!

For full details on the benefits of Uniswap V2 for liquidity providers and traders, please read the Uniswap V2 [announcement blog post](https://uniswap.org/blog/uniswap-v2). For more information on the launch please read below.

## Liquidity Migration

The [migration portal](https://migrate.app.uniswap.org/) makes the process of withdrawing liquidity from Uniswap V1 and depositing it into Uniswap V2 fast and simple.

This portal is only for Uniswap V1 liquidity providers. If you are not a Uniswap V1 liquidity provider but wish to use Uniswap V2, you can do so from the [updated interface](https://app.uniswap.org/).

![](migrate.png)

## Updated Interface

The open source [interface](https://app.uniswap.org/) has been updated to work with Uniswap V2!

It now supports creating and providing liquidity in ERC20 / ERC20 pairs, such as DAI/USDC.

Swapping logic has been updated to properly route between ERC20 / ERC20 pairs.

While Uniswap V2 uses WETH, this is abstracted in the interface and ETH can be used directly.

#### Swapping

![](swap.png)

#### Liquidity Provision

![](pool.png)

#### Pool Creation

![](create.png)

## Info Site

Uniswap V2 analytics are available at [uniswap.info](http://uniswap.info/), built on top of the open source [Uniswap V2 subgraph](https://github.com/Uniswap/uniswap-v2-subgraph).

![](info.jpg)

## What will happen to Uniswap V1

Uniswap V1 is an automated, decentralized set of smart contracts. It will continue functioning for as long as Ethereum exists.

## All other questions

For all questions, you can join and engage with the community in the [Uniswap Discord](https://discord.gg/FCfyBSbCU5).
