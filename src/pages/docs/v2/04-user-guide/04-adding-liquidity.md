---
title: 'Adding Liquidity'
tags: user-guides, documentation
---

# Overview

The Uniswap interface allows users to add and remove liquidity on Uniswap V2 pairs. After connecting with one of the supported wallet options, users can also see and manage their current positions. Users can also create new pools through the interface.

The liquidity provider section of the interface can be found under the [pool](https://uniswap.exchange/pool) tab.

<Info>You may want to read <Link to="/docs/v2/pools/understanding-returns/">understanding returns</Link> before providing liquidity.</Info>

# Joining A Pool

![](/images/pool-page.png)

To join a new pool, users can navigate to the Pool section of the interface. To join a pool a user must have enough of the two tokens in the pool to deposit at the existing rate. To start, users can click the 'Join a pool' button. A modal will display a preset list of pools they can join.

## Selecting a Pool

Pairs are listed with two token symbols for the tokens that make up the pair. To search for a pool users can type two token symbols separated by a '/', or they can paste the address of a specific pool.

![](/images/pool-options-modal.png)

## Inputting Amounts

After finding the desired pool, a user can continue by selecting the amount of liquidity they want to provide. They can enter an amount of either token and the other amount will be populated automatically based on the current rate between tokens. (If the pool doesn't exist yet the user will need to input both amounts, see [Creating A New Pool](/docs/v2/web-app/creating-a-pool/) for more.)

Users can view the current rates that they'll be adding liquidity at in the details section below the inputs. They will also see a label called 'Share of Pool'. This percent represents how much of the entire pool they will own based on the amounts they've inputted. (If you are the first provider you will own 100% for example).

## Approvals

Users will need to approve the Uniswap router before adding liquidity. To learn more about the router contract and how it interacts with the core Uniswap contracts see [here](/docs/v2/smart-contracts/architecture/). To do this a user can click the 'Approve' button that automatically displays if an approval is needed. An approval is needed for any token beside ETH. Once all approvals have been made and confirmed the UI will update automatically and allow the user to confirm the transaction to add liquidity.

![](/images/approve.png)

## Confirming Transaction

To complete the add (or remove) users can click the main button on the interface which will bring up a confirmation modal. This view gives users a summary of the transaction they're about to submit. On the top it displays how many pool tokens the user will receive in exchange for the liquidity provided. In the bottom section it displays information on how much of each token will be supplied, with rate details as well.

To finalize the transaction click the confirm button and approve the transaction in the UI of their connected wallet.
![](/images/confirm.png)

# Viewing Existing Positions

Users can view and manage their existing liquidity positions by connecting to the interface and navigating to the 'pool' tab. They will see a list of pools they have joined, and can manage the pools by clicking the dropdowns. It is possible to view more analytics about shares on community built tools like [uniswaproi.com](https://www.uniswaproi.com/).

![](/images/manage.png)

# Importing Liquidity

Sometimes users have liquidity in pools that don’t appear in the UI by default. If a user doesn’t see their liquidity listed in the main ‘Pool’ page they can manually import it.

Users can import pools they've already joined by clicking the 'import it' link on the bottom of the Pool tab. On this screen they can search for the two tokens that make up the pool. If the pool exists they will be prompted to add liquidity to the pool. If the pool doesn't exist they will be prompted to create the pool as the first liquidity provider.

![](/images/pool-import.png)

# Advanced Details

On both add and remove pages users can click 'show advanced' to define custom settings for their transaction. Slippage tolerance defines a limit to how much the price on the pair can change before the transaction is reverted. The deadline defines how long after submission the transaction will remain valid (if the deadline is reached before the transaction is processed it will revert). The user can change these settings based on their preferences for adding and removing. For more detailed information on slippage and price impact see [here](/docs/v2/token-swaps/how-prices-are-determined/).

![](/images/advanced.png)

# Troubleshooting

Having problems with a pool? Check out <Link to="/docs/v2/web-app/troubleshooting/">Troubleshooting</Link>.
