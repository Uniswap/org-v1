---
title: Trade
---

```typescript
constructor(route: Route, amount: TokenAmount, tradeType: TradeType)
```

The Trade entity represents a fully specified trade along a route.

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

## tradeType

```typescript
tradeType: TradeType
```

## inputAmount

```typescript
inputAmount: TokenAmount
```

## outputAmount

```typescript
outputAmount: TokenAmount
```

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

## midPricePercentChange

```typescript
midPricePercentChange: Percent
```

The percent change in the current mid price and mid price if the trade were to execute.

- Strictly > 0%.
