---
id: walkthrough-one-project
title: "Walkthrough: One Project End-to-End"
sidebar_position: 70
---

## Purpose
Unit test for the ontology. Show one project going from undefined to a PASS frontier state, using the smallest set of objects and operators.

This walkthrough is not a claim about how you will always execute work. It is a canonical example that makes the system legible, and it is written to remain forward-compatible with future automation (prepared blocks, precomputed operator queues, auto checks).

## Jump
- [Scenario and goal](#scenario-and-goal)
- [Define project](#define-project)
- [Define VAC chain](#define-vac-chain)
- [Define endpoints](#define-endpoints)
- [Choose mode and operator](#choose-mode-and-operator)
- [Run checks](#run-checks)
- [Handle FAIL](#handle-fail)
- [Update frontier](#update-frontier)
- [Schedule next block](#schedule-next-block)
- [Forward-compatibility notes](#forward-compatibility-notes)

---

## Scenario and goal

Pick a concrete but generic project shape:

- Project: `ops-wiki`
- Value: “internal docs site is deployable and truth-evaluable”
- Endpoints: build is green, deploy is live, link hygiene is acceptable (or explicitly allowed to warn in v0)

Success criteria:
- Frontier for this project becomes PASS (or at minimum PASS for the critical endpoint and WARN for the known non-critical one, depending on your policy).

---

## Define project

Create the project object in whatever registry you use (sheet, YAML, JSON, DB). The point is the fields and invariants.

### Project (minimum)
- `project_id`: `ops-wiki`
- `title`: Ops Wiki
- `home`: Meta-Orchestration & Governance Layer (or Core Technical Infrastructure, depending on your taxonomy)
- `repo_paths`: [`~/repos/meta-ontology` or the repo you actually use]
- `default_mode`: SERVICE or TOOLSMITH (this project can legitimately shift by block)
- `owner_type`: mixed (human docs + machine checks)
- `state`: active
- `cadence`: weekly (or every 3–7 days) during v0 stabilization

Invariant check:
- Project is active, so it must map to at least one VAC chain and at least one endpoint.

Links:
- Project definition lives at [Project](data-model#project)

---

## Define VAC chain

Define the value-add chain that describes “what value exists” in the world.

### VACChain (example)
- `vac_id`: `opswiki-vac-1`
- `project_id`: `ops-wiki`
- `description`: “Docs compile, deploy, and remain navigable.”
- `endpoints`: [`opswiki-build`, `opswiki-deploy`, `opswiki-link-hygiene`]
- `owner_type`: mixed

Links:
- VAC chain definition lives at [VACChain](data-model#vacchain)

---

## Define endpoints

Endpoints are the computable “done” claims. Keep the first set small.

### Endpoint 1: Build green
- `endpoint_id`: `opswiki-build`
- `type`: `deploy` (or `content_quality` if you want to reserve deploy for hosting)
- `check_method`: `npm run build`
- `artifacts_expected`: `build/` (or Docusaurus build dir)
- `freshness_policy`: `<= 7 days` (or `<= 3 days` during active work)
- `severity`: critical

### Endpoint 2: Deploy live (bounded)
- `endpoint_id`: `opswiki-deploy`
- `type`: `deploy`
- `check_method`: “vercel deployment exists and domain mapped” (later: a scriptable check)
- `artifacts_expected`: deployment URL / proof (later: automated check record)
- `freshness_policy`: `<= 14 days`
- `severity`: high

### Endpoint 3: Link hygiene / nav correctness
- `endpoint_id`: `opswiki-link-hygiene`
- `type`: `content_quality`
- `check_method`: Docusaurus broken link policy + manual spot check
- `artifacts_expected`: build logs and/or a `checks.json`
- `freshness_policy`: `<= 14 days`
- `severity`: medium

Notes:
- In v0 you may allow WARN for non-critical hygiene if explicitly declared (see [Frontier semantics](data-model#frontier-semantics)).

Links:
- Endpoint definition lives at [Endpoint](data-model#endpoint)

---

## Choose mode and operator

Now you choose a mode for the next block. The block constraint is: one block, one mode.

### Example: first block is TOOLSMITH
Intent: create stable scaffolding: docs IDs, sidebar, templates, repo hygiene, runbook stubs.

Choose an operator that fits TOOLSMITH and produces evidence.

Example operator: `RepoInitUpgrade` or `MachineRunbookSpec` or “Scaffold required doc stubs”.

You will record the planned run as an OpRun (or a planned OpRun stub).

Links:
- Modes: [Modes v1](execution-model#modes-v1)
- Operator: [Operator](execution-model#operator)
- OpRun: [OpRun](execution-model#oprun)

---

## Run checks

Checks must be explicit, bounded, and evidence-producing.

### Check set for this example

1) Smoke style check (offline build)
- Run `npm run build`
- Capture log path
- Confirm expected build artifacts exist

2) Content validation
- Confirm output directory exists and is non-empty
- Confirm no critical broken links (or capture that they were downgraded to WARN explicitly)

3) Deploy bounded check (if applicable in this block)
- If in a SERVICE block later: verify deployment exists and is reachable

Evidence outputs (example):
- `artifacts/<run_id>/build.log`
- `artifacts/<run_id>/manifest.json`
- Optional: `artifacts/<run_id>/deploy_check.json`

Links:
- Check taxonomy: [Check types](checks-runbooks#check-types)
- Evidence conventions: [Evidence and manifests](checks-runbooks#evidence-and-manifests)

---

## Handle FAIL

If a check fails, the system forces bounded debugging.

### Example FAIL paths
- Build fails due to broken links
- Build fails due to malformed front matter
- Deploy fails due to misconfigured settings

Rule:
- If you are drifting for ~40 minutes, stop and create a DebugPacket.

### DebugPacket (minimum)
- Symptom: “build fails with broken link to /docs/intro”
- Minimal repro: `npm run build` + error excerpt
- Hypotheses: “navbar points to missing doc id”
- Experiments: “add intro alias vs update nav links”
- Decision: choose one
- Resolution or next: fix merged or next scheduled
- Regression guard: build check remains required endpoint

Links:
- DebugPacket: [DebugPacket](execution-model#debugpacket)
- Stop rules: [Stop rules](execution-model#stop-rules)

---

## Update frontier

Frontier is updated from endpoint states, not from effort.

For each endpoint, set PASS/WARN/FAIL based on check outcomes and evidence existence:

- `opswiki-build`: PASS if build succeeds and evidence exists
- `opswiki-deploy`: PASS if deployment proof exists and is fresh
- `opswiki-link-hygiene`: PASS if clean; WARN if acceptable warning policy is explicitly chosen; FAIL if it breaks truth or usability

Then compute derived project status via the aggregation rule:
- any FAIL -> FAIL
- else any WARN -> WARN
- else PASS

Attach EvidenceLinks (paths, manifests, commit hash if applicable).

Links:
- Frontier: [Frontier](data-model#frontier)
- EvidenceLink: [EvidenceLink](data-model#evidencelink)

---

## Schedule next block

This is where the walkthrough ties into your day system without prescribing your life.

Use cadence and frontier to decide what is due:
- If derived status is WARN: schedule a MAINT block to clear the WARN (runbook stub, link hygiene fix, prereq).
- If derived status is FAIL: schedule a CONTRACT block with a bounded DebugPacket plan.
- If PASS: schedule the next cadence check-in (lightweight).

Links:
- Block model: [Block model](day-clock-selection#block-model)
- Selection policy: [Selection policy](day-clock-selection#selection-policy)
- Cadence: [CadenceRule](data-model#cadencerule)

---

## Forward-compatibility notes

This walkthrough is written to remain compatible with “prepared blocks” and precomputed action queues.

### What the future system can add without changing this page
- A script that reads frontier + cadence and generates candidate OperatorRuns per mode
- A block preparation step that precomputes “if you choose PIPELINE, here are the top 3 legal ops with expected evidence”
- Automatic check execution for smoke and health checks
- Auto-generated EvidenceLinks and manifests

### Stability constraints (do not break)
- Keep mode and operator names stable once adopted (treat them like API surface).
- Keep endpoint IDs stable (these are truth anchors).
- Allow new fields to be added to objects without redefining old meanings.
- Prefer additive evolution: new operators and checks, not redefinitions of “PASS”.

---

## See also
- [Data Model](data-model)
- [Execution Model](execution-model)
- [Checks and Runbooks](checks-runbooks)
- [Day Clock and Selection](day-clock-selection)
- [One Pager Spec](spec-one-pager)
