---
id: operator-registry
title: Operator Registry
sidebar_position: 45
---

## Module header
Purpose: provide the canonical reference list of operators (op_ids) that the system allows. Operators are the executable moves that create evidence and can change frontier state.

Exports:
- OperatorRegistry (set of allowed `op_id` values)
- Operator naming conventions
- Evidence expectations per operator (at the level of “what must exist”)
- Forward compatible operators (marked “foreseeable”)

Imports:
- Modes and runtime contracts from [Execution Model](execution-model)
- Check taxonomy and evidence conventions from [Checks and Runbooks](checks-runbooks)
- Truth objects and frontier semantics from [Data Model](data-model)
- Scheduling constraints from [Day Clock and Selection](day-clock-selection)

## When to use this page
Use this page when you need to:
- pick an operator quickly for a block
- define a new operator without inventing vocabulary
- audit whether a project is missing standard operators (smoke, runbooks, debug packet)
- generate or validate “prepared queues” for future automation

If you are doing scheduling or choosing what to work on, start at:
- [Day Clock and Selection](day-clock-selection)

If you are defining the meaning of progress, start at:
- [One Pager Spec](spec-one-pager)

## Jump
- [Rules](#rules)
- [Naming and IDs](#naming-and-ids)
- [Required fields recap](#required-fields-recap)
- [Operator list](#operator-list)
- [Used by](#used-by)

---

## Rules

1) **Operators produce evidence or they do not count.**  
A run without evidence and a next pointer is a non-event.

2) **One block, one mode, mode constrains operators.**  
If the operator is not legal in the block mode, it is not allowed.

3) **Every operator has checks.**  
Even minimal: a smoke run, a validation gate, or a dry-run contract check.

4) **Default timeboxes are mandatory.**  
If you cannot bound it, you cannot schedule it.

5) **If you drift, you pack.**  
Use DebugPacket operators to stop runaway debugging.

