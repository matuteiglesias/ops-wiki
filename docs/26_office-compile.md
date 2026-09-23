---
title: Office Compile
sidebar_position: 33
slug: /office-compile
---

# Office Compile

## Purpose

The current Office compile is a **coherent generation**, not a collection of independently refreshed queues.

One generation observes governed state once, derives the current work/preparation surfaces, validates them together, and only then advances the published current pointer.

## Generation flow

```text
snapshot
  → identity
  → typed work
  → Staff
  → Principal
  → execution plan
  → validate
  → publish
```

Downstream stages use the same snapshot digest.

They must not independently reread mutable Control Tower state during the generation.

## Input boundary

The Control Tower v2 snapshot currently covers the governed v2 tables required by Office, including front identity, carry state, capabilities, operator contracts, aliases, support artifacts, repository/workspace bindings, and runtime-health projection.

The intake layer validates structure and referential identity before routing.

It does not:

- mutate Sheets;
- choose Principal answers;
- execute repositories;
- silently resolve identity collisions.

## Typed work

Office uses five work facets:

| Kind | Meaning |
|---|---|
| `DECIDE` | Principal judgment is structurally required. |
| `UNBLOCK` | Safe progress lacks context, identity, evidence, or preparation. |
| `VERIFY` | A bounded diagnostic/evidence pass is required. |
| `EXECUTE` | Work is sufficiently expressed and unblocked for bounded action. |
| `MAINTAIN` | Bounded human upkeep is explicitly expressed. |

These replace older prose-driven queue inference.

A front may emit more than one work item.

## Staff preparation

Staff consumes typed work and the captured snapshot.

It may cheaply triage all items while deep-preparing only a bounded set.

A Staff packet can contain:

- current state;
- identity summary;
- evidence;
- uncertainties;
- blockers;
- recommended move;
- Principal question when needed;
- action maturity where applicable.

The recommendation is advisory.

## Principal surface

The Principal Compiler compresses prepared work into a small structured brief.

Canonical sections include:

- `needs_you`;
- `ready_pulls`;
- `exceptions`;
- `moved_without_you`;
- `delta`.

Presentation budgets limit what is shown. They do not rewrite Control Tower priority.

## Execution compilation

Ready pulls may be compiled into execution packets constrained by `operator_contract_v2`.

A packet is bounded work plus allowed powers, prohibitions, evidence expectations, and relevant identity.

A packet does not acquire governance-mutation authority merely because the work is ready.

## Reentry

Execution produces evidence and receipts.

Reentry validates packet-bound results and proposes reviewed state movement such as:

- `DONE`;
- `FOLLOW_UP`;
- `WAITING`.

The executor does not directly rewrite carry or priority semantics.

## Coherent publication

Generation artifacts are run-scoped.

A current pointer should reference only a fully successful published generation. Failed generations remain inspectable through run records but cannot replace the last-known-good publication.

## Views

Consumer-specific views may be compiled from the coherent generation or other governed state.

Examples:

- Principal view;
- weekly view;
- maintenance view;
- relationship/institutional Frontier view.

Views may choose different grouping vocabularies. They do not need one universal status enum.

## What happened to the old outputs?

Historical names such as:

- `today_compile`;
- `support_queue`;
- `escalation_queue`;
- `block_candidates`;
- `principal_brief_today`;
- `principal_brief_week`;

belong to the Office v1 generation.

They may appear in historical notes, but new consumers should use current Office v2 artifacts or explicit published-view contracts rather than requiring compatibility output forever.

## Source of truth

The implementation authority for current compile behavior is `office-auto-lab`, especially its Control Tower snapshot, work-item compiler, Staff v2, Principal v2, execution compiler, reentry, coherent-generation, and run-record contracts.

This page explains those boundaries; it does not duplicate their full schemas.
