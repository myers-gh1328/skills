#!/usr/bin/env node
// SessionStart hook: loads the get-to-the-point rules into every session so the
// output shape is on by default.
//
// Permanent opt-out: create "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.get-to-the-point-off".
// Delete the file to opt back in. Inside a session, "stop point mode" or
// "normal mode" turns it off until the session ends.
//
// This hook must never break session start, so every failure path exits 0
// without output.

import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function stripFrontmatter(text) {
  const match = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? text.slice(match[0].length) : text;
}

function main() {
  const configDir = process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
  if (existsSync(join(configDir, ".get-to-the-point-off"))) return;

  const pluginRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
  const skillFile = join(pluginRoot, "skills", "get-to-the-point", "SKILL.md");
  if (!existsSync(skillFile)) return;

  const rules = stripFrontmatter(readFileSync(skillFile, "utf8")).trim();
  if (!rules) return;

  const header =
    'get-to-the-point is ON for this session. Apply the rules below to every reply. ' +
    'Say "stop point mode" to turn it off for this session, or create ' +
    '$CLAUDE_CONFIG_DIR/.get-to-the-point-off to turn it off for good.';

  const output = {
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: `${header}\n\n${rules}`,
    },
  };
  process.stdout.write(JSON.stringify(output));
}

try {
  main();
} catch {
  // Swallow everything: a broken hook must not block the session.
}
process.exit(0);
