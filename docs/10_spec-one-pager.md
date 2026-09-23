---
id: spec-one-pager
title: One Pager Spec
sidebar_position: 20
---

# One Pager Spec

## Purpose

The system exists to keep a large work estate governable without making the human reconstruct the whole universe before acting.

The shortest description is:

```text
governed state
  → coherent compile
  → small attention/work surfaces
  → bounded execution
  → evidence
  → reviewed reentry
```

## Authority first

Canonical live state belongs to the governed Control Tower / Sheets estate.

Office consumes that state once per coherent generation and produces structured artifacts. Downstream stages consume the generation rather than rereading Sheets independently.

Renderers and manuals do not become state authorities merely because they display state.

## Durable conceptual primitives

### Front

A stable operational identity. A front may involve zero, one, or many repositories, people, institutions, datasets, or workflows.

### VACChain

A **Value-Add Chain** is a conceptual model for how a front creates value in the world.

Use it when it clarifies dependencies, outputs, or where verification should occur. A VACChain is a reasoning primitive; it does not need to be materialized as a Control Tower row for every front.

### Endpoint

An **Endpoint** is a verifiable claim at a meaningful point in a VACChain.

Examples:

- a dataset is reproducibly materialized;
- a service responds under its runbook;
- a report is published and traceable to evidence;
- a stakeholder packet is sent and follow-up state exists.

Endpoints keep “progress” tied to inspectable claims without forcing the old PASS/WARN/FAIL Frontier architecture back into the runtime.

## Current Office work vocabulary

Office v2 emits five canonical work facets:

- `DECIDE` — Principal judgment is structurally required.
- `UNBLOCK` — context, identity, evidence, or preparation is insufficient.
- `VERIFY` — a bounded diagnostic or evidence-gathering pass is needed.
- `EXECUTE` — work is ready for bounded action.
- `MAINTAIN` — bounded upkeep is explicitly expressed.

These are not lifecycle states. A front may emit multiple work facets in one generation.

## Principal, Office, Staff, Ops

### Principal

Supplies scarce judgment. The Principal should receive prepared questions, real trade-offs, and exceptions—not raw estate browsing.

### Office

Compiles governed state into typed work and coherent generations. It does not execute arbitrary deep work and does not invent governance mutations merely to make a non-empty brief.

### Staff

Prepares evidence-backed substrate for bounded pulls. Staff may triage broadly but deep-prepares only a bounded subset.

### Ops / execution

Carries out bounded moves under current operator contracts, leaves evidence, and produces receipts or human closure. Execution does not silently gain power to mutate governed state.

## Current coherent-generation flow

```text
Control Tower v2 snapshot
        ↓
identity resolution
        ↓
typed work items
        ↓
Staff preparation
        ↓
Principal Compiler
        ↓
execution compiler
        ↓
execution packets
        ↓
receipts / closure
        ↓
reentry proposals
```

A failed generation must not replace the last-known-good published generation.

## Evidence standard

Evidence is what makes progress inspectable.

Useful classes include:

- technical: logs, tests, manifests, generated artifacts, commits;
- operational: state transitions, receipts, run records;
- narrative: bounded decision notes, briefs, synthesis;
- relationship/stakeholder: sent messages, meeting packets, follow-up state.

Evidence quality depends on the claim being made. Narrative evidence can validate a governance decision; it cannot substitute for a required technical check.

## Operators and work motifs

The manual keeps a short working vocabulary. Larger reusable lists live in the [Motif Registries](motif-registries).

Examples of reusable operator motifs:

`RunSmoke`, `RunLiveBounded`, `ContentValidationGate`, `MinimalReproExtraction`, `ADRLite`, `CaptureIntake`, `StakeholderMeetingPrep`, `BriefBeforeSend`.

The motif registry is documentation memory. Runtime authorization remains governed by `operator_contract_v2`.

## Published views

A published view is a reproducible projection over governed state or generation artifacts.

Typical fields:

```text
view_id
item_id
item_kind
title
group
sort_hint
summary
next_pointer
source_refs
source_updated_at
view_generated_at
```

Views are disposable. If a view disappears and cannot be rebuilt from governed state, it was accidentally carrying authority.

## Timing and weekly heuristics

Fine-grained timing conventions belong to Weekly Ops Governance.

This manual only assumes that execution is bounded, restartable, and evidence-producing. Weekly governance may choose horizons, recurring check-ins, 14-day frames, or day-of-week defaults without making them universal data-model requirements.

## Motto

**Govern state once. Compile small surfaces. Execute boundedly. Leave evidence. Reenter through review.**
