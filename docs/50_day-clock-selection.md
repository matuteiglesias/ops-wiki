---
id: day-clock-selection
title: Blocks, Selection & Weekly Timing
sidebar_position: 60
---

# Blocks, Selection & Weekly Timing

## Scope

Ops Manual keeps only the execution-side block principles.

Fine-grained cadence and horizon policy now belongs to Weekly Ops Governance.

For current week-shaping heuristics see:

**Weekly Ops Governance → Cadence, horizons, and week-shaping heuristics**

https://weekly-ops-governance.vercel.app/docs/02_governance_map/cadence-horizons

## Block principle

A block is simply a bounded human execution window.

It should have:

- a concrete work referent;
- one dominant objective;
- expected evidence;
- a stop rule;
- a restart pointer if unfinished.

A block does **not** need one mandatory global mode enum.

Craft labels such as pipeline, toolsmith, service, contract, governance, and contact remain optional descriptive aids.

## Selection

Normal selection starts from a current Office/published view.

Useful inputs include:

- `needs_you`;
- ready pulls;
- typed work;
- Staff packets;
- exceptions;
- a Weekly view;
- a Frontier view.

Prefer the smallest surface that already contains enough information.

## BOOT

BOOT survives as a human shorthand for:

> establish the first executable move without reopening the universe.

A minimal BOOT result is:

```text
work referent
first action
evidence expected
stop rule
```

Anything beyond that belongs only if it reduces uncertainty.

## FOCUS

FOCUS is the human label for a block whose primary purpose is to change an Endpoint or produce a strategic artifact.

## MAINT

MAINT is the human label for bounded upkeep that lowers future friction:

- repair a broken check;
- update a runbook;
- resolve a prerequisite;
- clean a small queue;
- restore a reproducible state.

MAINT should not become open-ended refactoring.

## CLOSE

CLOSE preserves reentry.

Minimum closure:

```text
what changed
evidence
what remains
next pointer
```

Current machine execution may produce richer receipts; this is the human minimum.

## Timing policy

The following are **not** universal Ops schema:

- fixed daily item counts;
- Mon/Wed/Fri carry touches;
- same-day / 2–7-day / 1–4-week required horizons;
- 14-day breakthrough constructs;
- quarterly reframes;
- fixed M1/M2/M3 windows.

They remain available in Weekly Governance as human heuristics.

## Direct work

If no fresh Office compile/view exists, a human may still do a clearly bounded move from a known front or obligation.

Do not create a shadow local state to justify it. Return the evidence afterward.

## See also

- [Execution Model](execution-model)
- [Ops under Office](ops-under-office)
- [Motif Registries](motif-registries)
