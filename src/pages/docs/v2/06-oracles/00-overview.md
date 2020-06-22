---
title: Overview
tags:
  - oracles
  - documentation
---

Uniswap V2 enables building highly decentralized and manipulation-resistant on-chain price oracles.

Price oracles are a crucial to the viability and security of DeFi protocols.
Oracle designs between different projects have been implemented on an ad hoc basis,
with varying degrees of decentralization and security.
Because of this, the ecosystem has witnessed numerous high-profile hacks where the oracle implementation is the main
attack vector.
Some of these vulnerabilities have been discussed
[here](https://samczsun.com/taking-undercollateralized-loans-for-fun-and-for-profit/).
A lack of a robust price oracle has held back both the adoption of DeFi and made it difficult and costly for new
entrants to launch new derivative products.

Enter Uniswap V2. As liquidity and trade volume on the protocol continue to grow, Uniswap's on-chain trade history is
becoming an evermore valuable, accurate, and robust source of price information.
This insight has been formalized into the Price Oracle mechanism in Uniswap V2.

## Oracle docs

<div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-start', marginBottom: '2rem'}}>
<InlineCard title="How Uniswap oracles work" tag="guide" description="Trade tokens, add liquidity and create pools." to="/docs/v2/oracles/how-uniswap-oracles-work/" />
<InlineCard title="Building an oracle on Uniswap" tag="guide" description="Trade tokens, add liquidity and create pools." to="/docs/oracles/how-to-build-an-oracle-on-top-of-uniswap/" />
<InlineCard title="Integrating an oracle" tag="guide" description="Trade tokens, add liquidity and create pools." to="/docs/v2/oracles/integrating-uniswap-oracles/" />
</div>

## Developer resources

<InlineBoxLink title="Sliding window oracle example" href="https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleSlidingWindowOracle.sol" />
