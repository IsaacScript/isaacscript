/* eslint-disable import/prefer-default-export */

// From: https://hisk.io/javascript-snake-to-camel/
export function snakeToCamel(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}
