---
title: Overview
subtitle: Learn about the core functionality of the uniswap protocol. Token Swaps.
---

<Info>Looking for help using the interface? <Link to="/docs/v2/web-app/trading/">Check out the web app guides</Link></Info>

Token swaps are a simple way to exchange one ERC-20 token for another.

For end-users, swapping is intuitive: a user picks an input token and an output token. They specify an input amount, and the protocol calculates how much of the output token they'll receive. They then execute the swap with one click, receiving the output token in their wallet immediately.

Beneath the surface, token swaps are fulfilled by a system of smart contracts that are constantly being interacted with by a marketplace of participants. Interactions between liquidity providers, traders, and arbitrageurs create the incentives and feedback loops necessary to keep markets liquid and prices accurate to broader market rates.

Swaps in Uniswap are different from trades on traditional exchanges. Uniswap does not use an order book to represent liquidity or determine prices. Uniswap uses an automated market maker mechanism to provide instant feedback on exchange rates and slippage.

Each token exchange pair on Uniswap is implemented by an underlying Liquidity Pool. A Liquidity Pool is a smart contract that holds two unique tokens and enforces rules around depositing and withdrawing them. In Uniswap, the rules specify that tokens can only be deposited and withdraw in accordance to a specific formula, `x * y = k`. `x` and `y` represent the quantities of the two tokens and `k` is their constant product.

The consequence of using this formula to govern the balance of each token in the pool is that when a token is deposited, a proportional amount must be withdrawn to maintain the constant. Contrariwise, if a token is withdrawn, a proportional amount must instead be also deposited. A third way to deposit tokens and maintain the constant is to deposit equal values of both tokens. Doing this is called Providing Liquidity. You can read more about it in [Pools]().

Zooming out, we see that this behavior in practice implements token exchange.

This formula, known as an automated market maker, enables Uniswap to implement token exchange without needing an order book. This has a few important and novel consequences. An automated market maker obviates the need for active and explicit counterparties. Participants deposit tokens to the liquidity pool passively and asynchronously, at their convenience, and exchange is enabled autonomously by the Uniswap smart contract code running on Ethereum. 

This means Uniswap's architecture is radically simplified and can run completely and natively on chain, giving it important properties equal to the underlying blockchain. Just like Ethereum, Uniswap is always online and doesn't require any centrally operated intermediary infrastructure. Because there is no order book, no external service is needed to match orders. Matching happens automatically by the contracts following the AMM formula.

In sum, Uniswap is a token swap marketplace designed from first principles to run natively on a blockchain network.

To learn more about how swaps work, you can follow the lifecycle of a specific swap in [Anatomy of a Swap]().

Swaps can also be executed programatically by interacting directly with Uniswap's smart contracts.

## Understanding tokens swap

<div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-start', marginBottom: '2rem'}}>
<InlineCard title="Anatomy of a Swap" tag="guide" description="The lifecycle of an exchange between two tokens and illustrates the mechanisms and agents in play" to="/docs/v2/token-swaps/anatomy-of-a-swap/" />
<InlineCard title="Trading via Smart contract" tag="tutorial" description="guides developers looking to integrate swaps into their projects." to="/docs/v2/flash-swaps/no-capital-arbitrage" />
<InlineCard title="How prices are determined" tag="guide" description="how the constant product formula affects prices and how the mechanism behaves under different market conditions." to="/docs/v2/flash-swaps" />

</div>

## Developer resources

<InlineBoxLink title="Contributing to the web app" to="/docs/v2/web-app/developing-locally/" />
<InlineBoxLink title="Flash Swaps" to="/docs/v2/flash swaps" />
