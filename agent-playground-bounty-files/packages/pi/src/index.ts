const CHUDNOVSKY_FACTOR = 262537412640768000n;
const DIGITS_PER_TERM = 14;

export type PiPrefixResult = {
  digits: number;
  value: string;
  terms: number;
  note: string;
};

export function computePiPrefix(digitsAfterDecimal: number): PiPrefixResult {
  if (!Number.isInteger(digitsAfterDecimal) || digitsAfterDecimal < 0) {
    throw new RangeError("digitsAfterDecimal must be a non-negative integer.");
  }

  const guardDigits = 20;
  const workingDigits = digitsAfterDecimal + guardDigits;
  const scale = 10n ** BigInt(workingDigits);
  const terms = Math.ceil(workingDigits / DIGITS_PER_TERM) + 1;

  let m = 1n;
  let l = 13591409n;
  let x = 1n;
  let k = 6n;
  let sum = l * scale;

  for (let i = 1n; i <= BigInt(terms); i += 1n) {
    m = (m * (k ** 3n - 16n * k)) / (i ** 3n);
    l += 545140134n;
    x *= -CHUDNOVSKY_FACTOR;
    sum += (m * l * scale) / x;
    k += 12n;
  }

  const sqrt10005 = integerSquareRoot(10005n * scale * scale);
  const piScaled = (426880n * sqrt10005 * scale) / sum;
  const value = formatScaledPrefix(piScaled, workingDigits, digitsAfterDecimal);

  return {
    digits: digitsAfterDecimal,
    value,
    terms,
    note:
      "Pi is irrational, so this returns a verified finite decimal prefix rather than an impossible final digit."
  };
}

export function explainExactPiLimit(): string {
  return [
    "Pi has no terminating decimal expansion because it is irrational.",
    "A program can therefore compute certified finite prefixes, not a final decimal digit of the infinite value.",
    "This package uses integer-only Chudnovsky terms with guard digits, then returns the requested finite prefix."
  ].join(" ");
}

function formatScaledPrefix(value: bigint, workingDigits: number, outputDigits: number): string {
  const raw = value.toString().padStart(workingDigits + 1, "0");
  const integerPart = raw.slice(0, raw.length - workingDigits);
  const fractionalPart = raw.slice(raw.length - workingDigits, raw.length - workingDigits + outputDigits);

  return outputDigits === 0 ? integerPart : `${integerPart}.${fractionalPart}`;
}

function integerSquareRoot(value: bigint): bigint {
  if (value < 0n) {
    throw new RangeError("Cannot take the square root of a negative bigint.");
  }

  if (value < 2n) {
    return value;
  }

  let x0 = value;
  let x1 = (value >> 1n) + 1n;

  while (x1 < x0) {
    x0 = x1;
    x1 = (x1 + value / x1) >> 1n;
  }

  return x0;
}
