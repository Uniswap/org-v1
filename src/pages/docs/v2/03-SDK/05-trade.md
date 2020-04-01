---
title: Trade
---

```typescript
constructor(route: Route, amount: TokenAmount, tradeType: TradeType)
```

The Trade entity represents a fully specified trade along a route. This entity supplies all the information necessary to craft a router transaction.

# Example

```typescript
import { ChainId, Token, TokenAmount, Pair, TradeType, Route } from '@uniswap/sdk'

const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')
const HOT_NOT = new Pair(new TokenAmount(HOT, '2000000000000000000'), new TokenAmount(NOT, '1000000000000000000'))
const NOT_TO_HOT = new Route([HOT_NOT], NOT)

const trade = new Trade(NOT_TO_HOT, new TokenAmount(NOT, '1000000000000000'), TradeType.EXACT_INPUT)
```

# Properties

## route

```typescript
route: Route
```

The <Link to='/docs/v2/SDK/route#path'>path</Link> property of the route should be passed as the path parameter to router functions.

## tradeType

```typescript
tradeType: TradeType
```

`TradeType.EXACT_INPUT` corresponds to `swapExact*For*` router functions. `TradeType.EXACT_OUTPUT` corresponds to `swap*ForExact*` router functions.

## inputAmount

```typescript
inputAmount: TokenAmount
```

For exact input trades, this value should be passed as amountIn to router functions. For exact output trades, this value should be multiplied by a factor >1, representing slippage tolerance, and passed as amountInMax to router functions.

## outputAmount

```typescript
outputAmount: TokenAmount
```

For exact output trades, this value should be passed as amountOut to router functions. For exact input trades, this value should be multiplied by a factor <1, representing slippage tolerance, and passed as amountOutMin to router functions.

## executionPrice

```typescript
executionPrice: Price
```

The average price that the trade would execute at.

## nextMidPrice

```typescript
nextMidPrice: Price
```

What the new mid price would be if the trade were to execute.

## slippage

```typescript
slippage: Percent
```

The slippapge incurred by the trade.

- Strictly > .30%.
