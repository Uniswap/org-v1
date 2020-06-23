---
title: Fees
tags: protocol-overview, documentation
---

A **0.30%** fee is applied to input amounts when swapping tokens. **This fee is split by liquidity providers proportional to their contribution to liquidity reserves.**

Swap fees are deposited into liquidity reserves. This means that total reserves increase without any additional share tokens being added, which increases the value of all share tokens equally. This functions as a payout to liquidity providers that can be collected by burning shares.

Since fees are added to liquidity pools, the invariant increases at the end of every trade. Within a single transaction, the invariant represents `token0_pool / token1_pool` at the end of the previous transaction.

There are many community developed tools to determine returns. You can also read more in the docs about how to think about LP returns:

<InlineBoxLink title="Understanding LP returns" to="/docs/v2/liquidity-pools/understanding-uniswap-returns/" />

# Path to Sustainability

Decentralization is in many ways about increasing participation and removing central points of failure. Uniswap V1 is already highly decentralized, trustless, and censorship resistant. But for it to achieve its full potential as infrastructure in a fair and open financial system — **it must continue to grow and improve**.

To open a path to self-sustainability, the code for Uniswap V2 includes a small protocol charge mechanism. At launch, the protocol charge will default to 0, and the liquidity provider fee will be 0.30%. If the protocol charge is switched on, it will become 0.05% and the liquidity provider fee will be 0.25%.

This feature, including the exact percentage amounts, is hardcoded into the core contracts which remain decentralized and non-upgradable. It can be turned on, and directed by, a decentralized governance process deployed after the Uniswap V2 launch. There is no expectation that it will be turned on in the near future but it opens the possibility for future exploration.

[https://twitter.com/jessewldn/status/1135741055045967874](https://twitter.com/jessewldn/status/1135741055045967874)

In the Classical Period of crypto (2014), [Vitalik described](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide/) decentralized autonomous organizations (DAOs) as "automation at the center, humans at the edges."

> an entity that lives on the internet and exists autonomously, but also heavily relies on hiring individuals to perform certain tasks that the automaton itself cannot do

This perfectly describes the Uniswap protocol's path forward. **The best version of Uniswap will be one that autonomously incentivizes contributions to its own growth and development** as well as to the broader ecosystem in which it exists--one that supports the contributions of the **incredible community** that has formed and continues to grow.

Uniswap is an ideal candidate for exploring decentralized on-chain cash flows. **Without any additional growth** , it will generate more than $5M in liquidity provider fees this year. If the protocol charge was on, ~$830,000 of this would instead go to a decentralized funding mechanism used to support contributions to Uniswap and its ecosystem.

**This type of support boosts network effects from which Uniswap and its users benefit greatly.** Incentivized contributions lead to increased protocol functionality and usage. Usage generates fees which attracts liquidity. Increased liquidity further entrenches Uniswap, attracting additional users, contributors, and integrations.

For more details, please refer to the technical <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> or code.
