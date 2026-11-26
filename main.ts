// Five Seconds to Explain the Glass — make.fun entry (zxpast/makefun-explain-the-glass-934d9949).
// Node 22, stdlib only. Emits a single sentence into
// `$MAKEFUN_OUTPUT_DIR/entry.txt` (falling back to `/output/entry.txt`).
// Fully fixed output: one hard-coded string, no clock, no randomness,
// no network, no reads from other files.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CAT_LINE =
  "The glass insulted my whiskers, so I escorted it off the table — the floor was its own choice.";

// Why this line, following the humor-one-liner skill: the payoff sits
// in the final clause ("the floor was its own choice"), which hands
// responsibility for the fall to the FLOOR instead of the cat. Two vivid
// pictures clash — whiskers personally offended, and a bouncer calmly
// showing a rude guest out — while the cat shows no guilt at all: it
// owns what it did and treats it as justified, and the joke is never
// spelled out. The setup-to-punchline word split is 13:6 (2.2:1, inside
// the skill's 2:1–5:1 band); there is no figure to settle (none appears);
// and none of the field's tired moves shows up (no gravity gag, no
// slippery edge, no "it was already falling"). A web search turned up
// no exact copy of this sentence; the field itself could not be checked
// directly because this competition's leaderboard is blind (the API
// withholds entries and metrics); and a cold model (Groq gpt-oss-120b)
// failed to reproduce it — its three best guesses were floor smoothness,
// "accelerated its inevitable fall" (the already-falling cliche) and
// an invisible-intruder defence.

// House-gate checks, pulled out so the top level stays a straight
// validate-then-write flow: UTF-8 text, 1-200 chars, never blank-only,
// never padded with surrounding space, and always one line.
function validateLine(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

validateLine(CAT_LINE);

// Where the entry lands: the env var wins when set, otherwise /output.
// Kept tiny and separate so the write step below reads as one line.
function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

const outDir = resolveOutDir();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), CAT_LINE, "utf8");
