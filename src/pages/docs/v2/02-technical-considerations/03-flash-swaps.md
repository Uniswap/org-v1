---
title: Flash Swaps
---

import { Link } from "gatsby"

In Uniswap V2 swaps are executed "optimistically", meaning that tokens can be requested and sent to an address before payment for these tokens is collected, as long as payment occurs by the end of the atomic transaction. See the <Link to='/whitepaper.pdf'>whitepaper</Link> for more details.

Repayment of flash swaps must occur from within a _callback_ function triggered by the exchange in question. Recall the interface of the <Link to='/docs/v2/smart-contracts/exchange#swap'>swap</Link> function:

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
```

In a typical swap, payment of token0 for token1 or vice versa must be completed _before_ the swap function is called (see <Link to='/docs/v2/smart-contracts/architecture/#sending-tokens'>Sending Tokens</Link>), and `data.length === 0` must be true. In a flash swap, prepayment need not occur, but `data.length > 0` must be true, indicating to the exchange that it should call the following function on the to address:

```solidity
function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
```

This function is responsible for returning enough tokens to the exchange to satisfy the invariant, accounting for fees.
