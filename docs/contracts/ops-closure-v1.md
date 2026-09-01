---
title: Ops Closure v1
sidebar_position: 35
---

# Ops Closure v1

## Purpose

Define the smallest structured return packet from Ops to Office after an execution block or bounded work session.

This contract does not move live state into this wiki. It documents the handoff shape so humans, agents, and future runtimes can produce compatible closure evidence.

## Contract identity

- Contract: `artifact:ops.closure@1`
- Producer: Ops execution
- Consumer: Office reingest
- Authority: Ops owns execution facts; Office owns any resulting Carry State mutation.

## Required fields

| Field | Meaning |
|---|---|
| `front_id` | Canonical operational front identity. |
| `status` | `done`, `partial`, `blocked`, or `no-change`. |
| `evidence` | One or more concrete evidence pointers or a compact evidence statement. |
| `closure` | What changed and what remains. |
| `next_touch` | Exact restart instruction if more work remains; `null` when genuinely complete. |
| `carry_recommendation` | Suggested Office posture: `Active`, `Watch`, `Support-needed`, `Escalate`, `Parked`, or `no-change`. |
| `escalation` | Whether Principal/Office judgment is required, plus reason when true. |

## Optional fields

- `horizon_recommendation`: `Today`, `This week`, `Later`, or `no-change`.
- `follow_up_spawns`: requested Office preparation such as `unlocker-brief`, `health-check`, `decision-packet`, `nudge`, `review-item`, or `block-candidate`.
- `repo_evidence`: repository/PR/commit/test pointers when the executed work involved code. These are evidence references, not repository authority.
- `notes`: compact information that does not fit the fields above.

## Example

```yaml
contract: artifact:ops.closure@1
front_id: fcv-research
status: partial
evidence:
  - pull_request: matuteiglesias/fcv-empirical-data#42
  - test: "pytest tests/test_boundary.py -q -> 18 passed"
closure: "Boundary normalization is implemented and tested; downstream treatment construction remains."
next_touch: "Run the end-to-end treatment fixture against the normalized boundary output."
carry_recommendation: Active
horizon_recommendation: This week
follow_up_spawns:
  - review-item
escalation:
  required: false
  reason: null
```

## Invariants

1. Evidence describes what actually happened; it is not replaced by intent or a plan.
2. `carry_recommendation` is a recommendation. Office decides and owns canonical Carry State.
3. `next_touch` must be restartable and concrete when status is `partial` or `blocked`.
4. `done` must not carry a fake next touch merely to keep work alive.
5. `blocked` should identify the blocker in `closure`, `escalation`, or `notes`.
6. Repository links are evidence/context only; they do not make `repo_id` equivalent to `front_id`.
7. A closure packet may be produced manually. Machine validation is useful but is not required for the contract to be legitimate.

## Minimal human form

When speed matters, the same contract can be written compactly:

```text
front: <front_id>
status: <done|partial|blocked|no-change>
evidence: <proof>
closure: <what changed / remains>
next: <exact restart or none>
carry: <recommendation>
escalate: <yes/no + reason>
```

Office can later normalize this into machine-readable form.
