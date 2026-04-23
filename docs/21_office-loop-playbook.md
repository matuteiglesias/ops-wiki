---
title: Office Loop Playbook
sidebar_position: 31
slug: /office-loop-playbook
---

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

## 1. Office compiles

**Input**
- sheets
- artifacts
- runtime
- support material

**Output**
- `office_summary`
- `principal_brief_today`
- `today_compile`
- `support_queue`
- `escalations`
- `block_candidates`

**Owner**
- Office

**Primary artifact**
- daily compile and briefs

---

## 2. Principal decides

**Input**
- `principal_brief_today`
- decision briefs, if any

**Output**
- accept
- correct
- defer
- explicit escalation

**Owner**
- Principal

**Primary artifact**
- principal brief for today

---

## 3. Ops executes

**Input**
- `today_compile`
- `block_candidate`
- `support_brief`, if any

**Output**
- evidence
- closure
- next touch
- proposed carry update

**Owner**
- Ops

**Primary artifact**
- operational compile for the selected block

---

## 4. Office reingests

**Input**
- Ops outputs

**Output**
- updated carry
- follow-ups
- recompilation if needed

**Owner**
- Office

**Primary artifact**
- execution outputs and carry state

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

## What this stage is trying to reveal

- a brief is not sufficient
- a bundle does not include the right data
- an item reaches principal in bad shape
- something that should resolve below keeps going up
- a support-needed path does not unlock useful progress
- the daily compile is still too wide

---

## Rule of the stage

Do not add more automation until repeated live use shows where the real bottlenecks are.