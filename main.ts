// Five Seconds to Explain the Glass — make.fun entry (zxpast/makefun-explain-the-glass-934d9949).
// Node 22, stdlib only. Writes exactly one sentence to
// `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`).
// Deterministic: fixed string, no clock, no randomness, no network,
// no external files.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The glass insulted my whiskers, so I escorted it off the table — the floor was its own choice.";

// The pick, per skill humor-one-liner: the twist lands in the last words
// ("the floor was its own choice") — the fall is reframed as the FLOOR's
// decision, not the cat's. Two concrete images collide (insulted whiskers /
// bouncer escorting a rude guest off the table), the cat is pure
// self-interest with zero remorse (it admits the act and justifies it),
// and nothing explains the joke. Setup:punchline is 13:6 words (2.2:1,
// inside the skill's 2:1–5:1 target zone); no number is left unpaid (there
// is none); no cliche of the field is used (no gravity, no slippery edge,
// no "it was already falling"). O1 web search found no verbatim copy of
// this line; O2 could not run against the field because this competition's
// leaderboard is blind (API returns entries withheld, metrics_withheld:
// true); O3 cold model (Groq gpt-oss-120b) did NOT reproduce it — its 3
// most likely lines were floor-smoothness, "accelerated its inevitable
// fall" (the already-falling cliche) and invisible-intruder defence.

// Gate (mirrors the house gate): UTF-8 text, 1-200 chars, not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
