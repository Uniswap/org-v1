---
title: Library
---

# Code

[`UniswapV2Library.sol`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Library.sol)

# Read-Only Functions

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

## pairFor

```solidity
function pairFor(address tokenA, address tokenB) internal pure returns (address pair);
```

Calculates the address for a pair without making any external calls (see <Link to='/docs/v2/technical-considerations/pair-addresses'>Pair Addresses</Link>).

## getReserves

```solidity
function getReserves(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB);
```

Calls <Link to='/docs/v2/smart-contracts/pair#getreserves'>getReserves</Link> on the pair for the passed tokens, and returns the results sorted in the order that the parameters were passed in.

## quote

```solidity
function quote(uint amountA, uint reserveA, uint reserveB) public pure returns (uint amountB);
```

Given some asset amount and reserves, returns an amount of the other asset representing equivalent value.

- Useful for calculating optimal token amounts before calling <Link to='/docs/v2/smart-contracts/pair#mint-1'>mint</Link>.

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

- Useful for calculating optimal token amounts before calling <Link to='/docs/v2/smart-contracts/pair#swap-1'>swap</Link>.

## getAmountsIn

```solidity
function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts);
```

Given an _output_ asset amount and an array of token addresses, calculates all preceding minimum _input_ token amounts by calling [getReserves](#getreserves) for each pair of token addresses in the path in turn, and using these to call [getAmountIn](#getamountin).

- Useful for calculating optimal token amounts before calling <Link to='/docs/v2/smart-contracts/pair#swap-1'>swap</Link>.

# Interface

```solidity
interface IUniswapV2Library {
  function factory() external pure returns (address);

  function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
  function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
  function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
  function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
  function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}
```

# ABI

```json
[
  {
    "constant": true,
    "inputs": [],
    "name": "factory",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "uint256", "name": "amountOut", "type": "uint256" },
      { "internalType": "uint256", "name": "reserveIn", "type": "uint256" },
      { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }
    ],
    "name": "getAmountIn",
    "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
      { "internalType": "uint256", "name": "reserveIn", "type": "uint256" },
      { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }
    ],
    "name": "getAmountOut",
    "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "uint256", "name": "amountOut", "type": "uint256" },
      { "internalType": "address[]", "name": "path", "type": "address[]" }
    ],
    "name": "getAmountsIn",
    "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
      { "internalType": "address[]", "name": "path", "type": "address[]" }
    ],
    "name": "getAmountsOut",
    "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "uint256", "name": "amountA", "type": "uint256" },
      { "internalType": "uint256", "name": "reserveA", "type": "uint256" },
      { "internalType": "uint256", "name": "reserveB", "type": "uint256" }
    ],
    "name": "quote",
    "outputs": [{ "internalType": "uint256", "name": "amountB", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }
]
```
