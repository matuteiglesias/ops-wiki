---
title: Ops under Office
sidebar_position: 5
slug: /ops-under-office
---

# Ops under Office

## Purpose

This page defines how **Ops** operates once **Oficina** exists as a governance layer.

Ops remains the execution manual.
It still governs block execution, evidence, closure, and re-entry discipline.

What changes is the source of selection.

Ops no longer begins by default from the full raw universe.
Ops begins from an **Office-compiled subset**.

## High-level rule

**Oficina selects and prepares.  
Ops executes and evidences.**

## What Ops now expects from Office

Before Ops begins, Office should provide a compile.

At minimum, Ops expects the following inputs from Oficina:

### 1. Principal-approved or default-accepted compile
Ops should be working from the current accepted compile, not from stale assumptions.

### 2. Nominated work objects or candidate set
Ops should receive:

- one or more candidate fronts
- support context if needed
- current carry posture
- any important horizon constraint

### 3. Relevant support artifacts
Examples:

- unlocker brief
- decision brief
- context brief
- health check packet
- next-unlock memo
- prior closure note

### 4. Escalation posture
Ops should know whether:

- the matter is fully executable
- the matter is waiting on Principal decision
- the matter is conditionally executable
- the matter is fallback only

### 5. Expected evidence
Ops should know what valid progress looks like for the block.

---

## Updated execution flow

## 1. Office compiles
Office produces:

- principal brief
- today compile
- support queue
- escalations
- block candidates

## 2. Principal decides as needed
The Principal may:

- approve
- correct
- accept default compilation

## 3. Ops executes
Ops runs BOOT and day-clock logic on the nominated subset.

This means:

- BOOT no longer has to start from the full project universe by default
- day clock can evaluate among candidates rather than among everything
- execution can begin with lower friction

## 4. Ops produces evidence
Ops still must produce:

- evidence
- block closure
- next touch exacto
- decision to continue / pause / park / escalate

## 5. Office reingests
Office reads the outputs of Ops and updates:

- carry state
- support queue
- escalation queue
- future block candidates

---

## What stays the same from classic Ops

Under Office governance, Ops still owns:

- block discipline
- mode discipline
- evidence-first progress
- stop rules
- closure
- re-entry clarity
- execution quality

Office does not replace those.

## What changes from classic Ops

### Before
Ops often had to:
- see the whole universe
- choose from raw fronts
- reconstruct selection logic manually

### Now
Ops should:
- start from Office-nominated work
- inherit support artifacts
- inherit current posture and urgency
- return structured outputs to Office

This reduces decision load at execution time.

---

## BOOT under Office

BOOT still exists.

But BOOT should now operate in one of two modes:

### 1. Normal mode
Input comes from Office compile.

BOOT checks:
- current candidate set
- support artifacts
- today constraints
- expected evidence
- feasible first block

### 2. Fallback mode
If no valid Office compile exists, Ops may still run from the raw system.

Fallback mode should be explicit and temporary.

Fallback mode is allowed when:

- Office compile is missing
- compile is stale
- system is in recovery state
- urgent interruption requires immediate local action

Fallback mode should result in an Office update afterward.

---

## Outputs Ops must return to Office

After execution, Ops should return structured updates.

At minimum:

### 1. Evidence
What was actually produced.

### 2. Closure
What was done, what remains pending, and what the next touch is.

### 3. Carry recommendation
Suggested update to carry state:

- Active
- Watch
- Support-needed
- Escalate
- Parked

### 4. Horizon recommendation
If work changed the time horizon, that should be suggested.

### 5. Follow-up spawn recommendation
Ops should indicate if the block implies that Office should spawn:

- unlocker brief
- health check
- decision packet
- nudge
- review item
- new block candidate

### 6. Escalation signal
Ops should say clearly if the matter must go back up to the Principal.

---

## Allowed relationship between Office and Ops

A useful working formula is:

- Office compiles work
- Ops executes compiled work
- Ops returns structured updates
- Office maintains continuity and recompiles

This creates a loop rather than a one-shot planner.

## Minimal v0 rule set

For v0, Ops under Office only requires three practical changes:

### A. Read Office Compile first
Before selecting work, read the current compile.

### B. Execute from candidate set
Prefer Office-nominated fronts over raw-front selection.

### C. Return structured outputs
Always return evidence, closure, and carry/update recommendations.

That is enough to align Ops with Oficina without rewriting the whole manual.

## Suggested wording for Start Here

A minimal conceptual update to `Start Here` would be:

- add a precondition: **Read Office Compile**
- replace “pick a work object” with:
  **select from Office-nominated work objects, unless operating in fallback mode**
- add a final step:
  **return update to Office**

## Final principle

Ops should not ignore Oficina.
Oficina should not micromanage Ops.

The contract is simple:

**Oficina governs what enters execution and what gets prepared.  
Ops governs how execution happens and what evidence comes back.**
