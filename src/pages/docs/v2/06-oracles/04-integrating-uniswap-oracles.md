---
title: Integrating an oracle
tags: oracles, documentation
---

To integrate an oracle into your contracts, you must ensure the oracle's observations of the cumulative price variable
are kept up to date.
As long as your oracle is up to date, you can depend on it to produce average prices.
The process of keeping your oracle up to date is called 'maintenance'.

## Oracle maintenance

In order to measure average prices over a period, the oracle must have a way
of referencing the cumulative price at the start and end of a period.
The recommended way of doing this is by storing these prices in the oracle contract,
and calling the oracle frequently enough to store the latest cumulative price.

Reliable oracle maintenance is a difficult task,
and can become a point of failure in times of congestion.
Instead, consider building this functionality directly into the
critical calls of your own smart contracts, or incentivize oracle
maintenance calls by other parties.

## No-maintenance option

It is possible to avoid regularly storing this cumulative price at the
start of the period by utilizing storage proofs. However, this approach has limitations,
especially in regard to gas cost and maximum length of the time period over which the average price can be measured.
If you wish to try this approach, you can follow
[this repository by Keydonix](https://github.com/Keydonix/uniswap-oracle/).
