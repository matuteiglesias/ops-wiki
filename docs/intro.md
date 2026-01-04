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
- [BOOT (10–20 min)](#boot-1020-min)
- [First focus block (60–90 min)](#first-focus-block-6090-min)
- [If you are lost](#if-you-are-lost)
- [Minimal navigation](#minimal-navigation)

---

## Re-entry (2–6 min)

Use this when you skipped a day or you feel resistance. Goal is continuity, not productivity.

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

## BOOT (10–20 min)

Use this at the start of a normal day. Goal is to make the next block executable with low choice.

1) Open the spine
- [One Pager Spec](spec-one-pager)
- Your frontier snapshot (PASS/WARN/FAIL)
- Your due check-ins (cadence list)

2) Pick today’s first mode (one only)
Use your default: if uncertain, choose MAINT + GOVERNANCE.

Mode reference:
- [Modes v1](execution-model#modes-v1)

3) Select one project
- Prefer FAIL if actionable
- Else pick a cheap WARN you can clear fast
- Else pick the highest value pipeline with a clean operator

4) Pre-write the operator run
Write a single planned OpRun line:
- `project_id + operator + expected evidence + stop rule`

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
