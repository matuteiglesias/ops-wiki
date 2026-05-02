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
- WIP caps and archiving rules
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
- [Safe mode branch (low judgment protocol)](#safe-mode-branch-low-judgment-protocol)
- [WIP caps and archiving](#wip-caps-and-archiving)
- [Maintenance vs focus](#maintenance-vs-focus)

---

## Run a day

This is the Ops run-a-day protocol under Office governance. It keeps days comparable while preserving execution autonomy. The day is successful if it produces evidence, reduces future decision load, and returns closure for Office reingest.

### The daily contract (v0)
- Read accepted Office compile artifacts first (`today_compile`, `block_candidates`, support context, carry posture).
- Run BOOT once on the nominated subset, then compile with [Daily Compiler Lite](daily-plan-compiler-algorithm#daily-compiler-lite-default-610-min) (or Full when needed).
- Execute at least one focus block or one catch-up check-in if energy is low.
- Produce at least one piece of evidence or governance artifact and return closure outputs for Office reingest.

Direct/manual path remains valid when Office artifacts are missing, stale, or intentionally bypassed.

### BOOT procedure (10–20 minutes)
Goal: initialize state so work becomes selectable. No fixing, no debugging. BOOT hands off directly to the Daily Plan Compiler.

1. Open accepted compile context (default)
   - `today_compile`
   - `block_candidates`
   - support brief/context
   - current carry posture

   Fallback/manual inputs when compile is missing/stale:
   - Frontier snapshot (PASS/WARN/FAIL summary)
   - Due check-ins (cadence list)

2. Choose today’s first focus mode (exactly one)
   - [Modes v1](execution-model#modes-v1) are the only allowed crafts.

3. Emit the first executable run
   - Write 1 OperatorRun: `work_object_id + operator + expected evidence`
   - Set a timebox and a stop rule

4. Drift guardrail
   - If debugging exceeds ~40 minutes without progress: create a [DebugPacket](execution-model#debugpacket) and stop.

BOOT + Compiler Lite output:
- Frontier pick
- Decision label per candidate (PARK / PLAN_ONLY / NUDGE / RESCUE / KILL)
- Allowed work set (FOCUS + MAINT)
- One planned OperatorRun with stop rule and evidence
- One closure hook line

### Minimal day variant (when you are late or low energy)
- BOOT (6 minutes): choose mode + write one OperatorRun
- MAINT micro (6–20 minutes): reduce one WARN (runbook stub, prereq, broken link) or send 1–2 contact touches
- Close-lite (2 minutes): next pointer

This preserves continuity without forcing deep work.

### Direct mode fallback
Use direct mode when Office compile artifacts are missing, stale, or intentionally bypassed for a bounded reason. In direct mode, selection starts from frontier/cadence/raw candidate space, and the reason for bypass should be written in the closure hook.

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



Projects do not directly consume time. Projects request block types.

The clock allocates scarce human capacity. Staff runs a parallel preparation and reingestion lane around the same blocks.

A normal 4h operating cycle contains:
- MAINT: 30–60 min of upkeep, WARN reduction, checklists, small repairs.
- FOCUS: 2.5–3.5h of deep work on one prepared packet.
- POST: 10–20 min closure, evidence, next pointer, and Office reingest recommendation.

Staff loop:
WATCH → GET → HUMAN MAINT/FOCUS → POST

WATCH senses quietly.
GET prepares a checklist or focus packet.
MAINT preserves the organism.
FOCUS builds or decides.
POST reingests touched state.

Weekly rhythm:
- Monday: compile and select expressed fronts.
- Tuesday: build.
- Wednesday: repair plus build.
- Thursday: externalize and integrate.
- Friday: reingest and close.
- Saturday: light homeostasis.
- Sunday: recovery and low-pressure capture.

Rows can be alive without being expected.
Rows can be watched without being worked.
Rows can be prepared without being executed.
Rows enter POST only if touched.

Constraint:
Staff reduces startup friction and cleanup residue. It must not create a second infinite backlog.



---

## Safe mode branch (low judgment protocol)

Safe Mode is an operational branch for human states where decision quality is temporarily degraded.  
It is not clinical guidance; it is a bounded execution policy.

### Trigger signals
- Late-night activation with “open everything” impulse
- Poor sleep or cognitive fog
- Recent substance use
- High emotional activation or overload
- Repeated urge to start new fronts without clear evidence path

### Policy rules
Allowed:
- `CaptureIntake`
- `SessionCondense`
- `LockInSession`
- `PrepareBlockQueue`
- `ContactQueueGroom`
- inventory-first tasks (list current open loops, classify, defer)

Forbidden:
- refactors and structural rewrites
- irreversible decisions
- opening new major fronts
- unbounded debugging

### Safe block output contract
A Safe Mode block is valid only if it emits:
- one structured artifact (capture/condense/queue/lock-in/checklist)
- one bounded triage decision (what is deferred vs active)
- one next pointer with reassessment time

### Escalation back to normal mode
Exit Safe Mode when:
- one clean next pointer exists,
- active fronts are bounded,
- and the next block can select one mode/operator with clear evidence.

If these are not true, schedule one more Safe Mode MAINT block instead of forcing FOCUS.

---

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

## See also
- [One Pager Spec](spec-one-pager)
