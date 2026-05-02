---
id: spec-one-pager
title: One Pager Spec v1
sidebar_position: 20
---
## Purpose
Canonical reference for the operating ontology. This page is stable and changes rarely.
This system exists to run a multi-project life with low re-entry friction. Office governs selection, preparation, and reingest. Ops executes selected work through modes, operators, checks, and evidence. Success means reduced decision load, clean routing, and verifiable artifacts.
## Compatibility note
This page is the compact doctrine. Detailed contracts live in the drill-down pages:
- [Office Charter](office-charter)
- [Office Compile](office-compile)
- [Ops under Office](ops-under-office)
- [Data Model](data-model)
- [Execution Model](execution-model)
- [Checks and Runbooks](checks-runbooks)
- [Day Clock and Selection](day-clock-selection)
---
## Core operating loop
Top-level loop:
1. **Office compiles** current state into a small usable surface.
2. **Principal decides** only what truly requires judgment.
3. **Ops executes** one bounded block from the accepted compile.
4. **Office reingests** evidence, residue, and next pointers.
Ops loop inside a block:
1. Frontier says what is true.
2. Clock allocates time.
3. Block chooses one mode.
4. Mode constrains legal operators.
5. Operators produce evidence.
6. Evidence updates frontier and carry state.
Entry rule: when input starts as raw human context, run intake/capture first:
```text
CaptureIntake -> SessionCondense -> NextPointerFromCapture
```
Then route into standard execution.
---
## Core doctrine
Rows are pathways, not tasks.
A project may exist without being expressed now. A dormant project is not a failure. Expression is controlled by Office state, current horizon, energy budget, and support readiness.
Useful distinctions:
- **Alive**: the row exists and may matter later.
- **Watched**: signals may be monitored without interrupting the human.
- **Expected**: allowed to enter the current operating cycle.
- **Prepared**: staff has produced enough substrate for action.
- **Executed**: a bounded block changed state and produced evidence.
- **Reingested**: residue became state, next pointer, or carry update.
The system should not maximize activity. It should regulate expression.
---
## Office primitives
Office is a router, regulator, and compiler. It is not a giant knowledge base and not the executor.
Primary Office outputs:
- `office_summary`, `principal_brief_today`, `principal_brief_week`
- `today_compile`, `support_queue`, `escalations`, `block_candidates`
- `clock_compile`
Clock-facing attention routes:
- `maint_get_queue`: expressed upkeep that should become checklist items.
- `focus_get_queue`: expressed deep work where staff can prepare a packet.
- `support_queue`: health checks, unlockers, decisions, context briefs.
- `watch_queue`: non-expressed pathways that stay quiet unless triggered.
- `post_eligible_queue`: rows that should be reingested if touched.
Routing fields:
- `expected`: pathway is expressed in the current cycle.
- `human_maint`: can enter bounded maintenance.
- `human_focus`: can require deep human work.
- `staff_get`: staff can prepare usable substrate.
- `staff_watch`: staff can monitor for triggers.
- `staff_post`: staff should reingest residue after touch.
Rule: `expected` controls expression. It does not define importance.
---
## Principal, Office, Staff, Ops
### Principal
Scarce judgment. Principal receives prepared decisions, real exceptions, explicit tradeoffs, and small accept/correct/defer choices.
Principal should not reconstruct the whole universe.
### Office
Governance layer. Office compiles, routes, suppresses noise, preserves continuity, and decides what reaches Principal, Staff, Watch, MAINT, or FOCUS.
### Staff
Preparation and reingest layer. Staff prepares the smallest usable artifact for the next block:
- checklist item
- focus packet
- health-check packet
- unlocker brief
- decision brief
- post/reingest note
Staff should not flood the human with documents.
### Ops
Execution layer. Ops executes accepted work through modes, operators, timeboxes, stop rules, checks, and evidence.
---

## Objects and contracts
### Project
A unit of ownership and continuity.
Minimum fields:
```text
project_id, title, home, repo_path(s), default_mode, cadence, state, tags, owner_type, next_checkin_due
```
Rules: active projects should map to at least one value chain and one endpoint.
### Work units
Short-lived or situational units that should not be forced into full projects.
Types: `Case`, `Batch`, `Sprint`, `Encounter`.
Minimum fields:
```text
id, title, objective, horizon, owner_type, state, artifacts_expected, next_pointer, project_id?
```
Rules: work units may exist independently; promote to project only if continuity, cadence, or stable runbooks emerge.
### Value chain
Describes what value exists in the world.
```text
vac_id, project_id, description, endpoints[], prerequisites[], owner_type
```
### Endpoint
A computable done claim.
```text
endpoint_id, vac_id, type, check_method, artifacts_expected, freshness_policy, severity
```
### Frontier
Daily truth map derived from checks.
- **PASS**: checks succeed and required evidence exists.
- **WARN**: non-fatal deficit, weak evidence, missing runbook, stale prereq, or drift.
- **FAIL**: check fails, critical evidence is missing, or runbook drift misleads execution.

---

