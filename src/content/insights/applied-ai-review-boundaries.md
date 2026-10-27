---
title: "Where should an AI workflow stop for review?"
topic: "Applied AI"
date: 2026-10-27
summary: "An outline for separating model-generated suggestions from validated evidence and consequential actions in an applied AI workflow."
status: outline
---

## The question

What should an AI workflow be allowed to propose, and what evidence should a person inspect before acting?

## Proposed argument

Define the task and failure cost before selecting the model. Keep source material, generated interpretation and action separate enough to inspect.

## Planned structure

1. Start with one bounded task and a deterministic baseline.
2. Record the source and distinguish extraction from interpretation.
3. Specify outputs the workflow may suggest and actions requiring review.
4. Evaluate factual support and error handling alongside task performance.
5. Design an abstention or escalation path when evidence is insufficient.

## Example to develop

Build a small demonstration that summarises a synthetic set of survey responses. Compare a generated theme with the source responses, including ambiguous and contradictory cases. This would be an educational example, separate from employer work.

## Evidence to gather

- Public evaluation methods for source-grounded text analysis.
- A documented synthetic dataset and a transparent scoring rubric.
- Failure examples and a comparison with the deterministic baseline.

## Intended takeaway

Make the review boundary visible before automating the workflow around it.
