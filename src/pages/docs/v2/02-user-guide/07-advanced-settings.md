---
title: 'Advanced Settings'
tags:
  - user-guides
  - documentation
---

### Advanced Settings and Considerations

#### Advanced settings

After selecting tokens and input amounts a user will see an option to view advanced settings below the trade.

Users can select a custom slippage tolerance for a trade. The slippage tolerance limit will cause the transaction to fail if the price changes unfavorably by the tolerance or more. Users can use this setting to create more or less strict bounds for their trade. The default value is 0.5%.

Users can also set a custom deadline for their trade. If the trade takes longer than the selected time it will fail. The default duration is 20 minutes.

#### Advanced amounts and warnings

Users can see additional information about the amounts they're trading as well. The interface automatically calculates price impact, which is the difference between market price and estimated price due to trade size. Users will see a warning displayed if the price impact is high.

If a user has specified an specific input amount, they can now see the minimum amount of output token they will receive. If they have specified a specific output amount, they will see a maximum amount of input token that can be sold.

![](images/advanced.gif)
