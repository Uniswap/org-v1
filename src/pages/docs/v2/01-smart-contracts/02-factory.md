---
title: Factory
---

import { Link } from "gatsby"

# Code

[`UniswapV2Factory.sol`](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol)

# Address

The `UniswapV2Factory` contract is deployed at `...` on the Ethereum mainnet, and the Ropsten, Rinkeby, Görli, and Kovan testnets.

# Read-Only Functions

## getExchange

```solidity
function getExchange(address tokenA, address tokenB) external view returns (address exchange);
```

Returns the address of the exchange for `tokenA` and `tokenB`, if it has been created, else `address(0)` (`0x0000000000000000000000000000000000000000`).

- `tokenA` and `tokenB` are interchangeable.
- Exchange addresses can also be calculated deterministically, see <Link to='/docs/v2/technical-considerations/exchange-addresses'>Exchange Addresses</Link>.

## allExchanges

```solidity
function allExchanges(uint) external view returns (address exchange);
```

Returns the address of the `n`th exchange (`0`-indexed) created through the factory, or `address(0)` (`0x0000000000000000000000000000000000000000`) if not enough exchanges have been created yet.

- Pass `0` for the address of the first exchange created, `1` for the second, etc.

## allExchangesLength

```solidity
function allExchangesLength() external view returns (uint);
```

Returns the total number of exchanges created through the factory so far.

# State-Changing Functions

## createExchange

```solidity
function createExchange(address tokenA, address tokenB) external returns (address exchange);
```

Creates an exchange for `tokenA` and `tokenB` if one doesn't exist already.

- `tokenA` and `tokenB` are interchangeable.
- Emits [ExchangeCreated](#exchangecreated).

# Events

## ExchangeCreated

```solidity
event ExchangeCreated(address indexed token0, address indexed token1, address exchange, uint);
```

Emitted each time an exchange is created via [createExchange](#createexchange).

- `token0` is guaranteed to be strictly less than `token1` by sort order.
- The final `uint` log value will be `1` for the first exchange created, `2` for the second, etc. (see [allExchanges](#allexchanges)/[getExchange](#getexchange)).

# ABI

```json
[
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "token0", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "token1", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "exchange", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "ExchangeCreated",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "allExchanges",
    "outputs": [{ "internalType": "address", "name": "exchange", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "allExchangesLength",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "tokenA", "type": "address" },
      { "internalType": "address", "name": "tokenB", "type": "address" }
    ],
    "name": "createExchange",
    "outputs": [{ "internalType": "address", "name": "exchange", "type": "address" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "address", "name": "tokenA", "type": "address" },
      { "internalType": "address", "name": "tokenB", "type": "address" }
    ],
    "name": "getExchange",
    "outputs": [{ "internalType": "address", "name": "exchange", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
```
