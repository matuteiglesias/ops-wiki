---
id: intro
title: "Intro"
sidebar_position: 0
---

This wiki is an operator console.

If you have 2 minutes, follow **Re-entry**.
If you have 10 minutes, follow **BOOT**.
If you have 60–90 minutes, follow **First Focus Block**.

## Jump
- [Re-entry (2–6 min)](#re-entry-26-min)
- [Safe Mode / Low Judgment (6–25 min)](#safe-mode--low-judgment-625-min)
- [BOOT (10–20 min)](#boot-1020-min)
- [First focus block (60–90 min)](#first-focus-block-6090-min)
- [If you are lost](#if-you-are-lost)
- [Minimal navigation](#minimal-navigation)

---

## Re-entry (2–6 min)

Use this when you skipped a day or you feel resistance. Goal is continuity, not productivity.

If your starting point is messy human input (voice dump, mixed fronts, scattered notes), take the **intake route** first:
- Run `CaptureIntake` to store raw context.
- Run `SessionCondense` to extract decisions/unknowns.
- Run `NextPointerFromCapture` to choose one executable next move.

1) Refresh truth (no fixing)
- Open your frontier snapshot (PASS/WARN/FAIL).
- Identify the **top 1 FAIL** or **top 1 cheap WARN**.

2) Choose one block
- Block type: MAINT (default for re-entry)
- Mode: pick one mode only.

3) Do one cheap operator
Examples:
- Create a missing runbook stub
- Add a prereq scaffold file
- Run a smoke check
- Write a DebugPacket title and minimal repro line

4) Write the next pointer
One line: what the next session will do.

Exit. That counts.

Next: see [Day Clock and Selection](day-clock-selection#re-entry-protocol).

---

## Safe Mode / Low Judgment (6–25 min)

Use this branch when judgment quality is degraded or volatility is high.  
Goal is containment and continuity, not optimization.

### Triggers
- late-night activation
- poor sleep
- recent substance use
- emotional overload
- impulse to reopen too many fronts

### Moves allowed
- yes capture (`CaptureIntake`)
- yes condense (`SessionCondense`)
- yes cheap MAINT
- yes packaging / lock-in (`LockInSession`)
- yes bounded triage (`PrepareBlockQueue`, `ContactQueueGroom`, inventory-first tasks)
- yes next pointer

### Moves forbidden
- no refactors
- no irreversible decisions
- no opening new major fronts
- no unbounded debugging
- no high-stakes sends without a brief

### Protocol (minimum)
1) Declare Safe Mode for this block.
2) Run one capture/condense operator.
3) Do one inventory-first or queue-groom move.
4) Write next pointer + when to reassess in normal mode.

If state remains volatile, repeat Safe Mode once more instead of escalating scope.

Next: see [Safe mode branch](day-clock-selection#safe-mode-branch-low-judgment-protocol).

---

## BOOT (10–20 min)

Use this at the start of a normal day. Goal is to make the next block executable with low choice.

If BOOT input is not project-clean (speech + context blend), do a short intake pass first (10–20 min total still valid):
1) `CaptureIntake`
2) `SessionCondense`
3) `NextPointerFromCapture`
Then continue with project/mode selection below.

1) Open the spine
- [One Pager Spec](spec-one-pager)
- Your frontier snapshot (PASS/WARN/FAIL)
- Your due check-ins (cadence list)

2) Pick today’s first mode (one only)
Use your default: if uncertain, choose MAINT + GOVERNANCE.

Mode reference:
- [Modes v1](execution-model#modes-v1)

3) Select one work object (project or lightweight unit)
- If you have a clear active project, pick that.
- If work is short/situational, pick a `Case`, `Batch`, `Sprint`, or `Encounter`.
- Prefer FAIL/WARN cleanup for projects; prefer tight objective + bounded horizon for lightweight units.

4) Pre-write the operator run
Write a single planned OpRun line:
- `work_object_id + operator + expected evidence + stop rule`

5) Set the stop rule (anti-drift)
If you are not closer to evidence by ~40 minutes:
- create a DebugPacket and stop.

Next: see [Selection policy](day-clock-selection#selection-policy).

---

## First focus block (60–90 min)

Use this when you want real movement.

1) Confirm the mode
One block, one mode.

2) Choose one operator that can flip an endpoint
- Find one endpoint in FAIL or WARN that is realistically flippable in the timebox.
- Choose an operator that produces evidence for it.

3) Execute with gates
- Run the check (smoke or bounded live)
- Emit evidence (log + manifest + artifacts as needed)
- Update frontier status
- Write next pointer

If you hit a deep failure:
- Stop at 40 minutes and create a DebugPacket.

References:
- [Operators](execution-model#operator)
- [Check types](checks-runbooks#check-types)
- [Evidence standard](spec-one-pager#evidence-standard)

---

## If you are lost

Do not browse docs. Use the spine.

1) Read the loop:
- [One Pager Spec](spec-one-pager)

2) If you need a schedule:
- [Day Clock and Selection](day-clock-selection)

3) If you need truth objects:
- [Data Model](data-model)

4) If you need legal moves:
- [Execution Model](execution-model)

5) If you need proof rules:
- [Checks and Runbooks](checks-runbooks)

---

## Minimal navigation

The only path you need to remember:

- [One Pager Spec](spec-one-pager) -> choose module -> come back.

If you want the guided start:
- [Start Here](start-here)
