---
title: Anatomy of a Swap
---

# Sending Tokens

Typically, smart contracts which need tokens to perform some functionality require would-be interactors to first make an approval on the token contract, then call a function that in turn calls transferFrom on the token contract. This is _not_ how V2 pairs accept tokens. Instead, pairs check their token balances at the _end_ of every interaction. Then, at the beginning of the _next_ interaction, current balances are differenced against the stored values to determine the amount of tokens that were sent by the current interactor. See the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> for a justification of why this is the case, but the takeaway is that **tokens must be transferred to the pair before calling any token-requiring method** (the one exception to this rule is <Link to='/docs/v2/flash-swaps'>Flash Swaps</Link>).

# Pricing

In Uniswap V1, trades are always executed at the "best possible" price, calcuated at execution time. Somewhat confusingly, this calculation is actually accomplished with one of two different formulas, depending on whether the trade specifies an exact _input_ or _output_ amount. Functionally, the difference between these two functions is fairly miniscule, but the very existence of a difference increases conceptual complexity. Initial attempts to support both functions in V2 proved inelegant, and the decision was made to **not provide any pricing functions in the core**. Instead, pairs directly check whether the invariant was satisfied (accounting for fees) after every trade. This means that rather than relying on a pricing fuction to _also_ enforce the invariant, V2 pairs simply and transparently ensure their own safety, a nice separation of concerns. One downstream benefit is that V2 pairs will more naturally support other flavors of trades which may emerge, (e.g. trading to a specific price at execution time).
