/* eslint-disable @typescript-eslint/no-empty-function */

import type { ReadonlyRecord } from "complete-common";
import { parseIntSafe } from "complete-common";

// --------------------
// Lua global functions
// --------------------

function error(msg: string): never {
  throw new Error(`Lua error: ${msg}`); // eslint-disable-line isaacscript/no-throw
}

globalThis.error = error;

function pairs(
  object: ReadonlyRecord<string | number | symbol, unknown>,
): ReadonlyArray<[key: string | number | symbol, value: unknown]> {
  return Object.entries(object);
}

globalThis.pairs = pairs as never;

function tonumber(num: string): number | undefined {
  return parseIntSafe(num);
}

globalThis.tonumber = tonumber;

// --------------
// Lua namespaces
// --------------

globalThis.string = {
  gsub: (_s: string, _pattern: string, _repl: string) => [] as never,
} as never;

// ---------------
// Isaac namespace
// ---------------

globalThis.Isaac = {
  GetItemConfig: () =>
    ({
      GetCard: (_cardType) => {},
      GetCollectible: (_collectibleType) => {},
      GetPillEffect: (_pillEffect) => {},
      GetTrinket: (_trinketType) => {},
    }) as ItemConfig,
  GetTime: () => 0,
} as never;

// ------------
// Constructors
// ------------

function BitSet128(low = 0, high = 0) {
  return Number((BigInt(high) << 64n) + BigInt(low)) as unknown as BitSet128;
}

globalThis.BitSet128 = BitSet128;

function Color(): Color {
  return {} as Color;
}

globalThis.Color = Color as never;

function Font(): Font {
  return {
    Load: (_filePath) => {},
  } as Font;
}

globalThis.Font = Font;

function Game(): Game {
  return {} as Game;
}

globalThis.Game = Game;

function KColor(): KColor {
  return {} as KColor;
}

globalThis.KColor = KColor;

function MusicManager(): MusicManager {
  return {} as MusicManager;
}

globalThis.MusicManager = MusicManager;

function Random(): int {
  return 1;
}

globalThis.Random = Random; // eslint-disable-line @typescript-eslint/no-deprecated

function RNG(): RNG {
  return {
    SetSeed: (_seed, _shiftIdx) => {},
  } as RNG;
}

globalThis.RNG = RNG;

function SFXManager(): SFXManager {
  return {} as SFXManager;
}

globalThis.SFXManager = SFXManager;

function Sprite(): Sprite {
  return {
    Load: (_filePath, _loadGraphics) => {},
    LoadGraphics: () => {},
    ReplaceSpritesheet: (_layerID, _pngPath) => {},
  } as Sprite;
}

globalThis.Sprite = Sprite;

function Vector(): Vector {
  return {} as Vector;
}

globalThis.Vector = Vector as never;
