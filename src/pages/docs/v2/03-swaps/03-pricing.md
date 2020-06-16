---
title: Pricing
---

In Uniswap V1, trades are always executed at the "best possible" price, calcuated at execution time. Somewhat confusingly, this calculation is actually accomplished with one of two different formulas, depending on whether the trade specifies an exact _input_ or _output_ amount. Functionally, the difference between these two functions is fairly miniscule, but the very existence of a difference increases conceptual complexity. Initial attempts to support both functions in V2 proved inelegant, and the decision was made to **not provide any pricing functions in the core**. Instead, pairs directly check whether the invariant was satisfied (accounting for fees) after every trade. This means that rather than relying on a pricing fuction to _also_ enforce the invariant, V2 pairs simply and transparently ensure their own safety, a nice separation of concerns. One downstream benefit is that V2 pairs will more naturally support other flavors of trades which may emerge, (e.g. trading to a specific price at execution time).

A similar pattern exists for adding liquidity. V2 pairs **do not return tokens added at an incorrect price**. As an example, if the ratio of x:y in a pair is 10:2 (i.e. the price is 5), and someone naively adds liquidity at 5:2 (a price of 2.5), the contract will simply accept all tokens (changing the price to 3.75 and opening up the market to arbitrage), but only issue pool tokens entitling the sender to the amount of assets sent at the proper ratio, in this case 5:1. To avoid donating to arbitrageurs, it is imperative to add liquidity at the current price.

So, in Uniswap V2, trades and liquidity provisions must be priced in the periphery. The good news is that the library provides a variety of functions designed to make this quite simple, and the router does this by default.

# Pricing Trades

To price a trade, use <Link to='/docs/v2/smart-contracts/router02/#getamountsout'>getAmountsOut</Link> or <Link to='/docs/v2/smart-contracts/router02/#getamountsin'>getAmountsIn</Link>.
