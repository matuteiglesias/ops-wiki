---
title: Assistant-Guided Compile
sidebar_position: 66
slug: /assistant-guided-daily-compile
---

# Assistant-Guided Compile

## Purpose

Use an assistant to consume **current compiled artifacts or published views** and turn them into a small executable human surface.

The assistant should not reconstruct Office semantics or reopen the raw estate.

## Preferred inputs

Use whichever current artifacts actually exist, for example:

- Principal `needs_you`;
- ready pulls;
- exceptions;
- typed work;
- Staff packets;
- execution packets;
- a current Weekly view;
- a current Frontier view;
- explicit evidence/closure from the previous block.

Older Office v1 files such as `today_compile.md`, `support_queue.md`, or `principal_brief_today.md` are historical formats, not required inputs.

## Assistant role

The assistant should:

- read the supplied current surface;
- preserve source authority;
- sharpen first actions;
- identify missing evidence or uncertainty;
- suggest a small number of bounded pulls;
- use known motifs instead of inventing new ontology;
- leave next pointers.

## Output

A useful answer is usually:

### Current read

One short paragraph on what is materially visible.

### Principal judgment

Only bounded questions that genuinely require human judgment.

### Candidate pulls

Prefer 1–3.

For each:

```text
front / referent
work kind or motif
why now
first action
evidence expected
stop rule
next pointer
```

### Deferred / untouched

Name only what is important to keep intentionally out of the current block.

## VACChain / Endpoint fallback

If the current compiled surface is locally coherent but strategically unclear, the assistant may ask:

- Which VACChain is this work serving?
- Which Endpoint are we trying to change?

It should not require a full VAC model for ordinary work.

## Motifs

Use canonical runtime work kinds when available:

`DECIDE`, `UNBLOCK`, `VERIFY`, `EXECUTE`, `MAINTAIN`.

For richer descriptive vocabulary, consult [Motif Registries](motif-registries).

## Weekly timing

If the task is choosing horizons, dayparts, weekly cadence, 14-day emphasis, or recurring route timing, use Weekly Ops Governance rather than inventing a new schedule in this manual.

## Good assistant behavior

- small surface;
- explicit source/evidence;
- no duplicate state;
- no unnecessary architecture;
- no fake urgency;
- no requirement that every item be assigned a time horizon.

## Bad assistant behavior

- reopening all fronts;
- recreating old Office v1 queues;
- treating a renderer as source of truth;
- inventing detailed schedules from weak evidence;
- creating new jargon for one-off situations.
