---
title: Implement a Swap
tags:
  - developer-guides
  - documentation
---

When trading from a smart contract, the most important thing to keep in mind is that access to an external price source is _mandatory_. Without this, trades can be frontrun for considerable loss on your part.

_Read [safety considerations](#safety-considerations) for more._

# Using the Router

The easiest way to safely swap with a pool is to use the <Link to='/docs/v2/smart-contracts/router02'>router</Link>, which provides a variety of methods to safely swap to and from different assets. You'll notice that there is a function for each permutation of swapping to/from an exact amount of ETH/tokens.

Once you've used your external price source to calculate the safety parameters for the function you'd like to call, it's important to ensure that your contract a) controls at least as many ETH/tokens as were passed as `amount*Desired` parameters, and b) has granted approval to the router to withdraw this many tokens.

_Check out the <Link to='/docs/v2/swaps/pricing/#pricing-trades'>Pricing</Link> page for a more in depth discussion on getting prices._

# Example

Imagine you want to swap 50 DAI for as much ETH as possible from your smart contract.

## transferFrom

Before swapping, our smart contracts needs to be in control of 50 DAI. The easiest way to accomplish this is by calling `transferFrom` on DAI with the owner set to `msg.sender`:

```solidity
uint amountIn = 50 * 10 ** DAI.decimals();
require(DAI.transferFrom(msg.sender, address(this), amountIn), 'transferFrom failed.');
```

## approve

Now that our contract owns 50 DAI, we need to give permission to the <Link to='/docs/v2/smart-contracts/router02'>router</Link> to withdraw this DAI:

```solidity
require(DAI.approve(address(UniswapV2Router02), amountIn), 'approve failed.');
```

## swapExactTokensForETH

Now we're ready to swap:

```solidity
// amountOutMin must be retrieved from an oracle of some kind
address[] memory path = new address[](2);
path[0] = address(DAI);
path[1] = UniswapV2Router02.WETH();
UniswapV2Router02.swapExactTokensForETH(amountIn, amountOutMin, path, msg.sender, block.timestamp);
```

# Safety Considerations

Because Ethereum transactions occur in an adversarial environment, naively written smart contracts _can be exploited for profit_. For example, if a smart contract checks the asset ratio in a Uniswap pool at runtime and trades against it, assuming that the ratio represents the "fair" or "market" price of these assets, _it is highly vulnerable to manipulation_. A malicious actor could e.g. trivially insert transactions before and after the naive transaction (a so-called "sandwich" attack) causing the smart contract to trade at a radically worse price, profit from this at the trader's expense, and then return the contracts to their original state, all at a low cost. (One important caveat is that these types of attacks are mitigated by trading in extremely liquid pools, and/or at low values.)

The best way to protect against these attacks is to introduce a price oracle. The best "oracle" is simply _traders' off-chain observation of the prevailing price_, which can be passed into the trade as a safety check. This strategy is best suited to retail trading venues _where users initiate trades on their own behalf_. However, it is often the case that a trusted price observation cannot be obtained (e.g. in multi-step, programmatic interations involving Uniswap). Without a price oracle, these interactions are forced to trade at whatever the (potentially manipulated) rate on Uniswap is. However, an oracle can bound manipulation, and is a sine qua non. Determining the ideal oracle for a given setting is out of scope, but for details on the Uniswap V2 approach to oracles, see <Link to='/docs/v2/oracles'>Oracles</Link>.
