---
id: data-model
title: Data Model
sidebar_position: 30
---

## Module header
Purpose: define the truth objects and invariants for projects, lightweight work units, endpoints, frontier, cadence, and evidence.

Exports:
- Project
- WorkUnit (Case | Batch | Sprint | Encounter)
- VACChain
- Endpoint
- FrontierState
- EvidenceLink
- CadenceRule

Imports:
- Modes and operator runs from [Execution Model](execution-model)
- Check types from [Checks and Runbooks](checks-runbooks)
- Selection policy from [Day Clock and Selection](day-clock-selection)

## Jump
- [Project](#project)
- [Lightweight work units](#lightweight-work-units)
- [VACChain](#vac-chain)
- [Endpoint](#endpoint)
- [Frontier](#frontier)
- [Frontier semantics](#frontier-semantics)
- [EvidenceLink](#evidencelink)
- [CadenceRule](#cadencerule)

---

## Project

A unit of ownership and continuity. Projects are the primary index for the portfolio. All execution and truth ultimately attaches to a project.

### Fields
- `project_id` (stable, unique)
- `title` (display name, can change without breaking links)
- `home` (portfolio category)
- `repo_paths[]` (0 or more; local paths or URLs)
- `default_mode` (one of the modes v1, optional but recommended)
- `cadence` (reference to a `CadenceRule` or inline frequency)
- `state` (idea | active | paused | messy-active | archived)
- `tags[]` (free labels, including optional tag `MODEL/ANALYZE`)
- `owner_type` (human-owned | machine-owned | mixed)
- `next_checkin_due` (date)
- `vac_chains[]` (0 or more)
- `endpoints[]` (derived via VAC chains, but may be stored for convenience)

### Invariants
- Every **active** project must map to at least one VAC chain.
- Every **active** project must map to at least one endpoint.
- Projects may have zero repos (pure governance/contact projects), but must still have endpoints if active.

### Notes
- “Home” is where it belongs. “Mode” is how you work. Do not merge them.
- A project can be human-owned with machine-run checks, or machine-owned with human runbooks.

---

## Lightweight work units

Lightweight work units are valid first-class planning/execution objects for short-lived or situational work.  
They are intentionally lighter than Project and **do not require VAC chains or endpoints**.

Types:
- `Case`: one bounded situation to resolve (usually one outcome, one thread).
- `Batch`: repeated similar actions handled together (N items, same flow).
- `Sprint`: short focused effort window for repair/prep/cleanup/build-up.
- `Encounter`: a concrete interaction event (meeting/call/visit/conversation) with follow-up.

### Fields (minimum contract)
- `unit_type` (`case` | `batch` | `sprint` | `encounter`)
- `unit_id` (stable, unique)
- `title`
- `objective` (one clear done statement)
- `horizon` (same-day | 2-7-days | 1-4-weeks)
- `owner_type` (human-owned | machine-owned | mixed)
- `state` (idea | active | blocked | done | archived)
- `artifacts_expected[]` (notes, packets, logs, docs, outputs)
- `next_pointer` (one-line next action)
- `project_id` (optional; link if this unit belongs to an existing project)

### Invariants
- Work units may exist independently of any project.
- Work units may attach to a project (`project_id`) when continuity already exists.
- If a work unit persists across repeated cycles or gains operational surface area, promote to project.
- Promotion is explicit: create project, then map prior unit artifacts as seed context.

### Promotion rule (v0)
Promote `Case/Batch/Sprint/Encounter` to `Project` when at least 2 of these are true:
- the unit survives beyond its original horizon,
- it needs recurring cadence/check-ins,
- it now requires stable runbooks/operators across sessions,
- it accumulates multiple dependent subthreads.

### Use Project vs Work Unit (decision rule)
Use **Project** when continuity, verification, and maintenance are expected.  
Use **Case/Batch/Sprint/Encounter** when scope is short, situational, or throughput-oriented.

### Examples
1) **Family meeting packet** (`encounter`)
   - objective: leave meeting with decisions + open asks + next owner
   - artifacts_expected: packet draft, decision note, follow-up list

2) **Batch of 10 job applications** (`batch`)
   - objective: submit 10 applications with tailored snippets
   - artifacts_expected: application tracker row updates, sent links, next follow-up pointer

3) **Room repair/prep block** (`sprint`)
   - objective: restore room to usable state in one 2-hour sprint
   - artifacts_expected: checklist, before/after photos, missing-materials note

---

## VACChain {#vac-chain}

A Value-Add Chain describes value in the world and its production path. It ties a project to one or more endpoints that can be verified.

### Fields
- `vac_id` (stable, unique)
- `project_id`
- `description` (one paragraph max in v0)
- `endpoints[]` (list of `endpoint_id`)
- `prerequisites[]` (optional, referenced assets or conditions)
- `owner_type` (human-owned | machine-owned | mixed)

### Invariants
- VAC chains must reference at least one endpoint.
- VAC chains define *what value exists*; they do not define how to execute (execution belongs to operators and runbooks).

### Example
- “Accounting ingest -> canonical ledger -> reports” is a VAC chain.
- “Deploy ops wiki -> build green -> domain mapped” is a VAC chain.

---

## Endpoint

An endpoint is a computable “done” claim. Endpoints are the smallest units that frontier can evaluate.

### Fields
- `endpoint_id` (stable, unique)
- `vac_id`
- `type` (suggested enum below)
- `check_method` (the check or command that evaluates it)
- `artifacts_expected[]` (paths or patterns)
- `freshness_policy` (how recent evidence must be to count)
- `severity` (low | medium | high | critical)
- `runbook_refs[]` (optional pointers to human/machine runbooks)

### Suggested endpoint types (v0)
Keep this short; use tags if needed:
- `ingest`
- `materialize`
- `report`
- `service_health`
- `deploy`
- `contract_boundary`
- `content_quality`

### Invariants
- Endpoint must be testable via a check method.
- Endpoint must name required evidence artifacts (even if patterns).
- Endpoint evaluation must be bounded (timebox or fixture) unless explicitly “live bounded”.

### Relationship to checks
- Endpoints do not “run themselves”. Operators run checks; checks emit evidence; frontier reads results.

---

## Frontier

Frontier is the daily map of truth derived from endpoint evaluation. It is the primary selection input for work.

### Fields
- `project_id`
- `endpoint_statuses` (map from `endpoint_id` -> PASS/WARN/FAIL)
- `derived_status` (PASS/WARN/FAIL; project-level aggregation)
- `timestamp`
- `evidence_links[]` (list of `EvidenceLink`)
- `notes` (optional short string)

### Derived status rule (v0)
- If any endpoint is FAIL -> project derived status is FAIL.
- Else if any endpoint is WARN -> project derived status is WARN.
- Else -> PASS.

---

## Frontier semantics

This is the contract that makes truth stable across time.

### PASS
PASS means:
- The check succeeds.
- Required evidence artifacts exist.
- Content validation gates (when applicable) pass.

PASS is not “it ran”. PASS is “it ran and produced meaningful outputs”.

### WARN
WARN means:
- The check may succeed, but execution is not safe or complete due to:
  - missing runbook
  - missing prerequisite scaffolding
  - weak or partial evidence (artifact exists but incomplete)
  - freshness is stale (evidence too old for the endpoint’s policy)
  - link hygiene warnings in doc systems (acceptable only if explicitly allowed)

WARN is a portfolio smell. Most WARNs should be cheap to reduce during maintenance blocks.

### FAIL
FAIL means:
- The check fails, or
- Critical evidence is missing, or
- The runbook misleads execution (runbook drift), or
- The endpoint is not testable (no runnable check method for an active endpoint)

FAIL triggers bounded debugging behavior. Drift converts to a debug packet.

---

## EvidenceLink

Evidence is what makes progress real. Evidence links connect checks and artifacts to projects and frontier states.

### Fields
- `artifact_path` (file path or directory)
- `manifest_path` (optional, strongly recommended)
- `log_path` (optional)
- `commit_hash` (optional, recommended for repos)
- `sheet_row` (optional pointer to a tracking row)
- `created_at` (timestamp)

### Invariants
- Evidence must be linkable from a check-in note or from the frontier.
- For pipelines, evidence should include counts and hashes via manifests when feasible.

### Recommended manifest contents (v0)
- artifact list with sizes
- row counts for key tables
- dataset or input hash
- run timestamp
- version info (git hash, tool version) if available

---

## CadenceRule

Cadence defines when a project is due for check-in and how overdue states behave.

### Fields
- `frequency_days` (integer, eg 1, 3, 7, 10, 30)
- `overdue_behavior` (how to triage when late)
- `reentry_protocol` (minimal actions to resume after gaps)
- `grace_days` (optional)
- `preferred_block_type` (optional, eg MAINT vs FOCUS)
- `default_mode` (optional override, else project default)

### Invariants
- Cadence must support low-friction re-entry.
- Overdue behavior must not require reading backlogs to resume.

### Suggested overdue behavior (v0)
- If overdue less than 2x frequency: do a normal check-in.
- If overdue more than 2x frequency: do a catch-up check-in:
  - update frontier snapshot
  - run one cheap operator
  - produce one next pointer

---

## Used by
- [Selection policy](day-clock-selection#selection-policy)
- [Operator instances](execution-model#oprun)
- [Checks and evidence](checks-runbooks#evidence-and-manifests)

## See also
- [One Pager Spec](spec-one-pager)
