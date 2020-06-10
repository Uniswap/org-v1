---
title: Smart Contract Architecture
---

## Core/Helper Architecture

[Uniswap V2 Core](https://github.com/Uniswap/uniswap-v2-core) are the essential Uniswap V2 smart contracts, consisting of:

- [UniswapV2Pair.sol](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol), which implements core swapping and liquidity provision functionality
- [UniswapV2Factory.sol](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol), which deploys [UniswapV2Pair.sol](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) contracts for any ERC20 token/ERC20 token pair

**Core is minimalist in design, removing all logic that is not strictly necessary to secure liquidity stored in its pools.** Logic related to trader security or ease-of-use must be implemented in external helper contracts. Since external helpers can be improved and replaced without needing to migrate liquidity, **this improves on the flexibility and modularity of Uniswap.**

[Uniswap V2 Periphery](https://github.com/Uniswap/uniswap-v2-periphery) (periphery) is an initial set of helpers, including:

- [A router contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) that performs the safety checks needed for safely swapping, adding, and removing liquidity.
- [A migrator contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Migrator.sol) that can remove liquidity from Uniswap V1 and deposit it into Uniswap V2 in a single transaction.
- [A library contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol) that can be used in the creation of other helper contracts.
- [An example oracle contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleOracleSimple.sol) that creates a simple TWAP from Uniswap V2 cumulative prices.
- [An example flash swap contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleFlashSwap.sol) that withdraws ERC20 tokens, executes arbitrary code, and then pays for them.

_Periphery contracts described as "Example" are for illustrative purposes only and should not be used in actual transactions._

While this is a huge improvement, there are some new smart contract patterns introduced which developers building on top of Uniswap should be aware of.

- Core uses WETH instead of ETH. Routers can convert between ETH and WETH allowing users to use ETH directly
- Core stores ERC20 token balances internally instead of relying on the balances stored in the ERC20 token contract
- Core no longer calls **transferFrom** on **msg.sender**. Instead ERC20 tokens should be sent to core directly by a router before calling the **swap** , **mint** or **burn** functions.
- Core will determine the number of ERC20 tokens sent to it based on the difference between its current and stored balances.
- Core no longer returns the maximum number of ERC20 tokens for a given input amount. Instead, a router must specify the number of ERC20 tokens it wants. Core will send this number as long as the invariant is preserved after taking 0.3% off any input amount.
- Routers should handle logic around slippage safety checks and multihop trades.

For additional details please read the <Link to='/docs/v2/smart-contracts/architecture/'>architecture section</Link> of the in-progress Uniswap V2 docs or the core and periphery smart contracts themselves.
