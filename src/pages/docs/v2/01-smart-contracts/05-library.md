---
title: Library
---

import { Link } from "gatsby"

# Code

[`UniswapV2Library.sol`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Library.sol)

# Heritable Functions

## factory

```solidity
function factory() external pure returns (address);
```

Returns the <Link to='/docs/v2/smart-contracts/factory/#address'>factory address</Link>.

## sortTokens

```solidity
function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1);
```

Sorts token addresses.

## exchangeFor

```solidity
function exchangeFor(address tokenA, address tokenB) internal pure returns (address exchange);
```

Calculates the address for an exchange without making any external calls (see <Link to='/docs/v2/technical-considerations/exchange-addresses'>Exchange Addresses</Link>).

## getReserves

```solidity
function getReserves(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB);
```

Calls <Link to='/docs/v2/smart-contracts/exchange#getreserves'>getReserves</Link> on the exchange for the passed tokens, and returns the results sorted in the order that the parameters were passed in.

## quote

```solidity
function quote(uint amountA, uint reserveA, uint reserveB) public pure returns (uint amountB);
```

Given some asset amount and reserves, returns an amount of the other asset representing equivalent value.

- Useful for calculating optimal token amounts before calling <Link to='/docs/v2/smart-contracts/exchange#mint'>mint</Link>.

## getAmountOut

```solidity
function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint amountOut);
```

Given an _input_ asset amount, returns the maximum _output_ amount of the other asset (accounting for fees) given reserves.

- Used in [getAmountsOut](#getamountsout).

## getAmountIn

```solidity
function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) public pure returns (uint amountIn)'
```

Returns the minimum _input_ asset amount required to buy the given _output_ asset amount (accounting for fees) given reserves.

- Used in [getAmountsIn](#getamountsin).

## getAmountsOut

```solidity
function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)'
```

Given an _input_ asset amount and an array of token addresses, calculates all subsequent maximum _output_ token amounts by calling [getReserves](#getreserves) for each pair of token addresses in the path in turn, and using these to call [getAmountOut](#getamountout).

- Useful for calculating optimal token amounts before calling <Link to='/docs/v2/smart-contracts/exchange#swap'>swap</Link>.

## getAmountsIn

```solidity
function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts);
```

Given an _output_ asset amount and an array of token addresses, calculates all preceding minimum _input_ token amounts by calling [getReserves](#getreserves) for each pair of token addresses in the path in turn, and using these to call [getAmountIn](#getamountin).

- Useful for calculating optimal token amounts before calling <Link to='/docs/v2/smart-contracts/exchange#swap'>swap</Link>.
