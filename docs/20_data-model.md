---
id: data-model
title: Authority, State & Projection Model
sidebar_position: 30
---

# Authority, State & Projection Model

## Why this page changed

Older versions of this manual described a complete Ops-owned object model: Project, WorkUnit, VACChain, Endpoint, FrontierState, EvidenceLink, and CadenceRule.

That was useful while the live control plane was still forming. It is no longer the correct authority model.

Today, live operational state is governed elsewhere. This page now distinguishes:

1. **canonical governed state**;
2. **durable conceptual vocabulary**;
3. **compiled/runtime artifacts**;
4. **published views**.

## Canonical governed state

The current Control Tower v2 estate includes, among other tables:

- `front_registry_v2` — stable front identity and relatively stable semantics;
- `carry_state_v2` — current governed operating posture;
- `Capabilities_v2` — capability projection;
- `operator_contract_v2` — operator powers, prohibitions, seams, and buses;
- `front_aliases_v2` — identity reconciliation;
- `support_artifacts_v2` — governed pointers and support surfaces;
- `REPO MONITOR_v2` — front-to-repository/workspace bindings;
- `repo_workspaces_v2` — observed concrete workspaces;
- `runtime_health_v2` — derived runtime-health projection.

Relationship governance additionally uses tables such as `relationships_v1` and `relationship_agenda_v1`.

This manual does not duplicate their schemas. The current table/code contract is authoritative.

## Identity boundary

### Front

`front_id` is the stable operational identity.

A front is not a repository.

A front may reference zero, one, or many repositories; a repository may support zero, one, or many fronts. Repository/workspace identity remains governed by its own control plane.

### Relation and agenda identities

Relationship-oriented surfaces may use `relation_id` and `agenda_id`. A renderer may display them together with a front, event, institution, or opportunity without collapsing their identities.

## Conceptual vocabulary

### VACChain {#vac-chain}

A **VACChain** models how a front produces value.

A VACChain answers:

- What valuable result exists at the end?
- What transformations or interactions create it?
- Where are the meaningful verification points?
- Which dependencies can block the chain?

A lightweight conceptual shape is:

```text
vac_id?
front_id
description
stages[]
endpoints[]
dependencies[]
```

The `vac_id` is optional unless a real registry needs to persist the chain.

#### Invariant

A VACChain describes value production. It does **not** own execution permissions, carry posture, repository identity, or scheduling.

### Endpoint {#endpoint}

An **Endpoint** is a verifiable claim at a meaningful point of a VACChain.

A lightweight conceptual shape is:

```text
endpoint_id?
vac_ref
claim
check_method
evidence_expected
freshness_or_validity_rule?
```

Examples:

- “canonical dataset exists and passes schema validation”;
- “scheduled job completed and emitted a run record”;
- “stakeholder update was sent and follow-up state was recorded”;
- “published report resolves to the accepted artifact”.

Endpoints may be technical, operational, narrative, or stakeholder-facing.

#### Endpoint state

Do not require one global PASS/WARN/FAIL status machine.

The relevant producer may expose richer state: test results, runtime health, publication state, relationship state, or another domain-specific status. The Endpoint concept only requires that the claim be checkable.

## Compiled/runtime artifacts

Office v2 produces generation-bound artifacts such as:

- control snapshots;
- typed work items;
- Staff preparation packets;
- Principal briefs;
- execution plans and packets;
- run records;
- reentry proposals.

These are canonical for the generation that produced them, but they do not replace the underlying governed Control Tower state.

### Typed work

The current canonical work facets are:

`DECIDE`, `UNBLOCK`, `VERIFY`, `EXECUTE`, `MAINTAIN`.

See [Motif Registries](motif-registries) for descriptive work motifs beyond the runtime enum.

## Published views

A **published view** is a reproducible read contract compiled for a particular human or renderer surface.

Examples:

- Principal attention view;
- weekly governance view;
- relationship frontier view;
- institutional/event frontier view;
- maintenance view;
- runtime-health view.

A minimal generic view item may contain:

```text
view_id
item_id
item_kind
title
group
sort_hint
summary
next_pointer
source_refs[]
source_updated_at
view_generated_at
```

Not every view needs every field.

### View invariants

1. A view is not authoritative for source facts.
2. A view may contain compiled judgments or grouping.
3. A renderer may filter/sort locally without writing operational state.
4. A view can be discarded and rebuilt.
5. A failed refresh should not replace a valid last-known-good publication with an accidental empty result.

## Evidence references

Evidence should be traceable to the claim it supports, but this manual no longer requires one universal `EvidenceLink` storage schema.

A useful evidence pointer usually identifies:

- producer/source;
- artifact or record identity;
- observation/run time;
- optional digest/revision;
- short claim supported.

## Cadence and horizons

Cadence and horizon constructs are **weekly-governance policy**, not universal data-model requirements.

Weekly governance may use:

- same-day / this-week / later;
- Mon/Wed/Fri review heuristics;
- 14-day frames;
- quarterly reframes;
- daypart/block defaults.

Those are valuable human operating conventions. They belong in Weekly Ops Governance so they can evolve without forcing schema changes across Office, Control Tower, or Frontier renderers.

## Frontier terminology

The old Ops `FrontierState`—a PASS/WARN/FAIL aggregation over endpoints—is historical and is no longer a live canonical object.

Use:

- **runtime health** for runtime observation;
- **typed work / compiled views** for work surfacing;
- **Event & Institutional Frontier** for the current read-oriented external-world attention renderer.

## Deprecated schema concepts

The following are no longer canonical storage objects merely because older pages named them:

- Project as the universal operational root;
- WorkUnit / Case / Batch / Sprint / Encounter as mandatory schema types;
- FrontierState;
- EvidenceLink;
- CadenceRule.

Their underlying ideas may still appear as ordinary language or motifs.

## See also

- [One Pager Spec](spec-one-pager)
- [Office Compile](office-compile)
- [Execution Model](execution-model)
- [Motif Registries](motif-registries)
