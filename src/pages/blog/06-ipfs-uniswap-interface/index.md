---
title: 'Uniswap Interface + IPFS'
date: '2020-06-15'
author: 'Moody Salem, Hayden Adams'
previewText: 'The Uniswap Interface is now hosted and served exclusively from IPFS'
---

## TL;DR

- In an effort to continue decentralizing, we have created a mechanism for the community to host the Uniswap Interface.
- Once per day, the open-source [Uniswap Interface](https://github.com/Uniswap/uniswap-frontend) built by our team and community is [automatically deployed](https://github.com/Uniswap/uniswap-frontend/releases) to IPFS if any new commits have been made.
- Community members can pin the IPFS hashes to ensure availability.
-  DNSLink and IPNS are used to point /ipns/app.uniswap.org to the latest [IPFS release](https://github.com/Uniswap/uniswap-frontend/releases).
- app.uniswap.org is now hosted and served exclusively from the latest [IPFS release](https://github.com/Uniswap/uniswap-frontend/releases), however any IPFS gateway can be used directly
- the URL [uniswap.exchange](https://uniswap.exchange) will temporarily forward to app.uniswap.org while the URL is phased out.
- The ENS contenthash for uniswap.eth now points to the latest IPFS release allowing the URL [uniswap.eth.link](https://uniswap.eth.link/) to be used.

## Interfaces and decentralization

The Uniswap protocol is trustless and decentralized because it lives entirely on-chain. Anyone running an Ethereum node can interact with the contracts directly, which will perform as programmed for as long as Ethereum exists.

However, not everyone wants to run a node. Instead, many users choose to interact with Uniswap through web interfaces, trade aggregators, wallets, or other DAPPs that have integrated the Uniswap protocol natively in their smart contracts. 

When using an interface, if users do not verify every transaction they sign, they are taking the risk the interface they are using does not do what it claims. For this reason, it is important to use reputable interfaces. We're thrilled to see a growing ecosystem of high-quality interfaces for Uniswap, including Argent, 1inch, Rainbow, Paraswap, Zerion, Instadapp, and many more. 

Open source interfaces (including many of the above) allow users to verify the code with which they interact to ensure the interface does what it claims to do. If a user runs the code locally, the user can make transactions with confidence. However, as soon as the code is hosted on a public website, **users will have difficulty verifying that the website they are interacting with is actually hosting the code that they verified**. 

This is one of the problems that IPFS aims to solve.

## What we did
Our team has always cared about decentralization, security, and accessibility. This is why we built an [open-source interface](https://github.com/Uniswap/uniswap-frontend) for Uniswap that the community can directly run, verify and build upon. We’ve just taken another step forward by decentralizing the hosting and serving of the Uniswap Interface using IPFS.

Using [Github Actions](https://github.com/features/actions), the [Uniswap Interface](https://github.com/Uniswap/uniswap-frontend) is now deployed at least once per day to IPFS if any new commits have been made. Each release is automatically [pinned](https://docs.ipfs.io/concepts/persistence/) using [pinata.cloud](https://pinata.cloud), a free IPFS pinning service. The IPFS releases can be found [on GitHub](https://github.com/Uniswap/uniswap-frontend/releases).


This means the Uniswap Interface can now be accessed via IPFS directly, through a gateway such as [cloudflare-ipfs.com](https://cloudflare-ipfs.com/ipns/app.uniswap.org/), or by an _alias_ to the Cloudflare gateway at [app.uniswap.org](https://app.uniswap.org).


The domain uniswap.exchange is now redirected to app.uniswap.org, which is an alias to the Cloudflare IPFS gateway that serves the Uniswap Interface from IPFS.


## How we did it
The app.uniswap.org subdomain is given a CNAME record pointing at cloudflare-ipfs.com. 

When a user visits app.uniswap.org, Cloudflare’s IPFS gateway looks up the [DNSLink record](https://docs.ipfs.io/concepts/dnslink/) for the domain, and finds an TXT record under _dnslink.app.uniswap.org. That TXT record contains the IPFS hash of the latest release. 

Cloudflare’s IPFS gateway then fetches the content using the IPFS protocol and serves
the Uniswap Interface to your browser.

## Some changes

Because IPFS gateways will not default to serving `/index.html` as is expected by many single page applications, the Uniswap Interface uses a "hash" based router.

This means that links that contain paths, such as [app.uniswap.org/swap](https://app.uniswap.org) will no longer work, but [app.uniswap.org/#/pool](https://app.uniswap.org/#/swap) will work.

## Disclaimer
Some settings on the Uniswap Interface use localstorage, which is shared across users in some IPFS gateways.

When using an IPFS gateway and referencing an IPFS hash or IPNS name by the path (e.g. https://ipfs.io/ipfs/QmaREHiNYVn7uhfT8KepgGuufPHDQG29wpKTX7sHvc6Wys/#/swap) rather than the subdomain (e.g. [cloudflare-ipfs.com/ipns/app.uniswap.org/](https://cloudflare-ipfs.com/ipns/app.uniswap.org/)), it is possible others may change your settings in the Uniswap interface.

To avoid this possibility, you can use the subdomain format of IPFS gateway URLs, which are contained in [every release](https://github.com/Uniswap/uniswap-frontend/releases) along with the path format.

IPFS and IPNS gateways that use a subdomain format, such as:

https://cloudflare-ipfs.com/ipns/app.uniswap.org/ and
https://bafybeiftpceokfk7ufl7vin43m6gg5rgqcdbykavvf2aahtvvqyryee3by.ipfs.dweb.link/

are not susceptible to this. 

## Verifying a build

You can check what build you are being served from Cloudflare's IPFS gateway by looking at your browser's network console for the response headers sent directly from Cloudflare's IPFS gateway.

Cloudflare's gateway uses the IPFS hash of the deployment in the `etag` header, and reports the resolved IPNS path in the `x-ipfs-path` header.

![](./verifying-build.png) 

## How you can help

To keep the Uniswap Interface accessible, you can pin the hashes of each [daily release](https://github.com/Uniswap/uniswap-frontend/releases/latest)!

If this sort of work sounds cool to you, we're hiring! [Shoot us a message!](mailto:contact@uniswap.org)
