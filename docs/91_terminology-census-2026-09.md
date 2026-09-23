# Terminology census — September 2026

Status: provisional archaeology inventory. No term is removed or redefined by this file.

## Method

This census compares language in Ops Manual and Weekly Ops Governance with the current Control Tower v2 / Office v2 architecture. The default pruning rule is: keep a term only when it names current governed state, a current runtime contract, a useful human-facing handle, or a stable renderer/view.

The inventory deliberately errs on the side of listing too much. Families marked REVIEW are not automatically bad; they simply need proof of current use before surviving as first-class ecosystem vocabulary.

## A. KEEP — current governed/runtime vocabulary

These terms already map cleanly to current state or active Office v2 contracts:

- Control Tower v2
- front
- front_id
- front_registry_v2
- carry_state_v2
- carry_status
- lifecycle_status
- enabled
- Capabilities_v2
- operator_contract_v2
- front_aliases_v2
- support_artifacts_v2
- REPO MONITOR_v2
- repo_workspaces_v2
- runtime_health_v2
- human_focus
- human_maint
- staff_get
- staff_watch
- staff_post
- principal_mode
- priority_mode
- repo_id
- workspace_id
- relationships_v1
- relation_id
- relationship_agenda_v1
- agenda_id
- control snapshot
- snapshot digest
- typed work item
- DECIDE
- UNBLOCK
- VERIFY
- EXECUTE
- MAINTAIN
- Staff preparation
- Staff packet
- prep_mode
- Principal Compiler
- Needs You
- ready pull
- exception
- moved without you
- delta
- execution compiler
- execution packet
- execution receipt
- reentry proposal
- DONE
- FOLLOW_UP
- WAITING
- coherent generation
- run record
- last-known-good
- CORE
- SIDECAR
- runtime health

Disposition: preserve meaning; documentation should point to the owning table/code contract instead of redefining schemas.

## B. KEEP AS HUMAN LANGUAGE — useful but not state authority

These terms can remain as presentation or operating handles if they still help in practice:

- Principal
- Office / Oficina
- Staff
- Ops
- BOOT
- FOCUS
- MAINT
- CLOSE
- next pointer
- evidence
- stop rule
- bounded block
- blocker
- parked
- not-now
- active front
- Weekly Board
- Route Card
- Governance Map
- Digital Support Index
- Output Log
- Monday Bridge
- externalization
- paper-first
- renderer
- published view
- projection
- source of truth
- authority
- reentry

Disposition: keep definitions light. These words should describe human use, not create parallel schemas or mandatory machine states.

## C. REVIEW / COLLAPSE — prove current use before keeping first-class

Most of these are Weekly Ops routing vocabulary or placeholder state surfaces. They may survive as aliases, labels, or concrete routines, but should not automatically remain canonical domain concepts:

- WEEK-GOV
- CARRY-M
- CARRY-W
- FIN-W
- FIN-U
- GYM-GOV
- BODY-GOV
- HOUSE-GOV
- CAPTURE-GOV
- EXTERNAL
- CLN-30
- JOB-GOV
- CLIENT-SITES-GOV
- POLICY-CONTENT-GOV
- ACADEMIC-GOV
- ACTIVE-FRONTS
- PROJECT-TRIAGE
- BREAKTHROUGH-14D
- QUARTERLY-REFRAME
- Weekly Packet
- Project Frontier
- Carry State as an abstract manual page rather than carry_state_v2
- Finance Calendar
- Ledger
- Capture Inbox
- Body Log
- Gym Log
- Full Context
- Route Atlas
- domain contract
- tick criterion
- natural cadence
- contracts alive
- seasonal frame
- 14D breakthrough

Questions for each REVIEW term:

1. Is it visible in current weekly practice?
2. Does it map to a real source or current view?
3. Would ordinary language work equally well?
4. Is another page already expressing the same routing information?
5. Does removing the special name actually lose behavior?

Likely consolidation direction: keep a small route vocabulary for genuinely repeated human routines; turn domains into tags/categories rather than GOV-suffixed ontologies; generate navigation from one route/view registry instead of maintaining Route Atlas + Governance Map + Digital Support Index copies.

