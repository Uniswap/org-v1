---
title: How Uniswap V2 oracles work
---

Uniswap V2 implements new functionality that enables highly decentralized and manipulation-resistant on-chain price feeds.
This is achieved by measuring prices when they are expensive to manipulate, and cleverly accumulating historical data. 
Uniswap V2 allows external smart contracts to measure time-weighted averages of Uniswap prices across any time interval.

## Problem statement

On-chain price feeds are a critical component for many decentralized financial applications including those 
similar to derivatives, lending, margin trading, prediction markets and more.

Despite closely tracking the real-world price most of the time, Uniswap V1 cannot be used safely as a price oracle. 
In Uniswap V1, a user can easily manipulate the price just before it is measured.

## Uniswap V2 solution

Uniswap V2 includes a number of improvements for the use of price oracles. 
First, every pair measures (but does not store) the market price at the beginning of each block, 
_before any trades take place_.
The market price is simply the ratio of reserves of both tokens in the pair. 
This price is expensive to manipulate because it was set by the last transaction in a previous block.

For an attacker to manipulate the price measured at the beginning of the block, an attacker has to make a bad trade 
at the _end_ of a previous block. An attacker that makes a bad trade at the end of the block has no guarantee that they
will be able to arbitrage it back in the next block, for which they are competing with other skilled arbitrageurs.
Attackers will often lose money to arbitrageurs, unless they can “selfishly” mine two blocks in a row.
This type of attack presents a number of challenges and has not been observed to date.

This alone is not enough. If significant value settles based on the price resulting from this mechanism, then the profit
of an attack likely can outweigh the loss.

Instead, Uniswap V2 adds this end-of-block price to a single cumulative-price variable in the core contract weighted by
the amount of time this price existed. This variable represents a sum of the Uniswap price for every second in the entire
history of the contract.

## Manipulation resistance

The cost of manipulating a price for a measured time period can be roughly estimated as the cost of selling at the
manipulated price for the entire period. For larger liquidity pools over longer time periods, this is impractical, as the 
cost usually exceeds the capital it secures.

Other factors such as network congestion can reduce the cost of attack.
For a more in-depth review of the security of Uniswap V2 price oracles, read the 
[security audit section on Oracle Integrity](https://uniswap.org/audit.html#org87c8b91).

## Using Uniswap V2 price oracles

Importantly, Uniswap V2 is not opinionated on how you use the cumulative price variable. The cumulative price simply enables
measurement of time weighted average prices. A single measurement it is not sufficient to measure the time weighted average price
across any period other than from the smart contract creation to the current time.

In order to measure the time weighted average price, you must compare the cumulative price at the beginning and the end 
of the period. For more details, continue on to the next section.

<InlineBoxLink title="Building an oracle on Uniswap V2" to="/docs/v2/oracles/guides/how-to-build-an-oracle-on-top-of-uniswap/" />

