---
title: Office Charter v0
sidebar_position: 32
slug: /office-charter
---

# Office Charter v0

## Purpose

**Oficina** is the governance layer that sits between the **Principal** and the execution system.

Its job is not to do all work itself.
Its job is to reduce disorder, prepare work before it reaches execution, and make sure the Principal does not need to manually reconstruct the full universe every day.

Oficina exists so that:

- active fronts are carried over time
- support work is prepared before it is needed
- simple decisions are resolved below the Principal when possible
- non-trivial decisions are escalated cleanly
- Ops executes from a compiled subset, not from the raw universe

## What Oficina is

Oficina is:

- the authority that governs **staff**
- the authority that governs interaction between:
  - Projects / Carry State
  - Context
  - Capture
  - KB Contracts
  - Ops
- the layer that compiles operational material for the day and week
- the layer that maintains continuity across fronts

Oficina is the glue and coordination container for the rest of the system.

## What Oficina governs

Oficina governs:

### 1. Carry state
It maintains and updates the operational posture of fronts.

Examples:

- Active
- Watch
- Support-needed
- Escalate
- Parked

### 2. Agenda compilation
It compiles support material and candidate work for the day and week.

Examples:

- principal brief
- today compile
- support queue
- escalations
- block candidates

### 3. Staff work
It governs staff behavior and the spawn of support artifacts.

Examples:

- unlocker briefs
- decision briefs
- health checks
- next-unlock packets
- context briefs
- follow-up prompts
- re-entry material

### 4. Inter-layer coordination
It determines how the other surfaces interact.

Examples:

- Context informs Office
- Projects / Carry State provides front universe
- Capture feeds new artifacts into Office
- KB Contracts constrains seams and architecture
- Ops executes work objects nominated by Office

## What Oficina does not do

Oficina does **not** replace the Principal.

Oficina does **not** replace Ops.

Oficina does **not** become a giant knowledge base.

Oficina does **not** execute arbitrary deep work by itself.

Oficina does **not** own the underlying truth of every system.
It governs flows between systems and prepares action.

More specifically:

- it does not become the raw source registry
- it does not become the project catalog
- it does not become the capture system
- it does not become the execution manual
- it does not become the technical contract layer

## Relationship with Principal

The Principal remains the highest authority.

The Principal:

- decides exceptions
- resolves non-trivial choices
- approves or corrects compiled plans
- provides direction and judgment where needed

Oficina should reduce the number of things that need to reach the Principal.

### Desired rule

The Principal should receive:

- only the matters that truly need judgment
- prepared options when possible
- compact and current briefings
- already-compiled candidate work, not raw chaos

## Relationship with Ops

Ops is the execution layer under Office governance.

Ops should not begin from the raw universe by default.

Ops should receive:

- nominated work objects or candidate sets from Office
- expected evidence
- relevant support artifacts
- escalation posture if applicable

Ops then:

- runs BOOT on the compiled subset
- uses day clock and modes to execute well
- produces evidence
- returns updates to Office

## Relationship with the other assets

### Projects / Carry State
Provides the front universe and current posture fields.

### Context
Provides access to sources and durable surfaces.

### Capture
Transforms live cognition and events into artifacts that Office can classify and use.

### KB Contracts
Provides technical and structural constraints so Office does not coordinate drifted or invalid seams.



# Office Loop Playbook

## Purpose

Operate the office through a short loop that compiles, decides, executes, and reingests without adding more automation first.

The goal of this stage is not elegance. It is to expose real system weaknesses through live use.

## Sequence

1. Office compiles
2. Principal decides
3. Ops executes
4. Office reingests

---

## Daily minimum protocol

1. Read `office_summary.md`
2. Read `principal_brief_today.md`
3. Decide 2 to 4 things maximum
4. Pick 1 principal block and 1 staff-preparable block
5. Execute through this playbook
6. Close with a short reingest note:
   - what changed
   - what did not change
   - what brief was missing

---

## Friction log

Track only short tags:

- `missing_bundle_field`
- `bad_priority`
- `brief_too_vague`
- `should_have_been_escalation`
- `should_not_have_reached_principal`
- `needs_new_artifact_type`

---



## Minimal outputs of Oficina

At minimum, Oficina must be able to produce:

- principal brief
- today compile
- support queue
- escalation queue
- block candidates
- carry state updates
- follow-up spawns

## Office operating principle

**Oficina governs selection, preparation, escalation, and coordination.  
Ops governs execution and evidence.  
The Principal governs judgment and direction.**
Do not add more automation until repeated live use shows where the real bottlenecks are.

## Version note

This is **v0**.

The goal is not institutional perfection.
The goal is a compact, usable governance layer that can already support daily and weekly operation without forcing the Principal to rebuild the world manually each time.

