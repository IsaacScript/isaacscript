export function isEven(num: int): boolean {
  return num % 2 === 0;
}

export function isOdd(num: int): boolean {
  return num % 2 !== 0;
}

export function tanh(x: number): number {
  return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}

/**
 * @returns 1 if n is positive, -1 if n is negative, or 0 if n is 0.
 */
export function sign(n: number): int {
  if (n > 0) {
    return 1;
  }

  if (n < 0) {
    return -1;
  }

  return 0;
}
