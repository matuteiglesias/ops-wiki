# Governance consolidation prep — September 2026

Status: preparatory only. This document plans a later migration; it does not redefine live state, runtime behavior, routes, or deployment.

## Why this pass exists

The Ops Manual was written while Office, weekly governance, and repository-health concepts were still converging. The live Office runtime has since moved to Control Tower v2 and a coherent generation model. The manual now mixes several generations of theory: useful human operating principles, obsolete runtime contracts, speculative ontology, and terms that are still valuable but no longer canonical.

The migration should reduce concepts, not translate every old term into a new term.

## Reality baseline

Current authority should be read in this order:

1. Governed operational state lives in the current Control Tower / Sheets estate.
2. office-auto-lab owns the current Office runtime and compile semantics.
3. Repository-estate identity and health remain outside Ops Manual authority.
4. Weekly Ops Governance is a human routing / paper-governance surface, not a state store.
5. Event & Institutional Frontier is a read-oriented projection surface over governed state and compiled views.
6. Ops Manual documents operating doctrine, boundaries, and how to use the live system; it should not recreate live schemas.

Current Office v2 vocabulary includes one coherent Control Tower snapshot, typed work items, bounded Staff preparation, a Principal attention surface, execution packets, receipts, reentry proposals, coherent generations, run records, and last-known-good publication.

Historical Office v1 queues, per-front briefs, Repo Health / GCP runtime, prepared-block compiler, and the old technical frontier are not current Office product surfaces.

## Target role of Ops Manual

After migration, Ops Manual should be much smaller and have four jobs:

- Explain authority: what Sheets own, what Office compiles, what agents may propose, and what renderers consume.
- Explain the human operating loop: select from compiled state, perform bounded work, leave evidence, preserve a restart pointer.
- Explain execution safety and evidence conventions that remain useful across runtimes.
- Route readers to canonical live contracts instead of duplicating them.

It should not define a parallel project database, a second status machine, or a fixed calendar theory.

## Proposed future information architecture

### 1. Start here

Keep a short operator-facing entry point: where state lives, how to obtain the current compiled surface, how to act, and how to close.

### 2. Authority and architecture

Replace the current broad Data Model doctrine with an authority map:

- Control Tower v2: governed semantic state.
- office-auto-lab: compiler/runtime.
- projects/repository control plane: repository identity and estate semantics.
- published views: disposable read contracts.
- Ops Manual / Weekly / Frontier: human-facing projections and documentation.

### 3. Operating model

Preserve only the human distinctions that still reduce decision load. Likely durable concepts: Principal, Staff, bounded work, evidence, next pointer, stop rule, BOOT/FOCUS/MAINT/CLOSE as optional human handles.

Do not require the old six-mode ontology unless current Office or daily practice actually consumes it.

### 4. Verification and closure

Keep evidence, validation, failure containment, closure, and reentry principles, but point to current execution contracts and reentry semantics.

### 5. Historical concepts

Move superseded ontology here instead of silently redefining it: VACChain, Endpoint-as-portfolio-unit, Frontier PASS/WARN/FAIL, CadenceRule, WorkUnit taxonomy, Office v1 queues, mode/operator registry where no longer live.

## File-by-file migration plan

| Current page | Later action | Reason |
|---|---|---|
| 00_start-here.md | Rewrite lightly | Keep as human entry surface; point to current compiled artifacts/views. |
| 10_spec-one-pager.md | Major prune | Too many generations of doctrine are compressed together. Keep only durable operating invariants. |
| 20_data-model.md | Replace | Current page presents speculative objects as truth. Replace with Authority, State, and Projection Model. |
| 25_office-charter.md | Re-ground | Keep Principal/Office/Staff boundaries, replace Office v1 artifact names with current v2 flow. |
| 26_office-compile.md | Replace | Today Compile / Support Queue / Escalation Queue / Block Candidates are Office v1 vocabulary. Describe coherent generation and typed work instead. |
| 27_ops-under-office.md | Merge/prune | Most useful content belongs in authority + operating loop; avoid a second handoff doctrine. |
| 30_execution-model.md | Review aggressively | Preserve bounded execution/evidence; retire mode taxonomy if no live consumer remains. |
| 40_checks-runbooks.md | Keep, narrow | Verification and runbooks remain useful; remove dependency on obsolete Frontier semantics. |
| 50_day-clock-selection.md | Major prune | Fixed cadence and atomized scheduling should not be canonical. Keep loose human block heuristics only. |
| 55_daily-plan-compiler-algorithm.md | Archive or collapse | Current Office v2 already compiles work. Avoid a second manual daily compiler. |
| 56-assistant-guided-daily-compile.md | Collapse | Convert to a short guide for consuming current compiled views with an assistant. |
| 80_operator-registry.md | Retire or replace | The live authority is operator_contract_v2; a hand-maintained parallel operator ontology is high-risk drift. |
| contracts/ops-closure-v1.md | Review/migrate | Useful authority principle, but align with current receipt/reentry contracts rather than preserve a competing closure schema. |

## Frontier naming decision

Do not create a new canonical Execution Frontier merely to save the old name.

The old technical Frontier meant a PASS/WARN/FAIL aggregation over endpoints and Repo Health. That runtime is no longer current. During migration:

- references needed for historical explanation may be labeled legacy execution frontier;
- live runtime health should be called runtime health;
- live work selection should use typed work / compiled views;
- Frontier remains available as the name of the Event & Institutional Frontier product surface.

## Projection layer to document

The common architectural seam should be a published view:

source state -> compiler/projection -> validated read contract -> renderer

A view is disposable and reproducible. It may contain item identity, display title, group, sort hints, summary, next pointer, source references, source timestamp, and view generation timestamp. The renderer owns filters and selection state only.

Do not make time horizon, cadence, or arbitrary expiry mandatory fields in the generic view contract.

## Migration gates

The later migration should proceed only when each proposed surviving term passes at least one gate:

1. It maps to a current Control Tower field/table.
2. It maps to a current office-auto-lab contract or artifact.
3. It is a human-facing term that is demonstrably useful in present practice.
4. It names a public renderer/view with a stable responsibility.

If none apply, default to retire or historicalize.

## Explicit non-goals of this prep branch

- No edits to current doctrine pages.
- No sidebar/navigation changes.
- No redirects.
- No removal of terms.
- No changes to Office runtime.
- No changes to Sheets.
- No changes to Weekly Ops routes.
- No deployment decisions.

See terminology-census-2026-09.md for the initial pruning inventory.