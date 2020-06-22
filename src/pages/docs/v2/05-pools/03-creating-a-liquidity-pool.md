---
title: Creating a Liquidity Pool
tags: pools, documentation
---

Typically, it's not necessary to think about manual pool creation for a simple reason: the router ensures that if a user is trying to add liquidity to a pool that doesn't exist, the pool will be created before the liquidity is added. This happens in <Link to='/docs/v2/smart-contracts/router02/#addliquidity'>addLiquidity</Link> and <Link to='/docs/v2/smart-contracts/router02/#addliquidityeth'>addLiquidityETH</Link>.

In the rare case where you want to manually create a pool, there is a <Link to='/docs/v2/smart-contracts/factory/#createpair'>createPair</Link> function on the factory.
