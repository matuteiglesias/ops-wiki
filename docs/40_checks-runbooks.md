---
id: checks-runbooks
title: Checks and Runbooks
sidebar_position: 50
---

# Checks and Runbooks

## Purpose

Checks enforce claims. Runbooks preserve execution memory.

Neither should become a parallel state system.

## Check families

The following families remain broadly useful:

### Smoke

Fast bounded verification, usually fixture/offline where possible.

### Run live bounded

Validate behavior against live inputs under explicit scope and safety bounds.

### Contract test

Encode an integration boundary or a minimal reproduction so recurrence is detectable.

### Health check

Observe whether a running system is alive, inspectable, and behaving under its contract.

### Content validation

Check artifact invariants such as schema, non-empty output, row counts, uniqueness, required narrative fields, or digest consistency.

These are check motifs. Concrete projects may define additional checks.

## Endpoint relationship

An Endpoint makes a claim.

A check provides evidence for or against that claim.

Do not require all domains to map results into one PASS/WARN/FAIL frontier.

A check can expose the domain-native result as long as the acceptance rule is explicit and inspectable.

## Check definition

A useful check definition includes:

- scope;
- input/source;
- acceptance criteria;
- evidence emitted;
- failure diagnostics;
- safety bounds where relevant.

## Runbooks

Runbooks reduce re-derivation cost.

### Human runbook

Useful contents:

- purpose;
- what success means;
- prerequisites;
- safe procedure;
- common failures;
- validation;
- restart/next pointers.

### Machine runbook

Useful contents:

- exact entrypoint/command;
- required inputs and environment;
- output locations;
- validation command;
- logs;
- failure behavior;
- safety/dry-run options.

Do not duplicate large procedures across manual and repository. The manual should point to the executable authority when one exists.

## Evidence manifests

For technical runs, a manifest often makes evidence cheaper to inspect.

Useful fields include:

- run identity/time;
- input identifiers/digests;
- output artifacts;
- counts/sizes;
- validation results;
- code/tool revision.

The exact schema belongs to the producer.

## Drift

A runbook is stale when it describes a system that no longer exists.

Severity depends on consequence:

- harmless wording drift → documentation cleanup;
- misleading command/path → operational defect;
- false success claim → serious contract defect.

The fix is to align the runbook and the executable check, not to add another explanatory layer.

## Maintenance

Bounded maintenance can include:

- updating a stale runbook;
- adding a missing validation gate;
- repairing a broken evidence pointer;
- converting a vague recurring failure into a reproducible check;
- documenting one repeatedly rediscovered prerequisite.

It should not become a default excuse for broad refactoring.

## Relationship to current Office

Office v2 runtime health is derived from run records and current runtime evidence.

This manual documents verification practices; it does not own `runtime_health_v2`.

## See also

- [Authority, State & Projection Model](data-model)
- [Execution Model](execution-model)
- [Motif Registries](motif-registries)
