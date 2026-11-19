# skills

Claude Code skills and plugins.

## Install

```
/plugin marketplace add myers-gh1328/skills
/plugin install get-to-the-point@myers-skills
```

## Plugins

| Plugin | What it does |
| --- | --- |
| [get-to-the-point](plugins/get-to-the-point) | Always-on output shape for busy readers: action first, numbered steps, one next move, no filler. |

### get-to-the-point

A SessionStart hook loads the skill into every session, so it is on by default.

- Turn it off for one session: say "stop point mode" or "normal mode".
- Turn it off for good: `touch "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.get-to-the-point-off"`.
- Turn it back on: delete that file.

Behavioral evals are in [`plugins/get-to-the-point/evals`](plugins/get-to-the-point/evals).

## License

MIT
