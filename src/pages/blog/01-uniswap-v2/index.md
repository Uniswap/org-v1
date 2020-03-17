---
title: 'Uniswap V2'
date: '2020-03-11'
author: 'Hayden Adams'
featuredImage: ./featured.jpg
previewText: 'All about Uniswap V2. Price oracles, optimistic swaps and much much more. Launching April 2020.'
---

# Introduction

Uniswap V1 was the proof-of-concept for a new type of decentralized exchange protocol.

Combining automated market-making with on-chain liquidity pools on Ethereum allows Uniswap to function without maintenance, providing an unstoppable and fully decentralized exchange. Uniswap V1 will work for as long as Ethereum exists, and so far it has worked very nicely for a wide variety of use cases.

![Uniswap V1 Liquidity Growth](https://cdn-images-1.medium.com/max/4004/1*-pykU7ahDEhYb9DUPB70YA.png)_Uniswap V1 Liquidity Growth_

However, pooled automated market making remains a nascent technology and **we have only just begun to explore its potential**. This is why[ we raised a seed round](https://finance.yahoo.com/news/paradigm-backs-decentralized-exchange-protocol-184824051.html) and formed a team dedicated to research and development for the Uniswap protocol.

**Uniswap V2** is our second iteration of the protocol and includes many new features and improvements. This article will serve as a high-level overview of these changes including:

- [ERC20 / ERC20 Pairs](#erc20--erc20-pairs)
- [Price Oracles](#price-oracles)
- Flash Swaps
- Core-Helper Architecture
- Technical Improvements
- Path to Sustainability

For full details check out the:

- [Core smart contracts](https://github.com/Uniswap/uniswap-v2-core/)
- [Periphery smart contracts](https://github.com/Uniswap/uniswap-v2-periphery)
- Uniswap V2 Whitepaper

# ERC20 / ERC20 Pairs

In Uniswap V1, all trading pairs are between ETH and a single ERC20 token. Having a single common pair provides a nice UX advantage — you can swap any ERC20 for any other ERC20 by routing through ETH.

![ERC20 to ERC20 swap in V1](https://cdn-images-1.medium.com/max/4336/0*5Gcgtpp0ZQAdnswV)_ERC20 to ERC20 swap in V1_

Since ETH is the most liquid asset on Ethereum, and does not introduce any new platform risk, we believe it was the best choice for V1.

However, in order to further grow Uniswap and expand its usefulness as a protocol, in Uniswap V2, **any token can be paired against any other token directly**.

This means **liquidity providers can take on more diverse positions**, rather than being forced to have 50% exposure to ETH. One example would be a DAI/USDC pair (or CHAI/cUSDC), which would have almost no price risk for liquidity providers, but still be incredibly useful for trading and arbitrage.

Having direct ERC20/ERC20 pools for highly-desirable pairs can lead to **better trading prices**. This is because routing through ETH for a swap between two other assets (say, DAI/MKR) involves paying fees and slippage on two separate pairs instead of one.

We still anticipate ETH pairs being very popular, but expect to see significant growth in stablecoin-based pairs over time.

# Price Oracles

_Robust on-chain price feeds using historical TWAPs_

## Theoretical Background

If the relative price of two assets on Uniswap is ever mismatched with the price on an external market, there exists a profitable arbitrage trade that will bring the two prices into alignment. This creates a financial incentive for the price on Uniswap to very closely track that of other exchanges. We have seen this play out in practice.[ Sophisticated arbitrageurs constantly monitor Uniswap and capitalize on any price discrepancies](http://frontrun.me/revenue/). For a longer theoretical background, I recommend[ this paper](https://arxiv.org/abs/1911.03380).

## Improving Uniswap as an Oracle

On-chain price feeds are a critical component for many decentralized financial applications including derivatives, lending, margin trading, prediction markets and more. Unfortunately, Uniswap V1 is not safe to use as a price oracle, because it is very easy to manipulate the price for a short period of time.

For example, suppose some contract uses the current ETH-DAI price to settle a derivative. An attacker who wishes to manipulate the measured price can buy ETH from the ETH-DAI exchange, trigger settlement on the derivative contract (causing it to settle based on the inflated price), and then sell ETH back to the exchange to trade it back to the true price. This might even be done as a single atomic transaction, or by a miner who controls the ordering of transactions within a block, meaning the attacker loses no money to arbitrage.

**Uniswap v2 implements new functionality that enables highly decentralized and manipulation resistant on-chain price feeds. **This is achieved by measuring prices when they are expensive to manipulate, and accumulating historical data in a clever way. This lets external smart contracts create incredibly gas-efficient time-weighted averages of Uniswap prices across **any** time interval.

> # Okay, so how does it work?

First, Uniswap measures (but does not store) the market price at the beginning of each block, before any trades take place. This price is expensive to manipulate because it was set by the last transaction in a previous block. **This means an attacker has to make a bad trade at the end of a previous block**, with no guarantee they will be able to arbitrage it back in the next.

https://twitter.com/VitalikButerin/status/1229811022485000192

This alone is not enough. If significant value settles at this price, it is likely the profit of an attack would outweigh the loss.

Instead, Uniswap V2 adds this end-of-block price to a single cumulative-price variable in the core exchange contract weighted by the amount of time this price existed. **This variable represents a sum of the Uniswap price for every second in the entire history of the contract.**

![the secret sauce](https://cdn-images-1.medium.com/max/3256/1*PIwzMNVlKXXPn98EaQQpXA.png)_the secret sauce_

This variable can be used by external contracts to track accurate time-weighted average prices (TWAPs) across any time interval.

This is done by reading the cumulative price from a Uniswap pair at the beginning and at the end of the interval. The difference in this cumulative price can then be divided by the length of the interval to create a TWAP for that period.

![cooking with secret sauce](https://cdn-images-1.medium.com/max/4840/1*98K8nK4hHO-iVwSsbBPMjQ.png)_cooking with secret sauce_

TWAPs can be used directly or as the basis for moving averages (EMAs and SMAs) as needed.

A few notes:

- To calculate TWAP an oracle contract must call Uniswap at the beginning and at the end of an interval
- For a 10-minute TWAP, sample once every 10 minutes. For a 1-week TWAP, sample once every week.
- Manipulation resistance increases with liquidity on Uniswap as well as the length of time over which you are averaging.
- Cost of attack is relatively simple to reason about. Moving the price 5% on a 1-hour TWAP is approximately equal to the amount lost to arbitrage for moving the price 5% every block for 1 hour.

There are some nuances that are good to be aware of when using Uniswap V2 as an oracle, especially where manipulation resistance is concerned. The whitepaper [add link] elaborates on some of them. Additional oracle-focused developer guides and documentation will be released soon.

In the meantime, check out our[ example implementation](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/Oracle.sol) of a 24 hr TWAP Oracle built on Uniswap V2!

# Flash Swaps

_Try before you buy!_

The composability of open financial protocols on Ethereum allows anyone to build a new financial application without needing to start from scratch. Uniswap is the “exchange lego” that takes in one token and spits out another. It can be combined with a “lending lego” to quickly spin up a new margin trading platform. The more legos we have the better the structures we can build. Flash swaps were created with this in mind.

## Arbitrage no upfront capital

You find yourself in an unfortunate situation. You notice a cross-dex arbitrage opportunity. You could sell 200 DAI for 1 ETH on Uniswap and then sell that 1 ETH on Oasis for 220 DAI at a 20 DAI profit. But you don’t have any DAI in your wallet.

![](https://cdn-images-1.medium.com/max/2000/1*ZRkp9D-LGv9fhEEjvWC7Mw.gif)

**Flash swaps** allow you to withdraw as much as you want of any tokens on Uniswap at no upfront cost and do anything you want with them (executing arbitrary code), provided that by the end of the transaction execution, you either:

- pay for all tokens withdrawn
- pay for a percentage of tokens and return the rest at a small premium
- return all tokens withdrawn at a small premium

In the above scenario, you could synchronously withdraw 1 ETH from Uniswap, sell it on Oasis for 220 DAI and then pay for the ETH on Uniswap with 200 of the DAI you just purchased. **Removing the upfront capital requirement** of arbitrage is one of **many new possibilities** enabled by flash swaps.

Another example is **improving the efficiency of margin trading** between Uniswap and a lending protocol. This is currently done with the following process:

1. add user ETH to Maker,
2. borrow DAI from Maker
3. swap DAI for ETH on Uniswap
4. repeat steps 1–3 multiple times until you reached desired leverage

With flash swaps this process is simplified to:

1. withdraw all ETH you want from Uniswap
2. add user and Unsiwap ETH to Maker
3. borrow all DAI you need from Maker
4. pay Uniswap back with DAI

If Uniswap is not paid back, the entire transaction will revert.

# Core-Helper Architecture (IN PROGRESS)

_More flexible smart contract structure_

Uniswap V1 has many hardcoded functions and features that are useful, but could just as easily be implemented externally. In fact, the core exchange contract has 16 different swapping functions when in reality it only needs one.

Uniswap V2 core is minimalist in design, removing all logic that is not strictly necessary to secure liquidity stored in its reserves. Logic related to trader security or ease-of-use must instead be implemented in external helper contracts. Since external helpers can be improved and replaced without needing to migrate liquidity, this improves on the flexibility and modularity of Uniswap.

Our Uniswap-V2-Periphery repo contains an initial set up helpers, including a router contract that performs all the safety checked needed for safely swapping, adding, and removing liquidity. We anticipate other teams will build their own helpers optimized for specific purposes.

While this is a huge improvement, there are some new smart contract patterns introduced that developers building on top of Uniswap should be aware of.

Uniswap V2 Core Functionality

- Ensure invariant increases on any swap after subtracting 0.3% from inputs
- Transfer purchased tokens to recipient
- Transfer liquidity withdrawn to recipient
- Mint and burn liquidity tokens to track liquidity provider positions
- Store cumulative price reserves for use in oracles

Periphery Functionality

- Transfer tokens being sold to Uniswap
- Transfer liquidity deposits to Uniswap
- Distinguish between buys and sells (exact input or exact output)
- Enforce the security of traders through minimum return amounts,
- Handle all token routing

# Technical Improvements (IN PROGRESS)

_We changed a lot_

Uniswap V2 contains many other signifiant changes and improvements.

- Smart contracts are written in Solidity instead of Vyper
- Use CREATE2 to make exchange address deterministic based on token pair
- Uniswap V2 supports “no bool” tokens that do not work on Uniswap V1, such as BNB, USDT, and OMG
- Built in metaTransaction “approve” function for liquidity tokens
- Improved logic for liquidity token supply initialization
- Increase re-entrancy protection using mutex (adds support for ERC777 and other non-standard tokens)
- Fix bug from V1 bug that uses all remaining gas on failing transactions
- More descriptive error messages. The above bug caused failing transactions to only return the error “Bad Jump Destination”
- Explicit Boundary conditions
- Use WETH instead of ETH in core contract. Swaps directly from ETH are still possible through a router.

# Path to Sustainability

_TLDR: A small hardcoded fee that is set to 0 but can be turned on in the future_

Watching Uniswap’s early growth made it clear to me that pooled, automated market making can be a disruptive force for decentralized exchange.

Uniswap V1 is already highly\*\* **decentralized, trustless, and censorship resistant. But for it to achieve its full potential as infrastructure in a fair and open financial system— **it must continue to grow and improve\*\*.

https://twitter.com/haydenzadams/status/1228403478285967361

Decentralization is in great part about increasing participation and removing central points of failure. As an early player in decentralized finance, Uniswap is positioned to experiment and innovate on how decentralized systems are built and funded.

https://twitter.com/jessewldn/status/1135741055045967874

In the Classical Period of crypto (2014) Vitalik described decentralized autonomous organizations (DAOs) as “automation at the center, humans at the edges”.

> # an entity that lives on the internet and exists autonomously, but also heavily relies on hiring individuals to perform certain tasks that the automaton itself cannot do

I think this definition perfectly describes both Uniswap’s present and its path forward. Automate that which can be automated and incentivize that which cannot. In Uniswap V1 pricing, coordination, listing, and trade execution are fully automated while arbitrage and liquidity provision are incentivized.

**The best version of Uniswap will be one that incentives contributions to its own growth and development** as well as to the broader ecosystem in which it lives. One that rewards the time and investment of an incredible community that has already started to form.

A system that rewards its users

A system

Uniswap is an ideal candidate for exploring decentralized, on-chain cashflows. Without any additional growth it is on track to generating more than \$5,000,000 in liquidity provider fees this year.

To open a path to self-sustainability Uniswap V2 will include a small protocol charge (set to 0 for now) that can be turned on in the future and directed towards a protocol incentive mechanism.

A few notes:

- At launch the liquidity provider fee will be 0.3% and the protocol charge will be off.
- If the protocol charge is turned on the liquidity provider fee will become 0.25% and the protocol charge will be 0.05%.
- This feature including the exact percentage amounts is hardcoded into the core contracts. The contracts reman decentralized and non-upgradable.
- This was added to V2 as an avenue for future exploration. We don’t intend for the feature to be turned on in the immediate future.

For more details please refer to the technical whitepaper or code.

# **Future Improvements / Outro (IN PROGRESS)**

- Dynamic fees
- External Oracles
- New router features (affiliate fees, routing/ag, metaTransactions)
