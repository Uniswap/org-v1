---
title: Route
---

```typescript
constructor(pairs: Pair[], input: Token)
```

# Example

```typescript
import { ChainId, Token, TokenAmount, Pair, Route } from '@uniswap/sdk'

const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')
const HOT_NOT = new Pair(new TokenAmount(HOT, '2000000000000000000'), new TokenAmount(NOT, '1000000000000000000'))

const route = new Route([HOT_NOT], NOT)
```

# Properties

## pairs

```typescript
pairs: Pair[]
```

## path

```typescript
path: Token[]
```

## input

```typescript
input: string
```

## output

```typescript
output: string
```

## midPrice

```typescript
midPrice: Price
```
