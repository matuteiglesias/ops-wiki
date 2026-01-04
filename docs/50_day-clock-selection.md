---
id: day-clock-selection
title: Day Clock and Selection
sidebar_position: 60
---

## Module header
Purpose: define scheduling and governance: block model, cadence behavior, selection policy, WIP caps, archiving, and re-entry protocol.

Exports:
- Block model
- Run a day protocol
- SelectionPolicy
- WIP and archiving rules
- Re-entry protocol

Imports:
- Frontier and cadence from [Data Model](data-model)
- Modes and operators from [Execution Model](execution-model)
- PASS criteria from [Checks and Runbooks](checks-runbooks)

## Jump
- [Run a day](#run-a-day)
- [Block model](#block-model)
- [Selection policy](#selection-policy)
- [Re-entry protocol](#re-entry-protocol)
- [WIP and archiving](#wip-and-archiving)
- [Maintenance vs focus](#maintenance-vs-focus)

---

## Run a day

This is the smallest protocol that keeps the system alive and makes days comparable. The day is successful if it produces evidence and reduces future decision load.

### The daily contract (v0)
- You run BOOT once.
- You run at least one focus block or one “catch-up check-in” if you are in low energy.
- You produce at least one piece of evidence or one governance artifact that changes tomorrow.

### BOOT procedure (10–20 minutes)
Goal: initialize state so work becomes selectable. No fixing, no debugging.

1. Open the system state
   - Frontier snapshot (PASS/WARN/FAIL summary)
   - Due check-ins (cadence list)

2. Choose today’s first focus mode (exactly one)
   - [Modes v1](execution-model#modes-v1) are the only allowed crafts.

3. Emit the first executable run
   - Write 1 OperatorRun: `project_id + operator + expected evidence`
   - Set a timebox and a stop rule

4. Drift guardrail
   - If debugging exceeds ~40 minutes without progress: create a [DebugPacket](execution-model#debugpacket) and stop.

BOOT output:
- One chosen mode
- One planned OperatorRun
- One expected evidence line

### Minimal day variant (when you are late or low energy)
- BOOT (6 minutes): choose mode + write one OperatorRun
- MAINT micro (6–20 minutes): reduce one WARN (runbook stub, prereq, broken link) or send 1–2 contact touches
- Close-lite (2 minutes): next pointer

This preserves continuity without forcing deep work.

---

## Block model

Blocks are the scheduling atoms. Each block selects exactly one mode and therefore has a constrained set of legal operators.

### Block fields (v0)
- `start_time`
- `duration_minutes`
- `block_type` (MAINT | FOCUS | ADMIN | FREE)
- `mode_selected` (optional for FREE, required for MAINT/FOCUS)
- `allowed_ops[]` (derived from mode)
- `planned_runs[]` (optional list of OperatorRuns)
- `evidence_expected` (one line)
- `stop_rule` (one line)

### Block invariants
- A MAINT or FOCUS block must select one mode.
- “One block, one mode” is enforced. If you switch modes, you are starting a new block.
- A block completes only if it produces:
  - evidence links, or
  - a governance artifact plus next pointer.

### Block types (intended behavior)
- **MAINT**
  - Purpose: reduce WARNs, clear entropy, unblock future execution.
  - Allowed work: runbooks, prereqs, link hygiene, small repairs, contact sprints.
  - Not allowed: unbounded debugging, large refactors, risky live changes.

- **FOCUS**
  - Purpose: produce non-trivial evidence toward a VAC chain endpoint.
  - Allowed work: operators aligned with the chosen mode.
  - Enforced: timebox and stop rules.

- **ADMIN**
  - Purpose: logistics, scheduling, communication overhead not captured by CONTACT.
  - Avoid turning ADMIN into pseudo-work; cap it.

- **FREE**
  - Purpose: recovery and play. No evidence required.
  - Rule: FREE is legitimate. It prevents system collapse via burnout.

---

## Selection policy

Selection policy consumes frontier, cadence, and energy state to decide what block to run next.

### Inputs (v0)
- Frontier snapshot per project: PASS/WARN/FAIL and which endpoints
- Cadence due list: which projects are due or overdue
- Energy state: high / medium / low
- Time available: next block duration
- WIP cap: max active projects allowed

### Output (v0)
- `selected_project_id`
- `selected_mode`
- `selected_operator` (or “runbook/prereq reduction” for MAINT)
- `expected_evidence`
- `stop_rule`

### Policy algorithm (v0)

1) Always start with truth:
- Prefer projects that are **FAIL** and due (or critical severity endpoints).
- If no FAIL are actionable today, prefer WARN that is cheap to clear.

2) Respect cadence:
- If a project is overdue, it gets a “catch-up check-in” before new work.

3) Match work to energy:
- **Low energy**: MAINT block to reduce WARNs or CONTACT sprint.
- **Medium energy**: TOOLSMITH or PIPELINE with a tight operator.
- **High energy**: PIPELINE focus or CONTRACT with bounded debug packet plan.

4) Prefer cheap, compounding moves:
- Reduce WARNs that unblock many projects (runbook template, repo init upgrade, content gates).
- Choose operators with clear evidence outputs.

5) Enforce WIP:
- If WIP cap is reached, do not start a new project. Reduce WARNs or close loops.

### Selection heuristics (v0)
- MAINT default: clear the top WARN that blocks execution (missing runbook or prereq scaffold).
- FOCUS default: run the cheapest operator that can flip an endpoint state.

---

## Re-entry protocol

Re-entry exists because dropouts are expected. The system is designed so returning is cheap and shame-free.

### Re-entry triggers
- You skipped yesterday.
- You skipped N days.
- You avoided a project long enough that it became “unknown”.

### Re-entry rules (v0)
1. Do not read backlogs.
2. Refresh truth:
   - update frontier snapshot (even if partial)
3. Do one cheap operator:
   - run smoke, run a health check, or create a runbook stub
4. Emit next pointer:
   - what the next session will do, with a timebox

### Catch-up check-in template (v0)
- Current frontier: PASS/WARN/FAIL summary
- One operator executed (or one runbook created)
- Evidence links
- Next pointer (one line)
- Updated due date (optional)

---

## WIP and archiving

WIP caps prevent mode switching chaos and endless parallel starts.

### WIP cap (v0)
- Default cap: 3–5 active projects at a time (tune later).
- A project counts as active if you ran a focus block on it within the last cadence window.

### WIP rules
- If cap reached:
  - Do not start a new project
  - Use MAINT blocks to reduce WARNs across active projects
  - Or close loops and archive explicitly

### Archiving rules
Archiving is an explicit state, not failure. It is a governance action.

When to archive:
- No clear endpoint exists (value not defined)
- Project is blocked by external dependency with no timeline
- Project has low ROI and is draining attention
- Project is “nice to have” and competes with critical work

Archive output (minimum):
- State set to archived
- One sentence rationale
- Next possible re-entry condition (what would revive it)

---

## Maintenance vs focus

A practical rule that prevents the system from turning into constant refactoring:

- Use MAINT to clear WARNs, prep prereqs, and improve runbooks.
- Use FOCUS to flip endpoints with evidence.
- If you are “fixing so you can work”, you are in MAINT.
- If you are “producing artifacts that change frontier”, you are in FOCUS.

---

## Used by
- [Boot procedure](start-here)
- [Walkthrough](walkthrough-one-project)

## See also
- [One Pager Spec](spec-one-pager)
