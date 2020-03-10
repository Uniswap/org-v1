---
title: Flash Swaps
---

In swap, if `data.length > 0`, the exchange calls the to address with the following signature:

```clike
function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
```
