---
title: 'Finding a Token'
tags: user-guides, documentation
---

## Finding a token address

Uniswap is permissionless protocol. Many pools can be created that may not appear by default on the frontend. To find a token to swap you'll need to find the address of the token either via the token's community or through [https://etherscan.io/](https://etherscan.io/).

A token address looks like `0x6b175474e89094c44da98b954eedeac495271d0f` (this is the address for DAI). Once you find the token you're looking for on etherscan, you can copy the address by finding the `Contract` section on the token information page and clicking the copy icon.

## Adding custom Tokens

Users have the ability to import any valid token into the interface. Users can do this by pasting the token address in the search box. If the token is a valid token the search area will populate with token information and users can import that token to swap. This token will be saved in browser local storage and persist across sessions.

![](images/select.gif)

## Removing custom tokens

Just search by token name, ticker or address in the token selector and click remove.

## Sharing links to a token

Looking to share a link to a token? Check out <Link to="docs/v2/web-app/generating-custom-links/">generating custom link</Link>.
