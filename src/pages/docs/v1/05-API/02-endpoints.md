---
title: Endpoints
---

All Uniswap pairs consist of ETH (treated as the base currency) paired with an ERC20 token (treated as the quote currency).

## `/v1/summary`

Returns data for the top ~100 Uniswap pairs, sorted by ETH liquidity. Results are cached for 15 minutes.

### Request

`GET https://api.uniswap.info/v1/summary`

### Response

```javascript
{
  "ETH_0x...": {                    // the asset ids of ETH and ERC20 tokens, joined by an underscore
    "last_price": "1.234",          // denominated in tokens/ETH
    "base_volume": "123.456",       // denominated in ETH
    "quote_volume": "1234.56"       // denominated in tokens
  },
  ...
}
```

## `/v1/assets`

Returns the top ~100 assets supported by Uniswap, which consist of ETH and ERC20 tokens. The assets are sorted by ETH liquidity in their ETH pair. Results are cached for 24 hours.

### Request

`GET https://api.uniswap.info/v1/assets`

### Response

```javascript
{
  ...,
  "0x...": {              // "ETH" or the address of the ERC20 token
    "name": "...",        // not necesssarily included for ERC20 tokens
    "symbol": "...",      // not necesssarily included for ERC20 tokens
    "id": "0x...",        // asset id, "ETH" or the address of the Uniswap exchange for the ERC20 token
    "maker_fee": "0",     // always 0
    "taker_fee": "0.003", // always 0.003 i.e. .3%
  },
  ...
}
```

## `/v1/tickers`

Returns data for the top ~100 Uniswap pairs, sorted by ETH liquidity. Results are cached for 15 minutes.

### Request

`GET https://api.uniswap.info/v1/tickers`

### Response

```javascript
{
  "ETH_0x...": {                    // the asset ids of ETH and ERC20 tokens, joined by an underscore
    "base_name": "Ether",           // always "Ether"
    "base_symbol": "ETH",           // always "ETH"
    "base_id": "ETH",               // always "ETH"
    "quote_name": "...",            // not necesssarily included
    "quote_symbol": "...",          // not necesssarily included
    "quote_id": "0x...",            // the asset id of the ERC20 token
    "quote_token_address": "0x...", // the address of the ERC20 token
    "last_price": "1.234",          // denominated in tokens/ETH
    "base_volume": "123.456",       // denominated in ETH
    "quote_volume": "1234.56"       // denominated in tokens
  },
  ...
}
```

## `/v1/orderbook/:pair`

Returns simulated orderbook data for the given Uniswap pair. Since Uniswap has a continuous orderbook, fixed amounts in an interval are chosen for bids and asks, and prices are derived from the Uniswap formula. Results are cached for 15 minutes.

### Request

`GET https://api.uniswap.info/v1/orderbook/:pair`

### URL Parameters

- `pair`: The asset ids of ETH and an ERC20 token, joined by an underscore, e.g. `ETH_0x...`

### Response

```javascript
{
  "timestamp": 1234567, // UNIX timestamp
  "bids": [
    ["12", "1.2"],      // denominated in ETH, tokens/ETH
    ["12", "1.1"],      // denominated in ETH, tokens/ETH
    ...
  ],
  "asks": [
    ["12", "1.3"],      // denominated in ETH, tokens/ETH
    ["12", "1.4"],      // denominated in ETH, tokens/ETH
    ...
  ]
}
```

## `/v1/trades/:pair`

Returns all trades in the last 24 hours for the given Uniswap pair. Results are cached for 15 minutes.

### URL Parameters

- `pair`: The asset ids of ETH and an ERC20 token, joined by an underscore, e.g. `ETH_0x...`

### Request

`GET https://api.uniswap.info/v1/trades/:pair`

### Response

```javascript
[
  {
    "trade_id": "...",
    "price": "1.234",           // denominated in tokens/ETH
    "base_volume": "123.456",   // denominated in ETH
    "quote_volume": "1234.56",  // denominated in tokens
    "trade_timestamp": 1234567, // UNIX timestamp
    "type": "buy"               // "buy" or "sell"
  },
  ...
]
```
