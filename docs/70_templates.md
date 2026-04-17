---
id: templates
title: Templates
sidebar_position: 80
---

## Purpose
Copy paste stubs for the system. Templates must match the contracts in the module pages.

Rule: templates are minimal but complete. If a field is unknown, write `UNKNOWN` explicitly rather than deleting it.

## Jump
- [Project](#project-template)
- [VACChain](#vacchain-template)
- [Endpoint](#endpoint-template)
- [Operator](#operator-template)
- [OpRun](#oprun-template)
- [Capture note](#capture-note-template)
- [Condensed session note](#condensed-session-note-template)
- [Recruiter reply](#recruiter-reply-template)
- [Application packet](#application-packet-template)
- [Meeting prep brief](#meeting-prep-brief-template)
- [Safe mode checklist](#safe-mode-checklist-template)
- [DebugPacket](#debugpacket-template)
- [RunbookHuman](#runbookhuman-template)
- [RunbookMachine](#runbookmachine-template)
- [Daily brief](#daily-brief-template)

---

## Project template

Links:
- Contract: [Project](data-model#project)

```yaml
project:
  project_id: "proj_id_stable"
  title: "Human readable title"
  home: "UNKNOWN"               # project home bucket
  repo_paths:
    - "UNKNOWN"
  default_mode: "UNKNOWN"       # PIPELINE | TOOLSMITH | SERVICE | CONTRACT | GOVERNANCE | CONTACT
  owner_type: "UNKNOWN"         # human | machine | mixed
  state: "active"               # active | paused | archived
  cadence:
    frequency_days: 7
    overdue_behavior: "catch-up-checkin"
  tags: []
  owner: "matias"
  next_checkin_due: "UNKNOWN"   # ISO date or timestamp
  notes: "One sentence: what this project is for"
````

---

## VACChain template

Links:

* Contract: [VACChain](data-model#vacchain)

```yaml
vac_chain:
  vac_id: "vac_id_stable"
  project_id: "proj_id_stable"
  description: "Value statement: what exists in the world if this works"
  owner_type: "UNKNOWN"           # human | machine | mixed
  prerequisites:
    - "UNKNOWN"
  endpoints:
    - "endpoint_id_1"
    - "endpoint_id_2"
  notes: "Optional: why this VAC matters"
```

---

## Endpoint template

Links:

* Contract: [Endpoint](data-model#endpoint)
* Evidence pointers: [EvidenceLink](data-model#evidencelink)
* Check taxonomy: [Check types](checks-runbooks#check-types)

```yaml
endpoint:
  endpoint_id: "endpoint_id_stable"
  vac_id: "vac_id_stable"
  title: "Short description of the done-claim"
  type: "UNKNOWN"                  # pipeline | deploy | service | content_quality | contract
  severity: "medium"               # critical | high | medium | low

  check_method:
    check_type: "smoke"            # smoke | run_live_bounded | contract_test | health_check | content_validation
    command: "UNKNOWN"             # exact command or pointer (make target, script, CLI)
    timebox_minutes: 15
    scope: "fixture"               # fixture | live
    bounds:
      max_rows: null
      max_items: null
      rate_limit: null
      dry_run: true

  artifacts_expected:
    - "UNKNOWN"                    # paths/globs for artifacts produced by successful check

  freshness_policy:
    max_age_days: 7

  evidence_required:
    logs: true
    manifest: true
    artifacts: true

  acceptance_criteria:
    - "Exit code is 0"
    - "Artifacts expected exist and are non-empty"
    - "Content validation gates pass (if defined)"

  failure_paths:
    - "If FAIL: create DebugPacket and schedule CONTRACT block"
    - "If WARN: schedule MAINT to clear missing prereq/runbook/evidence"

  notes: "Optional: special rules"
```

---

## Operator template

Links:

* Contract: [Operator](execution-model#operator)
* Checks: [Checks and Runbooks](checks-runbooks)

```yaml
operator:
  op_id: "op_id_stable"
  name: "Human readable operator name"
  mode_ids:
    - "UNKNOWN"                    # PIPELINE | TOOLSMITH | SERVICE | CONTRACT | GOVERNANCE | CONTACT

  purpose: "One sentence: what this operator achieves"

  inputs:
    - name: "project_id"
      type: "ProjectRef"
      required: true
    - name: "repo_path"
      type: "Path"
      required: false
    - name: "params"
      type: "Map"
      required: false

  steps:
    - "Step 1"
    - "Step 2"
    - "Step 3"

  outputs:
    artifacts:
      - "UNKNOWN"                  # paths/globs
    logs:
      - "UNKNOWN"
    manifests:
      - "UNKNOWN"

  acceptance_checks:
    - check_type: "content_validation"
      command: "UNKNOWN"
    - check_type: "smoke"
      command: "UNKNOWN"

  timebox_minutes: 60

  failure_paths:
    - "If blocked: write next pointer and stop"
    - "If drifting: create DebugPacket"
    - "If regression risk: add guardrail (test/gate) before declaring PASS"

  evidence_pattern: "UNKNOWN"      # link or short label; must match mode evidence pattern

  next_pointer_rule: "One line: what must be written at end of run"
```

---

## OpRun template

Links:

* Contract: [OpRun](execution-model#oprun)
* Evidence pointers: [EvidenceLink](data-model#evidencelink)

```yaml
op_run:
  op_id: "op_id_stable"
  project_id: "proj_id_stable"
  mode_id: "UNKNOWN"
  timestamp_start: "UNKNOWN"
  timestamp_end: "UNKNOWN"

  inputs_used:
    - "UNKNOWN"

  outputs_written:
    - "UNKNOWN"

  acceptance_results:
    - check_type: "smoke"
      status: "UNKNOWN"            # PASS | WARN | FAIL
      evidence_links:
        - "UNKNOWN"
    - check_type: "content_validation"
      status: "UNKNOWN"
      evidence_links:
        - "UNKNOWN"

  result: "UNKNOWN"                # PASS | WARN | FAIL

  evidence_links:
    - "UNKNOWN"

  next_pointer: "One line next action"
```

---

## Capture note template

Links:

* Operators: [CaptureIntake](operator-registry#e-governance-operators)

```yaml
capture_note:
  capture_id: "cap_YYYYMMDD_hhmm"
  timestamp: "UNKNOWN"                 # ISO timestamp
  source_type: "UNKNOWN"               # speech | meeting | chat | scratch
  participants:
    - "UNKNOWN"
  raw_context:
    - "Bullet with factual fragment"
    - "Bullet with question/open thread"
  explicit_unknowns:
    - "UNKNOWN"
  candidate_mappings:
    candidate_project_ids:
      - "UNKNOWN"
    candidate_case_ids:
      - "UNKNOWN"
    candidate_batch_ids:
      - "UNKNOWN"
  artifact_links:
    - "UNKNOWN"                        # recording/transcript/doc links
  notes: "Do not over-structure here; preserve signal."
```

---

## Condensed session note template

Links:

* Operators: [SessionCondense](operator-registry#e-governance-operators), [NextPointerFromCapture](operator-registry#e-governance-operators), [MeetingPacketDraft](operator-registry#e-governance-operators)

```yaml
condensed_session_note:
  condense_id: "csn_YYYYMMDD_hhmm"
  based_on_capture_ids:
    - "cap_YYYYMMDD_hhmm"
  context_summary: "3-6 lines max with operationally relevant context"
  decisions:
    - "Decision 1"
  unknowns:
    - "UNKNOWN"
  candidate_next_pointer:
    text: "One-line executable next move"
    candidate_mode_id: "UNKNOWN"       # PIPELINE | TOOLSMITH | SERVICE | CONTRACT | GOVERNANCE | CONTACT
    candidate_operator: "UNKNOWN"
    timebox_minutes: 45
  candidate_case_batch_project:
    type: "UNKNOWN"                    # case | batch | project
    id_or_slug: "UNKNOWN"
    rationale: "Why this mapping is likely"
  promoted_artifact_links:
    - "UNKNOWN"
  failure_path_if_unclear: "Route to triage GOVERNANCE block with explicit unknowns."
```

---

## Recruiter reply template

Links:

* Operators: [RecruiterReplyDraft](operator-registry#f-contact-operators), [BriefBeforeSend](operator-registry#f-contact-operators)

```yaml
recruiter_reply:
  reply_id: "rr_YYYYMMDD_hhmm"
  thread_ref: "UNKNOWN"
  objective: "What this reply must achieve"
  positioning:
    fit_summary: "2-4 lines"
    constraints:
      - "UNKNOWN"
  key_points:
    - "Point 1"
    - "Point 2"
  call_to_action: "Requested next step"
  risk_flags:
    - "UNKNOWN"
  next_pointer: "If sent, what happens next"
```

---

## Application packet template

Links:

* Operators: [TargetBatchTriage](operator-registry#f-contact-operators), [ApplicationPacketPrep](operator-registry#f-contact-operators)

```yaml
application_packet:
  packet_id: "ap_YYYYMMDD_slug"
  target:
    company_or_org: "UNKNOWN"
    role_or_track: "UNKNOWN"
    source_link: "UNKNOWN"
  objective: "Submission-ready packet for this target"
  components:
    cv_version: "UNKNOWN"
    cover_note: "UNKNOWN"
    evidence_snippets:
      - "UNKNOWN"
  status: "draft"                  # draft | ready_to_send | sent | blocked
  blockers:
    - "UNKNOWN"
  sent_log_ref: "UNKNOWN"
  followup_window: "UNKNOWN"
  next_pointer: "One executable next step"
```

---

## Meeting prep brief template

Links:

* Operators: [StakeholderMeetingPrep](operator-registry#f-contact-operators), [FollowUpStrategy](operator-registry#f-contact-operators)

```yaml
meeting_prep_brief:
  brief_id: "mpb_YYYYMMDD_hhmm"
  stakeholder_case: "UNKNOWN"
  objective: "What outcome this meeting should produce"
  current_status: "1-3 lines of context"
  asks:
    - "Ask 1"
  decision_points:
    - "Decision needed"
  risks:
    - "UNKNOWN"
  supporting_artifacts:
    - "UNKNOWN"
  followup_plan:
    owner: "UNKNOWN"
    window: "UNKNOWN"
    trigger: "UNKNOWN"
  next_pointer: "Post-meeting next action"
```

---

## Safe mode checklist template

Links:

* Protocol: [Safe mode branch](day-clock-selection#safe-mode-branch-low-judgment-protocol)
* Intro: [Safe Mode / Low Judgment](intro#safe-mode--low-judgment-625-min)

```yaml
safe_mode_checklist:
  checklist_id: "smc_YYYYMMDD_hhmm"
  trigger_signals:
    - "late_night_activation"
    - "poor_sleep"
    - "recent_substance_use"
    - "emotional_overload"
    - "reopen_everything_impulse"
  allowed_moves:
    - "CaptureIntake"
    - "SessionCondense"
    - "LockInSession"
    - "PrepareBlockQueue"
    - "ContactQueueGroom"
    - "inventory_first"
  forbidden_moves:
    - "refactor"
    - "irreversible_decision"
    - "new_major_front"
    - "unbounded_debug"
  bounded_triage:
    active_now:
      - "UNKNOWN"
    deferred:
      - "UNKNOWN"
  next_pointer: "One executable next step"
  reassess_at: "UNKNOWN"         # ISO timestamp
```

---

## DebugPacket template

Links:

* Contract: [DebugPacket](execution-model#debugpacket)

```yaml
debug_packet:
  project_id: "proj_id_stable"
  symptom: "Observable failure in one line"
  context: "What changed recently (optional)"

  minimal_repro:
    commands:
      - "UNKNOWN"
    inputs:
      - "UNKNOWN"
    expected: "UNKNOWN"
    actual: "UNKNOWN"
    logs:
      - "UNKNOWN"

  hypotheses:
    - "H1"
    - "H2"
    - "H3"

  experiments:
    - change: "What you changed"
      result: "What happened"
      evidence:
        - "UNKNOWN"
    - change: "UNKNOWN"
      result: "UNKNOWN"
      evidence:
        - "UNKNOWN"

  decision: "What you conclude right now"
  resolution_or_next: "Fix applied OR next experiments to run"
  regression_guard: "Test/gate/check added OR TODO"
  time_spent_minutes: 40
```

---

## RunbookHuman template

Links:

* Spec: [Runbooks](checks-runbooks#runbooks)

```md
## RunbookHuman: <project_id>

Purpose:
- Why this project exists and what “done” means (tie to endpoints)

Exports:
- What artifacts this project produces

How to run (human checklist):
1) ...
2) ...

PASS/WARN/FAIL actions:
- If PASS: ...
- If WARN: ...
- If FAIL: ...

Common failures:
- Symptom -> likely cause -> fix

Next pointers:
- After a normal session: ...
- After a blocked session: ...

Cadence and ownership:
- Cadence: every X days
- Owner: matias
```

---

## RunbookMachine template

Links:

* Spec: [Runbooks](checks-runbooks#runbooks)

```md
## RunbookMachine: <project_id>

Entry points:
- `make smoke`
- `make run-live`
- `python -m ...`

Environment:
- Required env vars:
  - `VAR=...`
- Optional env vars:
  - `VAR=...`

Inputs:
- Fixtures: `...`
- Live sources: `...`

Outputs:
- Artifacts directory: `...`
- Logs: `...`
- Manifests: `...`

Validation:
- Smoke command: `...`
- Content validation: `...`
- Health check: `...`

Exit codes:
- 0 = PASS
- 1/2/... = FAIL meaning

Safety bounds:
- Timebox: ...
- Dry-run: ...
- Rate limits: ...
```

---

## Daily brief template

Links:

* Clock: [Run a day](day-clock-selection#run-a-day)
* Evidence conventions: [Evidence and manifests](checks-runbooks#evidence-and-manifests)

Use this as the smallest daily artifact that preserves continuity.

```md
## Daily brief: YYYY-MM-DD

Energy: low | medium | high
Available blocks: <count> (MAINT/FOCUS)

Frontier snapshot (top 3):
- <project_id>: PASS/WARN/FAIL (why)
- <project_id>: PASS/WARN/FAIL (why)
- <project_id>: PASS/WARN/FAIL (why)

Selected first block:
- Block type: MAINT | FOCUS
- Mode: <MODE>
- Project: <project_id>
- Planned operator: <op_id or name>
- Expected evidence: <one line>
- Stop rule: <one line>

Executed:
- OpRun: <op_id> -> PASS/WARN/FAIL
- Evidence: <links>

Next pointer:
- <one line>

Notes:
- <optional: constraint or decision>
```

---

## See also

* [Data Model](data-model)
* [Execution Model](execution-model)
* [Checks and Runbooks](checks-runbooks)
* [Day Clock and Selection](day-clock-selection)
