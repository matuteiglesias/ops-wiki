# Ops Manual

Public execution/governance doctrine for Matías's Office ecosystem.

The current architecture is:

```text
Control Tower / governed Sheets
  → Office coherent generation
  → typed work + Staff + Principal surfaces
  → bounded execution
  → evidence / receipts
  → reviewed reentry
```

This repository documents that architecture and durable concepts such as `VACChain`, `Endpoint`, evidence, stop rules, and reusable operator/work motifs.

It does **not** own live Control Tower state, Office runtime semantics, weekly cadence policy, or Event & Institutional Frontier state.

## Local development

```bash
npm ci
npm run start
```

## Build

```bash
npm run build
```

The deployed site is configured for `https://ops.matuteiglesias.link/`.
