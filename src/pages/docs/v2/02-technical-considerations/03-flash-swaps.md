---
title: Flash Swaps
---

In Uniswap V2 swaps are executed "optimistically", meaning that if desired, tokens can be requested and sent to an address _before_ payment for said tokens is collected, as long as payment occurs by the end of the atomic transaction. See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> for more details.

# Example

[`ExampleFlashSwap.sol`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/ExampleFlashSwap.sol)

# Discussion

"Flash swaps" must be repayed from within a _callback_ function that's triggered by the pair executing the swap. Recall the interface of the <Link to='/docs/v2/smart-contracts/pair#swap'>swap</Link> function:

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
```

In a typical swap, payment of token0 for token1 or vice versa must be completed _before_ the swap function is called (see <Link to='/docs/v2/smart-contracts/architecture/#sending-tokens'>Sending Tokens</Link>), and `data.length` must be `0`. In a flash swap, prepayment need not occur if `data.length` is > `0`, indicating that the pair should call the following function on the to address:

```solidity
function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
```

This function is responsible for returning enough tokens to the pair to satisfy the invariant (accounting for fees).
