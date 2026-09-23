---
title: Ops under Office
sidebar_position: 34
slug: /ops-under-office
---

# Ops under Office

## Purpose

Ops is the execution discipline inside the governed Office loop.

The selection boundary is simple:

**Office compiles. Execution acts. Evidence returns. Governance reviews reentry.**

Ops should not reopen the full state estate by default.

## What Ops receives

Depending on the work, execution may receive:

- a typed work item;
- a Staff packet;
- a Principal decision/default;
- an execution packet;
- source/evidence references;
- repository/workspace identity;
- expected evidence and explicit constraints.

The exact runtime contract is owned by Office v2 and `operator_contract_v2`.

## What Ops owns

Ops owns the quality of the bounded move:

- execute only within allowed powers;
- make the first action concrete;
- keep the scope bounded;
- produce evidence appropriate to the claim;
- stop rather than silently expand;
- leave a restartable next pointer if unfinished;
- report what actually happened.

## What Ops does not own

Ops does not silently decide:

- canonical carry state;
- priority;
- front lifecycle;
- Principal judgment;
- identity reconciliation;
- repository-estate semantics;
- whether a view should pretend a failed run succeeded.

An executor can recommend state movement. Governance owns accepting or rejecting it.

## Execution flow

### 1. Start from compiled work

Normal entry is a current Office generation or another explicit governed view.

Do not rebuild selection from the raw universe merely because more information is available.

### 2. Resolve one bounded move

Use the current packet, decision, or human pull to determine:

- objective;
- allowed action;
- evidence expected;
- stop rule;
- dependencies;
- unresolved uncertainty.

### 3. Execute

Choose the smallest move that can change the relevant Endpoint or produce the evidence required for the next decision.

Reusable operator motifs live in the [Motif Registries](motif-registries).

### 4. Return evidence

Evidence should be sufficient to distinguish:

- done;
- partial;
- blocked;
- no meaningful change.

### 5. Reenter through review

Current Office v2 uses packet-bound receipts and reentry proposals.

A human block may still use a compact closure note, but the note is input to governance—not an alternate state database.

## VACChain / Endpoint use during execution

A VACChain is helpful when execution has become locally busy but globally unclear.

Ask:

1. Which value-producing chain are we inside?
2. Which Endpoint are we trying to change?
3. What evidence would make the changed claim credible?
4. Is the current move actually on that path?

This is a reasoning aid, not a requirement that every execution packet contain a full VAC model.

## Direct/fallback work

A human may sometimes act before a fresh Office generation exists—for example, an urgent repair or a clearly bounded external obligation.

That is acceptable when the work can be bounded safely.

Afterward, return evidence to the governed system rather than creating a shadow local state.

## Human closure

For manual work, the durable minimum is:

```text
front: <front_id or clear referent>
result: <done|partial|blocked|no-change>
evidence: <proof>
closure: <what changed>
next: <restart instruction or none>
escalate: <yes/no + reason>
```

The historical [Ops Closure v1](contracts/ops-closure-v1) remains a useful human compatibility form, but current machine reentry semantics are owned by Office v2.

## Final principle

**Execution may be fast and flexible. Authority must remain boring.**
