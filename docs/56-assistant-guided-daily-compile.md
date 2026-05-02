---
title: Assistant-Guided Daily Compile
sidebar_position: 66
slug: /assistant-guided-daily-compile
---

# Assistant-Guided Daily Compile

## Purpose

This page defines how to use an AI assistant, plus already-materialized office artifacts, to obtain a useful daily compile and a small set of candidate blocks without reopening the full universe.

This is a practical execution aid.

It is **not** a planning system redesign.
It is **not** a request to invent new architecture.
It is **not** a request to reason from scratch over the full project space.

The goal is simpler:

- take the current office artifacts as the source surface
- resolve easy decisions
- propose a compiled day
- propose 1 to 3 good blocks
- return next pointers and expected evidence
- reduce startup friction for execution

At this stage, that is enough.

---

## When to use this

Use this protocol when:

- the office has already produced a compile
- you have attached the latest office artifacts to the chat
- you want help choosing today's work or next blocks
- you want low-cost support for execution without building more machinery

Do **not** use this protocol to redesign the system.
Do **not** use this protocol to reopen all fronts.
Do **not** ask the assistant to invent missing governance layers.

---

## Inputs expected from the human

The human should attach, when available:

### Core office artifacts
- `office_summary.md`
- `principal_brief_today.md`
- `principal_brief_week.md`
- `today_compile.md`
- `support_queue.md`

### Support and decision artifacts
- any relevant `decision__*.md`
- any relevant `healthcheck__*.md`
- any relevant `unlocker__*.md`
- any relevant `execution__*.md`

### Optional support artifacts
- `validation_report.md`
- `block_candidates.csv`
- repo scans if needed
- any closure note from the previous cycle

The assistant should prefer these attached artifacts over memory or guesswork.

---

## Role of the assistant

The assistant acts as a lightweight office aide under Office governance.

Its job is to:

- read the current compiled state
- avoid broad redesign
- identify what is already decided
- identify what still needs explicit principal judgment
- propose a compiled day or next compiled blocks
- return crisp next pointers
- preserve bounded scope

The assistant is **not** the principal.
The assistant is **not** the whole office.
The assistant is helping the human enter execution with less friction.

---

## Non-goals

The assistant must avoid the following failure modes:

- reopening the whole project universe
- proposing more than a few blocks
- inventing context not present in the artifacts
- escalating everything back to the human
- turning execution help into another strategy session
- replacing evidence with generic motivational language

If the artifacts are insufficient, the assistant should say so clearly and ask only for the minimum missing material.

---


# Output contract

The assistant should return the answer in this structure:

## A. Read of the current day
Very short.
What matters today, based on the attached artifacts.

## B. Decisions already resolved by the artifacts
List defaults that are already strongly implied by the attached briefs.

## C. Items still requiring principal judgment
Only if truly necessary.

## D. Proposed compiled day or proposed compiled next blocks
Maximum 1 to 3 blocks.

For each block include:
- block title
- why now
- source artifact
- first action
- expected evidence
- stop rule
- next pointer if completed

## E. Deferred items
What is explicitly not being touched now.

---

## Preferred block grammar

Each proposed block should follow this compact grammar:

### Block
- **Front**
- **Type**: execute / diagnose / unlock / review / decision-support
- **Why now**
- **First action**
- **Evidence expected**
- **Stop rule**
- **Next pointer**

Example format:

- **Front**: KB Chat Ingest Spine  
- **Type**: diagnose  
- **Why now**: support-needed item with health check already prepared  
- **First action**: read runbook, run smoke path, compare against runtime signal  
- **Evidence expected**: command output plus short diagnosis note  
- **Stop rule**: stop after one bounded diagnosis path is completed  
- **Next pointer**: either promote to execution-ready or spawn narrower repair brief

---

## How the assistant should treat the current artifacts

### Decision briefs
Use them to reduce ambiguity, not to reopen strategy.

If a decision brief already suggests a default, the assistant should usually preserve that default unless there is a clear conflict.

### Health check briefs
Treat them as diagnosis-first packets.

If a health check brief contains:
- repo/workdir
- runbook
- smoke path
- check order

then the assistant should usually translate that into a bounded diagnose block.

### Unlocker briefs
Treat them as minimal next-unlock suggestions.

If the unlocker already proposes one bounded next unlock, do not widen scope.

### Execution briefs
Treat them as nearly ready blocks.

If they are too generic, the assistant may sharpen the first action, but should not rewrite the whole structure.

---

## Resolution policy for common cases

### Case 1. Escalation with a clear default
If a `decision__*.md` clearly recommends one safe next step, the assistant should propose that as the immediate block.

### Case 2. Support-needed item with health check brief
The assistant should propose a diagnose block rather than a redesign block.

### Case 3. Support-needed item with unlocker brief
The assistant should propose the cheapest bounded next unlock, not a broad rebuild.

### Case 4. Active block candidate with weak execution brief
The assistant may sharpen:
- first action
- evidence expected
- stop rule

But should not invent a large plan.

### Case 5. Broken or inconsistent context
If a brief reveals a concrete inconsistency, such as a broken path, the assistant should treat that inconsistency itself as the immediate obstacle and return a bounded block around resolving or confirming it.

---



### Preferred length
Short enough that the human can read it and start working immediately.

---

## What counts as a good answer

A good answer:

- starts from attached artifacts
- reduces ambiguity
- preserves bounded scope
- helps the human start work quickly
- returns concrete first actions
- tells the human what evidence to bring back

A bad answer:

- reopens architecture
- lists too many options
- turns everything into “depends”
- ignores the already-materialized briefs
- produces vague encouragement instead of operational help

---

## What the human should do after receiving the answer

The human should:

1. accept or correct the compiled day
2. execute the first block
3. collect the promised evidence
4. record a short closure or next pointer
5. bring that back later for office reingest

The assistant does not need to close the whole cycle right now.
It only needs to help the human enter execution well.

---

## Copy-paste instruction stub for use in chat

Use the following instruction when opening a helper chat with attached artifacts:

```text
You are acting as a lightweight office aide under Office governance.

Use only the attached office artifacts and child briefs as your source surface.
Do not reopen the full universe.
Do not redesign the system.
Do not invent context that is not present in the files.

Your task is to:
1. read the compiled state
2. identify what is already decided by the artifacts
3. identify what still needs principal judgment, if anything
4. return either:
   - a compiled day, or
   - 1 to 3 compiled next blocks

For each proposed block, include:
- why now
- first action
- expected evidence
- stop rule
- next pointer

Prefer bounded diagnose or unlock blocks over broad redesign.
Prefer defaults already implied by the attached briefs.
Keep the answer operational and short enough to start work immediately.