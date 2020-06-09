---
title: Determining prices
---

Let’s go through a simple numerical example using the ETH/DAI trading pair. Let’s assume market makers have collectively funded this pool with 100,000 DAI and 1,000 ETH. Uniswap takes these two quantities and multiplies them together (100,000 x 1,000 = 100,000,000).

Uniswap’s goal for this particular trading pair is to keep this product equal to 100 million no matter how much trading activity occurs (hence the name Constant Product Market Maker). The key formula to keep in mind is `x * y = k`, where x and y are the coin quantities in the liquidity pool, and k is the product. In order to keep k constant x and y can only move inverse each other. When a trader makes a purchase of ETH into this contract, they are increasing x (as they add DAI to the liquidity pool) and decreasing y (as they remove ETH from the liquidity pool). However, this does not scale linearly. Trying to buy 100 ETH instead of 10 ETH does not require merely 10x the DAI. In fact, it increases asymptotically. The easiest way to see this is by plotting out the curve `x * y = k`.

![](images/formula.png)

For larger horizontal movements (coins spent) there are diminishing returns to the vertical movement (coins received).

For larger horizontal movements (coins spent) there are diminishing returns to the vertical movement (coins received).

What’s absolutely essential to notice in this system is that the price quoted is directly dependent on the size of the order. The further one moves along the curve, the less bang they get for their buck.

Here’s a chart of the premiums one must pay for larger order sizes assuming a current ETH / DAI price of 100.

![](images/premium.png)

As you can see, purchasing a significant portion of ETH in the pool is an expensive idea if it’s more than ~2% of the liquidity pool. Keep in mind, though, that these premiums are based on the current size of the liquidity pool. If the pool were 100x larger (i.e., 10 million DAI and 100,000 ETH), it wouldn’t be nearly as expensive to buy a mere 50 ETH.

Ultimately, the price paid reflects how much the trade size shifts the x/ y ratio. When the liquidity pool is larger, it’s much easier to process larger orders (which is what you’d expect, of course).
