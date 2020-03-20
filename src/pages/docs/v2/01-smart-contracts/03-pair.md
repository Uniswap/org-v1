---
title: Pair
---

This documentation covers Uniswap-specific functionality. For ERC-20 functionality, see <Link to='/docs/v2/smart-contracts/pair-erc-20'>Pair (ERC-20)</Link>.

# Code

[`UniswapV2Pair.sol`](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)

# Address

See <Link to='/docs/v2/technical-considerations/pair-addresses'>Pair Addresses</Link>.

# Events

## Mint

```solidity
event Mint(address indexed sender, uint amount0, uint amount1);
```

Emitted each time liquidity tokens are created via [mint](#mint-1).

## Burn

```solidity
event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Emitted each time liquidity tokens are destroyed via [burn](#burn-1).

## Swap

```solidity
event Swap(
  address indexed sender,
  uint amount0In,
  uint amount1In,
  uint amount0Out,
  uint amount1Out,
  address indexed to
);
```

Emitted each time a swap occurs via [swap](#swap-1).

## Sync

```solidity
event Sync(uint112 reserve0, uint112 reserve1);
```

Emitted each time reserves are updated via [mint](#mint-1), [burn](#burn-1), [swap](#swap-1), or [sync](#sync-1).

# Read-Only Functions

## MINIMUM_LIQUIDITY

```solidity
function MINIMUM_LIQUIDITY() external pure returns (uint);
```

Returns `1000` for all pairs. See <Link to='/docs/v2/smart-contracts/architecture/#minimum-liquidity'>Minimum Liquidity</Link>.

## factory

```solidity
function factory() external view returns (address);
```

Returns the <Link to='/docs/v2/smart-contracts/factory/#address'>factory address</Link>.

## token0

```solidity
function token0() external view returns (address);
```

Returns the address of the pair token with the lower sort order.

## token1

```solidity
function token1() external view returns (address);
```

Returns the address of the pair token with the higher sort order.

## getReserves

```solidity
function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
```

Returns the reserves of token0 and token1 used to price trades and distribute liquidity. See <Link to='/docs/v2/smart-contracts/architecture/#pricing'>Pricing</Link>. Also returns the `block.timestamp` (mod `2**32`) of the last block during which an interaction occured for the pair.

## price0CumulativeLast

```solidity
function price0CumulativeLast() external view returns (uint);
```

See <Link to='/docs/v2/smart-contracts/architecture/#oracles'>Oracles</Link>.

## price1CumulativeLast

```solidity
function price1CumulativeLast() external view returns (uint);
```

See <Link to='/docs/v2/smart-contracts/architecture/#oracles'>Oracles</Link>.

## kLast

```solidity
function kLast() external view returns (uint);
```

Returns the product of the reserves as of the most recent liquidity event. See <Link to='/docs/v2/smart-contracts/architecture/#protocol-charge-calculation'>Protocol Charge Calculation</Link>.

# State-Changing Functions

## mint

```solidity
function mint(address to) external returns (uint liquidity);
```

Creates pool tokens.

- Emits [Mint](#mint), [Sync](#sync), <Link to='/docs/v2/smart-contracts/pair-erc-20#transfer'>Transfer</Link>.

## burn

```solidity
function burn(address to) external returns (uint amount0, uint amount1);
```

Destroys pool tokens.

- Emits [Burn](#burn), [Sync](#sync), <Link to='/docs/v2/smart-contracts/pair-erc-20#transfer'>Transfer</Link>.

## swap

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
```

Swaps tokens. For regular swaps, `data.length` must be `0`. Also see <Link to='/docs/v2/technical-considerations/flash-swaps'>Flash Swaps</Link>.

- Emits [Swap](#swap), [Sync](#sync).

## skim

```solidity
function skim(address to) external;
```

See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a>.

## sync

```solidity
function sync() external;
```

See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a>.

- Emits [Sync](#sync).

# Interface

```solidity
interface IUniswapV2Pair {
  event Mint(address indexed sender, uint amount0, uint amount1);
  event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
  event Swap(
    address indexed sender,
    uint amount0In,
    uint amount1In,
    uint amount0Out,
    uint amount1Out,
    address indexed to
  );
  event Sync(uint112 reserve0, uint112 reserve1);

  function MINIMUM_LIQUIDITY() external pure returns (uint);
  function factory() external view returns (address);
  function token0() external view returns (address);
  function token1() external view returns (address);
  function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
  function price0CumulativeLast() external view returns (uint);
  function price1CumulativeLast() external view returns (uint);
  function kLast() external view returns (uint);

  function mint(address to) external returns (uint liquidity);
  function burn(address to) external returns (uint amount0, uint amount1);
  function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
  function skim(address to) external;
  function sync() external;

  function initialize(address, address) external;
}
```

# ABI

```json
[
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" }
    ],
    "name": "Burn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }
    ],
    "name": "Mint",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" }
    ],
    "name": "Swap",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" },
      { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }
    ],
    "name": "Sync",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "MINIMUM_LIQUIDITY",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "burn",
    "outputs": [
      { "internalType": "uint256", "name": "amount0", "type": "uint256" },
      { "internalType": "uint256", "name": "amount1", "type": "uint256" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "factory",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      { "internalType": "uint112", "name": "reserve0", "type": "uint112" },
      { "internalType": "uint112", "name": "reserve1", "type": "uint112" },
      { "internalType": "uint32", "name": "blockTimestampLast", "type": "uint32" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "kLast",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "mint",
    "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "price0CumulativeLast",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "price1CumulativeLast",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "skim",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "uint256", "name": "amount0Out", "type": "uint256" },
      { "internalType": "uint256", "name": "amount1Out", "type": "uint256" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "swap",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "sync",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token0",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token1",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
```
