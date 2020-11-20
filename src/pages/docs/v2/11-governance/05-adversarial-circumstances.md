---
title: Adversarial Circumstances
tags: goveranance, documentation
---

This document explores some adversarial circumstances which Uniswap Governance may encounter in the future. Its goal is to help those interested in Uniswap Governance understand the reasoning behind some of its design, its limitations, and potential avenues for growth.

# Scenario 1

A good faith proposal is brought to vote which is found to have an exploitable edge case. A bad faith actor uses a series of DeFi leveraging strategies to quickly buy enough UNI during the voting period to sway the vote in favor of the proposal, then exploits the vulnerability after it is passed.

## Circumvention

UNI voting power must be delegated to an address either entirely before a proposal is submitted, or during the proposal delay period. The proposal delay is currently set to one block, which is about 15 seconds. This leaves no opportunity for a third party to find an exploitable edge case within a voting period and opportunistically purchase uni and self delegate for the purpose of swaying the vote.

In the future, Uniswap Governance may vote to increase the proposal delay. While there are obvious benefits to an increased proposal delay, voting members should understand that certain potential negative outcomes such as this are introduced.

# Scenario 2

A bad faith proposal is crafted and submitted to vote which is clearly not in the best interest of Uniswap Governance. Multiple parties collude ahead of time to corner the UNI market such that they can force the proposal through, gain access to the UNI reserves, and drain the funds.

## Circumvention

UNI is a freely tradable asset, so there is nothing preventing any parties from attempting a governance takeover via market buying. That said, if a clearly bad faith vote came up, to force-pass it would require a minimum of 40M UNI. If not outright impossible, this amount would be prohibitively expensive and likely cost more when accounting for price fluctuation than the net gain from the attack.

If a bad faith takeover were somehow achieved, the delay enforced by Timelock would give affected agents time to withdraw their assets from the protocol. This would also be an opportunity to fork the protocol, a path that would likely be taken by the remaining good faith actors.

# Scenario 3

A single party uses a flash loan to push through a proposal, potentially creating a pseudo DDOS attack by spamming governance with proposals and preventing effective use.

## Circumvention

A delegated balance of 10 million UNI is required to submit a vote, but the balance check is set exactly one block in the past. This prevents any flash loan proposals from being created, as flash loans cannot execute outside of a single block

Supporting this style of balance security, the proposer must also maintain a minimum balance of 10 million UNI throughout the voting period, or the proposal is able to be cancelled. This prevents many highly leveraged proposal techniques which may span several blocks.

# Scenario 4

A bad faith proposal is created which will genuinely incentivize bad faith voting. 

Exmaple: &quot;The treasury will be drained. Any votes in favor will be sent the balance of the treasury. Any votes opposed will be locked from the funds of the treasury.&quot;

## Circumvention

There is no mechanism that would explicitly disallow this type of scenario, but market forces disincentivize it. 

Because the treasury is comprised exclusively of UNI tokens, the market would react appropriately if a vote were to pass which would jeopardize the economic viability of Uniswap Governance and the UNI token. By the time the vote would pass, the price of UNI would have fallen so low as to make the attack fruitless. 

UNI acting as the exclusive asset of the governance treasury disincentivizes this form of bad faith voting. Uniswap Governance may choose in the future to diversify governance assets. While there are many benefits to this path, some fringe possibilities such as incentivized bad faith voting may appear.

