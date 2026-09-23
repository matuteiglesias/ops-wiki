---
id: execution-model
title: Execution Model
sidebar_position: 40
---

# Execution Model

## Purpose

This page defines the durable execution discipline without recreating the Office runtime.

Current runtime work kinds and operator permissions are governed elsewhere. Ops Manual preserves the reusable execution ideas that help humans and agents act well.

## The bounded-move contract

A useful execution move has:

- one clear objective;
- an explicit source or work referent;
- known allowed powers;
- expected evidence;
- a stop rule;
- a restart pointer when unfinished.

The move can be technical, analytical, governance, relationship, or operational work.

## Current runtime work kinds

Office v2 currently emits:

- `DECIDE`
- `UNBLOCK`
- `VERIFY`
- `EXECUTE`
- `MAINTAIN`

These are canonical runtime facets.

They are intentionally small. Descriptive work motifs such as research, diagnose, reconcile, outreach, publish, migrate, or synthesize live in the [work motif registry](motif-registries).

## Operator contracts vs operator motifs

### Runtime operator contract

`operator_contract_v2` is authoritative for live operator powers, prohibitions, seams, and buses.

Execution packets constrain those powers further for a particular run.

### Operator motif

A motif is a memoized reusable move such as:

- `RunSmoke`
- `MinimalReproExtraction`
- `RegressionGuardrailAdd`
- `ADRLite`
- `CaptureIntake`
- `StakeholderMeetingPrep`
- `BriefBeforeSend`

The [operator motif registry](motif-registries) preserves a larger vocabulary without claiming each motif is a current runtime operator.

## Craft / mode language

Older Ops versions required every block to select exactly one mode from:

`PIPELINE`, `TOOLSMITH`, `SERVICE`, `CONTRACT`, `GOVERNANCE`, `CONTACT`.

These remain useful **craft labels** when they help a human frame the work, but they are no longer universal machine semantics.

Use them descriptively:

- **pipeline** — repeatable input → validated artifact flow;
- **toolsmith** — interface/scaffold/tool building;
- **service** — running-system reliability;
- **contract** — boundary stabilization and regression protection;
- **governance** — decision-load reduction and constraint setting;
- **contact** — relationship/opportunity movement.

Do not infer runtime permission from a craft label.

## Stop rules

Stop rules prevent local effort from expanding into a new project by accident.

Useful universal rules:

- If the evidence target is no longer clear, stop and restate the Endpoint.
- If a failure cannot be reproduced, package the observed facts before trying more fixes.
- If a bounded repair becomes an architecture redesign, split the work explicitly.
- If the next move requires a new permission or governance mutation, return for review.
- If a communication keeps being polished without changing the decision surface, send or explicitly defer.

Time limits may be useful human heuristics, but they belong to the chosen work context or Weekly Governance rather than one mandatory Ops clock.

## Debugging

A DebugPacket remains a useful motif, not a required universal schema.

A compact packet contains:

```text
symptom
minimal_repro_or_observation
hypotheses
experiments
evidence
current_conclusion
next_experiment_or_fix
```

Its purpose is to make an unclear failure restartable.

## Evidence patterns

### Technical

Typical evidence:

- test/check result;
- manifest;
- generated artifact;
- commit/PR;
- runtime/run record.

### Analytical

Typical evidence:

- reproducible notebook/script;
- result table/figure;
- assumptions;
- interpretation tied to source data.

### Governance

Typical evidence:

- explicit decision;
- changed constraint;
- reviewed state proposal;
- updated contract or source-of-truth record.

### Relationship / opportunity

Typical evidence:

- sent message;
- meeting packet;
- response;
- follow-up state;
- source listing or opportunity record.

## VACChain / Endpoint

Execution should be able to answer which Endpoint it is changing.

When that is unclear, VACChain reasoning can re-establish the value path before more work is done.

## See also

- [Authority, State & Projection Model](data-model)
- [Checks and Runbooks](checks-runbooks)
- [Motif Registries](motif-registries)
