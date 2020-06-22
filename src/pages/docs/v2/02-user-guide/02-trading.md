---
title: 'Making Trades'
---

### Selecting Tokens

To make a swap a user must select an input token (token to sell), and an output token (token to buy). Using the dropdown users can select from a list of tokens.

In this token selection view a user can see their live token balances. Users can search in the search box by token name, symbol or token address.

_Having trouble finding a token? Review <Link to="/docs/v2/web-app/finding-a-token/">adding custom tokens</Link>._

### Entering Amounts

If there is a valid route between the two selected tokens the user can continue to input amounts for their trade. The rate information for the selected tokens will automatically be fetched. The user can enter an amount in the 'from' field or the 'to' field. The other token amount will automatically update based on which field was edited by the user, and based on the pricing information that has been fetched from the Uniswap contracts.

![](images/amounts.gif)

### Pricing, Routing, and Exceptions

In the background the interface will fetch rates from the Uniswap V2 and V1 contracts. Within V2, the interface will find the route between pairs that gives the user the best price for their desired trade. To learn more about routing and trade structure see here.

#### V2 vs V1 rates

If there is a better price for the desired trade on Uniswap V1, a message will appear and link to the same trade using V1 liquidity. To execute the trade on Uniswap V1, click the link that appears. You can always toggle back to V2 using the toggle in the top left of the site.

#### Liquidity Exceptions

In some cases there will not be enough liquidity to support a desired trade. In this case the user will see an error message, and will not be able to submit the trade. In this situation a user may try structuring the trade with a smaller output amount, or work to get liquidity added to the relevant pairs.

![](images/swapping-3.png)

### Approvals

Users making swaps will need to approve the router contract before selling any tokens (besides ETH). To learn more about the Uniswap router contracts and how they interact with the Uniswap V2 core contracts see here.

If an approval is needed, the interface will update and prompt the user to submit an approval transaction.

![](images/approve.gif)

The interface will automatically detect when an approval is confirmed and allow the user to submit the trade for confirmation.

### Confirming and Submitting

The last step to execute a swap through the interface is to click swap and review information in the confirmation modal. This view gives users a summary of the trade before actually submitting a transaction to their connected wallet for approval. Users can click 'confirm swap' and confirm the transaction in the UI of whatever wallet they have connected. Once the user approves the transaction a user can click on pending transactions in the top right and follow the links for more information on Etherscan.

<Info>Having trouble swapping? Check out the <Link to="/docs/v2/web-app/troubleshooting/">troubleshooting</Link> page.</Info>
