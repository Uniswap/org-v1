---
title: Common Errors
tags: smart-contracts, documentation
---

This document covers a few error codes freqeuently encountered while building on Uniswap V2.

# Uniswap V2: K

This is an error that is frequently encountered, and requires a bit of context to understand it.

The Uniswap constant product formula is “X * Y = K”. Where X and Y represent the respective reserve balances of two ERC-20 tokens, and “K” represents the product of the reserves. It is this “K” to which the “K” error refers.

In essence, the “K” error means that a trade was attempted that somehow left the trading pair with less reserves than should be there, and as a result the transaction is reverted. 

This can have a few different causes. 

## Fee On Transfer Tokens 

The most common examples are caused by “fee on transfer” tokens. 

### Inclusive Fee On Transfer Tokens

In most cases, a fee on transfer token burns or diverts a small portion of every transfer such that the recipient of the transfer ends up with slightly less than the sender gave. This is called an “inclusive” fee on transfer.

In the case of inclusive fee on transfer tokens, you can use the corresponding swap functions in the router contract which end with [“SupportingFeeOnTransfer”](https://uniswap.org/docs/v2/smart-contracts/router02/#swapexacttokensfortokenssupportingfeeontransfertokens). These functions succeed by adjusting the “amountOutMin” parameter to check the recipient amount rather than the sending amount when calculating the invariant.

### Exclusive Fee On Transfer Tokens

The other type, “exclusive” fee on transfer tokens, work by sending an additional transfer from the sending address after the primary transfer. Because the router contract cannot anticipate this trailing transfer when calculating the invariant, the transaction will either revert, or partially succeed by sending the primary transfer but breaking the pool upon the trailing transfer. 

In the case of exclusive fee on transfer tokens, the SupportingFeeOnTransfer functions may work, but there will be some tokens designed in such a way that they fundamentally break the router. If you are still getting a “K” error when using these functions, you may need to make a fork of the router contract that accommodates your token design. 

## Rebasing Tokens

The less common instance of the “K” error is as a result of rebasing tokens.

Rebasing tokens can alter the balance of any addresses holding their tokens arbitrarily. This usually works at pre specified intervals and as a result of a handful of variables used in the economics of a rebasing token. 

Rebasing tokens typically work in two ways.

### Negative Rebasing Tokens

A negative rebasing token, the more common variant, deflates the balances of token owners. Because the rebasing is not triggered by transfers, the router cannot expect when or how a rebasing will happen. Once it does, the pair reserves will be unbalanced, and the next person to transact with the pair will bear the cost of the delta as a result of the rebasing. 

Needless to say, an unenviable position.

Negative rebasing tokens have solved this error by altering their token contract to call [sync](https://uniswap.org/docs/v2/smart-contracts/pair/#sync) on the trading pair at the end of every transaction involving the Uniswap router contract. Those interested in forking the router contract should anticipate that negative rebasing tokens will break the pair until the token contracts are updated to accommodate your new router. 

### Positive Rebasing Tokens 

Positive rebasing tokens arbitrarily increase the balances of token holders. When a positive rebase happens, it creates a surplus that is unaccounted for in the trading pair. Because the extra tokens are unaccounted for in the trading pair, anyone can call skim() on the trading pair and effectively steal the positive difference from the rebalance. 

While positive rebalancing does not break any functionality of Uniswap, those interested in them should be aware that the positive balance found in any pair will be freely available for taking.

### A Note on Rebasing Tokens

For those interested in building a rebasing token, a word of caution: many contracts involving decentralized trading and liquidity provisioning will break upon interacting with your token. An example approach that will lead to much easier integration in future protocols can be found in [CHAI](https://chai.money/about.html). uses a wrapper function that contains the rebalancing within the wrapper, such that the redeemable token can be easily integrated into many different systems.