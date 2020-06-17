---
title: 'Custom Links'
---

Uniswap supports linking to specific tokens and functions on the frontend using query parameters.

You can make custom links using query parameters by defining the input and output tokens and defining some values. For instance this iframe preselects `100 BAT` as the input and `DAI` as the output token based on the following <a href="https://uniswap.exchange/swap?inputCurrency=0x0d8775f648430679a709e98d2b0cb6250d2887ef&outputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F&exactAmount=100&exactField=inPUT">link</a>:

```
https://uniswap.exchange/swap?inputCurrency=0x0d8775f648430679a709e98d2b0cb6250d2887ef&outputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F&exactAmount=100&exactField=inPUT
```

<iframe width="375" height="550" src="https://uniswap.exchange/swap?inputCurrency=0x0d8775f648430679a709e98d2b0cb6250d2887ef&outputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F&exactAmount=100&exactField=inPUT" />

Query parameters are supported on Swap and Pool pages for certain use cases.

## Linking to a swap

Use the base url `https://uniswap.exchange/swap` followed by query parameters.

For example:

Select ETH as input and DAI as output.

```
https://uniswap.exchange/swap?inputCurrency=ETH&outputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F
```

Select ETH as input and 20.5 DAI as output.

```
https://uniswap.exchange/swap?inputCurrency=ETH&outputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&exactAmount=20.5&exactField=outPUT
```

You must follow the correct formatting. Use `?` to begin a query parameter after the base url. Then concatenate parameters with an `&`.

### Query parameters

#### `inputCurrency`

Accepts `<token address>` or `ETH`.

Examples:

- `inputCurrency=ETH`
- `inputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F`

In use:

- `https://uniswap.exchange/swap?inputCurrency=ETH`

#### `outputCurrency`

Accepts `<token address>` or `ETH`.

Examples:

- `https://uniswap.exchange/swap?outputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F`

#### `exactAmount`

Accepts an integer value. The value passed will apply to the input field unless an `exactField` is defined.

Example:

- `https://uniswap.exchange/swap?inputCurrency=ETH&exactAmount=20.5`

#### `exactField`

Either `outPUT` or `inPUT`

Example:

- `exactField=outPUT`

In Use:

- ```
  https://uniswap.exchange/swap?inputCurrency=ETH&outputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F&exactAmount=20.5exactField=outPUT
  ```

## Linking to a send

The send tab accepts only inputCurrency.

Example:
`https://uniswap.exchange/send?inputCurrency=0x6B175474E89094C44Da98b954EedeAC495271d0F`

## Linking to Add for Remove liquidity

Linking to a pair is fairly straight forward. Include the two token addresses seperated by a hyphen.

Examples:

_Add `DAI` and `ETH`_

- ```
  https://uniswap.exchange/add/0x6B175474E89094C44Da98b954EedeAC495271d0F-0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
  ```

_Remove `DAI` and `ETH`_

- ```
  https://uniswap.exchange/remove/0x6B175474E89094C44Da98b954EedeAC495271d0F-0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
  ```

<iframe width="375" height="550" src="https://uniswap.exchange/remove/0x6B175474E89094C44Da98b954EedeAC495271d0F-0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" />
