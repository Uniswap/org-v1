---
title: 'Uniswap Interface + IPFS'
date: '2020-06-17'
featuredImage: ./featured.jpg
author: 'Moody Salem, Hayden Adams'
previewText: 'The Uniswap Interface is now hosted and served exclusively from IPFS!'
---

## TL;DR

- [app.uniswap.org](https://app.uniswap.org) is now hosted and served exclusively from IPFS!
- Once per day, the open-source [Uniswap Interface](https://github.com/Uniswap/uniswap-frontend) 
built by our team and community is [automatically deployed](https://github.com/Uniswap/uniswap-frontend/releases) 
to IPFS
- The URL [uniswap.exchange](https://uniswap.exchange) now simply forwards to [app.uniswap.org](https://app.uniswap.org)
- IPNS + DNSLink are used to point `/ipns/app.uniswap.org` to the latest IPFS release
- The ENS `contenthash` for `uniswap.eth` now points to the latest IPFS 
release, enabling access to the Uniswap Interface via [uniswap.eth.link](https://uniswap.eth.link/)

## Interfaces and decentralization

The Uniswap protocol is trustless and decentralized because it lives entirely on-chain. 
Anyone running an Ethereum node can interact with the contracts directly which will perform as programmed for as long as Ethereum exists.

However, not everyone wants to run a node. Instead, many users choose to interact with Uniswap through web interfaces, 
trade aggregators, wallets, or other DAPPs that have integrated Uniswap natively in their smart contracts. 

When using an interface, if users do not verify every transaction they sign, they are taking the risk the interface 
they are using does not do what it claims. This is why it is important to use reputable interfaces. We're thrilled to 
see a growing ecosystem of high-quality interfaces for Uniswap, including Argent, 1inch, Rainbow, Paraswap, Zerion, 
Instadapp, and many more. 

Open source interfaces (including many of the above) allow users to verify the code they are interacting with does what
it claims. If a user runs the code locally, they can make transactions with confidence. However, as soon as the code 
is hosted on a public website **it is difficult for users to verify the website they are interacting with is actually 
hosting the code that they verified**.

This is one of the problem that IPFS [aims to solve](https://blog.cloudflare.com/e2e-integrity/).

## What we did

Our team has always cared about decentralization, security, and accessibility. This is why we built an
[open-source interface](https://github.com/Uniswap/uniswap-frontend) for Uniswap that the community can build on, 
verify, and run directly. We’ve just taken another step forward by decentralizing the hosting and serving of
the Uniswap Interface using IPFS.

Using [Github Actions](https://github.com/features/actions), the [Uniswap Interface](https://github.com/Uniswap/uniswap-frontend)
is now deployed at least once per day to IPFS if any new commits have been made. Each release is automatically 
[pinned](https://docs.ipfs.io/concepts/persistence/) using [pinata.cloud](https://pinata.cloud), a free IPFS pinning service. 
The IPFS releases can be found [on GitHub](https://github.com/Uniswap/uniswap-frontend/releases).

This means the Uniswap Interface can now be accessed via IPFS directly, through a gateway such as 
[cloudflare-ipfs.com](https://cloudflare-ipfs.com/ipns/app.uniswap.org/), or by an _alias_ to the Cloudflare gateway
at [app.uniswap.org](https://app.uniswap.org).

The domain [uniswap.exchange](https://uniswap.exchange) is now redirected to [app.uniswap.org](https://app.uniswap.org), 
which is an alias to the Cloudflare IPFS gateway that serves the Uniswap Interface from IPFS.

## How we did it
The `app.uniswap.org` subdomain is given a CNAME record pointing at the domain `cloudflare-ipfs.com`. 

When a user visits the domain `app.uniswap.org`, the browser looks up the DNS record and finds a CNAME to `cloudflare-ipfs.com`.
Cloudflare’s IPFS gateway looks up the [DNSLink record](https://docs.ipfs.io/concepts/dnslink/) for the subdomain `_dnslink.app.uniswap.org`.
That TXT record contains the IPFS hash of the latest release, which we update using a
[custom GitHub action](https://github.com/Uniswap/replace-vercel-dns-records).

Cloudflare’s IPFS gateway then fetches the content using the IPFS protocol and serves the interface to your browser via HTTPS.

## Some changes

Because IPFS gateways will not default to serving `/index.html` as is expected by many single page applications, 
the Uniswap Interface to uses a "hash" based router.

This means that links that contain paths, such as [app.uniswap.org/swap](https://app.uniswap.org/swap) will no longer work,
but [app.uniswap.org/#/pool](https://app.uniswap.org/#/swap) will.

## Disclaimer

Some settings on the Uniswap Interface use `localstorage`, which is scoped to the IPFS gateway domain.

When using an IPFS gateway, and referencing an IPFS hash or IPNS name by the path 
(e.g. [ipfs.io/ipns/app.uniswap.org/#/swap](https://ipfs.io/ipns/app.uniswap.org/#/swap)) 
rather than the subdomain 
(e.g. [bafybeiftpceokfk7ufl7vin43m6gg5rgqcdbykavvf2aahtvvqyryee3by.cf-ipfs.com](https://bafybeiftpceokfk7ufl7vin43m6gg5rgqcdbykavvf2aahtvvqyryee3by.cf-ipfs.com/)), 
it is possible others may change your Uniswap Interface settings.

To avoid this you should always use the subdomain format of IPFS gateway URLs, which are contained 
in [every release](https://github.com/Uniswap/uniswap-frontend/releases) along with the path formatted URLs.

## Verifying a build

You can check what build you are being served from Cloudflare's IPFS gateway by looking at your browser's network 
console for the response headers sent directly from Cloudflare's IPFS gateway.

Cloudflare's gateway uses the IPFS hash of the deployment in the `etag` header, and reports the resolved IPNS path in 
the `x-ipfs-path` header.

![](./verifying-build.png) 

## How you can help

To keep Uniswap accessible, you can pin the hashes of each [daily release](https://github.com/Uniswap/uniswap-frontend/releases/latest).

Does this work sound interesting? We're hiring! [Shoot us a message!](mailto:contact@uniswap.org)
