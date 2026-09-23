---
id: motif-registries
title: Motif Registries
sidebar_position: 60
---

# Motif registries

The manual keeps only the small vocabulary needed to operate the current system. Larger reusable vocabularies live in machine-readable registries so useful names are not lost merely to keep prose light.

## Authority boundary

These are **documentation and memory registries**.

They are canonical for naming reusable motifs in this manual, but they are not runtime authorization.

- Live governed operator powers remain in Control Tower `operator_contract_v2`.
- Live Office work kinds remain the typed work emitted by Office v2.
- A motif may be useful even when no current runtime object has that exact name.
- A runtime contract always wins if a registry motif conflicts with current governed state.

## Primary work kinds

Office v2 has five canonical work facets:

- `DECIDE` — Principal judgment is structurally required.
- `UNBLOCK` — missing context, identity, or preparation prevents safe progress.
- `VERIFY` — bounded evidence gathering or diagnosis is required.
- `EXECUTE` — work is ready for bounded action.
- `MAINTAIN` — bounded upkeep is explicitly expressed.

The full registry also preserves descriptive motifs such as research, synthesize, outreach, publish, repair, reconcile, and triage.

See [`registries/work-motifs.yaml`](./registries/work-motifs.yaml).

## Primary operator motifs

Common operator motifs worth remembering:

- `RunSmoke`
- `RunLiveBounded`
- `ContentValidationGate`
- `MinimalReproExtraction`
- `RegressionGuardrailAdd`
- `ADRLite`
- `CaptureIntake`
- `SessionCondense`
- `StakeholderMeetingPrep`
- `BriefBeforeSend`
- `CRMSprint`
- `EvidenceManifestWrite`

These names are reusable patterns, not permission grants. Before execution, the current `operator_contract_v2` and execution packet determine what is actually allowed.

See [`registries/operator-motifs.yaml`](./registries/operator-motifs.yaml).

## Adding a motif

Add a motif when the name saves repeated explanation across fronts or agents.

Do not add a motif merely because one task happened once. Prefer ordinary language until a pattern recurs.

A good motif has:

- a stable name;
- one-sentence intent;
- a family;
- expected evidence;
- an explicit relationship to live runtime semantics when one exists.