## D. RETIRE / HISTORICALIZE CANDIDATES

These terms are strongly associated with older Ops theory, Office v1, Repo Health/frontier machinery, speculative schemas, or hand-maintained operator taxonomies not represented in the current Office v2 control loop:

- Project as the canonical Ops object
- WorkUnit
- Case
- Batch
- Sprint
- Encounter
- VACChain
- Value-Add Chain
- Endpoint as portfolio truth unit
- FrontierState
- Frontier PASS/WARN/FAIL
- EvidenceLink as a first-class Ops schema
- CadenceRule
- project field: home
- project field: default_mode
- project field: owner_type
- project field: next_checkin_due
- project states idea / active / paused / messy-active / archived
- fixed horizons same-day / 2-7-days / 1-4-weeks
- PIPELINE
- TOOLSMITH
- SERVICE
- CONTRACT as execution mode
- GOVERNANCE as execution mode
- CONTACT as execution mode
- MODEL/ANALYZE
- Mode registry
- Fast mode classifier
- OperatorRegistry
- op_id hand ontology
- RunSmoke
- RunLiveBounded
- ContentValidationGate
- FreshnessCheck
- RepoInitUpgrade
- PrereqsBootstrap
- DefineCapabilitiesAndTests
- ADRLite
- MinimalReproExtraction
- DebugPacket as mandatory doctrine object
- DailyFrontierCompute
- PrepareBlockQueue
- GenerateOperatorCandidates
- PlanCheckinsFromCadence
- today_compile
- support_queue
- escalation_queue
- block_candidates
- office_summary
- principal_brief_today
- principal_brief_week
- unlocker brief
- health-check packet
- next-unlock packet
- re-entry memo
- review packet
- PARK
- PLAN_ONLY
- NUDGE
- RESCUE
- KILL
- Execution Frontier as a new canonical term

Disposition: default to archive, historical note, or ordinary-language replacement unless a current producer/consumer can be demonstrated.

Important nuance: retiring a named ontology term does not mean discarding its underlying engineering idea. For example, bounded verification, evidence, operator permissions, or failure isolation can remain while VACChain, mode enums, or a giant operator registry disappear.

## E. Specific collisions to resolve later

### Frontier

Old meaning: daily technical truth aggregation over endpoints, PASS/WARN/FAIL, and Repo Health.

Current direction: Event & Institutional Frontier is a read-oriented attention renderer. Runtime-health truth already has runtime_health_v2 and run-record health terminology.

Recommendation: do not create another live Execution Frontier abstraction. Historicalize the old meaning.

### Project vs front

Current operational identity is front_id. Repository identity is separate. Ops Manual should use project only in ordinary prose or when explicitly referring to an external project concept, not as a parallel canonical object.

### Carry State

The durable idea survives, but the manual should reference carry_state_v2 and its governed fields rather than maintain a simplified invented Carry schema.

### Operator

The engineering idea survives through operator_contract_v2 and execution packets. The old hand-authored Operator Registry should not be a second operator authority.

### Principal Brief

The useful human concept survives, but current canonical structured Principal output is produced by Principal Compiler v2. Old filenames and Today/Week brief families should not dictate the new documentation.

## F. Migration policy for terminology

When the real migration begins, every special term should receive one of five outcomes:

- CANONICAL: owned by current state/runtime and linked to its authority.
- HUMAN: retained as a lightweight human-facing word only.
- ALIAS: accepted for continuity but redirected to a canonical term.
- HISTORICAL: kept only in archaeology/version notes.
- DROP: ordinary language is clearer and no behavior depends on the term.

Do not create replacement jargon merely to preserve a one-to-one migration from the old glossary.

## G. Acceptance test for the eventual cleanup

The cleanup is successful when a new agent can understand the system using roughly this path:

Control Tower state -> Office coherent generation -> published views -> human/rendered surfaces -> evidence/receipt -> reviewed reentry.

If a term cannot be located on that path, it needs an explicit reason to remain.