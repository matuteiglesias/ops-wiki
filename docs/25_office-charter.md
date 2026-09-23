---
title: Office Charter
sidebar_position: 32
slug: /office-charter
---

# Office Charter

## Purpose

Office is the governed preparation and compilation layer between live operational state, scarce Principal judgment, and bounded execution.

Its job is to make the work estate usable without turning the Principal into the scheduler, database administrator, or universal triage engine.

## Authority boundary

- Control Tower v2 owns governed operational state.
- Office consumes one validated Control Tower snapshot per coherent generation.
- Repository/workspace identity is resolved through governed bindings; local paths are observations, not semantic identity.
- Staff prepares evidence-backed substrate.
- Principal supplies judgment only where required.
- Execution acts through bounded packets and current operator contracts.
- Reentry proposes reviewed changes; executors do not silently mutate governance.
- UI consumers are projections and should not force Office to reproduce obsolete formats.

## Current Office loop

```text
Control Tower v2
  ↓ one validated snapshot
identity resolution
  ↓
typed work
  ↓
Staff preparation
  ↓
Principal surface
  ↓
execution plan / packets
  ↓
receipts
  ↓
reviewable reentry
```

A coherent generation publishes only after the whole generation validates.

The last-known-good pointer must not advance on a failed generation.

## What Office governs

### 1. Intake consistency

Office captures the current Control Tower state once and validates structural identity before downstream work.

### 2. Work compilation

Office converts governed state into the small typed vocabulary:

- `DECIDE`
- `UNBLOCK`
- `VERIFY`
- `EXECUTE`
- `MAINTAIN`

Free prose may provide context, but it does not secretly control routing.

### 3. Staff preparation

Staff triages typed work cheaply and deep-prepares only a bounded pull window.

Preparation may gather evidence, resolve repository/workspace observations, expose uncertainties, and recommend a move. It does not authorize execution.

### 4. Principal compression

The Principal Compiler produces a small attention surface such as:

- Needs You;
- ready pulls;
- exceptions;
- moved without you;
- delta.

A successful generation may legitimately require no Principal action.

### 5. Execution compilation

Ready work may become bounded execution packets under governed operator contracts.

Compilation is not authorization for actions outside those contracts.

### 6. Reentry

Execution facts return as receipts or human closure. Reentry validates those facts and produces proposals such as `DONE`, `FOLLOW_UP`, or `WAITING`.

Governed state changes only through the reviewed authority path.

## What Office does not own

Office does not own:

- the raw truth of every external system;
- repository-estate identity;
- arbitrary browser-local UI state;
- every weekly cadence heuristic;
- every VACChain or Endpoint as a stored row;
- every relationship/contact record;
- execution permission merely because work is ready.

## Principal

The Principal remains the highest judgment authority.

The system should minimize Principal load by preparing bounded questions and defaults rather than surfacing raw ambiguity.

## Staff

Staff is preparation, not a second backlog.

A useful Staff result is a packet that lets the next decision or execution begin with less reconstruction.

## Ops / execution

Ops is responsible for disciplined execution and evidence.

Useful enduring rules:

- bounded move;
- explicit expected evidence;
- current operator contract;
- stop before scope silently expands;
- leave a restartable pointer if unfinished;
- return what actually happened, not what was intended.

## VACChain and Endpoint

Office does not require every front to materialize VACChains or Endpoints in Control Tower.

They remain valuable conceptual tools when deciding:

- where value is actually produced;
- what “done” means;
- where verification belongs;
- which missing dependency blocks useful progress.

See [Authority, State & Projection Model](data-model).

## Weekly governance

Weekly policy owns cadence and horizon heuristics. Office may consume governed fields that encode operating posture, but this manual does not hard-code Mon/Wed/Fri routines, 14-day frames, or exact daily item counts into the Office architecture.

## Renderers

Office outputs structured artifacts. Markdown, websites, boards, and Frontier UIs are projections over those artifacts or over other published views.

A renderer should not reconstruct Office semantics independently.

## Operating principle

**Govern state once. Prepare below the Principal. Execute through bounded contracts. Reenter through evidence.**
