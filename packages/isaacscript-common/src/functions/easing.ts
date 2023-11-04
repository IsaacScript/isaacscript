/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable sort-exports/sort-exports */

/**
 * From: https://easings.net/#easeInSine
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInSine(time: number): number {
  return 1 - Math.cos((time * Math.PI) / 2);
}

/**
 * From: https://easings.net/#easeOutSine
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutSine(time: number): number {
  return Math.sin((time * Math.PI) / 2);
}

/**
 * From: https://easings.net/#easeInOutSine
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutSine(time: number): number {
  return -(Math.cos(Math.PI * time) - 1) / 2;
}

/**
 * From: https://easings.net/#easeInCubic
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInCubic(time: number): number {
  return time * time * time;
}

/**
 * From: https://easings.net/#easeOutCubic
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutCubic(time: number): number {
  return 1 - (1 - time) ** 3;
}

/**
 * From: https://easings.net/#easeInOutCubic
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutCubic(time: number): number {
  return time < 0.5 ? 4 * time * time * time : 1 - (-2 * time + 2) ** 3 / 2;
}

/**
 * From: https://easings.net/#easeInQuint
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInQuint(time: number): number {
  return time * time * time * time * time;
}

/**
 * From: https://easings.net/#easeOutQuint
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutQuint(time: number): number {
  return 1 - (1 - time) ** 5;
}

/**
 * From: https://easings.net/#easeInOutQuint
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutQuint(time: number): number {
  return time < 0.5
    ? 16 * time * time * time * time * time
    : 1 - (-2 * time + 2) ** 5 / 2;
}

/**
 * From: https://easings.net/#easeInCirc
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInCirc(time: number): number {
  return 1 - Math.sqrt(1 - time ** 2);
}

/**
 * From: https://easings.net/#easeOutCirc
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutCirc(time: number): number {
  return Math.sqrt(1 - (time - 1) ** 2);
}

/**
 * From: https://easings.net/#easeInOutCirc
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutCirc(time: number): number {
  return time < 0.5
    ? (1 - Math.sqrt(1 - (2 * time) ** 2)) / 2
    : (Math.sqrt(1 - (-2 * time + 2) ** 2) + 1) / 2;
}

/**
 * From: https://easings.net/#easeInElastic
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInElastic(time: number): number {
  const c4 = (2 * Math.PI) / 3;

  return time === 0
    ? 0
    : time === 1
    ? 1
    : -(2 ** (10 * time - 10)) * Math.sin((time * 10 - 10.75) * c4);
}

/**
 * From: https://easings.net/#easeOutElastic
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutElastic(time: number): number {
  const c4 = (2 * Math.PI) / 3;

  return time === 0
    ? 0
    : time === 1
    ? 1
    : 2 ** (-10 * time) * Math.sin((time * 10 - 0.75) * c4) + 1;
}

/**
 * From: https://easings.net/#easeInOutElastic
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutElastic(time: number): number {
  const c5 = (2 * Math.PI) / 4.5;

  return time === 0
    ? 0
    : time === 1
    ? 1
    : time < 0.5
    ? -(2 ** (20 * time - 10) * Math.sin((20 * time - 11.125) * c5)) / 2
    : (2 ** (-20 * time + 10) * Math.sin((20 * time - 11.125) * c5)) / 2 + 1;
}

/**
 * From: https://easings.net/#easeInQuad
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInQuad(time: number): number {
  return time * time;
}

/**
 * From: https://easings.net/#easeOutQuad
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutQuad(time: number): number {
  return 1 - (1 - time) * (1 - time);
}

/**
 * From: https://easings.net/#easeInOutQuad
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutQuad(time: number): number {
  return time < 0.5 ? 2 * time * time : 1 - (-2 * time + 2) ** 2 / 2;
}

/**
 * From: https://easings.net/#easeInQuart
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInQuart(time: number): number {
  return time * time * time * time;
}

/**
 * From: https://easings.net/#easeOutQuart
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutQuart(time: number): number {
  return 1 - (1 - time) ** 4;
}

/**
 * From: https://easings.net/#easeInOutQuart
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutQuart(time: number): number {
  return time < 0.5
    ? 8 * time * time * time * time
    : 1 - (-2 * time + 2) ** 4 / 2;
}

/**
 * From: https://easings.net/#easeInExpo
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInExpo(time: number): number {
  return time === 0 ? 0 : 2 ** (10 * time - 10);
}

/**
 * From: https://easings.net/#easeOutExpo
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutExpo(time: number): number {
  return time === 1 ? 1 : 1 - 2 ** (-10 * time);
}

/**
 * From: https://easings.net/#easeInOutExpo
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutExpo(time: number): number {
  return time === 0
    ? 0
    : time === 1
    ? 1
    : time < 0.5
    ? 2 ** (20 * time - 10) / 2
    : (2 - 2 ** (-20 * time + 10)) / 2;
}

/**
 * From: https://easings.net/#easeInBack
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInBack(time: number): number {
  const c1 = 1.701_58;
  const c3 = c1 + 1;

  return c3 * time * time * time - c1 * time * time;
}

/**
 * From: https://easings.net/#easeOutBack
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutBack(time: number): number {
  const c1 = 1.701_58;
  const c3 = c1 + 1;

  return 1 + c3 * (time - 1) ** 3 + c1 * (time - 1) ** 2;
}

/**
 * From: https://easings.net/#easeInOutBack
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutBack(time: number): number {
  const c1 = 1.701_58;
  const c2 = c1 * 1.525;

  return time < 0.5
    ? ((2 * time) ** 2 * ((c2 + 1) * 2 * time - c2)) / 2
    : ((2 * time - 2) ** 2 * ((c2 + 1) * (time * 2 - 2) + c2) + 2) / 2;
}

/**
 * From: https://easings.net/#easeInBounce
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInBounce(time: number): number {
  return 1 - easeOutBounce(1 - time);
}

/**
 * From: https://easings.net/#easeInOutSine
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeOutBounce(time: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (time < 1 / d1) {
    return n1 * time * time;
  }

  if (time < 2 / d1) {
    return n1 * (time -= 1.5 / d1) * time + 0.75;
  }

  if (time < 2.5 / d1) {
    return n1 * (time -= 2.25 / d1) * time + 0.9375;
  }

  return n1 * (time -= 2.625 / d1) * time + 0.984_375;
}

/**
 * From: https://easings.net/#easeInOutBounce
 *
 * @param time A value between 0 and 1 that represents how far along you are in the transition.
 */
export function easeInOutBounce(time: number): number {
  return time < 0.5
    ? (1 - easeOutBounce(1 - 2 * time)) / 2
    : (1 + easeOutBounce(2 * time - 1)) / 2;
}
