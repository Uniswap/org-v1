---
title: Pair Addresses
---

# getPair

The most obvious way to get the address for a pair is to call <Link to='/docs/v2/smart-contracts/factory/#getpair'>getPair</Link> on the factory. If the pair exists, this function will return its address, else `address(0)` (`0x0000000000000000000000000000000000000000`).

- The "canonical" way to determine whether or not a pair exists.
- Requires an on-chain lookup.

# CREATE2

Thanks to some [fancy footwork in the factory](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol#L32), we can also compute pair addresses _without any on-chain lookups_ because of [CREATE2](https://eips.ethereum.org/EIPS/eip-1014). The following values are required for this technique:

|                        |                                                                                 |
| :--------------------- | :------------------------------------------------------------------------------ |
| `address`              | The <Link to='/docs/v2/smart-contracts/factory/#address'>factory address</Link> |
| `salt`                 | `keccak256(abi.encodePacked(token0, token1))`                                   |
| `keccak256(init_code)` | `0x0b77fb54a078d9399fa29cac94f5b35b9f11611b456ab507c7f46754712b642b`            |

- `token0` must be strictly less than `token1` by sort order.

* Can be computed offline.
* Requires the ability to perform `keccak256`.

## Examples

### Solidity

```solidity
address factory = 0xe2f197885abe8ec7c866cFf76605FD06d4576218;
address token0 = 0xCAFE000000000000000000000000000000000000; // change me!
address token1 = 0xF00D000000000000000000000000000000000000; // change me!

address pair = address(uint(keccak256(abi.encodePacked(
  hex'ff',
  factory,
  keccak256(abi.encodePacked(token0, token1)),
  hex'0b77fb54a078d9399fa29cac94f5b35b9f11611b456ab507c7f46754712b642b'
))));
```

### Typescript

This example makes use of the <Link to='docs/v2/SDK/getting-started'>Uniswap SDK</Link>. In reality, the SDK computes pair addresses behind the scenes, obviating the need to compute them manually like this.

```typescript
import { FACTORY_ADDRESS, INIT_CODE_HASH } from '@uniswap/sdk'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

const token0 = '0xCAFE000000000000000000000000000000000000' // change me!
const token1 = '0xF00D000000000000000000000000000000000000' // change me!

const pair = getCreate2Address(
  FACTORY_ADDRESS,
  keccak256(['bytes'], [pack(['address', 'address'], [token0, token1])]),
  INIT_CODE_HASH'
)
```
