---
title: Entities
---

Entities define the schema of the subgraph, and represent the data that can be queried. Within each entity are sets of fields that store useful information related to the entity. Below is a list of the available enitities within the Uniswap Subgraph, and descriptions for the available fields.

To see an interactive sandbox of all entities see the [Graph Explorer](https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2).

Each entity is defined with a value type, which will always be a base AssemblyScript type, or a custom type provided by The Graph's custom TypeScript library. For more information on value types see [here](https://thegraph.com/docs/assemblyscript-api#api-reference).

### Uniswap Factory

The Uniswap Factory entity is responsible for storing aggregate information across all Uniswap pairs. It can be used to view stats about total liquidity, volume, amount of pairs and more. There is only one UniswapFactory entity in the subgraph.

| Field Name        | Value Type     | Description                                                                                  |
| ----------------- | -------------- | -------------------------------------------------------------------------------------------- |
| id                | ID             | factory address                                                                              |
| pairCount         | Int            | amount of pairs created by the Uniswap factory                                               |
| pairs             | [Pair]         | array of all pairs in Uniswap (stored as IDs)                                                |
| totalVolumeUSD    | BigDecimal     | all time USD volume across all pairs (USD is derived)                                        |
| totalVolumeETH    | BigDecimal     | all time volume in ETH across all pairs (ETH is derived)                                     |
| totalLiquidityUSD | BigDecimal     | total liquidity across all pairs stored as a derived USD amount                              |
| totalLiquidityETH | BigDecimal     | total liquidity across all pairs stored as a derived ETH amount                              |
| txCount           | BigInt         | all time amount of transactions across all pairs                                             |
| mostLiquidTokens  | [TokenDayData] | array of tokens across Uniswap with most liquidity - used as a reference for historical data |

### Token

Stores aggregated information for a specific token across all pairs that token is included in.

| Field Name      | Value Type    | Description                                                                                      |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| id              | ID            | token address                                                                                    |
| symbol          | String        | token symbol                                                                                     |
| name            | String        | token name                                                                                       |
| decimals        | BigInt        | token decimals                                                                                   |
| tradeVolume     | BigDecimal    | amount of token traded all time across all pairs                                                 |
| tradeVolumeUSD  | BigDecimal    | amount of token in USD traded all time acrosss pairs                                             |
| txCount         | BigInt        | amouunt of transactions all time in pairs including token                                        |
| totalLiquidity  | BigDecimal    | total amount of token provided as liquidity across all pairs                                     |
| derivedETH      | BigDecimal    | ETH per token                                                                                    |
| allPairs        | [Pair]        | array of all pairs token is included in (stored as IDs)                                          |
| mostLiquidPairs | [PairDayData] | array of pairs token is included in with most liquidty - used as a reference for historical data |

### Pair

Information about a pair. Includes references to each token within the pair, volume information, liquidity information, and more. The pair entity mirrors the pair smart contract, and also contains aggregated information about use.

| Field Name           | Value Type                            | Description                                                      |
| -------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| id                   | ID                                    | pair contract address                                            |
| factory              | UniswapFactory                        | reference to Uniswap factory entity                              |
| token0               | Token                                 | reference to token0 as stored in pair contract                   |
| token1               | Token                                 | reference to token1 as stored in pair contract                   |
| reserve0             | BigDecima                             | reserve of token0                                                |
| reserve1             | BigDecimal                            | reserve of token1                                                |
| totalSupply          | BigDecimal                            | total supply of liquidity token distributed to LPs               |
| reserveETH           | BigDecimal                            | total liquidty in pair stored as an amount of ETH                |
| reserveUSD           | BigDecimal                            | total liquidty amount in pair stored as an amount of USD         |
| trackedReserveETH    | BigDecimal                            | total liquidity with only tracked amount (see tracked amounts)   |
| token0Price          | BigDecimal                            | token0 per token1                                                |
| token1Price          | BigDecimal                            | token1 per token0                                                |
| volumeToken0         | BigDecimal                            | amount of token0 swapped on this pair                            |
| volumeToken1         | BigDecimal                            | amount of token1 swapped on this pair                            |
| volumeUSD            | BigDecimal                            | total amount swapped all time in this pair stored in USD         |
| txCount              | BigInt                                | all time amount of transactions on this pair                     |
| createdAtTimestamp   | BigInt                                | timestamp contract was created                                   |
| createdAtBlockNumber | BigInt                                | Ethereum block contract was created                              |
| liquidityPositions   | [LiquidityPosition]                   | array of liquidity providers, used as a reference to LP entities |
| mints                | [Mint]                                | array of all Mint events on this pair                            |
| burns [Burn]         | array of all Burn events on this pair |
| swaps                | [Swap]                                | array of all Swap events on this pair                            |
