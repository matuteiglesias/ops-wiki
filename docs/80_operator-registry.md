---
id: operator-registry
title: Operator Motifs
sidebar_position: 70
---

# Operator Motifs

## Purpose

Keep the most useful repeatable moves visible without making this page a second runtime operator authority.

Live powers and prohibitions are governed by Control Tower `operator_contract_v2` and the current execution packet.

The full memoized vocabulary lives in [Motif Registries](motif-registries).

## Primary motifs

### Verification

- **RunSmoke** — prove a bounded path with fixtures/offline inputs.
- **RunLiveBounded** — validate a live path under explicit safety bounds.
- **ContentValidationGate** — enforce structural/content invariants.
- **FreshnessCheck** — determine whether evidence is current enough.

### Debugging / boundary stabilization

- **MinimalReproExtraction** — make unclear behavior reproducible.
- **DebugPacketCreate** — package an unresolved failure so work can stop cleanly.
- **RegressionGuardrailAdd** — encode a test/assertion preventing recurrence.
- **ADRLite** — record a decision cheaply enough to prevent relitigation.

### Capture / preparation

- **CaptureIntake** — preserve raw input.
- **SessionCondense** — compress it into decisions and unknowns.
- **NextPointerFromCapture** — derive one restartable move.
- **EvidenceManifestWrite** — bind outputs into inspectable evidence.

### Relationship / opportunity

- **CRMSprint** — move a bounded batch of touches.
- **TargetBatchTriage** — classify a raw target list.
- **StakeholderMeetingPrep** — prepare objective, asks, context, and risks.
- **BriefBeforeSend** — validate intent, facts, risk, and CTA before a consequential send.
- **FollowUpStrategy** — turn an interaction into explicit follow-up state.

## How to use a motif

A motif answers “what kind of move is this?” It does not answer “am I allowed to do it?”

Before execution:

1. identify the current work item / human objective;
2. inspect the current operator contract or human authority;
3. choose a fitting motif;
4. make evidence and stop rule explicit;
5. execute within the actual allowed powers.

## Adding motifs

Add a motif to the machine-readable registry when:

- the pattern recurs across fronts;
- the name saves explanation;
- expected evidence is recognizable;
- the pattern is not already ordinary language.

Avoid project-specific operators in the global motif registry.

## Full registry

See:

- [Motif Registries](motif-registries)
- `docs/registries/operator-motifs.yaml`

The YAML file is the canonical documentation registry for motif names. It does **not** supersede `operator_contract_v2`.
