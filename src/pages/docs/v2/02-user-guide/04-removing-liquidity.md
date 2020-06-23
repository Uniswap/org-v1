---
title: 'Removing Liquidity'
tags: user-guides, documentation
---

To remove liquidity from an existing position a user can click into their position on the main 'Pool' page and click remove.

![](/images/remove-1.png)

## Selecting Removal Amount

There are two views to select how much liquidity to remove: a simple view and a detailed view.

In the simple view a user can select the amount to remove by percentage. 100% will remove all the liquidity a user has supplied for that pair.

In the advanced view users can input specific amounts for removal. They have the option to input a specific amount of LP tokens to deposit, or a specific amount of either token to remove. Based on which field is edited the other fields will populate automatically.

![](/images/remove-2.png)

## Approvals and Confirmation

Finalizing a remove is a 2-step process. There is only one prerequisite approval before the transaction can be submitted. After clicking 'remove' users will be prompted to make this approval in the modal. After completing this users can proceed to submit their removal.

The confirmation modal provides users with a summary of the transaction. It shows the amount of each token in the pair that will be removed, and gives the amount of LP tokens that will be burned as well. There is also additional information about the current price. To finalize the removal a user can click confirm and approve the transaction in the UI of their connected wallet.

![](/images/remove-3.png)

## Advanced Details

On both add and remove pages users can open the settings to define custom settings for their transaction. Slippage tolerance defines a limit to how much the price on the pair can change before the transaction is reverted. The deadline defines how long after submission the transaction will remain valid (if the deadline is reached before the transaction is processed it will revert). The user can change these settings based on their preferences for adding and removing. For more detailed information on slippage and price impact see [here](/docs/v2/swaps/pricing/).

## Troubleshooting

Having problems with a pool? Check out <Link to="/docs/v2/web-app/troubleshooting/">Troubleshooting</Link>.
