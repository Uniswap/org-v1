---
title: Uniswap Math
---

This is a test for $\KaTeX$ in MDX component. If $\zeta( s )$ is Riemann zeta function,

$$
\zeta(2)=\sum_{n=1}^{\infty}\frac{1}{n^{2}}=\frac{\pi^{2}}{6}.
$$

## Math Equations in Inline Mode

Surround your equation with `$` to generate a math equation in inline mode.

**Example markdown:**

```
$a^2 + b^2 = c^2$
```

**Example output:** $a^2 + b^2 = c^2$

## Math Equations in Display Mode

Surround your equation with `$$` and new-lines to generate a math equation in
display mode.

**Example markdown:**

```
$$
a^2 + b^2 = c^2
$$
```

**Example output:**

$$
a^2 + b^2 = c^2
$$

**Add Katex CSS to your template** Katex's CSS file is required to render the
formulas correctly. Include the CSS file in your template ([example][4])

```
require(`katex/dist/katex.min.css`)
```