References:
- [Operator contract](execution-model#operator)
- [Stop rules](execution-model#stop-rules)
- [Evidence standard](spec-one-pager#evidence-standard)

---

## Naming and IDs

Conventions:
- `op_id` is stable PascalCase, verb-first: `RunSmoke`, `RepoInitUpgrade`, `RunbookMachineSpec`.
- Operator names should be action verbs and not project-specific.
- Prefer generic operators that can be reused across projects; project specifics belong in inputs and runbooks.

---

## Required fields recap

This page lists `op_id` values. The full operator schema lives in:
- [Operator](execution-model#operator)

Minimum fields to consider an operator “defined”:
- `op_id`, `name`, `mode_ids[]`, `steps[]`, `acceptance_checks[]`, `timebox_minutes`, `failure_paths[]`, `evidence_pattern`


---

## Operator Registry v0

### Allowed values (Mode IDs)

* `PIPELINE`
* `TOOLSMITH`
* `SERVICE`
* `CONTRACT`
* `GOVERNANCE`
* `CONTACT`

### Allowed values (Check types used by operators)

* `smoke`
* `run_live_bounded`
* `contract_test`
* `health_check`
* `content_validation`

### Allowed values (Common evidence outputs)

* `log`
* `manifest`
* `artifacts`
* `commit_hash`
* `frontier_update`
* `runbook_human`
* `runbook_machine`
* `debug_packet`

---

## A) Core execution operators

### `RunSmoke`

* **Modes:** PIPELINE, TOOLSMITH
* **Purpose:** Prove an endpoint with offline or fixture execution.
* **Acceptance checks:** smoke + content_validation
* **Evidence:** `build.log` or `smoke.log`, `manifest.json`, expected artifacts
* **Timebox:** 30–60
* **Failure paths:** create DebugPacket if repeated fail; otherwise fix cheap prereq and rerun.

### `RunLiveBounded`

* **Modes:** SERVICE, PIPELINE
* **Purpose:** Prove a live endpoint safely (bounded).
* **Acceptance checks:** run_live_bounded + health_check (if service)
* **Evidence:** run log, manifest (counts, timestamps), optional health snapshot
* **Timebox:** 30–90
* **Failure paths:** fallback to smoke; DebugPacket if live-only failure.

### `ContentValidationGate`

* **Modes:** PIPELINE, TOOLSMITH, SERVICE, CONTRACT
* **Purpose:** Enforce schema/content invariants on outputs.
* **Acceptance checks:** content_validation
* **Evidence:** validation report + manifest
* **Timebox:** 20–45
* **Failure paths:** emit anomaly report; schedule CONTRACT.

### `FreshnessCheck`

* **Modes:** PIPELINE, SERVICE
* **Purpose:** Verify artifacts are recent enough per freshness policy.
* **Acceptance checks:** content_validation (freshness rule)
* **Evidence:** freshness report + evidence links to latest artifacts
* **Timebox:** 10–25
* **Failure paths:** schedule pipeline run; downgrade to WARN if expected.

---

## B) Scaffolding and repo hygiene operators

### `RepoInitUpgrade`

* **Modes:** TOOLSMITH, SERVICE, PIPELINE
* **Purpose:** Standardize repo so checks and runs are predictable.
* **Acceptance checks:** smoke (basic), content_validation (lint or file presence)
* **Evidence:** commit hash + file diff summary + manifest of repo structure
* **Timebox:** 60–120
* **Failure paths:** minimal scaffolding only; defer deeper refactor.

### `PrereqsBootstrap`

* **Modes:** TOOLSMITH, PIPELINE
* **Purpose:** Create missing required stubs (runbooks, make targets, folders).
* **Acceptance checks:** content_validation (presence + minimal structure)
* **Evidence:** created files list + manifest
* **Timebox:** 30–60
* **Failure paths:** if too many missing pieces, create GOVERNANCE note and cap.

### `DefineCapabilitiesAndTests`

* **Modes:** TOOLSMITH, PIPELINE
* **Purpose:** Turn a project into endpoints + checks (VAC aligned).
* **Acceptance checks:** content_validation (spec completeness), smoke (if possible)
* **Evidence:** updated project spec + new endpoint definitions + manifest
* **Timebox:** 60–120
* **Failure paths:** if unclear value, switch to GOVERNANCE and define VAC first.

### `ADRLite`

* **Modes:** TOOLSMITH, CONTRACT, GOVERNANCE, SERVICE
* **Purpose:** Record a decision that prevents re-litigating.
* **Acceptance checks:** content_validation (ADR present, linked)
* **Evidence:** ADR markdown + link from runbook/spec
* **Timebox:** 20–45
* **Failure paths:** if decision not ready, record options and a deadline.

---

## C) Debug and boundary stabilization operators

### `MinimalReproExtraction`

* **Modes:** CONTRACT
* **Purpose:** Convert “weird behavior” into reproducible steps.
* **Acceptance checks:** contract_test (or smoke that reproduces)
* **Evidence:** repro script/commands + logs + input hashes
* **Timebox:** 45–90
* **Failure paths:** if cannot reproduce, capture environment snapshot and stop.

### `DebugPacketCreate`

* **Modes:** CONTRACT, SERVICE
* **Purpose:** Stop drift and crystallize the failure.
* **Acceptance checks:** content_validation (packet complete)
* **Evidence:** debug_packet record + links to logs
* **Timebox:** 15–25
* **Failure paths:** if unclear, record unknowns and next experiment only.

### `ResolveDebugPacket`

* **Modes:** CONTRACT, SERVICE
* **Purpose:** Close a known packet with a fix and a guardrail.
* **Acceptance checks:** smoke or run_live_bounded + content_validation
* **Evidence:** commit hash + passing check output + updated packet status
* **Timebox:** 60–120
* **Failure paths:** if fix expands scope, split packet and stop.

### `RegressionGuardrailAdd`

* **Modes:** CONTRACT, TOOLSMITH, PIPELINE
* **Purpose:** Prevent reintroducing the same bug.
* **Acceptance checks:** smoke (new test passes), content_validation
* **Evidence:** test/gate added + manifest
* **Timebox:** 45–90
* **Failure paths:** minimal guardrail first (assertion), improve later.

---

## D) Runbook and knowledge operators

### `RunbookHumanDraft`

* **Modes:** GOVERNANCE, CONTACT
* **Purpose:** Create the human “how this runs” memory.
* **Acceptance checks:** content_validation (sections present)
* **Evidence:** runbook_human + links to endpoints
* **Timebox:** 30–60
* **Failure paths:** if too hard, write “Minimum viable runbook” only.

### `RunbookMachineSpec`

* **Modes:** TOOLSMITH, SERVICE, PIPELINE
* **Purpose:** Make execution reproducible via commands, env, outputs.
* **Acceptance checks:** smoke (or at least command placeholders), content_validation
* **Evidence:** runbook_machine + example commands + expected outputs
* **Timebox:** 45–90
* **Failure paths:** if cannot run yet, clearly mark TODO and add prereqs list.

### `EvidenceManifestWrite`

* **Modes:** PIPELINE, SERVICE, TOOLSMITH
* **Purpose:** Produce structured evidence for an existing artifact set.
* **Acceptance checks:** content_validation (JSON loads, counts match)
* **Evidence:** manifest + evidence links
* **Timebox:** 20–45
* **Failure paths:** if artifacts missing, downgrade endpoint and schedule run.

---

## E) Governance operators

### `DailyFrontierCompute`

* **Modes:** GOVERNANCE
* **Purpose:** Update the truth map for today.
* **Acceptance checks:** content_validation (frontier record valid)
* **Evidence:** frontier_update + summary
* **Timebox:** 15–30
* **Failure paths:** partial frontier allowed; mark unknown explicitly.

### `WeeklyReview`

* **Modes:** GOVERNANCE
* **Purpose:** Reduce decision load; adjust cadence and WIP.
* **Acceptance checks:** content_validation (review artifact exists)
* **Evidence:** weekly review note + changes to priorities/cadence
* **Timebox:** 45–90
* **Failure paths:** if overwhelmed, run “minimal weekly review” (3 bullets).

### `MonthlySynthesis`

* **Modes:** GOVERNANCE
* **Purpose:** Extract learnings, archive, and set constraints for next month.
* **Acceptance checks:** content_validation
* **Evidence:** synthesis memo + updated project states
* **Timebox:** 60–120
* **Failure paths:** if too big, synthesize only the top 3 projects.

### `AssessSeasonForProject` (foreseeable)

* **Modes:** GOVERNANCE
* **Purpose:** Decide the project’s role this season (active/maintain/archive).
* **Acceptance checks:** content_validation (decision + rationale)
* **Evidence:** season decision memo + cadence update
* **Timebox:** 30–60
* **Failure paths:** if uncertain, set a 2-week experiment window.

### `LockInSession`

* **Modes:** GOVERNANCE, CONTACT
* **Purpose:** Convert a session into durable pointers and evidence links.
* **Acceptance checks:** content_validation (lock-in fields present)
* **Evidence:** lock-in memo + links
* **Timebox:** 15–30
* **Failure paths:** minimal lock-in only (what changed, next pointer).

### `WIPCapEnforce`

* **Modes:** GOVERNANCE
* **Purpose:** Stop runaway parallelism; force closing or archiving.
* **Acceptance checks:** content_validation (WIP list updated)
* **Evidence:** updated active list + archived list
* **Timebox:** 15–30
* **Failure paths:** if resistance, freeze new starts for 48h.

---

## F) Contact operators

### `CRMSprint`

* **Modes:** CONTACT
* **Purpose:** Batch outreach and follow-ups with low overhead.
* **Acceptance checks:** content_validation (touch count recorded)
* **Evidence:** log of touches + scheduled follow-ups
* **Timebox:** 20–45
* **Failure paths:** if blocked, do “queue grooming” only.

### `StakeholderUpdateSend` (foreseeable)

* **Modes:** CONTACT, SERVICE
* **Purpose:** Send a weekly status update to key stakeholders.
* **Acceptance checks:** content_validation (draft complete, sent recorded)
* **Evidence:** message text + recipient list + date
* **Timebox:** 20–45
* **Failure paths:** if not ready, send a minimal “holding update”.

### `ContactQueueGroom`

* **Modes:** CONTACT
* **Purpose:** Clean list, pick next targets, define next touches.
* **Acceptance checks:** content_validation
* **Evidence:** updated queue + next touch plan
* **Timebox:** 15–30
* **Failure paths:** if too big, groom only top 10.

---

## G) Planning and prepared-work operators (explicitly forward-compatible)

These support the future “precomputed queue per mode” idea without assuming the full automation exists.

### `PrepareBlockQueue` (foreseeable)

* **Modes:** GOVERNANCE, TOOLSMITH
* **Purpose:** Precompute “if you choose mode X, here are top ops” for a block.
* **Acceptance checks:** content_validation (queue entries valid)
* **Evidence:** queue artifact (YAML/JSON/MD) with ranked options
* **Timebox:** 30–60
* **Failure paths:** if missing data, generate only 1 option per mode.

### `GenerateOperatorCandidates` (foreseeable)

* **Modes:** GOVERNANCE, TOOLSMITH
* **Purpose:** From frontier and cadence, propose operator runs that flip endpoints.
* **Acceptance checks:** content_validation
* **Evidence:** candidate list with expected evidence and timeboxes
* **Timebox:** 30–60
* **Failure paths:** fallback to manual selection.

### `PlanCheckinsFromCadence` (foreseeable)

* **Modes:** GOVERNANCE
* **Purpose:** Generate a loose schedule of upcoming check-ins (non-micromanaging).
* **Acceptance checks:** content_validation
* **Evidence:** schedule artifact with due windows and project subsets
* **Timebox:** 20–45
* **Failure paths:** plan only the next 7 days.



---

## Used by
- [Mode constraints](execution-model#modes-v1)
- [Prepared queues](day-clock-selection#selection-policy)
- [Checks taxonomy](checks-runbooks#check-types)
- [Frontier semantics](data-model#frontier)

## See also
- [Templates](templates)
- [Walkthrough: One Project End-to-End](walkthrough-one-project)
- [One Pager Spec](spec-one-pager)
