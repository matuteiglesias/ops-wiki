---
id: checks-runbooks
title: Checks and Runbooks
sidebar_position: 50
---

## Module header
Purpose: define verification and memory: check taxonomy, runbook standards, evidence manifests, and drift failure modes.

Exports:
- Check types (smoke, run live bounded, contract, health, content validation)
- RunbookHuman and RunbookMachine minimum spec
- Evidence and manifests conventions

Imports:
- Evidence links from [Data Model](data-model#evidencelink)
- Mode done definitions from [Execution Model](execution-model#modes-v1)
- Maintenance behavior from [Day Clock and Selection](day-clock-selection)

## Jump
- [Check types](#check-types)
- [Check outcomes and frontier mapping](#check-outcomes-and-frontier-mapping)
- [Runbooks](#runbooks)
- [Evidence and manifests](#evidence-and-manifests)
- [Runbook drift](#runbook-drift)
- [Maintenance pattern](#maintenance-pattern)

---

## Check types

Checks are truth enforcement. They exist to evaluate endpoints, produce evidence, and update frontier. A check is successful only if it emits the evidence required by the endpoint.

### Check taxonomy (v0)

1. **Smoke**
   - Intent: fast, offline, fixture-driven verification.
   - Typical use: PIPELINE and TOOLSMITH.
   - Inputs: fixtures or local test inputs only.
   - Output: artifacts plus logs plus exit code.

2. **Run live bounded**
   - Intent: validate behavior on live inputs with strict bounds.
   - Typical use: SERVICE and PIPELINE.
   - Bounds: timebox, scope limit, rate limits, safe mode.
   - Output: logs, artifacts (if any), health signals.

3. **Contract test**
   - Intent: lock integration boundaries and prevent recurrence.
   - Typical use: CONTRACT.
   - Requires: minimal repro encoded and repeatable.
   - Output: repro script or test plus regression guard.

4. **Health check**
   - Intent: determine whether a service is alive, observable, and restart-safe.
   - Typical use: SERVICE.
   - Output: health status plus logs/metrics pointer.

5. **Content validation**
   - Intent: prevent silent corruption by enforcing invariants on outputs.
   - Typical use: PIPELINE, SERVICE.
   - Examples: schema validation, non-empty checks, row counts, uniqueness constraints, hash consistency.

### Required properties (v0)
Every check definition should specify:
- scope: fixture vs live
- timebox: default bounded runtime
- acceptance criteria: what counts as PASS
- evidence emitted: logs, manifests, artifacts
- failure output: where to find diagnostics

---

## Check outcomes and frontier mapping

Checks produce outcomes that feed frontier states. This mapping must be consistent or the system collapses into feelings.

### Check outcome fields (v0)
- `check_id`
- `endpoint_id`
- `status` (PASS/WARN/FAIL)
- `timestamp`
- `evidence_links[]`
- `summary` (one line)
- `diagnostics` (log pointers)

### Mapping rules (v0)
- **PASS**: exit code OK plus required evidence exists plus content validation gates pass (when applicable).
- **WARN**: check passes but evidence is weak, stale, partial, or missing auxiliary memory (runbook/prereq).
- **FAIL**: check fails, times out, or critical evidence missing, or runbook drift detected.

Notes:
- WARN is allowed as a temporary state, but must be cheap to clear and should be targeted in maintenance blocks.

---

## Runbooks

Runbooks are memory. They exist to reduce decision load, enable re-entry, and make checks executable without re-deriving context.

### Runbook classes
- **RunbookHuman**: how a human executes safely and makes decisions.
- **RunbookMachine**: how a machine executes deterministically (commands, paths, expected outputs).

A project may have both. Missing runbooks is typically WARN for active projects.

### RunbookHuman minimum spec (v0)
- Purpose (one paragraph)
- What “done” looks like (tie to endpoints)
- Preconditions and prerequisites
- How to run (checklist steps)
- Common failure modes and quick fixes
- Next pointers (what to do after PASS, WARN, FAIL)
- Ownership and cadence (who updates, when reviewed)

### RunbookMachine minimum spec (v0)
- Entry points: exact commands (make targets, scripts, CLI)
- Inputs: paths, fixtures, env vars
- Outputs: artifact locations and patterns
- Validation commands: how to check success (smoke/live/content gates)
- Logs: where they go and how to inspect
- Exit codes: expected and failure meanings
- Safety bounds: timeboxes, dry-run options, rate limits

### Runbook storage rule (v0)
- Human runbook lives in docs (wiki) and should link to endpoints and checks.
- Machine runbook lives close to code (repo) but may be mirrored in docs as a pointer list.
- Do not duplicate large procedures. Prefer pointers from docs to repo commands.

---

## Evidence and manifests

Evidence is what makes progress real. Checks must emit evidence and link it back to the frontier via EvidenceLink objects.

### EvidenceLink pointer
Use [EvidenceLink](data-model#evidencelink) for the stable reference fields.

### Evidence conventions (v0)
- Prefer a **manifest file** for each run or each endpoint evaluation.
- Prefer deterministic output directories with timestamps or run IDs.
- Prefer stable file naming for downstream automation.

### Manifest minimum spec (v0)
A manifest should contain:
- run id and timestamp
- input identifiers (paths, hashes, dataset id)
- output artifact list with sizes
- row counts or counts for key tables
- validation results summary (PASS/WARN/FAIL per gate)
- version markers when available (git hash, tool version)

### Evidence quality rule
- A check is not “green” because it ran. It is green because it emitted meaningful evidence.
- If you cannot link evidence, downgrade to WARN even if exit code is zero.

---

## Runbook drift

Runbook drift is a failure mode: the runbook says one thing, reality differs, and execution becomes unsafe or misleading.

### Drift indicators
- Commands in the runbook no longer work.
- Paths, env vars, or expected outputs changed without updating runbook.
- Runbook claims a PASS condition that checks do not enforce.
- A new “gotcha” exists but is not documented.

### Drift classification (v0)
- Drift that causes confusion but not incorrect truth: **WARN**
- Drift that misleads execution or causes false PASS / missed FAIL: **FAIL**

### Drift resolution operator (recommended)
- Update the runbook to match reality.
- Add or update a check or content validation gate so truth is enforced.
- Add a regression guard if drift came from repeated breakage.

---

## Maintenance pattern

Maintenance blocks exist to reduce WARNs and prevent slow entropy.

### What belongs in maintenance blocks
- Create or update runbook stubs (Human or Machine)
- Add missing prereq scaffolds (files, dirs, configs)
- Add content validation gates for pipelines
- Fix broken links or doc build hazards in the wiki
- Convert vague failures into DebugPackets and schedule bounded CONTRACT work

### What does not belong in maintenance blocks
- Unbounded debugging
- Large refactors
- Live risky changes without run live bounded checks

---

## Used by
- [Frontier semantics](data-model#frontier-semantics)
- [Mode done definitions](execution-model#evidence-patterns)

## See also
- [One Pager Spec](spec-one-pager)
