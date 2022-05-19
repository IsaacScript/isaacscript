import { isTypeFlagSet } from "@typescript-eslint/type-utils";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import * as ts from "typescript";

export enum MemberNameType {
  Private = 1,
  Quoted = 2,
  Normal = 3,
  Expression = 4,
}

function isFlagSet(flags: number, flag: number): boolean {
  return (flags & flag) !== 0;
}

/**
 * @param flagsToCheck The composition of one or more `ts.SymbolFlags`.
 */
export function isSymbolFlagSet(
  symbol: ts.Symbol,
  flagsToCheck: number | ts.SymbolFlags,
): boolean {
  return isFlagSet(symbol.flags, flagsToCheck);
}

export function isAny(type: ts.Type): boolean {
  return isTypeFlagSet(type, ts.TypeFlags.Any);
}

function isUnion(type: ts.Type): type is ts.UnionType {
  // We cannot use the `isTypeFlagSet` function here, since that decomposes unions.
  return isFlagSet(type.flags, ts.TypeFlags.Union);
}

/** Returns all types of a union type or an array containing `type` itself if it's no union type. */
export function unionTypeParts(type: ts.Type): ts.Type[] {
  return isUnion(type) ? type.types : [type];
}

export function getNameFromMember(
  member:
    | TSESTree.MethodDefinition
    | TSESTree.TSMethodSignature
    | TSESTree.TSAbstractMethodDefinition
    | TSESTree.PropertyDefinition
    | TSESTree.TSAbstractPropertyDefinition
    | TSESTree.Property
    | TSESTree.TSPropertySignature,
  sourceCode: TSESLint.SourceCode,
): { type: MemberNameType; name: string } {
  if (member.key.type === AST_NODE_TYPES.Identifier) {
    return {
      type: MemberNameType.Normal,
      name: member.key.name,
    };
  }
  if (member.key.type === AST_NODE_TYPES.PrivateIdentifier) {
    return {
      type: MemberNameType.Private,
      name: `#${member.key.name}`,
    };
  }
  if (member.key.type === AST_NODE_TYPES.Literal) {
    const name = `${member.key.value}`;
    if (requiresQuoting(name)) {
      return {
        type: MemberNameType.Quoted,
        name: `"${name}"`,
      };
    }
    return {
      type: MemberNameType.Normal,
      name,
    };
  }

  return {
    type: MemberNameType.Expression,
    name: sourceCode.text.slice(...member.key.range),
  };
}

function requiresQuoting(
  name: string,
  target: ts.ScriptTarget = ts.ScriptTarget.ESNext,
): boolean {
  if (name.length === 0) {
    return true;
  }

  if (!ts.isIdentifierStart(name.charCodeAt(0), target)) {
    return true;
  }

  for (let i = 1; i < name.length; i += 1) {
    if (!ts.isIdentifierPart(name.charCodeAt(i), target)) {
      return true;
    }
  }

  return false;
}

/** Gets a string representation of the name of the index signature. */
export function getNameFromIndexSignature(
  node: TSESTree.TSIndexSignature,
): string {
  const propName: TSESTree.PropertyName | undefined = node.parameters.find(
    (parameter: TSESTree.Parameter): parameter is TSESTree.Identifier =>
      parameter.type === AST_NODE_TYPES.Identifier,
  );
  return propName !== null && propName !== undefined
    ? propName.name
    : "(index signature)";
}
