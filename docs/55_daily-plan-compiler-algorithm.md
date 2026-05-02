---
id: daily-plan-compiler-algorithm
title: Daily Plan Compiler Algorithm (Human + Machine Split)
sidebar_label: Daily Plan Compiler
sidebar_position: 65
---

## Purpose

Turn day inputs into a compiled Ops plan that is executable, evidence producing, and resistant to sprawl. Default source surface is accepted Office artifacts; raw candidate compilation is fallback/manual.

This page defines the **algorithm and handoffs** between:
- **Human led steps** (you)
- **Machine led steps** (AI agent)
- **Joint steps** (quick review and lock)

Positioning:
- **Assistant-Guided Daily Compile** is the practical artifact-driven path when Office artifacts are already attached.
- This page is the deeper/manual algorithm and legacy fallback when artifacts must be rebuilt or audited.

## Authority and references

This page does **not** redefine concepts that are defined elsewhere in the manual.

References (authoritative elsewhere):
- Time blocks and definitions: **FOCUS**, **MAINT** (see time blocking section in the manual)
- Modes and how to use them (PIPELINE, TOOLSMITH, SERVICE, CONTRACT, GOVERNANCE, CONTACT)
- Evidence conventions, naming conventions, stop rules, WIP limits (if defined elsewhere)

This page only describes **how to compile a day plan** using those existing primitives.

## Inputs

### Office artifacts first (default)
1) **office_summary**
2) **principal_brief_today**
3) **today_compile**
4) **support_queue**
5) **block_candidates**
6) **Clock + hard constraints** (FOCUS/MAINT windows, fixed commitments, energy limits)

### Fallback/manual acquisition inputs
Use these when Office artifacts are missing or stale:
- Raw check-in set (last N days, default N = 5)
- Overrides and constraints list
- Raw candidate list + micro-status pass
- Current frontier board snapshot

## Outputs

1) **Frontier Board**
   - Per item: decision label, next pointer, stop rule, evidence, dependencies

2) **Compiled Day Plan**
   - A schedule mapped onto today’s clock with sessions and evidence targets

3) **Closure Hook**
   - A short end-of-day update protocol (no long journaling required)

## Quick start variants

### Daily Compiler Lite (default, 6–10 min)
Use this most days:
1) Pick top frontier item (top FAIL or cheap WARN)
2) Tag candidates with decision labels
3) Set allowed work (1 deep stream + 1 wiring move max)
4) Design first session (mode + operator + evidence + stop rule)
5) Pre-write closure hook

### Daily Compiler Full (10 steps below)
Use when day input is complex, high-risk, highly interdependent, or artifacts must be rebuilt manually.

See also: [Assistant-Guided Daily Compile](assistant-guided-daily-compile) for the lighter artifact-driven operational path.

## Decisions vocabulary (used by both human and machine)

Use exactly these labels:
- **PARK**: explicitly do nothing today (may add a note)
- **PLAN_ONLY**: produce a wiring plan or registry note, no build
- **NUDGE**: bounded execution (30 to 90 minutes) producing one artifact
- **RESCUE**: must touch today due to risk, blockage, or time sensitivity
- **KILL**: explicitly drop or archive

## Full algorithm with explicit human vs machine steps

### Step 0: Scope declaration (Human)
**Human action**
- State the horizon: “today only”.
- State the scope: “scheduled check-ins (last N days) + overrides”.
- Declare an intake rule: “no new projects enter unless time sensitive emergency”.

**Output**
- 1 to 3 lines: scope, horizon, intake rule.

---

### Step 1: Acquire candidate surface (Human)
**Human action (default)**
- Confirm attached Office artifacts (`today_compile`, `block_candidates`, support queue) are current and accepted.

**Fallback/manual action**
- Paste or list scheduled check-ins, overrides, and fixed commitments when artifacts are missing.

**Output**
- One candidate surface (artifact-driven by default; raw list in fallback).

---

### Step 2: Micro-status pass (Human)
**Human action (fallback/manual)**
For each raw item in the check-in set (and each override that behaves like a work object), provide short bullets:
- status: green/yellow/red/unknown
- change since last touch (or “none”)
- bottleneck (one phrase)
- your tentative next pointer (one action)

**Notes**
- If you do not know, say unknown. The machine will treat unknown as risk, not as “fine”.

**Output**
- A micro-status list.

---

### Step 3: Convert micro-status into Frontier Board (Machine)
**Machine action**
For each item:
- Assign a decision label (PARK / PLAN_ONLY / NUDGE / RESCUE / KILL)
- Rewrite the next pointer as a single command
- Add a stop rule (explicit boundary)
- Define evidence (artifact, commit, screenshot, message sent, etc.)
- Identify dependencies (especially “blocked on core unlock”)

