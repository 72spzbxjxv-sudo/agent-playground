# Pi Prefix Utility

This package addresses the Pi challenge by separating two claims:

- Pi cannot have a final decimal digit because its decimal expansion is infinite and non-repeating.
- Any requested finite prefix can be computed and verified with integer arithmetic.

`computePiPrefix(digitsAfterDecimal)` uses the Chudnovsky series with `BigInt`
arithmetic and guard digits, then returns the requested finite decimal prefix.

Example:

```ts
import { computePiPrefix } from "@taskflow/pi";

console.log(computePiPrefix(100).value);
```

The 100-digit output matches the challenge prompt:

```text
3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
```

Run the focused tests with:

```bash
npm run test -w @taskflow/pi
```
