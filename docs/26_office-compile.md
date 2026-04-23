---
title: Office Compile v0
sidebar_position: 33
slug: /office-compile
---

# Office Compile v0

## Purpose

The Office Compile is the process by which **Oficina** turns the current system state into usable operational material.

It exists to answer:

- what should reach the Principal today
- what can be prepared by staff
- what should be executed now
- what should be escalated
- what can safely wait

The compile should reduce uncertainty and lower the cost of starting work.

## Inputs

Office Compile uses, at minimum:

- front registry
- carry state
- horizon
- needs
- principal flag
- any relevant support artifacts
- recent evidence or last touch
- current context surfaces when needed

Optional signals:

- momentum / touched recently
- blocked near completion
- relevant this week
- runtime health
- deadline pressure
- external commitments

## Core outputs

Office Compile produces five core outputs:

### 1. Principal Brief
What must reach the Principal.

### 2. Today Compile
What should be considered for today’s actual work.

### 3. Support Queue
What staff should prepare below the Principal.

### 4. Escalation Queue
What requires judgment or explicit direction.

### 5. Block Candidates
What Ops may execute from the compiled subset.

---

## 1. Principal Brief

### Purpose
The Principal Brief is the compact list of items that require direct human judgment, decision, approval, or attention.

### Selection rule
Include items where:

- `principal = Required`
- horizon is `Today` or `This week`
- or the item has become a real escalation

Examples:

- time-sensitive human outreach
- strategic decisions
- supervision with external deadlines
- legal or stakeholder-sensitive matters
- unresolved choices blocking execution

### Output shape
Each item should contain:

- front / matter name
- why now
- what is at stake
- what decision or action is needed
- recommended default if one exists
- relevant support artifact links

### Constraints
Keep it small.
The Principal Brief should not become a second project catalog.

---

## 2. Today Compile

### Purpose
The Today Compile is the office-compiled proposal for what the day should contain.

It is narrower than “this week” and should be operationally usable.

### Selection rule
Prefer:

- `Active`
- `This week` or `Today`
- execution-ready items
- support-needed items only when they unlock significant downstream value
- already-prepared items over vague ambitions

### Suggested limits
A reasonable v0 daily compile may include:

- 2 to 3 Principal-facing items
- 2 to 3 staff-preparable items
- 1 support-needed technical or unlock item
- a short overflow / later-today list

### Output shape
The Today Compile should contain sections such as:

- Today: Principal
- Today: Staff-preparable
- Today: Executable block candidates
- Today: Escalations
- Not today, but still this week

---

## 3. Support Queue

### Purpose
The Support Queue is where Oficina places work that should be prepared before it reaches execution or the Principal.

This is staff work, not deep project execution.

### Typical contents
Examples:

- unlocker brief
- health check
- decision brief
- context brief
- next-unlock packet
- re-entry memo
- review packet

### Selection rule
Prefer items where:

- `carry = Support-needed`
- `principal = Recommended`
- `needs` signals a support artifact rather than raw execution
- the item unlocks a valuable front
- the item reduces future decision load

### Output shape
Each queue item should contain:

- front name
- support artifact type
- why this support is needed
- expected payoff
- whether it can be completed without Principal intervention

---

## 4. Escalation Queue

### Purpose
The Escalation Queue holds matters that cannot be responsibly resolved at the staff layer.

### Include when
Examples:

- the matter needs non-trivial judgment
- there is a policy choice or direction choice
- the matter is sensitive
- the matter is blocked by a decision
- the matter has changed materially since last review

### Output shape
Each escalation item should contain:

- front name
- escalation reason
- current state
- consequences of delay
- options if available
- recommendation if available

### Important distinction
Not every `Required` item is dramatic.
But every escalation should be explicit.

---

## 5. Block Candidates

### Purpose
Block Candidates are the work objects that Office nominates for Ops execution.

They are not the whole universe.
They are the currently allowed subset.

### Selection rule
Prefer items that are:

- Active
- sufficiently prepared
- aligned with horizon
- not dependent on missing artifacts
- not blocked by unresolved escalation

### Block candidate record
Each candidate should ideally include:

- front / matter
- recommended mode
- expected evidence
- stop rule
- relevant support artifact
- whether it is primary or fallback

---

## Compile logic summary

### Office compiles
Office produces:

- principal brief
- today compile
- support queue
- escalations
- block candidates

### Principal decides what is needed
The Principal:

- approves
- corrects
- or accepts the compilation

### Ops executes
Ops runs on the compiled subset, not on the full universe by default.

### Office reingests
Office then updates carry state, spawns follow-ups, and recompiles if needed.

## v0 practical rule

The compile should be:

- small
- current
- defensible
- easy to enter
- easy to update
- visibly useful

If the compile is large, vague, or speculative, it has failed.

## Minimal v0 implementation rule

Even a manual compile counts as valid if it yields:

- a short principal brief
- a short today compile
- a support queue
- a short escalation list
- 2 to 5 real block candidates

That is enough to begin running Oficina in practice.
