---
title: Exchange Addresses
---

import { Link } from "gatsby"

# getExchange

The most obvious way to get the exchange address for a pair is to call <Link to='/docs/v2/smart-contracts/factory/#getexchange'>getExchange</Link> on the factory. If the exchange exists, this function will return its address, else `address(0)` (`0x0000000000000000000000000000000000000000`).

- The simplest way to determine whether or not an exchange exists on-chain or not.
- Requires an on-chain lookup.

# CREATE2

Thanks to some [fancy footwork in the factory](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol#L32), we can also compute exchange addresses _without any on-chain lookups_ thanks to [CREATE2](https://eips.ethereum.org/EIPS/eip-1014). The following values are required for this technique:

|                        |                                                                                 |
| :--------------------- | :------------------------------------------------------------------------------ |
| `address`              | The <Link to='/docs/v2/smart-contracts/factory/#address'>factory address</Link> |
| `salt`                 | `keccak256(abi.encodePacked(token0, token1))`                                   |
| `keccak256(init_code)` | `0x8548287401d15401e1162bb5bc290f6fba82afcb66944df43c3017817522771b`            |

- `token0` must be strictly less than `token1` by sort order.

* Can be computed offline.
* Requires the ability to perform `keccak256`.

## Examples

### Solidity

```solidity
address factory = 0xF231A51299c872040C002f3E1918D806F951Efcb;
address token0 = 0xCAFE000000000000000000000000000000000000; // change me!
address token1 = 0xc0FFee0000000000000000000000000000000000; // change me!

address exchange = address(uint(keccak256(abi.encodePacked(
  hex'ff',
  factory,
  keccak256(abi.encodePacked(token0, token1)),
  hex'8548287401d15401e1162bb5bc290f6fba82afcb66944df43c3017817522771b'
))));
```

### Typescript

```typescript
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

const factory = '0xF231A51299c872040C002f3E1918D806F951Efcb'
const token0 = '0xCAFE000000000000000000000000000000000000' // change me!
const token1 = '0xc0FFee0000000000000000000000000000000000' // change me!

const exchange = getCreate2Address(
  factory,
  keccak256(['bytes'], [pack(['address', 'address'], [token0, token1])]),
  '0x8548287401d15401e1162bb5bc290f6fba82afcb66944df43c3017817522771b'
)
```