**Heuristics (machine applies)**
- Prefer **inventory/registry** over refactors when state is unclear.
- If it is brittle, silently failing, or a dependency hub, it trends to **RESCUE**.
- If it is downstream of the core unlock, trend to **PLAN_ONLY** or **PARK** today.
- If it is “dreaded + time sensitive”, trend to **RESCUE** but keep it in MAINT.

**Output**
- Frontier Board (structured list).

---

### Step 4: Identify the day’s core unlock (Machine, confirmed by Human)
**Machine action**
- Propose exactly one **core unlock** vertical for today (the dependency hub).
- List its direct dependents from the Frontier Board.

**Human action**
- Accept or replace the proposed core unlock.
- If replaced, state the new core unlock in one sentence.

**Output**
- One chosen core unlock + dependent list.

---

### Step 5: Apply WIP limits and classify allowed work (Machine)
**Machine action**
Transform the Frontier Board into three bins:
1) **Allowed FOCUS work**
   - Includes the core unlock plus at most one additional execution stream

2) **Allowed MAINT work**
   - Time sensitive comms/admin, anxiety reducers, short closures

3) **Deferred**
   - PARK or PLAN_ONLY items not scheduled today

**Rule (machine enforces)**
- One deep build stream per day (core unlock).
- At most one additional horizontal wiring move.
- Everything else must fit as PLAN_ONLY, PARK, or MAINT.

**Output**
- Allowed work list.

---

### Step 6: Session design (Machine)
**Machine action**
For each allowed FOCUS work item, define a session:
- session name
- mode (references manual)
- operator chain (3 to 6 verbs)
- gate (what must be true at end)
- evidence targets (explicit artifacts)
- stop rule (mandatory)

For allowed MAINT work:
- define a short list of “close loops” tasks
- cap the list to prevent spillover

**Output**
- Session definitions ready to map onto the clock.

---

### Step 7: Map sessions onto today’s clock (Machine)
**Machine action**
- Place sessions into the provided FOCUS windows.
- Place MAINT closures into MAINT windows.
- Place a short closure hook before sleep.

**Scheduling heuristics**
- Core unlock goes into the earliest long FOCUS block.
- Job seeking packets and other planning-heavy work goes into mid FOCUS blocks.
- Registries can go late when energy is lower.
- Put anxiety reducers in MAINT, not FOCUS.

**Output**
- A time-block compiled day plan.

---

### Step 8: Anti-sprawl audit and downgrade pass (Machine, optional Human veto)
**Machine action**
For each scheduled session, verify:
- stop rule exists
- evidence is concrete and checkable
- dependencies are not violated
- no hidden “extra work” crept in

If a session fails, machine downgrades:
- NUDGE -> PLAN_ONLY, or
- PLAN_ONLY -> PARK, or
- splits into an inventory-first version

**Human action (optional)**
- Veto one downgrade if you explicitly accept the sprawl risk.

**Output**
- Tight plan that is resilient to drift.

---

### Step 9: Execute the day (Human, with machine as copilot)
Execution is outside the scope of this page. The compiled plan is the contract.

---

### Step 10: Closure hook (Human, machine can generate)
**Human action**
- Confirm which evidence artifacts exist.
- Update frontier board statuses for touched items.
- Write 1 to 3 next pointers for tomorrow.
- Explicitly park everything else.

**Machine action (optional)**
- Produce a compact closure log if you paste the evidence.

**Output**
- Closure log entry.

## Integration chain (main manual flow)

Use this chain explicitly when running the day:
1) Accepted Office compile (`today_compile` + `block_candidates`) ->
2) [Frontier](data-model#frontier) narrowing inside nominated subset ->
3) Decision labels (PARK / PLAN_ONLY / NUDGE / RESCUE / KILL) ->
4) Allowed work (FOCUS vs MAINT with WIP caps) ->
5) Session design (mode + operator + evidence + stop rule) ->
6) Closure hook (status updates + next pointers for Office reingest)

Related entry points:
- [Re-entry](intro#re-entry-26-min): run Lite with MAINT bias.
- [BOOT](intro#boot-1020-min): default trigger for Lite.
- [First focus block](intro#first-focus-block-6090-min): execute first compiled session.

## Minimal templates

### Frontier Board row
- item:
- decision:
- next_pointer:
- stop_rule:
- evidence:
- depends_on:
- notes:

### Session card
- session_name:
- mode:
- timebox:
- operator_chain:
- gate:
- evidence:
- stop_rule:

## Agent prompt stub (optional)
If you run this with an agent, your daily instruction can be:

- “Given my check-in set, overrides, and clock, compile:
  1) Frontier Board
  2) Compiled Day Plan mapped to the clock
  Enforce: one core unlock, one horizontal wiring move max, everything has stop rule and evidence.”


