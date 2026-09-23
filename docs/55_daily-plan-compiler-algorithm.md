---
id: daily-plan-compiler-algorithm
title: Daily Plan Compiler — Compatibility Note
sidebar_label: Daily Plan Compiler
sidebar_position: 65
---

# Daily Plan Compiler — Compatibility Note

The old manual defined a separate Daily Plan Compiler that rebuilt a day from frontier state, cadence, decision labels, and block candidates.

That is no longer the preferred architecture.

## Current path

```text
Control Tower v2
  → Office coherent generation
  → typed work / Staff / Principal
  → weekly or other published view
  → human selects a bounded move
```

Do not recreate `today_compile`, `block_candidates`, PARK/PLAN_ONLY/NUDGE/RESCUE/KILL, or PASS/WARN/FAIL Frontier merely to preserve this page.

## What survives

The useful idea survives:

> narrow a large universe into a small executable set before beginning work.

Today that narrowing should preferably come from Office v2 and/or Weekly Governance.

## If doing a manual day compile

Keep it intentionally lightweight:

1. open the current governed/compiled surface;
2. choose a small set worth seeing today;
3. identify one first executable move;
4. write evidence + stop rule;
5. leave the rest untouched.

Detailed counts, horizons, and daypart heuristics belong to Weekly Ops Governance.

## Historical value

Use Git history if the old 10-step algorithm or decision-label vocabulary is needed for archaeology.
