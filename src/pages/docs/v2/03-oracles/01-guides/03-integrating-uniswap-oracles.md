---
title: Integrating an oracle
---
## Oracle maintenance

In order to measure average prices over a period, the oracle must have a way
of referencing the cumulative price at the start and end of a period.
The recommended way of doing this is by storing these prices in the oracle contract,
and calling the oracle frequently to store the latest cumulative price.

Reliable oracle maintenance is a difficult task,
and can become a point of failure in times of congestion. 
Instead, consider building this functionality directly into the 
critical calls of your own smart contracts, or incentivize oracle 
maintenance calls by other parties.

While it is possible to avoid regularly storing this cumulative price at the
start of the period using storage proofs, this approach has limitations,
especially in regard to gas cost and maximum length of the time period.
If you wish to try this approach, you can follow 
[this repository by Keydonix](https://github.com/Keydonix/uniswap-oracle/). 

## Computing average prices

To compute the average price given two cumulative price observations, take the difference between
the cumulative price at the beginning and end of the period, and 
divide by the elapsed time between them in seconds. This will produce a 
[fixed point Q112x112](https://en.wikipedia.org/wiki/Fixed-point_arithmetic#Notation)
number that represents the price of one asset relative to the other.

Note we have both `price0CumulativeLast` and `price1CumulativeLast` in the pair contract, which are ratios of reserves
of `token1`/`token0` and `token0`/`token1` respectively. I.e. the price of `token0` is expressed in terms of 
`token1`/`token0`, while the price of `token1` is expressed in terms of `token0`/`token1`.

## Average price between cumulative price and now

If you wish to compute the average price between a given price cumulative observation and the current cumulative price,
you should use the cumulative price from the current timestamp. If the cumulative price has not been updated,
e.g. because there has not been any swap on the pair in the current block, you should compute the cumulative price
counterfactually.

We provide a library for use in oracle contracts that has the method
[UniswapV2OracleLibrary#currentCumulativePrices](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2OracleLibrary.sol#L16)
for getting the current cumulative price. The current cumulative price returned by this method is computed counterfactually.
That means it is correct regardless of whether a swap has already executed for the current block. 

