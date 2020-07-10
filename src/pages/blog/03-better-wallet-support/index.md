---
title: 'Better Wallet Support'
date: '2019-12-05'
author: 'Callil Capuozzo'
featuredImage: ./featured.jpg
previewText: 'The Uniswap interface now supports a wide range of connection types including Wallet Connect!'
---

![](https://cdn-images-1.medium.com/max/5400/1*7wgRREUzm8paSw9ZrR4uYw.png)

We’re improving wallet support on [app.uniswap.org](https://app.uniswap.org/swap). To start we’ve added support for:

- [WalletConnect](https://walletconnect.org/)

- [WalletLink](https://www.walletlink.org/#/) (Coinbase Wallet)

- [Portis](https://www.portis.io/)

- [Fortmatic](https://fortmatic.com/)

- Mobile deep linking for [Trust Wallet](https://trustwallet.com/)

You can also now dynamically switch between wallets through the account modal, which is opened by clicking on your account at the top-right hand of the screen.

# WalletConnect

![](https://cdn-images-1.medium.com/max/2342/1*7Jkmgn-WeF8qdzJDd4sGsg.png)

WalletConnect allows mobile wallets to connect to your desktop browser through a QR code and sign transactions. It even works on browsers such as Safari!

Adding WalletConnect support allows wallets such as [Rainbow Wallet](https://rainbow.me/), [Gnosis Safe](https://safe.gnosis.io/) and [Argent Wallet](https://www.argent.xyz/) (coming soon) to connect to Uniswap for the first time. MetaMask mobile and Trust Wallet can also be used with wallet connect.

![Scan a QR code to connect your mobile wallet to app.uniswap.org](https://cdn-images-1.medium.com/max/1920/1*8A9MDGkWmQnPi8g0LtVndA.gif)

# WalletLink

WalletLink functions similar to WalletConnect, using a QR code to connect your mobile Coinbase Wallet to any browser. It only needs to be linked once to work across all dApps that support it.

# Portis

Portis allows users to sign into their wallet with a username / password combination in a pop-up window. They support 2FA and provide a fiat on-ramp through Wyre.

# Fortmatic

Fortmatic allows users to sign into their wallet through traditional methods like email and phone in a pop-up window. They support 2FA and allow custom styling for sites that integrate.

# web3-react@6

This is all built on the new v6.0 release of the [web3-react library](https://github.com/NoahZinsmeister/web3-react) built by our very own [Noah Zinsmeister](https://twitter.com/NoahZinsmeister). This release features many improvements including improved connector logic and a monorepo with dynamic imports to get your bundle sizes down. This enables us to provide great UX for seamlessly switching between wallet providers.

---

Do you use another wallet that’s not supported yet? [Let us know.](http://contact@uniswap.org)

Happy Holidays from the Uniswap team!

❤
