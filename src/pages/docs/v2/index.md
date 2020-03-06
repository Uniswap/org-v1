---
title: Overview
---

# Overview

You've arrived, welcome! The pages that follow contain comprehensive documentation of the Uniswap V2 ecosystem. If you don't already know, Uniswap is a protocol for exchanging [ERC-20](https://eips.ethereum.org/EIPS/eip-20) tokens on [Ethereum](https://ethereum.org/). It eliminates trusted intermediaries and unnecessary forms of rent extraction while not compromising on _decentralization_, _censorship resistance_, or _security_. Uniswap is open-source software licensed under [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License).

If you're wondering: what happened to Uniswap V1? The first version of the protocol, [launched in November 2018](https://twitter.com/haydenzadams/status/1058376395108376577) at Devcon 4, is still around. In fact, because of its permissionless nature, it wil exist for as long as Ethereum is! However, V2 includes a number of tangible improvements over V1, and we hope that you'll begin to see how you could use Uniswap V2 as you explore these docs.

# V2 Features

- Decentralized, manipulation-resistant price oracles
- ERC-20⇄ERC-20 pools
- Flash Swaps
- Broad support for standard and non-conformant ERC20 tokens

<!-- # Description

Each exchange holds reserves of both ETH and its associated ERC20 token. Anyone can become a liquidity provider on an exchange and contribute to its reserves. This is different than buying or selling; it requires depositing an equivalent value of both ETH and the relevant ERC20 token. Liquidity is pooled across all providers and an internal "pool token" \(ERC20\) is used to track each providers relative contribution. Pool tokens are minted when liquidity is deposited into the system and can be burned at any time to withdraw a proportional share of the reserves.

Exchange contracts are automated market makers between an ETH-ERC20 pair. Traders can swap between the two in either direction by adding to the liquidity reserve of one and withdrawing from the reserve of the other. Since ETH is a common pair for all ERC20 exchanges, it can be used as an intermediary allowing direct ERC20-ERC20 trades in a single transaction. Users can specify a recipient address if they want to receive purchased tokens at a different address from the one used to make a transaction.

Uniswap uses a "constant product" market making formula which sets the exchange rate based off of the relative size of the ETH and ERC20 reserves, and the amount with which an incoming trade shifts this ratio. Selling ETH for ERC20 tokens increases the size of the ETH reserve and decreases the size of the ERC20 reserve. This shifts the reserve ratio, increasing the ERC20 token's price relative to ETH for subsequent transactions. The larger a trade relative to the total size of the reserves, the more price slippage will occur. Essentially, exchange contracts use the open financial market to decide on the relative value of a pair and uses that as a market making strategy.

A small liquidity provider fee \(0.3%\) is taken out of each trade and added to the reserves. While the ETH-ERC20 reserve ratio is constantly shifting, fees makes sure that the total combined reserve size increases with every trade. This functions as a payout to liquidity providers that is collected when they burn their pool tokens to withdraw their portion of total reserves. Guaranteed arbitrage opportunities from price fluctuations should push a steady flow of transactions through the system and increase the amount of fee revenue generated.

Since Uniswap is entirely on-chain, prices can change between when a transaction is signed and when it is included in a block. Traders can bound price fluctuations by specifying the minimum amount bought on sell orders, or the maximum amount sold on buy orders. This acts as a limit order that will automatically cancel if it is not filled. It is also possible to set transaction deadlines which will cancel orders if they are not executed fast enough.

The reason only one exchange per token can be registered to the factory is to encourage providers to pool their liquidity into a single reserve. However, Uniswap has built in support for ERC20-to-ERC20 trades using the public pools from the factory on one side of the transaction and custom, user-specified pool on the other. Custom pools could have fund managers, use alternate pricing mechanisms, remove liquidity provider fees, integrate complex three dimensional fomo-based ponzi-schemes and more. They just need to implement the Uniswap interface and accept ETH as an intermediary asset. Custom pools do not have the same safety properties as the public ones. It is recommended users only interact with audited, open-source smart contracts.

Upgrading censorship resistant, decentralized smart contracts is difficult. If significant improvements are made to the system a new version will be released. Liquidity providers can choose between moving to the new system or staying in the old one. If possible, new versions will be backwards compatible and able to trade ERC20-to-ERC20 with the old versions similar to a custom pool. -->

# Resources

- [Protocol Website](https://uniswap.io)
- [GitHub](https://github.com/Uniswap)
- [Twitter](https://twitter.com/UniswapExchange)
- [Reddit](https://reddit.com/r/Uniswap)
- [Email](mailto:contact@uniswap.io)
