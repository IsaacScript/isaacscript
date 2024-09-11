// Some of the functions are copy-pasted here from the `typescript-eslint` repository and slightly
// modified.

import ts from "typescript";

/** Gets all of the type flags in a type, iterating through unions automatically. */
function getTypeFlags(type: ts.Type): number | ts.TypeFlags {
  let flags = 0;
  for (const t of unionTypeParts(type)) {
    flags |= t.flags;
  }
  return flags;
}

export function getTypeName(type: ts.Type): string | undefined {
  const escapedName = type.getSymbol()?.escapedName as string | undefined;
  if (escapedName !== undefined && escapedName !== "__type") {
    return escapedName;
  }

  const aliasSymbolName = type.aliasSymbol?.getName();
  if (aliasSymbolName !== undefined) {
    return aliasSymbolName;
  }

  // The above checks do not work with boolean values.
  if ("intrinsicName" in type) {
    const { intrinsicName } = type;
    if (typeof intrinsicName === "string" && intrinsicName !== "") {
      return intrinsicName;
    }
  }

  return undefined;
}

/**
 * `isFunctionLike` does not seem to work with basic function expressions, so this function instead
 * resorts to checking if any signatures exist.
 */
export function isFunction(type: ts.Type, checker: ts.TypeChecker): boolean {
  const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  return signatures.length > 0;
}

/** Returns all types of a union type or an array containing `type` itself if it's no union type. */
function unionTypeParts(type: ts.Type): readonly ts.Type[] {
  return isUnion(type) ? type.types : [type];
}

function isUnion(type: ts.Type): type is ts.UnionType {
  // We cannot use the `isTypeFlagSet` function here, since that decomposes unions.
  return isFlagSet(type.flags, ts.TypeFlags.Union);
}

/**
 * Note that if the type is a union, this function will decompose it into the parts and get the
 * flags of every union constituent.
 *
 * @param type The type to check.
 * @param flagsToCheck The composition of one or more `ts.TypeFlags`.
 */
export function isTypeFlagSet(
  type: ts.Type,
  flagsToCheck: number | ts.TypeFlags,
): boolean {
  const flags = getTypeFlags(type);
  return isFlagSet(flags, flagsToCheck);
}

function isFlagSet(flags: number, flag: number): boolean {
  return (flags & flag) !== 0;
}
