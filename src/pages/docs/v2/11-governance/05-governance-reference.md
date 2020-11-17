---
title: Governance Reference
tags: governance, documentation
---

# TODO: INTRO

## Timelock

## Pause Guardian

## Key Events



# Read-Only Functions: UNI
 
## Get Current Votes

```solidity
function getCurrentVotes(address account) returns (uint96)
```

Returns the balance of votes for an account as of the current block.

## Get Prior Votes

```solidity
function getPriorVotes(address account, uint blockNumber) returns (uint96)
```
Returns the prior number of votes for an account at a specific block number. The block number passed must be a finalized block or the function will revert.

# State-Changing Functions: UNI

# Delegate

```solidity
function delegate(address delegatee)
```
Delegate votes from the sender to the delegatee. Users can delegate to 1 address at a time, and the number of votes added to the delegatee’s vote count is equivalent to the balance of UNI in the user’s account. Votes are delegated from the current block and onward, until the sender delegates again, or transfers their UNI.

| Name           | Type      |                                                                                                                |
| :------------- | :-------- | :------------------------------------------------------------------------------------------------------------- |
| delegatee      | `address` | The address to which msg.sender wishes to delegate their votes to.                                             |


# Delegate By Signature

```solidity
function delegateBySig(address delegatee, uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s)
```
Delegate votes from the sender to the delegatee. Users can delegate to 1 address at a time, and the number of votes added to the delegatee’s vote count is equivalent to the balance of UNI in the user’s account. Votes are delegated from the current block and onward, until the sender delegates again, or transfers their UNI.

| Name           | Type      |                                                                                                                    |
| :------------- | :-------- | :----------------------------------------------------------------------------------------------------------------- |
| delegatee      | `address` | The address to which msg.sender wishis to delegate their vote to                                                   |
| nonce          | `uint`    | The contract state required to match the signature. This can be retrieved from the contract’s public nonces mapping|
| expiry         | `uint`    | The time when the signature expires. A block timestamp in seconds since the unix epoch.                            |
| v              | `uint`    | The recovery byte of the signature.                                                                                |
| r              | `bytes32` | Half of the ECDSA signature pair.                                                                                  |
| s              | `bytes32` | Half of the ECDSA signature pair.                                                                                  |
|                |           |                                                                                                                    |

# Read-Only Functions: Governor Alpha

## Quorum Votes

```solidity
function quorumVotes() public pure returns (uint)
```

Returns the minimum number of votes required for a proposal to succeed.

## Proposal Threshold

```solidity
function proposalThreshold() returns (uint)
```

Returns the minimum number of votes required for an account to create a proposal.

## Proposal Max Operations

```solidity
function proposalMaxOperations() returns (uint)
```

Returns the maximum number of actions that can be included in a proposal.

## Voting Delay

```solidity
function votingDelay() returns (uint)
```

Returns the number of blocks to wait before voting on a proposal may begin.


## Voting Period

```solidity
function votingPeriod() returns (uint)
```

Returns the duration of voting on a proposal (in blocks).

## Get Actions

```solidity
function getActions(uint proposalId) returns (uint proposalId) public view returns (address[] memory targets, uint[] memory values, string[] memory signatures, bytes[] memory calldatas)
```
Returns:
- Array of addresses of contracts the proposal calls.
- Array of unsigned integers the proposal uses as values.
- Array of strings of the proposal’s signatures.
- Array of calldata bytes of the proposal.

## Get Receipt

```solidity
function getReceipt(uint proposalId, address voter) returns (Receipt memory)
```

Returns a proposal ballot receipt of a given voter.


| Name           | Type      |                                                                                                                    |
| :------------- | :-------- | :----------------------------------------------------------------------------------------------------------------- |
| proposalId     | `uint`    | ID of the proposal                                                                                                 |
| delegatee      | `address` | The address of the voter                                                                                           |


## State

```solidity
function state(uint proposalId) returns (ProposalState)
```

Returns enum of type ProposalState, possible types are:
-Pending 
-Active 
-Canceled
-Defeated 
-Succeeded 
-Queued
-Expired 
-andExecuted

| Name           | Type      |                                                                                                                    |
| :------------- | :-------- | :----------------------------------------------------------------------------------------------------------------- |
| proposalId     | `uint`    | ID of the proposal                                                                                                 |

# State-Changing Functions: Governor Alpha

## Propose

```solidity
function propose(address[] memory targets, uint[] memory values, string[] memory signatures, bytes[] memory calldatas, string memory description) returns (uint)
```

Creates a Proposal to change the protocol.

Proposals will be voted on by delegated voters. If there is sufficient support before the voting period ends, the proposal shall be automatically enacted. Enacted proposals are queued and executed in the  Timelock contract.

The sender must hold more UNI than the current proposal threshold (proposalThreshold()) as of the immediately previous block. If the threshold is 100,000 UNI, the sender must have been delegated more than 1% of all UNI in order to create a proposal. The proposal can have up to 10 actions (based on proposalMaxOperations()).

The proposer cannot create another proposal if they currently have a pending or active proposal. It is not possible to queue two identical actions in the same block (due to a restriction in the Timelock), therefore actions in a single proposal must be unique, and unique proposals that share an identical action must be queued in different blocks.

| Name           | Type      |                                                                                                                                                                                        |
| :------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| targets        | `address` | The ordered list of target addresses for calls to be made during proposal execution. This array must be the same length as all other array parameters in this function.                |
| values         | `uint`    | The ordered list of values (i.e. msg.value) to be passed to the calls made during proposal execution. This array must be the same length as all other array parameters in this function|
| signatures     | `string`  | The ordered list of function signatures to be passed during execution. This array must be the same length as all other array parameters in this function.                              |
| calldatas      | `bytes`   | The ordered list of data to be passed to each individual function call during proposal execution. This array must be the same length as all other array parameters in this function.   |
| description    | `string`  | A human readable description of the proposal and the changes it will enact.                                                                                                            |



## Queue



## Execute

## Cancel 

## Cast Vote

## Cast Vote By Signature


































