---
title: Pair
---

```typescript
constructor(tokenAmountA: TokenAmount, tokenAmountB: TokenAmount)
```

# Example

```typescript
import { ChainId, Token, TokenAmount, Pair } from '@uniswap/sdk'

const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')

const pair = new Pair(new TokenAmount(HOT, '2000000000000000000'), new TokenAmount(NO, '1000000000000000000'))
```

# Static Methods

Coming soon...

# Properties

Coming soon...

# Methods

Coming soon...
