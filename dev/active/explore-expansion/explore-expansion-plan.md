# Explore & Expand — Plan

Full approved plan: `~/.claude/plans/i-would-like-to-typed-gizmo.md`.

## Goal
Grow the app into broader "explore" areas for the user's daughter, in seven
independent, individually-shippable stages.

## Stages
1. Library text-size fix + settings inside the reader.
2. +20 full-length library stories (wide animal variety).
3. +3 cooking items in the Kitchen.
4. 2-player Memory Pairs (match→keep turn, miss→pass).
5. Clock building — Read the Clock + Set the Hands (+ visual-aids toggle).
6. Human Body building — Body Layers + Digestion Journey.
7. Space building — Solar System + Order-the-Planets + Stars.

## Execution model (user-directed)
- Linear & inline only. **No parallel subagents at any point.**
- Autonomous progression — no pausing for per-section review. Auto-commit to the
  stage feature branch at each green checkpoint.
- Self-serve product micro-decisions, logged in `-context.md`.
- Pause only for: an undefaultable decision, or merge-to-main/push (batched at
  stage boundaries, needs explicit approval).

## Confirmed decisions
- Body & Space = two separate new buildings; Clock = its own building.
- Stories = full-length (~10–12 pages), cartoon-SVG placeholders + imagePrompts.
- i18n: UI chrome in all 6 locales (tested); long facts + story prose EN-only.

## Branching
One feature branch per stage (`feature/<stage>`). Archive docs to `dev/done/` at
the end.
