# skills

Skills and plugins for Claude Code and Codex.

## Install

Claude Code:

```
/plugin marketplace add myers-gh1328/skills
/plugin install get-to-the-point@myers-skills
```

Codex:

```
codex plugin marketplace add myers-gh1328/skills
codex plugin add get-to-the-point@myers-skills
```

Codex keeps plugin hooks off until you trust them. Open Codex, run `/hooks`, and trust the get-to-the-point SessionStart hook. The skill itself works without that step.

## Plugins

| Plugin | What it does |
| --- | --- |
| [get-to-the-point](plugins/get-to-the-point) | Always-on output shape for busy readers: action first, numbered steps, one next move, no filler. |

### get-to-the-point

A SessionStart hook loads the skill into every session, so it is on by default.

- Turn it off for one session: say "stop point mode" or "normal mode".
- Turn it off for good: create `.get-to-the-point-off` in the tool's config dir.
  - Claude Code: `touch "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.get-to-the-point-off"`
  - Codex: `touch "${CODEX_HOME:-$HOME/.codex}/.get-to-the-point-off"`
- Turn it back on: delete that file.

Behavioral evals are in [`plugins/get-to-the-point/evals`](plugins/get-to-the-point/evals).

## License

MIT
