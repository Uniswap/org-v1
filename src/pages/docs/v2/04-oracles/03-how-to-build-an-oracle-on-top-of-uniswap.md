---
title: Building an oracle on Uniswap
---

To build a price oracle on Uniswap V2, you must first understand the 
requirements for your use case. Once you understand the kind of price
average you require, it is a matter of storing the cumulative price 
variable from the pair as often as necessary, and computing
the average price using two or more observations of the 
cumulative price variables.

## Understanding requirements

To understand your requirements, you should first research the answer to the 
following questions:

- Is data freshness important? 
I.e.: must the price average include the current price?
- Are recent prices more important than historical prices? 
I.e.: is the current price given more weight than historical prices?

Note your answers for the following discussion.

## Fixed windows

In the case where data freshness is not important and recent prices 
are weighted equally with historical prices, it is enough to 
store the cumulative price once per period (e.g. once per 24 hours.)

Computing the average price over these data points gives you 'fixed windows',
which can be updated after the lapse of each period. We wrote
an example oracle of this kind 
[here](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleOracleSimple.sol).

This example does not limit the maximum size of the fixed window, i.e.
it only requires that the window size is greater than 1 period (e.g. 24 hours).

## Moving averages

In the case where data freshness is important, you can use a sliding
window in which the cumulative price variable is measured more often 
than once per period.

There are at least
[two kinds of moving averages](https://www.investopedia.com/terms/m/movingaverage.asp#types-of-moving-averages) 
that you can compute using the Uniswap cumulative price variable.

[Simple moving averages](https://www.investopedia.com/terms/s/sma.asp) 
give equal weight to each price measurement. We have built
an example of a sliding window oracle 
[here](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleSlidingWindowOracle.sol).

[Exponential moving averages](https://www.investopedia.com/terms/e/ema.asp) 
give more weight to the most recent price measurements.

You may wish to use exponential moving averages where recent prices
are more important than historical prices, e.g. in case of liquidations. However, note that
putting more weight on recent prices makes the oracle cheaper to manipulate
than weighting all price measurements equally.

## Computing average prices

To compute the average price given two cumulative price observations, take the difference between
the cumulative price at the beginning and end of the period, and 
divide by the elapsed time between them in seconds. This will produce a 
[fixed point Q112x112](https://en.wikipedia.org/wiki/Fixed-point_arithmetic#Notation)
number that represents the price of one asset relative to the other.

Note we have both `price0CumulativeLast` and `price1CumulativeLast` in the pair contract, which are ratios of reserves
of `token1`/`token0` and `token0`/`token1` respectively. I.e. the price of `token0` is expressed in terms of 
`token1`/`token0`, while the price of `token1` is expressed in terms of `token0`/`token1`.

## Getting the latest cumulative price

If you wish to compute the average price between a historical price cumulative observation and the current cumulative
price, you should use the cumulative price values from the current block. If the cumulative price has not been updated 
in the current block, e.g. because there has not been any liquidity event (mint/burn/swap) on the pair in the current
block, you can compute the cumulative price counterfactually.

We provide a library for use in oracle contracts that has the method
[`UniswapV2OracleLibrary#currentCumulativePrices`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2OracleLibrary.sol#L16)
for getting the cumulative price as of the current block.
The current cumulative price returned by this method is computed _counterfactually_, meaning it requires no call to 
the relative gas-expensive `#sync` method on the pair. 
It is correct regardless of whether a swap has already executed in the current block. 

## Integrating the oracle

Once you have determined your requirements, and written 
your oracle contract, you must integrate it into your own
smart contracts. For more details, continue on to the next section.
