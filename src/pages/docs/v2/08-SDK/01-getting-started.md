---
title: Getting Started
tags:
  - sdk
  - documentation
---

# Code

[uniswap-sdk](https://github.com/Uniswap/uniswap-sdk)

# Install

`yarn add @uniswap/sdk`

# Overview

The Uniswap SDK simplifies the process of integrating Uniswap into your project. It's easy to use but also feature-rich, offering tiered levels of abstraction that make it suitable for anything from a hackathon project to a production application.

The SDK is written in TypeScript, has a robust test suite, performs arbitrary precision arithmetic, supports rounding to significant digits or fixed decimal places, and is intended for use in all environments in which the <Link to='/docs/v2/smart-contracts/factory#address'>factory</Link> is deployed.

The principal exports of the SDK are _entities_: classes that contain initialization and validation checks, necessary data fields, and helper functions. These entities are documented in the following pages.

Another important concept in the SDK is the use of _fractions_. Because Solidity performs integer math, care must be taken in non-EVM environments to faithfully replicate the actual computation carried out on-chain. The first concern here is to ensure that an overflow-safe integer implementation is used. Ideally, the SDK would be able to use native [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)s. However, until support becomes more widespread, [JSBI](https://github.com/GoogleChromeLabs/jsbi) objects are used instead, with the idea that once BigInts proliferate, this dependency can be compiled away. The second concern is precision loss due to, for example, chained price ratio calculations. To address this issue, all math operations are performed as fraction operations, ensuring arbitrary precision up until the point that values are rounded for display purposes, or truncated to fit inside a fixed bit length.
