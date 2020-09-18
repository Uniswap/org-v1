---
title: 'A short history of Uniswap'
date: '2019-11-02'
author: 'Hayden Adams'
featuredImage: ./featured.jpg
previewText: 'Uniswap changed my life and today is its birthday. To celebrate this, I want to tell its story from the beginning.'
---

# V0 — Uniswap is Born

On November 2, 2018, Uniswap was publicly announced and deployed to the Ethereum mainnet. In an exciting, anxiety-inducing moment I fired off the announcement tweets to my ~200 followers.

https://twitter.com/haydenzadams/status/1058376395108376577?ref_src=twsrc%5Etfw

For many people, this was the first they heard of the project. For me it was the culmination of over a years worth of work — and a huge amount of help along the way.

Uniswap changed my life and today is its birthday. To celebrate this, I want to tell its story from the beginning in V0 of the Uniswap Birthday Blog series.

Stay tuned for V1 and V2 where I discuss Uniswap’s first year on Ethereum mainet and our plans for its future.

---

# Accepting Ethereum

On July 6th, 2017 I was laid off from my first job out of college, working as a Mechanical Engineer at Siemens. Feeling down and directionless I informed my friend [Karl Floersch](https://twitter.com/karl_dot_tech), who at the time was working on Casper FFG at the Ethereum Foundation. The conversation went something like this:

> **Hayden**: I just got laid off :(

> **Karl**: Congratulations, this is the best thing that could have happened to you!!! Mechanical Engineering is a dying field. Ethereum is the future and you’re still early. Your new destiny is to write smart contracts!

> **Hayden**: Don’t I need to like know how to code?

> **Karl**: Not really, coding is easy. Nobody understands how to write smart contracts yet anyway. Ethereum, proof-of-stake, trustless computation, etc.

> **Hayden**: Okay…

Catching me at a low point, Karl convinced me to accept Ethereum into my life. I was determined to give it a shot, and spent the next two months learning the basics of Ethereum, Solidity, and JavaScript.

In order to expand my skillset, I decided it was time to work on a “real” project. At Karl’s suggestion I decided to implement an automated market maker, as described by Vitalik in [this reddit post](https://www.reddit.com/r/ethereum/comments/55m04x/lets_run_onchain_decentralized_exchanges_the_way/) and [this blogpost](https://vitalik.ca/general/2017/06/22/marketmakers.html).

# Proof-of-Something

From October to November I built a proof-of-concept, including a smart contract and my very first website. The contract had a single liquidity provider and allowed simple swaps. [Here it is](https://haydenadams.github.io/uniswap-retro/) in all its glory:

![[https://haydenadams.github.io/uniswap-retro/](https://haydenadams.github.io/uniswap-retro/)](https://cdn-images-1.medium.com/max/6672/1*JgLez7l8v6rh5BObvMSzKw.png)

> Disclosure — The demo remains unchanged from its original version, except for a single line of code `window.ethereum.enable()` that I added to make it work with 2019 MetaMask.

Building the POC was my first step down the rabbit-hole of programmable money. It was the most intriguing thing I had worked on in my life. It didn’t even feel like work.

I also began to see the UX implications of automated market makers. At the time, EtherDelta was the only decentralized exchange with traction, but the UX felt messy and unintuitive. Using my demo somehow felt better.

![EtherDelta.com — October, 2017](https://cdn-images-1.medium.com/max/2730/1*RZHrueofS4UrqohzdL5Obg.png)

# Devcon 3

In a talk at Devcon 3, Karl used my Uniswap demo as an example of the power of crypto-economics and open-source financial applications on Ethereum.

https://www.youtube.com/watch?v=-alrVUv6E24&feature=emb_title

I had been unemployed for five months, living off cryptocurrency I was fortunate enough to have bought earlier in the year. Uniswap was a success by my only metric at the time — I knew how to write smart contracts. Maybe it was time to move on and get a job (if there were any jobs for Solidity-native developers).

However an attendee of Karl’s Devcon talk — [Pascal Van Hecke ](https://twitter.com/PascalVanHecke)— reached out to me. He had been closely following the progress of automated market makers on Ethereum and expressed interest in supporting my efforts. He even gave a grant to fund my next month of research. We began weekly calls to discuss progress.

Pascal brought new ideas to the table. More importantly, however, our calls brought a sense of structure and accountability to my work. Uniswap had two major unsolved problems which I set out to tackle with an engineering mindset:

- It only worked for a single ETH/ERC20 pair

- It only worked for a single liquidity provider

# Ethereum Values

By this point I was fully captivated by Ethereum’s unbounded potential. These were the properties I cared about:

### It was **censorship resistant**. No one could stop it.

### It was decentralized. No one controlled it.

### It was permissionless. Anyone could use it.

### It was secure. Anyone could verify execution.

Yet something felt off in the ether. The major projects on Ethereum embodied some of its properties, but few embraced them fully. Central points of failure, censorable applications, and overly complex architecture. DAPPs were designed entirely around the idea of having a token for use cases that clearly did not need one.

I began thinking about Uniswap not just as a learning tool for myself — but one for others. I could not imagine a world where it competed with “real” projects. You know — the ones that raised between $20,000,000 and $150,000,000 in Summer 2017. But maybe it could serve as an example of an application that truly embodied Ethereum.

# NYC Mesh

In December, I had attended an [NYC Mesh](https://www.nycmesh.net/) meetup with Karl, following [an anti-crypto article](https://www.nycmesh.net/blog/meshcoin/) from its founder. Now Ethereum famous — Karl was recognized by a Coindesk reporter who asked him about the intersection between meshnets and crypto. Karl did not want to give an interview so he directed the reporter to me. I blathered on about Layer 2 solutions I barely understood, and was quoted in [an article](https://www.coindesk.com/plan-b-ethereum-innovators-reviving-fight-net-neutrality).

> [**Plan B? Ethereum Innovators Are Reviving the Fight for Net Neutrality - CoinDesk**](https://www.coindesk.com/plan-b-ethereum-innovators-reviving-fight-net-neutrality)
>
> <small>A tech meetup at a dimly lit New York City bar - so far, nothing out of the ordinary. But what's peculiar about this particular meetup is that other locations throughout the East Village are being connected to the bar's Wi-Fi-enabled node, allowing anyone in the area to not only piggyback off all the signals but visit websites only accessible to others on the network.</small>

[Callil Capuozzo](https://twitter.com/_callil), a friend from from elementary school through high school who I had not seen in ~6 years, saw the article and reached out. Since then he had worked as a designer at Microsoft, Google, and more recently had delved into Ethereum while working on a website for [FOAM](https://www.foam.space/).

# Uniswap Pre-alpha

By late January 2018, all major smart contract issues had been solved. Exchange contracts could support multiple liquidity providers by using an internal liquidity token to track each LP’s share of generated fees and the underlying collateral. A factory contract allowed anyone to add support for a token. All tokens were paired with ETH allowing it to be used as an intermediary for anything-to-anything swaps in a single transaction.

I reconnected with Callil just after finishing the updated Uniswap smart contracts, and we discussed the project at length. He offered to help out with the frontend — which was now lagging behind the contracts. Working around his other projects, Callil designed and built a sleek new interface for Uniswap on top of my incredibly shitty React codebase.

Several weeks in it was pretty clear my react code was untenably bad. Fortunately, I had recently reconnected with a friend from college, [Uciel Vilchis](https://www.linkedin.com/in/uciel-vilchis/). Uciel was just coming out of a coding bootcamp (that he entered on the advice of our mutual Karl Floersch).

### You should learn to code — Karl Floersch

Looking to build up his resume and experience, Uciel agreed to refactor the Uniswap frontend codebase.

By March, 2018, the three of us had built a fully featured demo of Uniswap. Yes, of course I dug it up and hosted it. [Here it is](https://haydenadams.github.io/uniswap-prealpha/):

![[https://haydenadams.github.io/uniswap-prealpha/](https://haydenadams.github.io/uniswap-prealpha/)](https://cdn-images-1.medium.com/max/5184/1*Dv5Kovp7-Xlu-puNO6eLuQ.png)

> Disclosure — The demo remains unchanged from its original version, except for a single line of code `*window.ethereum.enable()*` that I added to make it work with 2019 MetaMask.

# Meeting Vitalik

By April 2018 I had been unemployed for 10 months. The crypto I was living off of was down over 75%, dramatically decreasing my personal runway. Despite this, I yolo-bought a last minute flight to Seoul, South Korea. This was the first time I left North America in my 24 years of life. Partially a personal trip, it was timed to coincide with [Deconomy 2018](https://deconomy.com/deconomy-2018-recap/).

I attempted to enter the conference without a ticket, but was firmly rejected. However, Karl was just arriving along with other members of the Ethereum foundation. Karl pulled me to the side, and introduced me to Vitalik, who he had already discussed Uniswap with in the past. Our conversation went something like this:

> **Karl**: This is my friend Hayden, he made Uniswap!

> **Vitalik**: Hi nice to meet you! Is it open source?

> **Me**: Of course!

> **Vitalik**: Whats the URL?

> **Me**: https://github.com/haydenadams/uniswap

> **Vitalik**: _reads my entire smart contract on his phone_

> **Vitalik**: Have you considered writing it in Vyper? Also, you should apply for an Ethereum foundation grant.

Vitalik’s ideas had yet to fail me. Immediately after returning from Seoul, I spent two weeks re-writing the contracts in Vyper. There were no guides or developer tools like Solidity had, but I was able to use [the original Casper FFG](https://github.com/ethereum/casper/blob/master/casper/contracts/simple_casper.v.py) contract as a reference. At the time, this was the only Vyper contract I could find outside of simple examples in the core Vyper repo.

# Making Some Friends

Up to this point Karl was my only close friend in the crypto world, but that was soon going to change. Just before leaving Karl invited me to a small social gathering. There I met and became friends with [Philip Daian](https://twitter.com/phildaian), [Dan Robinson](https://twitter.com/danrobinson), and [Andy Milenius](https://twitter.com/RealZandy). In addition to being wonderful people, all would become crucial to the success of Uniswap and influence its future direction.

Two weeks later, in May, I flew to Toronto for Edcon 2018. This was the first Ethereum conference where I made it past security. I spent 3 days attending talks, meeting people, and demoing Uniswap. My four friends in crypto were all there and introduced me to a ton of other people. My crypto social-network was expanding.

_Among the friends I made at Edcon, [Jinglan Wang](https://twitter.com/jinglanW) deserves a shoutout as she has been a fantastic advisor ever since._

I met David Knott, a former Vyper dev, in person for the first time. I told him that I had re-written Uniswap in Vyper. The next morning at 8am I woke up to a phone call from him. He told me he was scheduled to give a talk on Vyper including a live demo in two hours. Uniswap was the only DAPP being written in Vyper, and he asked if I was interested in giving the talk instead.

I explained that I had only just learned Vyper two weeks prior, I had never spoken in public, and that I generally had no idea what I was doing. David assured me it was fine — two weeks building on Vyper was more than enough to speak publicly and authoritatively on it. So I gave [my first talk](https://youtu.be/61PWFQpR1YQ?list=PLjB3u3uCYxnxXUXEYIp9V8aSxMyuyVdFg&t=3729):

https://youtu.be/61PWFQpR1YQ?list=PLjB3u3uCYxnxXUXEYIp9V8aSxMyuyVdFg&t=3729

I took the same flight back to NY as Dan. We spent the entire time gas-optimizing Uniswap. By the time the plane landed, Uniswap was 30% more efficient. It was now the most gas efficient exchange on Ethereum by a significant margin.

Edcon 2018 was extremely encouraging. The reactions to my Uniswap demo were more than just mild interest. People were legitimately excited by it. They seemed to understand and share the values I intended for it to be an example of. I realized Ethereum’s community went far beyond ICOs. There were people who truly cared about its vision of a permissionless, decentralized financial system.

# NYC Blockchain Week 2018

My plane home from Edcon landed me directly in NYC Blockchain Week. I spent the next week attending an endless spew of events and parties. A tweet made its way onto my feed.

https://twitter.com/ricburton/status/994545185538310144?ref_src=twsrc%5Etfw

Living a 15 minute walk away, I decided to check it out.

[Richard Burton](https://twitter.com/ricburton) was the founder of Balance, an Ethereum wallet startup. I showed him my demo, and he immediately wanted to understand how it worked. A long conversation ensued.

Up to this point, I considered my role in Uniswap to be mostly a technical one. When someone asked how it worked, I often started by telling them the mathematical formula behind it. Many people walked away confused.

Richard helped me understand that people not understanding Uniswap it was a me-problem, not a them-problem. Developers were just a small part of a bigger picture. If I wanted people to use my project, I needed to talk about it on their terms, in ways they understood. Uniswap’s biggest outstanding challenge was a social one.

# Things Become Kind of Real

It was around this time that I decided Uniswap was something I wanted to take to completion. I mapped out what was needed for a mainet launch.

1. Finalized, production-ready smart contracts

1. Responsive, user friendly trading interface

1. Smart contract security audit

1. Finished whitepaper

1. Developer docs

My previously mentioned friend Phil is a blockchain security expert. On his advice (and with his introduction) I received a quote from [Runtime Verification](https://runtimeverification.com/) for a formalized model of Uniswap, a high level code review, and a partial formal verification of the smart contracts. Taking all this into consideration, I applied for an Ethereum Foundation grant of \$50,000 + the quoted cost from RV.

# Balance

Summer 2018 kicked off with me obsessively refactoring Uniswap’s smart contracts, working on the whitepaper, and attending crypto events in my spare time. For the next two months, I interviewed and then waited to hear back about the grant.

I worked daily at the Balance office, which Richard and the rest of the team members at Balance — [Christian Baroni](https://twitter.com/chrisbaroni), [Jin Ching](https://twitter.com/jinrummie), and [Mike Demerais](https://twitter.com/mikedemarais) were kind enough to let me use. Knowing I was running low on funds, Richard was even generous enough to give me a personal grant to support my efforts.

I began attending weekly meetups called Whiteboard Wednesday at the Balance office. Every Wednesday for 2 hours anyone and everyone working on a crypto project was invited to share their weekly progress.

https://twitter.com/ricburton/status/1019708830672797696?ref_src=twsrc%5Etfw

I attended almost every week, explaining and re-explaining Uniswap to different groups of people. I learned how to speak about Uniswap in different settings, and soon could explain it to almost anyone. I even started dipping my toes into crypto twitter.

Similar to my calls with Pascal, Whiteboard Wednesday brought a degree of accountability to my life. I did not want to show up two weeks in a row without progress to report.

# Maker

As Summer progressed, I spent an increasing amount of time at the NYC [MakerDAO](https://makerdao.com/) office where my previously mentioned friend Andy was CTO. Maker is a decentralized stablecoin project that everyone reading this article already knows about so why am I even describing it. I became friends with a number of people at Maker including [Ashleigh Schapp](https://twitter.com/ashleighschap) — another friend who would become important to Uniswap.

Working at both the Balance and Maker offices provided me with a constant stream of interesting people to meet and projects to learn about. Summer passed by quickly. My smart contracts were as optimized as I could make them on my own. Finally, towards the end of July I received an email. [Uniswap would receive a grant](https://blog.ethereum.org/2018/08/17/ethereum-foundation-grants-update-wave-3/) from the Ethereum Foundation!

> [**Ethereum Foundation Grants Update - Wave III**](https://blog.ethereum.org/2018/08/17/ethereum-foundation-grants-update-wave-3/)
>
> <small>Ethereum Foundation Grants Update We've been hard at work getting to know so many amazing people and projects, and are extremely excited to announce the recipients of the Wave III of the Ethereum Foundation Grants Program! We kicked off 2018 with a blog post to galvanize scalability research for first...</small>

# Formalized Model

Grant in hand, I immediately contracted Runtime Verification to formalize and audit the contracts. In a series of calls with [Daejun Park](https://www.linkedin.com/in/daejun-park-27a89a6/), [Yi Zhang](https://github.com/yzhang90), and Xiaohong Cheng of RV, I detailed Uniswap’s mechanism and most important properties.

They began by creating a formalized model of Uniswap. Next, they they created a code spec, which re-worked math operations to minimize rounding error, and always favor liquidity providers over traders. The results of this work [can be found here](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf).

I modified the contracts to fit the spec. Next, RV performed a high level code review in which they recommended a number of a safety checks, fixes related to consistency, and other minor changes. A list of these improvements [can be found here](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/issues.md).

Finally, the Uniswap contract code was frozen and RV began work on formally verifying the contracts implementation matched desirable properties of the spec. This was the longest step of the process.

While the audit was on-going I hired Callil as a contractor to begin designing a production version of the Uniswap trading interface. The demo interface worked well, but felt too confusing for the finished product.

# RECIPEINT [🤦](https://emojipedia.org/face-palm/)

Uniswap had not yet been announced, but it was not entirely a secret either. In September I was invited to speak on a panel at [ETHIS](https://ethis.io/), a blockchain conference in Hong Kong. While technically not my first time speaking at a conference, it was the first time I was invited to do so!

https://twitter.com/haydenzadams/status/1039008356009168896?ref_src=twsrc%5Etfw

In Hong Kong, I was able to catch up with Vitalik, who took a look at my finalized Uniswap’s code. He caught one error that even Runtime Verification had missed. I misspelled “recipient” as “recipeint” about 20 times.

I also accidentally stumbled my way into an Ethereum Foundation interview on ETH 2.0, and for the first time became the subject of a meme.

![With ETH falling below $200, this type of humor was common in September, 2018](https://cdn-images-1.medium.com/max/2244/1*g2y4lBPZGGqFIvdCvqUDdA.jpeg)

[Here’s a blank template](https://i.imgur.com/3A31jrX.jpg), if anyone else wants to try.

After Hong Kong, I spent 3 days at Shanghai Blockchain week on a pass-through Visa before returning to New York.

# Preparing for Launch

Back in New York I decided I would launch Uniswap in Prague at [Devcon 4](https://devcon4.ethereum.org/index.html), if it was humanly possible. There were just 5 weeks to go — the busiest 5 weeks of my life.

With formal verification underway, the biggest outstanding task was implementing Callil’s latest frontend designs on top of a production ready codebase. I put out feelers for a contracting firm that could build this in a month, and was introduced to [Dan Tsui](https://www.linkedin.com/in/sdtsui/), CEO at [Kyokan](https://www.kyokan.io/). _Thanks [Rick Dudley](https://twitter.com/AFDudley0) for the intro!_

The codebase was to be re-written almost entirely from scratch. I hired a contracting firm because I believed building a feature complete Uniswap frontend on such a short time frame to the standards I was hoping for required an entire team. Instead I got something better —[ Jacky Chan](https://www.linkedin.com/in/chikeichan/), VP of engineering at Kyokan.

As Jacky was coming in with almost no context on Uniswap, I wrote [a long and detailed frontend spec](https://hackmd.io/hthz9hXKQmSyXfMbPsut1g) to help speed along the process, while Callil provided highly detailed designs for every piece of the interface. In one month, Jacky built the Uniswap launch interface, almost entirely by himself. For a few smaller pieces, [Kenny Tram](https://github.com/kennyt?tab=followers) of Kyokan jumped in to help.

About a week before Devcon, I finished the [docs](https://docs.uniswap.io/) and the [whitepaper](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig). Also, [the results of RVs formal verification work](https://github.com/runtimeverification/verified-smart-contracts/tree/uniswap/uniswap/results) were in. No issues found! However, the Runtime Verification team expressed a concern. Uniswap had not been adequately studied for re-entrancy attacks, the issue behind [the DAO hack](https://medium.com/@ogucluturk/the-dao-hack-explained-unfortunate-take-off-of-smart-contracts-2bd8c8db3562). I reached out to Phil Daian for advice.

He was extremely busy preparing to [present his latest research at Devcon 4](https://www.youtube.com/watch?v=i-oWE8hg6-0), but nevertheless promised to look through the smart contracts for re-entrancy attacks before launch. Due to the last minute nature, this would of course be an internal audit — there would be no writeup and the results would not be made public.

# V0 Unishirts — Devcon 4 Limited Edition

In parallel to all of this I contracted Callil to design a shirt for the Uniswap to give out at the conference. I wanted the launch to be a moment. Something people could participate in. The shirt needed to be high quality — a shirt people would actually want to wear.

About a week before Devcon, in collaboration with his brother [Leander](https://twitter.com/leandercapuozzo), Callil put together this incredibly cool design:

![Unishirt Design Mockup](https://cdn-images-1.medium.com/max/4544/1*sEQ0MxegcmmeMp2hjPhwBw.jpeg)

To be finished on time, the shirts would have to be handmade through a process called silk screening. It would take almost a week to create the screen and about 8 hours to make the shirts.

I flew to Prague a day before the conference and began making sure all the pieces were in place. I checked in with Phil — he had reviewed most of the code but wanted to go over it again.

Callil bought a flight that landed on the first day of the conference to leave as much time for manufacturing as possible. He pulled an all nighter manufacturing shirts (along with Leander).

![](https://cdn-images-1.medium.com/max/8064/1*NaFUfl83E8sHPAyX7YrIwA.jpeg)

![](https://cdn-images-1.medium.com/max/6048/1*2iOiPdV639vmg_l2mtMw6A.jpeg)

![Manufacturing Unishirts](https://cdn-images-1.medium.com/max/3072/1*8Gt3O8JaSPYtSdMoZyQXpg.jpeg)

As soon as the shirts were finished he boxed them up, went straight to the airport and flew to Prague. He took a taxi from the airport directly to the conference center to hand them out with me.

# Devcon 4

#### Day 1

Devcon was underway! I wandered the conference center handing out shirts, talking about Uniswap to anyone who listen to me, hinting the launch was happening soon.

![](https://cdn-images-1.medium.com/max/6048/1*XG_RXxE3ju-M3d6UQBjuQA.jpeg)

![](https://cdn-images-1.medium.com/max/6048/1*Hd0GvmhtuVbAaLJ8_0Lqaw.jpeg)

![](https://cdn-images-1.medium.com/max/6048/1*JCvVDXwtpYqvg-vi2vGDng.jpeg)

![](https://cdn-images-1.medium.com/max/4790/1*C1HiJA1vSPVZVax7sBHzwQ.jpeg)

![← Unishirts have math and charts on the back, making them excellent tools for understanding automated market makers](https://cdn-images-1.medium.com/max/8064/1*2gS5f-URgXW8x_8ure0-wg.jpeg)

In the afternoon, Callil and I met Jacky in person for the first time. After some socializing, we got to work fixing outstanding bugs adding UX improvements.

#### Day 2

I spent half the second day wandering the conference and watching talks. In the afternoon, once more I got together with Jacky and Callil. We had a realization — Uniswap as a project should have a landing page separate from the trading interface. We built [uniswap.io](https://uniswap.io/) from scratch that day.

#### Day 3

Finally, on the 3rd day of Devcon I heard back from Phil. As far as he could tell, there was no re-entrancy attacks that could be done on Uniswap exchange contracts, unless the token transfer function was specifically designed to allow re-entrancy into Uniswap.

This felt like an acceptable result — if a token was designed to attack Uniswap then the liquidity for that specific token could be stolen. All regular ERC20 tokens were safe from re-entrancy.

#### **Day 4**

On November 2, 2018 — the final day of Devcon 4 — the smart contracts were deployed to the Ethereum mainet. Next, [uniswap.io](https://uniswap.io/) and [app.uniswap.org/#](https://app.uniswap.org/#/swap) were deployed. Finally, I reached out to anyone who had expressed interest in providing liquidity at launch.

About $30,000 was deposited into the contracts by a single provider, split across 3 tokens. This allowed for swaps of about $100. There was nothing else left to do.

I spent about an hour sitting alone on a bean bag, writing and re-writing the launch tweets. Fortunately, my friend Ashleigh walked by and helped review my tweets.

I clicked the button, nervous but excited for what the future would hold. What followed was a huge outpouring of support, ideas, and collaboration beyond my wildest expectation.

But that’s a story for V1, the next blogpost in this series :)

# 🦄

# BONUS #1 — Who named it Uniswap?

Vitalik did. I was originally going to call it Unipeg — a mixture between a Unicorn and a Pegasus.

![Unipeg Logo](https://cdn-images-1.medium.com/max/358/1*zdEbqYZUIX1I2HDflumEwA.png)

When Karl first told Vitalik about the project he said:

### “Unipeg? it sounds more like a Uniswap”

# BONUS #2 — Who invented Uniswap?

Alan Lu of Gnosis was the very first person to conceive of x\*y=k market makers on Ethereum

> [**Building a Decentralized Exchange in Ethereum**](https://blog.gnosis.pm/building-a-decentralized-exchange-in-ethereum-eea4e7452d6e)
>
> <small></small>

Martin Koppleman of Gnosis told Vitalik about the idea.

Vitalik saw its potential and began posting about it publicly. On his website:

> [**On Path Independence**](https://vitalik.ca/general/2017/06/22/marketmakers.html)
>
> <small>Suppose that someone walks up to you and starts exclaiming to you that he thinks he has figured out how to create a source of unlimited free energy. His scheme looks as follows. First, you get a spaceship up to low Earth orbit.</small>

On reddit:

<blockquote class="reddit-card" data-card-created="1584970862"><a href="https://www.reddit.com/r/ethereum/comments/55m04x/lets_run_onchain_decentralized_exchanges_the_way/">Let's run on-chain decentralized exchanges the way we run prediction markets</a> from <a href="http://www.reddit.com/r/ethereum">r/ethereum</a></blockquote>
<script async src="//embed.redditmedia.com/widgets/platform.js" charset="UTF-8"></script>

and in the comments of this article written by Phil Daian:

> [**Bancor Is Flawed**](http://hackingdistributed.com/2017/06/19/bancor-is-flawed/#comment-3370835720)
>
> <small>Bancor just did their Initial Coin Offering (ICO) last week and raised a record \$144M within a few hours. They now hold the record for the biggest crowd-funding, ever, in the history of mankind. We don't want to dwell too much on what this illustrates about the current ICO craze.</small>

I created Uniswap, the specific implementation of an x\*y=k market maker that exists on Ethereum today.

<small>Thanks to Jinglan Wang.</small>
