---
title: Factory API
---

# Factory API

## initializeFactory

{% tabs %}
{% tab title="Smart Contract" %}

```javascript
initializeFactory((template: address))
```

{% endtab %}

{% tab title="Web3" %}

```javascript
factoryContract.methods.initializeFactory(template).send()
```

{% endtab %}
{% endtabs %}

| Parameter |                           Description |
| :-------- | ------------------------------------: |
| template  | Ethereum address of exchange template |

## createExchange

{% tabs %}
{% tab title="Smart Contract" %}

```javascript
createExchange(token: address): address
```

{% endtab %}

{% tab title="Web3" %}

```javascript
factoryContract.methods.initializeFactory(token).send()
```

{% endtab %}
{% endtabs %}

| Parameter | Type    |                        Description |
| :-------- | :------ | ---------------------------------: |
| token     | address | Ethereum address of an ERC20 token |

| Returns |                                        |
| :------ | -------------------------------------: |
| address | Ethereum address of a Uniswap exchange |

## getExchange

{% tabs %}
{% tab title="Smart Contract" %}

```javascript
@constant
getExchange(token: address): address
```

{% endtab %}

{% tab title="Web3" %}

```javascript
factoryContract.methods.getExchange(token).call()
```

{% endtab %}
{% endtabs %}

| Parameter | Type    |                        Description |
| :-------- | :------ | ---------------------------------: |
| token     | address | Ethereum address of an ERC20 token |

| Returns |                                        |
| :------ | -------------------------------------: |
| address | Ethereum address of a Uniswap exchange |

## getToken

{% tabs %}
{% tab title="Smart Contract" %}

```javascript
@constant
getToken(exchange: address): address
```

{% endtab %}

{% tab title="Web3" %}

```javascript
factoryContract.methods.getToken(exchange).call()
```

{% endtab %}
{% endtabs %}

| Parameter | Type    |                            Description |
| :-------- | :------ | -------------------------------------: |
| exchange  | address | Ethereum address of a Uniswap exchange |

| Returns |                                    |
| :------ | ---------------------------------: |
| address | Ethereum address of an ERC20 token |

## getTokenWithId

{% tabs %}
{% tab title="Smart Contract" %}

```javascript
@constant
getTokenWithId(token_id: uint256): address
```

{% endtab %}

{% tab title="Web3" %}

```javascript
factoryContract.methods.getToken(exchange).call()
```

{% endtab %}
{% endtabs %}

| Parameter | Type    |                   Description |
| :-------- | :------ | ----------------------------: |
| token_id  | uint256 | Uniswap ID for an ERC20 token |

| Returns |                                    |
| :------ | ---------------------------------: |
| address | Ethereum address of an ERC20 token |
