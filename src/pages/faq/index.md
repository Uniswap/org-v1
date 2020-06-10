---
title: FAQ
---

# What is Uniswap?

Uniswap is a protocol for exchanging ERC-20 tokens on Ethereum. It eliminates trusted intermediaries and unnecessary forms of rent extraction, allowing for fast, efficient trading. Where it makes tradeoffs decentralization, censorship resistance, and security are prioritized. Uniswap is open-source software licensed under GPL.

Want to read more about the core concepts?
<InlineBoxLink title="Uniswap Documentation" to="/docs/v2" />

# How does Uniswap work?

Uniswap is an automated liquidity protocol otherwise known as an AMM. In practical terms this means there are template smart contracts that define a standard way to make liquidity pools and corresponding markets that are all compatible with eachother. There is no orderbook, no centralized party and no central facilitator of trade. Each pool is defined by a smart contract that includes a few functions to enable swapping tokens, adding liquidity and more. At its core each pool uses the function `x*y=k` to maintain a curve along which trades can happen. See how prices are determined.

# How are prices determined?

Prices are determined by the amount of each token in a pool. The smart contract maintains a constant using the following function: `x*y=k`. In this case `x = token0`, `y = token1`, `k = constant`. For each trade a certain amount of tokens are removed from the pool in exchange for an amount of the other token. During the execution of To maintain `k`, the balances update. So each trade will adjust the balances held by the smart contract therefor changing the price.

# Where is the orderbook?

These is none! Uniswap is kind of like a solid state exchange where the smart contract sets the current price by maintaing a constant. Sometimes we call this a continuous orderbook where you can buy and sell anywhere along the price curve as long as there is liquidity available.

# How do I find X token?

If you can't find a token in the default list, just find the token address using etherscan and paste that address into the search field. Once you've pasted the address, it will be added to your local storage.

You can also add a custom token list from a source you trust. These lists should be used at your own discretion.

# How do I add my token to Uniswap?

There isn't really a concept of adding a token to uniswap. Uniswap is compatible with any ERC-20 token in the ethereum ecosystem. If you want your users to have your ticker searchable in their interface you should seek to be added to a reputable token list or share a link to your token using query parameters. Once your users click the link, the token will be added to their interface.

# Why is my transaction still pending?

Ethereum requires gas to execute each transaction. Sometime wallets don't send the right amount of gas to complete the transaction. We recommend checking the gas and attempting to re-submit the transaction with a higher gas. You can also check ETH gas station for the current prices required to complete transactions.

# Why does my transaction cost X?

Ethereum requires gas to execute each transaction. You can also check ETH gas station for the current prices required to complete transactions. Creating a Uniswap pool is a slightly costlier transaction because you are executing a more complex smart contract. Read more about how gas works in ethereum.
