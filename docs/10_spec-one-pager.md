---
id: spec-one-pager
title: One Pager Spec v1
sidebar_position: 20
---

## Purpose
Canonical reference for the ontology. This page is stable and changes rarely.

This system exists to run a multi-project life with low re-entry friction by turning work into modes, operators, checks, and evidence. Success means reduced decision load and verifiable artifacts.

## Core loop
Frontier tells you what is true. Clock schedules a block. Block chooses one mode. Mode allows only some operators. Operators produce evidence. Evidence updates frontier.

Entry rule: when input starts as raw human context (speech, mixed fronts, live notes), run intake/capture operators first (`CaptureIntake` → `SessionCondense` → `NextPointerFromCapture`) before standard execution operators.

## Jump
- [Objects and contracts](#objects-and-contracts)
- [Modes v1](#modes-v1)
- [Fast mode classifier](#fast-mode-classifier)
- [Operators](#operators)
- [Runbooks and checks](#runbooks-and-checks)
- [Day clock and cadence](#day-clock-and-cadence)
- [Evidence standard](#evidence-standard)
- [Operational rules](#operational-rules)
- [Drill-down index](#drill-down-index)

## Imports
- Details of objects live in [Data Model](data-model)
- Details of runtime live in [Execution Model](execution-model)
- Details of verification live in [Checks and Runbooks](checks-runbooks)
- Details of scheduling live in [Day Clock and Selection](day-clock-selection)

---

## Objects and contracts

### Project
A unit of ownership and continuity.

Fields:
- `project_id, title, home, repo_path(s), default_mode, cadence, state, tags, owner_type, next_checkin_due`

Rules:
- Every project maps to at least one VAC chain.
- Every project maps to at least one endpoint.

### Work units (lightweight)
Short-lived or situational units that should not be force-fit into full projects.

Types:
- `Case`
- `Batch`
- `Sprint`
- `Encounter`

Fields:
- `id, title, objective, horizon, owner_type, state, artifacts_expected, next_pointer, project_id?`

Rules:
- Work units may hang from a project or exist independently.
- Work units do not require VAC chains or endpoints.
- Promote to project only if continuity/maintenance needs emerge.

### VAC chain
Defines value in the world.

Fields:
- `vac_id, project_id, description, endpoints[], prerequisites[], owner_type`

Rule:
- VAC says what value exists; endpoints say how to verify it.

### Endpoint
A computable done claim.

Fields:
- `endpoint_id, vac_id, type, check_method, artifacts_expected, freshness_policy, severity`

Rules:
- Endpoints must be testable.
- Endpoints must point to evidence artifacts.

### Frontier
Daily map of truth derived from endpoint checks.

States:
- **PASS**: checks succeed and required evidence exists
- **WARN**: missing runbook, weak evidence, missing prerequisite, or other non-fatal deficit
- **FAIL**: check fails or critical evidence is missing

Fields:
- `project_id, endpoint_statuses, derived_status, timestamp, evidence_links`

---

## Modes v1
A mode is a craft: mindset plus allowed moves plus evidence definition. Each time block selects exactly one mode.

1. **PIPELINE**
   - Transform inputs into validated artifacts repeatably.
   - Done: smoke PASS plus non-trivial outputs plus content checks.

2. **TOOLSMITH**
   - Build scalable interfaces and scaffolds (CLI, templates, helpers).
   - Done: stable interface, usage help, smoke run, predictable exit codes.

3. **SERVICE**
   - Keep a running thing reliable (bots, timers, deploys).
   - Done: restart-safe, scheduled runs work, logs and health checks exist, runbook matches reality.

4. **CONTRACT**
   - Stabilize integration boundaries (env, API, dependencies).
   - Done: minimal repro, fix encoded, regression guardrail, decision note if needed.

5. **GOVERNANCE**
   - Reduce decision load and constrain WIP.
   - Done: an artifact that changes future behavior plus a next pointer.
   - Includes intake/capture operators to turn raw human context into executable pointers.

6. **CONTACT**
   - Stakeholder and opportunity execution (applications, recruiters, sensitive meetings) with bounded prep and follow-through.
   - Done: prepared packet/brief/draft is produced, sent/logged state is captured, and a follow-up schedule exists.
   - Subfamilies (taxonomy-light): `OPPORTUNITY`, `RECRUITER`, `STAKEHOLDER_CASE`.

Optional tag (not a mode): `MODEL/ANALYZE`

---

## Fast mode classifier
Default mapping from session title (override allowed, keep it rare):

- **SERVICE**: deploy, domain, hosting, apache, systemd, timer, bot, stability, vercel, github pages
- **CONTRACT**: api, integration, config, env, keyring, abi, postgres, promptflow
- **TOOLSMITH**: cli, tool, script, framework, template, schema, setup, playbook
- **PIPELINE**: etl, ingest, normalize, backfill, export, jsonl, mdx, csv
- **GOVERNANCE**: strategy, review, roadmap, triage, prioritize, control tower, standards, wip
- **CONTACT**: outreach, lead, linkedin, crm, follow-up, qualification

---

## Operators
Operators are repeatable moves that produce instances.

Operator fields:
- `op_id, mode(s), inputs, steps, outputs, acceptance_checks, timebox, failure_paths`

Operator run fields:
- `op_id, project_id, mode_id, timestamp, inputs_used, outputs_written, result, next_pointer`

Rule:
- If there is no evidence plus next pointer, it does not count.
- Intake/capture operators are valid first-class operators; they can emit candidate pointers and candidate case/batch/project mappings before project execution starts.

### Debug packet
Anti-drift unit for failures and unclear problems.

Fields:
- `project_id, symptom, minimal_repro, hypotheses, experiments, decision, resolution_or_next, time_spent`

Rule:
- After ~40 minutes of debugging drift, create a packet and either exit or schedule explicitly.

---

## Runbooks and checks
Runbooks are memory. Checks are truth enforcement.

Runbook types:
- **Human runbook**: purpose, how-to, pitfalls, next steps, checklists
- **Machine runbook**: commands, paths, fixtures, expected outputs, validation commands

Check types:
- **Smoke**: fixture/offline validation
- **Run live bounded**: bounded execution against live inputs
- **Contract test**: boundary stability, minimal repro encoded
- **Health check**: service liveness and restart-safety
- **Content validation**: non-empty, schema, counts, invariants

Rules:
- Missing runbook is usually **WARN**.
- Runbook drift is a failure mode (treat as **FAIL** when it misleads execution).

---

## Day clock and cadence
Scheduling is explicit and mode-constrained.

Block fields:
- `start, duration, block_type, mode_selected, allowed_ops`

Cadence rule fields:
- `frequency_days, overdue_behavior, reentry_protocol`

Rules:
- Re-entry must be low friction.
- Catch-up check-in beats shame.
- A block selects one mode; mode constrains legal operators.

---

## Evidence standard
Evidence is what makes progress real.

Evidence link fields:
- `artifact_path, manifest_path, log_path, commit_hash, sheet_row, evidence_type, context_type, structured_fields, source_ref`

Evidence classes (explicit):
- **Technical evidence**: logs, manifests, checks, artifacts generated by code/systems.
- **Operational evidence**: planning/coordination artifacts that change execution state.
- **Narrative evidence**: structured memos/briefs/notes with traceable decisions.
- **Stakeholder evidence**: outbound/inbound artifacts tied to people/communication outcomes.

Valid narrative/stakeholder examples:
- `capture memo`
- `meeting packet`
- `decision brief`
- `application packet`
- `recruiter reply draft`
- `closure memo`
- `sent log`
- `follow-up schedule`

Common intake/capture evidence:
- `capture_note`
- `condensed_note`
- `candidate_next_pointer`
- `candidate_case_or_batch_or_project`
- `promoted_artifact_links`

Rules:
- Prefer manifests with hashes and counts.
- Prefer deterministic outputs.
- Evidence must be linkable from check-in notes.
- Narrative evidence is valid evidence in `GOVERNANCE`, `CONTACT`, and lightweight work units (`Case/Batch/Sprint/Encounter`) when it is structured and traceable.
- Narrative evidence does **not** replace technical checks/logs/manifests where technical validation is required.

---

## Operational rules
- One block, one mode. Mode constrains legal operators.
- Evidence must match the mode evidence pattern or it does not count.
- Prefer bounded debug packets over endless debugging.
- Reduce WARNs in maintenance blocks (runbooks, prereqs, scaffolds).
- WIP caps matter. Archiving is an explicit state, not failure.
- The build invariant: `npm run build` must be consistently green for deployable docs. If temporarily downgraded (warn on broken links), record it as an explicit v0 decision.

---

## Drill-down index

Objects:
- [Project](data-model#project)
- [Lightweight work units](data-model#lightweight-work-units)
- [VAC chain](data-model#vac-chain)
- [Endpoint](data-model#endpoint)
- [Frontier](data-model#frontier)
- [EvidenceLink](data-model#evidencelink)
- [CadenceRule](data-model#cadencerule)

Runtime:
- [Modes v1](execution-model#modes-v1)
- [Operator](execution-model#operator)
- [OpRun](execution-model#oprun)
- [DebugPacket](execution-model#debugpacket)

Verification:
- [Check taxonomy](checks-runbooks#check-taxonomy)
- [RunbookHuman](checks-runbooks#runbookhuman)
- [RunbookMachine](checks-runbooks#runbookmachine)
- [Smoke](checks-runbooks#smoke)
- [Run live bounded](checks-runbooks#run-live-bounded)
- [Content validation](checks-runbooks#content-validation)

Scheduling:
- [Block model](day-clock-selection#block-model)
- [Selection policy](day-clock-selection#selection-policy)
- [Re-entry protocol](day-clock-selection#re-entry-protocol)
- [WIP caps and archiving](day-clock-selection#wip-caps-and-archiving)

---

## Motto
Pick the craft. Run only its operators. Produce its evidence.
