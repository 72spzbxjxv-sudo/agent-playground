import assert from "node:assert/strict";
import { test } from "node:test";

import { computePiPrefix, explainExactPiLimit } from "../src/index.ts";

const KNOWN_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

test("computes the known 100-digit Pi prefix", () => {
  assert.equal(computePiPrefix(100).value, KNOWN_100);
});

test("supports short prefixes and zero fractional digits", () => {
  assert.equal(computePiPrefix(0).value, "3");
  assert.equal(computePiPrefix(5).value, "3.14159");
});

test("rejects invalid precision requests", () => {
  assert.throws(() => computePiPrefix(-1), RangeError);
  assert.throws(() => computePiPrefix(1.5), RangeError);
});

test("documents why an infinite final digit cannot be returned", () => {
  assert.match(explainExactPiLimit(), /irrational/);
  assert.match(explainExactPiLimit(), /finite prefixes/);
});
