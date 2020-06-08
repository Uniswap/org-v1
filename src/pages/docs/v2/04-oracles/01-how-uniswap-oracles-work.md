---
title: How Uniswap oracles work
---

## Problem statement

On-chain price feeds are a critical component for many decentralized financial applications including those 
similar to derivatives, lending, margin trading, prediction markets and more.

Despite closely tracking the real-world price most of the time, Uniswap V1 cannot be used safely as a price oracle. 
In Uniswap V1, an attacker can simply manipulate the price just before it is measured.

## Uniswap V2 solution

For a good description of the solution introduced in Uniswap V2, see the section on price oracles in the 
[Uniswap V2 Overview](/blog/uniswap-v2/#price-oracles).

In summary, Uniswap V2 introduces a pair of variables, `price0CumulativeLast`, and `price1CumulativeLast`, that store
the prices of `token0` and `token1` respectively, weighted by how long they were observed for the life of each pair. 
These variables can be used to build price oracles by observing the differences over different time periods. 

## Manipulation resistance

The cost of manipulating the price for a specific time period can be roughly estimated as the
amount lost to arbitrage and fees every block for the entire period. For larger liquidity pools and over longer 
time periods, this attack is impractical, as the cost of manipulation typically exceeds the value at stake.

Other factors such as network congestion can reduce the cost of attack.
For a more in-depth review of the security of Uniswap V2 price oracles, read the 
[security audit section on Oracle Integrity](https://uniswap.org/audit.html#org87c8b91).

## Using Uniswap V2 price oracles

Importantly, Uniswap V2 is not opinionated on how you use the new cumulative price variables, allowing you to build oracles
that compute different kinds of price averages and over different periods. Continue to the next section to learn more.
