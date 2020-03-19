---
title: Token
---

```typescript
constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string)
```

# Example

```typescript
import { ChainId, Token } from '@uniswap/sdk'

const token = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
```

# Static Methods

## fetchData

```typescript
async fetchData(
  chainId: ChainId,
  address: string,
  provider = getDefaultProvider(getNetwork(chainId)),
  symbol?: string,
  name?: string
): Promise<Token>
```

Initializes a class instance from a chainId and token address. Decimals are fetched via an [ethers.js](https://github.com/ethers-io/ethers.js/) v5 provider.

# Properties

## chainId

```typescript
chainId: ChainId
```

## address

```typescript
address: string
```

## decimals

```typescript
decimals: number
```

## symbol

```typescript
symbol?: string
```

## name

```typescript
name?: string
```

# Methods

## equals

```typescript
equals(other: Token): boolean
```

Checks if the current instance is equal to another.

## sortsBefore

```typescript
sortsBefore(other: Token): boolean
```

Checks if the current instance sorts before another.
