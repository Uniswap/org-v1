---
title: Anatomy of a pool
---

So let’s assume that after adding 10,000 DAI and 100 ETH (total market value of \$20,000), the liquidity pool is now 100,000 DAI and 1,000 ETH in total. Because the amount supplied is equal to 10% of the total liquidity, the contract mints and sends the market maker “liquidity tokens” which entitle them to 10% of the liquidity available in the pool. These are not speculative tokens to be traded. They are merely an accounting or bookkeeping tool to keep track of how much the liquidity providers are owed. If others subsequently add/withdraw coins, new liquidity tokens are minted/burned such that the everyone’s relative percentage share of the liquidity pool remains the same.

**Now let’s assume the price trades on Coinbase from $100 to $150. The Uniswap contract should reflect this change as well after some arbitrage. Traders will add DAI and remove ETH until the new ratio is now 150:1.** What happens to the liquidity provider? The contract reflects something closer to 122,400 DAI and 817 ETH (to check these numbers are accurate, 122,400 \* 817 = 100,000,000 (our constant product) and 122,400 / 817 = 150, our new price). Withdrawing the 10% that we are entitled to would now yield 12,240 DAI and 81.7 ETH. The total market value here is $24,500. Roughly $500 worth of profit was missed out on as a result of the market making.

**Obviously no one wants to provide liquidity out of charitable means, and the revenue isn’t dependent on the ability to flip out of good trades (there is no flipping). Instead, 0.3% of all trade volume is distributed proportionally to all liquidity providers. By default, these fees are put back into the liquidity pool, but can be collected any any time. It’s difficult to know what the trade off is between revenues from fees and losses from directional movements without knowing the amount of in-between trades. The more chop and back and forth, the better.**

When an Exchange contract is first created for a token, both the token and Ether pools are empty. The first person that deposits into the contract is the one that determines the ratio between the token and Ether. If they deposit a ratio that is different from what the current market rate is, then an arbitrage opportunity is available. When liquidity providers are adding to an established pool, they should add a proportional amount of token and Ether to the pool. If they don’t, the liquidity they added is at risk of being arbitraged as well.

Lastly, special ERC20 tokens known as liquidity tokens are minted to the provider’s address in proportion to how much liquidity they contributed to the pool. The tokens are burned when the user wants to receive the liquidity they contributed plus the fees that we accumulated while their liquidity was locked.

The first liquidity provider to add liquidity to an exchange contract will initially set the exchange rate between ETH and the exchange contract’s associated ERC20 token. The liquidity provider does this by depositing what they believe to be an equivalent value between ETH and the exchange contract’s ERC20 token. If the value set by the liquidity provider is not consistent with the wider market, then arbitrage traders will bring the value between ETH and the ERC20 token to an exchange rate that the market deems correct. All subsequent liquidity providers thereafter will then deposit liquidity using the exchange rate at the time of their deposit.

Uniswap also makes use of so called ‘liquidity tokens’, which are in themselves ERC20 compliant. These tokens can be thought of as being a representation of a liquidity provider’s contribution to an exchange contract.

Uniswap will mint liquidity tokens in order to track the relative proportion of total reserves that each liquidity provider has contributed. Liquidity providers are able to burn their liquidity tokens at a time of their choosing, so that they can withdraw their proportional share of ETH and ERC20 tokens from the exchange contract.

Liquidity providers can also choose to sell or transfer their liquidity tokens between accounts without having to remove liquidity from the exchange contract.

## Why is my liquidity worth less than I put in?

To understand why the value of a liquidity provider’s stake can go down despite income from fees, we need to look a bit more closely at the formula used by Uniswap to govern trading. The formula really is very simple. If we neglect trading fees, we have the following:

- `eth_liquidity_pool * token_liquidity_pool = constant_product`

In other words, the number of tokens a trader receives for their ETH and vice versa is calculated such that after the trade, the product of the two liquidity pools is the same as it was before the trade. The consequence of this formula is that for trades which are very small in value compared to the size of the liquidity pool we have:

- `eth_price = token_liquidity_pool / eth_liquidity_pool`

Combining these two equations, we can work out the size of each liquidity pool at any given price, assuming constant total liquidity:

- `eth_liquidity_pool = sqrt(constant_product / eth_price)`
- `token_liquidity_pool = sqrt(constant_product * eth_price)`

So let’s look at the impact of a price change on a liquidity provider. To keep things simple, let’s imagine our liquidity provider supplies 1 ETH and 100 DAI to the Uniswap DAI exchange, giving them 1% of a liquidity pool which contains 100 ETH and 10,000 DAI. This implies a price of 1 ETH = 100 DAI. Still neglecting fees, let’s imagine that after some trading, the price has changed; 1 ETH is now worth 120 DAI. What is the new value of the liquidity provider’s stake? Plugging the numbers into the formulae above, we have:

- `eth_liquidity_pool = 91.2871`
- `dai_liquidity_pool = 10954.4511`

"Since our liquidity provider has 1% of the liquidity tokens, this means they can now claim 0.9129 ETH and 109.54 DAI from the liquidity pool. But since DAI is approximately equivalent to USD, we might prefer to convert the entire amount into DAI to understand the overall impact of the price change. At the current price then, our liquidity is worth a total of 219.09 DAI. What if the liquidity provider had just held onto their original 1 ETH and 100 DAI? Well, now we can easily see that, at the new price, the total value would be 220 DAI. So our liquidity provider lost out by 0.91 DAI by providing liquidity to Uniswap instead of just holding onto their initial ETH and DAI."

"Of course, if the price were to return to the same value as when the liquidity provider added their liquidity, this loss would disappear. **For this reason, we can call it an **impermanent loss**.** Using the equations above, we can derive a formula for the size of the impermanent loss in terms of the price ratio between when liquidity was supplied and now. We get the following:"

- "`impermanent_loss = 2 * sqrt(price_ratio) / (1+price_ratio) — 1`"

- "Which we can plot out to get a general sense of the scale of the impermanent loss at different price ratios:"
  ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fdnazarov%2FOscQ_nmzbA.png?alt=media&token=4dff866e-a740-4121-9da4-9c9105baa404)

- "Or to put it another way:"

  - "a 1.25x price change results in a 0.6% loss relative to HODL"
  - "a 1.50x price change results in a 2.0% loss relative to HODL"
  - "a 1.75x price change results in a 3.8% loss relative to HODL"
  - "a 2x price change results in a 5.7% loss relative to HODL"
  - "a 3x price change results in a 13.4% loss relative to HODL"
  - "a 4x price change results in a 20.0% loss relative to HODL"
  - "a 5x price change results in a 25.5% loss relative to HODL"

- "N.B. The loss is the same whichever direction the price change occurs in (i.e. a doubling in price results in the same loss as a halving)."
