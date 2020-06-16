---
title: Trading from a Smart Contract
---

When trading from a smart contract, the most important thing to keep in mind is that access to an external price source is _mandatory_. Without this, trades can be frontrun for considerable loss on your part.

# Safety Considerations

Because Ethereum transactions occur in an adversarial environment, naively written smart contracts _can be exploited for profit_. For example, if a smart contract checks the asset ratio in a Uniswap pool at runtime and trades against it, assuming that the ratio represents the "fair" or "market" price of these assets, _it is highly vulnerable to manipulation_. A malicious actor could e.g. trivially insert transactions before and after the naive transaction (a so-called "sandwich" attack) causing the smart contract to trade at a radically worse price, profit from this at the trader's expense, and then return the contracts to their original state, all at a low cost. (One important caveat is that these types of attacks are mitigated by trading in extremely liquid pools, and/or at low values.)

The best way to protect against these attacks is to introduce a price oracle. The best "oracle" is simply _traders' off-chain observation of the prevailing price_, which can be passed into the trade as a safety check. This strategy is best suited to retail trading venues _where users initiate trades on their own behalf_. However, it is often the case that a trusted price observation cannot be obtained (e.g. in multi-step, programmatic interations involving Uniswap). Without a price oracle, these interactions are forced to trade at whatever the (potentially manipulated) rate on Uniswap is. However, an oracle can bound manipulation, and is a sine qua non. Determining the ideal oracle for a given setting is out of scope, but for details on the Uniswap V2 approach to oracles, see <Link to='/docs/v2/guides/oracles'>Oracles</Link>.

# Using the Router

The easiest way to safely swap with a pool is to use the <Link to='/docs/v2/smart-contracts/router02'>router</Link>, which provides a variety of methods to safely swap to and from different assets. You'll notice that there is a function for each permutation of swapping to/from an exact amount of eth/tokens.

Once you've used your external price source to calculate the safety parameters for the function you'd like to call, it's important to ensure that your contract a) controls at least as many tokens/ETH as were passed as `amount*Desired` parameters, and b) has granted approval to the router to withdraw this many tokens.
