---
title: 'Uniswap V2 Announcement'
date: '2020-03-11'
author: 'Hayden Adams'
featuredImage: ./featured.jpg
previewText: 'All about Uniswap V2. Price oracles, optimistic swaps and much much more. Launching April 2020.'
---

# Overview

**Uniswap V1** was the proof-of-concept for a new type of decentralized marketplace.

As a means for pooled, automated liquidity provision on Ethereum, the Uniswap protocol (Uniswap) functions without maintenance, providing an unstoppable and fully decentralized source of liquidity. **Uniswap V1 will work for as long as Ethereum exists** , and so far, it has worked very nicely for a wide variety of use cases.

![Uniswap V1 Liquidity Growth](https://cdn-images-1.medium.com/max/4004/1*-pykU7ahDEhYb9DUPB70YA.png)_Uniswap V1 Liquidity Growth_

However, pooled automated liquidity remains nascent technology, and **we have only just begun to explore its potential**. This is the reason [we raised a seed round](https://finance.yahoo.com/news/paradigm-backs-decentralized-exchange-protocol-184824051.html) and formed a team dedicated to research and development for the Uniswap protocol to contribute along with the rest of the Ethereum community.

**Uniswap V2** is our second iteration of the Uniswap protocol and includes many new features and improvements. This article will serve as a high-level overview of these changes including:

- ERC20 / ERC20 Pairs
- Price Oracles
- Flash Swaps
- Core/Periphery Architecture
- Technical Improvements
- Path to Sustainability

For full details check out the:

- [Core smart contracts](https://github.com/Uniswap/uniswap-v2-core/)
- [Periphery smart contracts](https://github.com/Uniswap/uniswap-v2-periphery)
- Uniswap V2 Whitepaper

# ERC20 / ERC20 Pairs

In Uniswap V1, all trading pairs are between ETH and a single ERC20 token. Having a single common pair provides a nice UX advantage — you can swap any ERC20 for any other ERC20 by routing through ETH.

![ERC20 to ERC20 swap in V1](https://cdn-images-1.medium.com/max/4336/0*5Gcgtpp0ZQAdnswV)_ERC20 to ERC20 swap in V1_

Since ETH is the most liquid asset on Ethereum, and does not introduce any new platform risk, we believe it was the best choice for V1.

However, in order to further Uniswap and expand its use cases, in Uniswap V2, **any ERC20 token can directly be paired with any other ERC20 token**.

This means **liquidity providers can maintain more diverse positions in ERC20 tokens** , rather than being forced to have 50% exposure to ETH. One example would be a DAI/USDC pair (or CHAI/cUSDC), which should have little volatility for liquidity providers, but still be incredibly useful for trading and arbitrage.

Having direct ERC20/ERC20 token pools for highly-desirable pairs can lead to **better trading prices**. This is because routing through ETH for a swap between two other assets (say, DAI/USDC) involves paying fees and slippage on two separate pairs instead of one.

We still anticipate ETH pairs being very popular, but expect to see significant growth in stablecoin-based pairs over time.

# Price Oracles!

## Theoretical Background

If the relative price of two assets on Uniswap is ever mismatched with the price on an external marketplace, then an arbitrage trade exists that would bring the two prices into alignment. This creates a financial incentive for the price on Uniswap to very closely track that of other marketplaces. We have seen this play out in practice. [Sophisticated arbitrageurs constantly monitor Uniswap and capitalize on any price discrepancies](http://frontrun.me/revenue/). For a longer theoretical background, I recommend [this paper](https://arxiv.org/abs/1911.03380).

## Improving Uniswap as an Oracle

On-chain price feeds are a critical component for many decentralized financial applications including those similar to derivatives, lending, margin trading, prediction markets and more. Unfortunately, Uniswap V1 cannot safely be used as a price oracle, since the price can be moved significantly in a short period of time.

For example, suppose a contract uses the current DAI/ETH price to settle a transaction. An attacker who wishes to manipulate the measured price can buy ETH from the DAI/ETH pool, trigger settlement on the contract (causing it to settle based on the inflated price), and then sell ETH back to the DAI/ETH pool to trade it back to the true price. This might even be done as a single atomic transaction, or by a miner who controls the ordering of transactions within a block, meaning the attacker loses no money to arbitrage.

**Uniswap v2 implements new functionality that enables highly decentralized and manipulation resistant on-chain price feeds.** This is achieved by measuring prices when they are expensive to manipulate, and cleverly accumulating historical data. This lets external smart contracts create gas-efficient, time-weighted averages of Uniswap prices across **any** time interval.

> # Okay, so how does it work?

First, Uniswap measures (but does not store) the market price at the beginning of each block, before any trades take place. This price is expensive to manipulate because it was set by the last transaction in a previous block. **This means an attacker has to make a bad trade at the end of a previous block** , typically with no guarantee the attacker will be able to arbitrage it back in the next block.

This alone is not enough. If significant value settles based on the price resulting from this mechanism, then the profit of an attack likely would outweigh the loss.

Instead, Uniswap V2 adds this end-of-block price to a single cumulative-price variable in the core contract weighted by the amount of time this price existed. **This variable represents a sum of the Uniswap price for every second in the entire history of the contract.**

![the secret sauce](https://cdn-images-1.medium.com/max/3256/1*PIwzMNVlKXXPn98EaQQpXA.png)

This variable can be used by external contracts to track accurate time-weighted average prices (TWAPs) across any time interval.

This is done by reading the cumulative price from an ERC20 token pair at the beginning and at the end of the interval. The difference in this cumulative price can then be divided by the length of the interval to create a TWAP for that period.

![cooking with secret sauce](https://cdn-images-1.medium.com/max/4840/1*98K8nK4hHO-iVwSsbBPMjQ.png)

TWAPs can be used directly or as the basis for moving averages (EMAs and SMAs) as needed.

A few notes:

- To calculate a TWAP over an interval, an oracle contract must call Uniswap at the beginning and at the end of that interval
- For a 10-minute TWAP, sample once every 10 minutes. For a 1-week TWAP, sample once every week.
- Manipulation resistance increases with liquidity on Uniswap, as well as the length of time over which you are averaging.
- Cost of attack is relatively simple to estimate. Moving the price 5% on a 1-hour TWAP is approximately equal to the amount lost to arbitrage for moving the price 5% every block for 1 hour.

There are some nuances that are good to be aware of when using Uniswap V2 as an oracle, especially where manipulation resistance is concerned. The whitepaper [add link] elaborates on some of them. Additional oracle-focused developer guides and documentation will be released soon.

In the meantime, check out our [example implementation](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/Oracle.sol) of a 24 hr TWAP Oracle built on Uniswap V2!

# Flash Swaps

_Try before you buy!_

The composability of open financial protocols on Ethereum allows anyone to build a new financial application without needing to start from scratch. Uniswap is the &quot;liquidity lego&quot; that takes in one ERC20 token and spits out another. It can be combined with a &quot;lending lego&quot; to quickly spin up a new margin trading platform. The more interoperable primitives we have on Ethereum the better the structures we can build. Flash swaps were created with this idea in mind.

## Arbitrage with no upfront capital

You find yourself in an unfortunate situation. You notice an on-chain arbitrage opportunity. For example, you could sell 200 DAI for 1 ETH on Uniswap and then sell that 1 ETH on Oasis for 220 DAI at a 20 DAI profit. But you don&#39;t have any DAI in your wallet.

![](https://cdn-images-1.medium.com/max/2000/1*ZRkp9D-LGv9fhEEjvWC7Mw.gif)

**Flash swaps** allow you to withdraw as much as you want of any ERC20 tokens on Uniswap at no upfront cost and do anything you want with them (executing arbitrary code), provided that by the end of the transaction execution, you either:

- pay for all ERC20 tokens withdrawn
- pay for a percentage of ERC20 tokens and return the rest at a small premium
- return all ERC20 tokens withdrawn at a small premium

In the above example, you could synchronously withdraw 1 ETH from Uniswap, sell it on Oasis for 220 DAI and then pay for the ETH on Uniswap with 200 of the DAI you just purchased. **Removing the upfront capital requirement** of arbitrage is just one of **many new possibilities** enabled by flash swaps.

Another example is **improving the efficiency of margin trading** between Uniswap and a lending protocol. This is currently done with the following process:

1. add user ETH to Maker,
2. borrow DAI from Maker
3. swap DAI for ETH on Uniswap
4. repeat steps 1–3 multiple times until you reached desired leverage

With flash swaps this process is simplified to:

1. withdraw all ETH you want from Uniswap
2. add user and Unsiwap ETH to Maker
3. borrow all DAI you need from Maker
4. Return DAI to the Uniswap protocol

If the Uniswap protocol does not receive more than what was withdrawn, then the entire transaction will revert.

# Core/Helper Architecture

Uniswap V1 has many hardcoded functions and features that are useful, but could just as easily be implemented externally. In fact, the core contract has 16 different swapping functions when in reality it needs only one.

[Uniswap V2 Core](https://github.com/Uniswap/uniswap-v2-core) (core) is minimalist in design, removing all logic that is not strictly necessary to secure liquidity stored in its pools. Logic related to trader security or ease-of-use must be implemented in external helper contracts. Since external helpers can be improved and replaced without needing to migrate liquidity, this improves on the flexibility and modularity of Uniswap.

[Uniswap V2 Periphery](https://github.com/Uniswap/uniswap-v2-periphery) (periphery) is an initial set of helpers, including:

- [A router contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) that performs the safety checks needed for safely swapping, adding, and removing liquidity.
- [A migrator contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Migrator.sol) that can remove liquidity from Uniswap V1 and deposit it into Uniswap V2 in a single transaction.
- [A library contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Library.sol) that can be used in the creation of other helper contracts.
- [An example oracle contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/ExampleOracle.sol) that creates a TWAP from Uniswap V2 cumulative prices.
- [An example flash swap contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/ExampleFlashSwap.sol) that can arbitrage between Uniswap V2 and Uniswap V1 with no upfront capital.

While this is a huge improvement, there are some new smart contract patterns introduced of which developers building on top of Uniswap should be aware.

- Core uses WETH instead of ETH. Routers can convert between ETH and WETH allowing users to use ETH directly
- Core stores ERC20 balances internally instead of relying on the balances stored in the ERC20 contract
- Core no longer calls **transferFrom** on **msg.sender**. Instead ERC20 tokens should be sent to core directly by a router before calling the **swap** , **mint** or **burn** functions.
- Core will determine the amount of ERC20 tokens sent to it based on the difference between its current and stored balances.
- Core no longer returns the maximum amount of ERC20 tokens for a given input amount. Instead, a router must specify the amount of ERC20 tokens it wants. Core will send this amount as long as the invariant is preserved after taking 0.3% off any input amount.
- Routers should handle logic around slippage safety checks and multihop trades.

For additional details please read the [architecture section](https://uniswap.org/docs/v2/smart-contracts/architecture/) of the in-progress Uniswap V2 docs or the core and periphery smart contracts themselves.

# Technical Improvements

Uniswap V2 contains many other significant changes and improvements.

- Smart contracts are written in Solidity instead of Vyper
- Use CREATE2 to make the pool address deterministic based on the ERC20 token pair
- Uniswap V2 properly handles [&quot;missing return&quot; ERC20 tokens](https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca) that do not work on Uniswap V1, such as USDT, and OMG
- Built in metaTransaction &quot;approve&quot; function for liquidity tokens
- Improved logic for liquidity token supply initialization
- Increase re-entrancy protection using mutex (adds support for ERC777 and other non-standard ERC20 tokens)
- Fix bug from V1 bug that uses all remaining gas on failing transactions
- More descriptive error messages. The above bug caused failing transactions to only return the error &quot;Bad Jump Destination&quot;
- Explicit Boundary conditions

# Path to Sustainability

_TLDR: A small hardcoded fee that is set to 0 but can be turned on in the future_

Watching Uniswap&#39;s early growth made it clear that pooled, automated liquidity can be a disruptive force for decentralized finance.

Decentralization is in great part about increasing participation and removing central points of failure. Uniswap V1 is already highlydecentralized, trustless, and censorship resistant. But for it to achieve its full potential as infrastructure in a fair and open financial system— **it must continue to grow and improve**.

[https://twitter.com/jessewldn/status/1135741055045967874](https://twitter.com/jessewldn/status/1135741055045967874)

In the Classical Period of crypto (2014), [Vitalik described](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide/) decentralized autonomous organizations (DAOs) as &quot;automation at the center, humans at the edges&quot;:

an entity that lives on the internet and exists autonomously, but also heavily relies on hiring individuals to perform certain tasks that the automaton itself cannot do

This perfectly describes the Uniswap protocol&#39;s path forward. In Uniswap V1 pricing, coordination, listing, and trade execution are fully automated while arbitrage and liquidity provision are incentivized.

**However, the best version of Uniswap will be one that autonomously incentivizes contributions to its own growth and development** as well as to the broader ecosystem in which it lives. That rewards the time and investment of an incredible community that has already started to form.

Uniswap benefits greatly from network effects. Increased usage generates fees which attracts liquidity. Increased liquidity in turn attracts usage from traders and integrations. Effective distribution of value generated by the Uniswap protocol can significantly reinforce these network effects by boosting protocol usage.

Uniswap is an ideal candidate for exploring decentralized, on-chain cashflows. Without any additional growth it is on track to generate more than \$5,000,000 in liquidity provider fees this year.

To open a path to self-sustainability, Uniswap V2 will include a small protocol charge (set to 0 for now) that can be turned on in the future and directed towards a protocol incentive mechanism.

A few notes:

- At launch, the liquidity provider fee will be 0.3% and the protocol charge will be off.
- If the protocol charge is turned on, the liquidity provider fee will become 0.25%, and the protocol charge will be 0.05%.
- This feature, including the exact percentage amounts, is hardcoded into the core contracts. The contracts remain decentralized and non-upgradable.
- This feature was added to Uniswap V2 as an avenue for future exploration. It is not expected that the feature will be turned on in the near future.
- This feature can be turned on through a smart contract mechanism deployed after the Uniswap V2 launch.

For more details please refer to the technical whitepaper or code.

# Launch Details

While the core smart contracts are finished, additional work is still in progress.

- Uniswap V2 smart contracts are undergoing formal verification and security auditing. Bug bounties will be used to encourage additional community security review.
- The interface, analytics site, API, and developer SDK are being updated to work with Uniswap V2.
- Documentation, guides, and examples are still being worked on.
- When everything else is ready a simplified migration UX will be released to improve the experience of moving from V1 to V2

Pending a successful formal verification, we are optimistic that Uniswap V2 can be deployed this Spring. However, please keep in mind that this is a target and not an announced release date.
