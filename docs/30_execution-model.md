---
id: execution-model
title: Execution Model
sidebar_position: 40
---

## Module header
Purpose: define the runtime for work: modes, operators, runs, debug packets, stop rules, and evidence patterns.

Exports:
- Mode
- Operator
- OpRun
- DebugPacket

Imports:
- Objects acted on from [Data Model](data-model)
- Acceptance checks from [Checks and Runbooks](checks-runbooks)
- Block constraints from [Day Clock and Selection](day-clock-selection)

## Jump
- [Modes v1](#modes-v1)
- [Fast mode classifier](#fast-mode-classifier)
- [Operator](#operator)
- [OpRun](#oprun)
- [DebugPacket](#debugpacket)
- [Stop rules](#stop-rules)
- [Evidence patterns](#evidence-patterns)

---

## Modes v1

A mode is a craft: a mindset plus allowed moves plus evidence definition. Every time block selects exactly one mode. Mode constrains which operators are legal inside the block.

### Mode registry (v1)

| Mode | Intent | Typical outputs | Primary risk |
|---|---|---|---|
| PIPELINE | Transform inputs into validated artifacts repeatably | canonical datasets, reports, materializations | silent data drift, partial outputs |
| TOOLSMITH | Build scalable interfaces and scaffolds | CLI tools, templates, stubs, helper libs | building tools without adoption |
| SERVICE | Keep a running thing reliable | stable deploys, timers, bots, health checks | brittle ops, unobserved failures |
| CONTRACT | Stabilize integration boundaries | minimal repros, fixes, regression guards | endless debugging without closure |
| GOVERNANCE | Reduce decision load and constrain WIP | decisions, constraints, lock-ins, schedules | meta overbuild, shallow planning |
| CONTACT | Stakeholder throughput with low overhead | touches, follow-ups, queue movement | avoidance, scattered attention |

Optional tag (not a mode): `MODEL/ANALYZE`

### Mode invariants
- One block selects one mode.
- Evidence must match the mode’s evidence pattern (see [Evidence patterns](#evidence-patterns)).
- When the block ends, you must leave a next pointer (even if it is “create DebugPacket and schedule”).

---

## Fast mode classifier

Default mapping from session title (manual override allowed, keep it rare):

- **SERVICE**: deploy, domain, hosting, apache, systemd, timer, bot, stability, vercel, github pages
- **CONTRACT**: api, integration, config, env, keyring, abi, postgres, promptflow
- **TOOLSMITH**: cli, tool, script, framework, template, schema, setup, playbook
- **PIPELINE**: etl, ingest, normalize, backfill, export, jsonl, mdx, csv
- **GOVERNANCE**: strategy, review, roadmap, triage, prioritize, control tower, standards, wip
- **CONTACT**: outreach, lead, linkedin, crm, follow-up, qualification

---

## Operator

An operator is a repeatable move that produces instances. Operators are the executable units that change frontier state.

### Fields
- `op_id` (stable)
- `name` (human readable)
- `mode_ids[]` (one or more modes where the operator is legal)
- `inputs` (typed references to objects, paths, URLs, or parameters)
- `steps[]` (bounded procedure)
- `outputs` (what artifacts should exist after running)
- `acceptance_checks[]` (references to check types and required gates)
- `timebox_minutes` (bounded by default)
- `failure_paths[]` (what to do when it fails)
- `evidence_pattern` (what evidence must be produced for it to count)

### Invariants
- Every operator must be legal in at least one mode.
- Every operator must specify acceptance checks (even if minimal).
- Every operator must have a default timebox.
- If no evidence plus next pointer, the run does not count.

### Operator template (v0)
Use this structure when defining a new operator:

- Purpose (one sentence)
- Preconditions (what must already exist)
- Steps (5–12 bullets)
- Acceptance checks (exact commands or checks)
- Evidence outputs (paths and manifests)
- Failure paths (2–3 branches)
- Next pointer rule (what to write when done)

---

## OpRun

An OpRun is an instance of running an operator against a project in a chosen mode.

### Fields
- `op_id`
- `project_id`
- `mode_id`
- `timestamp_start`
- `timestamp_end` (optional but recommended)
- `inputs_used` (resolved)
- `outputs_written` (paths or references)
- `acceptance_results` (PASS/WARN/FAIL per check)
- `result` (PASS/WARN/FAIL)
- `evidence_links[]` (references to [EvidenceLink](data-model#evidencelink))
- `next_pointer` (single line: what to do next)

### Invariants
- OpRun must reference exactly one project.
- OpRun must declare exactly one mode.
- OpRun must leave a next pointer.
- OpRun result must be grounded in acceptance results, not feelings.

---

## DebugPacket

A DebugPacket is an anti-drift unit for failures and unclear problems. It is the standard closure artifact when debugging would otherwise expand.

### Fields
- `project_id`
- `symptom` (observable)
- `context` (what changed recently, if known)
- `minimal_repro` (commands, inputs, expected vs actual)
- `hypotheses[]`
- `experiments[]` (each: change made, result, evidence)
- `decision` (what you conclude right now)
- `resolution_or_next` (fix applied or next experiments)
- `regression_guard` (what prevents recurrence)
- `time_spent_minutes`

### Invariants
- Minimal repro is mandatory when you claim CONTRACT work.
- Experiments must have evidence (logs, diffs, notes).
- DebugPacket ends with an explicit next pointer.

### DebugPacket template (v0)
- Symptom
- Minimal repro
- Hypotheses (3 max)
- Experiments (timeboxed)
- Conclusion
- Next pointer
- Guardrail added (if any)

---

## Stop rules

Stop rules prevent drift and preserve re-entry.

### Universal stop rules
- If you exceed the operator timebox without progress: stop, write next pointer, and either schedule or re-scope.
- If you have been “debugging” for ~40 minutes without a clear repro and measurable progress: create a DebugPacket.

### Mode-specific stop rules (v0)
- **PIPELINE**: stop if you cannot verify outputs quickly. Convert to CONTRACT (minimal repro) or TOOLSMITH (add gate).
- **TOOLSMITH**: stop if there is no immediate adoption path. Write usage and a single consumer example or pause.
- **SERVICE**: stop if changes are unbounded in live systems. Switch to RunLiveBounded and health checks first.
- **CONTRACT**: stop if hypotheses exceed 3 without narrowing. Force minimal repro, then test one axis at a time.
- **GOVERNANCE**: stop if you are producing plans without constraints. Output must change future selection behavior.
- **CONTACT**: stop if you are drafting endlessly. Send the message, then schedule follow-up.

---

## Evidence patterns

Evidence patterns define what “counts” in each mode. They constrain acceptable progress.

### PIPELINE evidence pattern
- At least one non-trivial artifact produced
- Content validation gate passes (schema, non-empty, counts)
- Manifest with counts and hashes preferred

### TOOLSMITH evidence pattern
- Interface exists (CLI, function, template)
- `--help` or usage exists
- Smoke run with predictable exit codes
- One consumer example or integration pointer

### SERVICE evidence pattern
- Health check exists and passes
- Logs exist and are readable
- Restart-safe behavior validated
- Runbook reflects current reality

### CONTRACT evidence pattern
- Minimal repro captured
- Fix applied and verified
- Regression guard added (test, gate, or check)
- Decision note if trade-offs exist

### GOVERNANCE evidence pattern
- One decision artifact that changes future behavior
- WIP constraint, cadence update, or explicit archiving
- Next pointer for the next check-in

### CONTACT evidence pattern
- N touches sent or queue advanced
- Follow-ups scheduled or next pointer recorded
- Template improved if it reduces future friction

---

## Used by
- [Block model](day-clock-selection#block-model)
- [Checks and runbooks](checks-runbooks#check-types)

## See also
- [One Pager Spec](spec-one-pager)
