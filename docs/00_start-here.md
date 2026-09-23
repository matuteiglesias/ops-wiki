---
id: start-here
title: Start Here
sidebar_position: 10
---

# Start here

## What this manual is

This is the execution and operating-doctrine manual for Matías's governed Office.

It does **not** own live operational state. The current system boundary is:

```text
Control Tower / governed Sheets
        ↓
Office coherent generation
        ↓
typed work + Staff preparation + Principal surface
        ↓
execution packets / human pulls
        ↓
evidence + receipts
        ↓
reviewed reentry
```

Human-facing sites such as Weekly Ops Governance and Event & Institutional Frontier consume or route to compiled views. They are not parallel databases.

## Authority

- **Control Tower v2** owns governed operational state such as front identity, carry posture, capabilities, operator contracts, support artifacts, repository/workspace bindings, and runtime-health projections.
- **office-auto-lab** owns current Office compilation semantics and coherent-generation artifacts.
- **The repository-estate control plane** owns repository identity and estate semantics. A repository is not an operational front.
- **Ops Manual** owns doctrine: bounded execution, evidence, checks, runbooks, closure/reentry conventions, and conceptual tools such as `VACChain` and `Endpoint`.
- **Weekly Ops Governance** owns human week routing, cadence heuristics, board conventions, and lightweight recurring routines.
- **Frontier UIs** are read-oriented renderers over published views unless an explicit write contract says otherwise.

## The operating loop

1. Start from the latest valid Office generation or another governed published view.
2. Read the small current work surface instead of reopening the full universe.
3. If Principal judgment is required, decide only the bounded question presented.
4. Execute one bounded move with clear evidence and a stop rule.
5. Leave a restartable next pointer when work remains.
6. Return evidence/receipt for reviewed reentry.

## If you only remember five terms

- **Front** — stable operational identity.
- **VACChain** — conceptual model of how a front creates value.
- **Endpoint** — a verifiable claim that a value-producing step is done or healthy.
- **Typed work** — Office v2 facets: `DECIDE`, `UNBLOCK`, `VERIFY`, `EXECUTE`, `MAINTAIN`.
- **Published view** — disposable read contract compiled from governed state for a renderer or human surface.

## What moved out of this manual

Fine-grained cadence and horizon heuristics belong in Weekly Ops Governance. This manual no longer treats Mon/Wed/Fri carry touches, fixed 14-day constructs, exact daily compile counts, or similar timing patterns as universal system semantics.

They may still be useful weekly-governance defaults.

## Jump

- [One Pager Spec](spec-one-pager)
- [Authority, State & Projection Model](data-model)
- [Office Charter](office-charter)
- [Office Compile](office-compile)
- [Ops under Office](ops-under-office)
- [Execution Model](execution-model)
- [Checks and Runbooks](checks-runbooks)
- [Motif Registries](motif-registries)
