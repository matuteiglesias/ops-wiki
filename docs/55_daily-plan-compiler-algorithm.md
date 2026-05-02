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
