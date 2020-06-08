---
title: Building an oracle on Uniswap V2
---

To build a price oracle on Uniswap V2, you must first understand the 
requirements for the oracle. Once you understand the requirements,
it is a matter of saving the cumulative price variable from the pair 
as often as necessary, and doing a calculation of average price
using two or more observations of the cumulative price.

## Understanding requirements

To understand your requirements, you must know the answer to the 
following questions:

- Is data freshness important? 
I.e.: must the price average include the current price?
- Are recent prices more important than historical prices? 
I.e.: is the current price given more weight than historical prices?

## Fixed windows

In the case where data freshness is not important, and recent prices are
equally weighted with historical prices, it is enough to 
collect the cumulative price once per period, e.g. once per 24 hours.

Computing the average price over these data points gives you 'fixed windows',
which can be refreshed at the lapse of every period. We have built
an example of this kind of oracle 
[here](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleOracleSimple.sol).

## Moving averages

In the case where data freshness is important, you can use a sliding
window where the cumulative price variable is measured more often 
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
are more important than historical prices. However, note that
putting more weight on recent prices makes the oracle cheaper to manipulate
than weighting all measurements equally.

## No-maintenance approach with storage proofs

TODO