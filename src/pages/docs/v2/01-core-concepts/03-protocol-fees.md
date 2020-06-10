---
title: Fee Structure
---

There is a 0.3% fee for swapping tokens. This fee is split by liquidity providers proportional to their contribution to liquidity reserves. Since ERC20 to ERC20 trades include both an ERC20 to ETH swap and an ETH to ERC20 swap, the fee is paid on both exchanges. There are no platform fees.

Swapping fees are immediately deposited into liquidity reserves. Since total reserves are increased without adding any additional share tokens, this increases that value of all share tokens equally. This functions as a payout to liquidity providers that can be collected by burning shares.

Since fees are added to liquidity pools, the invariant increases at the end of every trade. Within a single transaction, the invariant represents eth_pool \* token_pool at the end of the previous transaction.

## Path to Sustainability

Decentralization is in many ways about increasing participation and removing central points of failure. Uniswap V1 is already highlydecentralized, trustless, and censorship resistant. But for it to achieve its full potential as infrastructure in a fair and open financial system — **it must continue to grow and improve**.

To open a path to self-sustainability, the code for Uniswap V2 includes a small protocol charge mechanism. At launch, the protocol charge will default to 0, and the liquidity provider fee will be 0.30%. If the protocol charge is switched on, it will become 0.05% and the liquidity provider fee will be 0.25%.

This feature, including the exact percentage amounts, is hardcoded into the core contracts which remain decentralized and non-upgradable. It can be turned on, and directed by, a decentralized governance process deployed after the Uniswap V2 launch. There is no expectation that it will be turned on in the near future but it opens the possibility for future exploration.

[https://twitter.com/jessewldn/status/1135741055045967874](https://twitter.com/jessewldn/status/1135741055045967874)

In the Classical Period of crypto (2014), [Vitalik described](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide/) decentralized autonomous organizations (DAOs) as "automation at the center, humans at the edges."

> an entity that lives on the internet and exists autonomously, but also heavily relies on hiring individuals to perform certain tasks that the automaton itself cannot do

This perfectly describes the Uniswap protocol's path forward. In Uniswap V1 pricing, coordination, listing, and trade execution are fully automated while arbitrage and liquidity provision are incentivized.

However, **the best version of Uniswap will be one that autonomously incentivizes contributions to its own growth and development** as well as to the broader ecosystem in which it exists--one that supports the contributions of the **incredible community** that has formed and continues to grow.

Uniswap is an ideal candidate for exploring decentralized on-chain cash flows. **Without any additional growth** , it will generate more than $5M in liquidity provider fees this year. If the protocol charge was on, ~$830,000 of this would instead go to a decentralized funding mechanism used to support contributions to Uniswap and its ecosystem.

**This type of support boosts network effects from which Uniswap and its users benefit greatly.** Incentivized contributions lead to increased protocol functionality and usage. Usage generates fees which attracts liquidity. Increased liquidity further entrenches Uniswap, attracting additional users, contributors, and integrations.

![](graph.jpeg)

For more details, please refer to the technical <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> or code.
