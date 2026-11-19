# get-to-the-point evals

Behavioral checks for the `get-to-the-point` skill.

- `cases.jsonl` — one prompt per line, each with `criteria` a response must satisfy.
- `rubric.md` — weighted scoring dimensions and release/blocking criteria.

## How to run

There is no bundled runner. Score with whichever LLM-judge harness you already
use: for each case, generate a response with the skill active,
then judge it against that case's `criteria` and the `rubric.md` weights.

Minimal loop:

1. For each line in `cases.jsonl`, send `prompt` to the model with the skill on.
2. Judge the response against `criteria` (pass/fail) and the five rubric
   dimensions (0–1 each).
3. Aggregate the weighted score; block release on any `rubric.md` trigger.