## Modes v1
A mode is a craft: mindset, allowed moves, and evidence definition. Each MAINT or FOCUS block selects exactly one mode.
1. **PIPELINE**: transform inputs into validated artifacts repeatably. Done: smoke PASS, outputs, validation checks.
2. **TOOLSMITH**: build interfaces, scaffolds, templates, helpers. Done: stable interface, usage help, smoke run, predictable exits.
3. **SERVICE**: keep a running thing reliable. Done: restart-safe, scheduled runs work, logs and health checks exist.
4. **CONTRACT**: stabilize integration boundaries. Done: minimal repro, fix encoded, guardrail, decision note if needed.
5. **GOVERNANCE**: reduce decision load and constrain WIP. Done: artifact changes future behavior plus next pointer.
6. **CONTACT**: stakeholder and opportunity execution. Done: packet/draft/touch/log plus follow-up schedule.
Optional tag, not a mode: `MODEL/ANALYZE`.

---

## Fast mode classifier
Use as a default, override rarely.
- **SERVICE**: deploy, hosting, domain, systemd, timer, bot, stability.
- **CONTRACT**: API, integration, config, env, keyring, ABI, promptflow.
- **TOOLSMITH**: CLI, tool, script, framework, template, schema, setup.
- **PIPELINE**: ETL, ingest, normalize, backfill, export, jsonl, mdx, csv.
- **GOVERNANCE**: strategy, review, roadmap, triage, control tower, WIP.
- **CONTACT**: outreach, lead, LinkedIn, CRM, follow-up, qualification.

---

## Operators and runs
Operators are repeatable moves that produce instances.
Operator fields:
```text
op_id, modes, inputs, steps, outputs, acceptance_checks, timebox, failure_paths
```
Operator run fields:
```text
op_id, work_object_id, mode_id, timestamp, inputs_used, outputs_written, result, next_pointer
```
Rules:
- If there is no evidence plus next pointer, it does not count.
- Operators must be legal in the selected mode.
- Every operator should have a timebox and failure path.
- Intake/capture operators are first-class operators.
### Debug packet
Anti-drift object for failures and unclear problems.
```text
work_object_id, symptom, minimal_repro, hypotheses, experiments, decision, resolution_or_next, time_spent
```
Rule: after about 40 minutes of debugging drift, create a packet and either exit or schedule explicitly.

---

## Runbooks and checks
Runbooks are memory. Checks enforce truth.
Runbook types:
- **Human runbook**: purpose, how-to, pitfalls, checklists, next steps.
- **Machine runbook**: commands, paths, fixtures, outputs, validation commands.
Check types:
- **Smoke**: fixture/offline validation.
- **Run live bounded**: bounded execution on live inputs.
- **Contract test**: boundary stability and minimal repro encoded.
- **Health check**: liveness, observability, restart-safety.
- **Content validation**: schema, counts, non-empty outputs, invariants.
Rules: missing runbook is usually WARN; misleading runbook drift can be FAIL; checks must emit evidence.

---

## Day clock and cadence
Scheduling is explicit and mode-constrained.
Block fields:
```text
start, duration, block_type, mode_selected, allowed_ops, evidence_expected, stop_rule
```
Block types:
- **MAINT**: bounded upkeep, WARN reduction, checklists, prereqs, small repairs.
- **FOCUS**: deep transformation toward endpoints or strategic artifacts.
- **ADMIN**: logistics and overhead, capped.
- **FREE**: recovery/play, no evidence required.
Rules: one block, one mode; re-entry must be low-friction; catch-up check-in beats shame; Office-nominated work is default; raw-universe selection is fallback.

---

## Evidence standard
Evidence makes progress real.
Evidence classes:
- **Technical**: logs, manifests, checks, generated artifacts, commits.
- **Operational**: plans, queue updates, runbooks, carry updates.
- **Narrative**: structured memos, briefs, closure notes, decision records.
- **Stakeholder**: drafts, sent logs, replies, meeting packets, follow-ups.
Rules:
- Evidence must be traceable.
- Prefer manifests with hashes, counts, and paths.
- Narrative evidence is valid for GOVERNANCE, CONTACT, and lightweight work units.
- Narrative evidence does not replace technical checks where technical validation is required.
- Every completed block leaves evidence or a governance artifact plus next pointer.

---

## Operational rules
- Office compiles before Ops executes when a current compile exists.
- Principal handles exceptions and real tradeoffs, not raw project browsing.
- Staff prepares just enough substrate for the next block.
- Watch stays quiet unless a trigger fires.
- Post/reingest happens only after touch.
- WIP caps matter.
- Archiving is explicit, not failure.
- Debug drift becomes a packet.
- Build/deploy invariants must be explicit; if relaxed, record the v0 decision.

---

## Drill-down index
- Objects and contracts: [Data Model](data-model), [Project](data-model#project), [Work units](data-model#lightweight-work-units), [Endpoint](data-model#endpoint), [Frontier](data-model#frontier)
- Office layer: [Office Charter](office-charter), [Office Compile](office-compile), [Ops under Office](ops-under-office)
- Runtime: [Execution Model](execution-model), [Operator](execution-model#operator), [OpRun](execution-model#oprun), [DebugPacket](execution-model#debugpacket)
- Verification: [Checks and Runbooks](checks-runbooks), [Check taxonomy](checks-runbooks#check-taxonomy), [RunbookHuman](checks-runbooks#runbookhuman), [RunbookMachine](checks-runbooks#runbookmachine)
- Scheduling: [Day Clock and Selection](day-clock-selection), [Block model](day-clock-selection#block-model), [Selection policy](day-clock-selection#selection-policy), [Re-entry protocol](day-clock-selection#re-entry-protocol)

---

## Motto
Pick the craft. Prepare only what the block needs. Run its operators. Produce evidence. Reingest the residue.
