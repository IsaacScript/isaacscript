import { Keyboard } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

/** Maps each keyboard enum member to its corresponding lowercase and uppercase characters. */
export const KEYBOARD_TO_STRING_MAP = new ReadonlyMap<
  Keyboard,
  readonly [lowercaseCharacter: string, uppercaseCharacter: string]
>([
  [Keyboard.SPACE, [" ", " "]], // 32
  [Keyboard.APOSTROPHE, ["'", '"']], // 39
  [Keyboard.COMMA, [",", "<"]], // 44
  [Keyboard.MINUS, ["-", "_"]], // 45
  [Keyboard.PERIOD, [".", ">"]], // 46
  [Keyboard.SLASH, ["/", "?"]], // 47

  [Keyboard.ZERO, ["0", ")"]], // 48
  [Keyboard.ONE, ["1", "!"]], // 49
  [Keyboard.TWO, ["2", "@"]], // 50
  [Keyboard.THREE, ["3", "#"]], // 51
  [Keyboard.FOUR, ["4", "$"]], // 52
  [Keyboard.FIVE, ["5", "%"]], // 53
  [Keyboard.SIX, ["6", "^"]], // 54
  [Keyboard.SEVEN, ["7", "&"]], // 55
  [Keyboard.EIGHT, ["8", "*"]], // 56
  [Keyboard.NINE, ["9", "("]], // 57

  [Keyboard.SEMICOLON, [";", ":"]], // 59
  [Keyboard.EQUAL, ["=", "+"]], // 61

  [Keyboard.A, ["a", "A"]], // 65
  [Keyboard.B, ["b", "B"]], // 66
  [Keyboard.C, ["c", "C"]], // 67
  [Keyboard.D, ["d", "D"]], // 68
  [Keyboard.E, ["e", "E"]], // 69
  [Keyboard.F, ["f", "F"]], // 70
  [Keyboard.G, ["g", "G"]], // 71
  [Keyboard.H, ["h", "H"]], // 72
  [Keyboard.I, ["i", "I"]], // 73
  [Keyboard.J, ["j", "J"]], // 74
  [Keyboard.K, ["k", "K"]], // 75
  [Keyboard.L, ["l", "L"]], // 76
  [Keyboard.M, ["m", "M"]], // 77
  [Keyboard.N, ["n", "N"]], // 78
  [Keyboard.O, ["o", "O"]], // 79
  [Keyboard.P, ["p", "P"]], // 80
  [Keyboard.Q, ["q", "Q"]], // 81
  [Keyboard.R, ["r", "R"]], // 82
  [Keyboard.S, ["s", "S"]], // 83
  [Keyboard.T, ["t", "T"]], // 84
  [Keyboard.U, ["u", "U"]], // 85
  [Keyboard.V, ["v", "V"]], // 86
  [Keyboard.W, ["w", "W"]], // 87
  [Keyboard.X, ["x", "X"]], // 88
  [Keyboard.Y, ["y", "Y"]], // 89
  [Keyboard.Z, ["z", "Z"]], // 90

  [Keyboard.KP_0, ["0", "0"]], // 320
  [Keyboard.KP_1, ["1", "1"]], // 321
  [Keyboard.KP_2, ["2", "2"]], // 322
  [Keyboard.KP_3, ["3", "3"]], // 323
  [Keyboard.KP_4, ["4", "4"]], // 324
  [Keyboard.KP_5, ["5", "5"]], // 325
  [Keyboard.KP_6, ["6", "6"]], // 326
  [Keyboard.KP_7, ["7", "7"]], // 327
  [Keyboard.KP_8, ["8", "8"]], // 328
  [Keyboard.KP_9, ["9", "9"]], // 329

  [Keyboard.KP_DECIMAL, [".", "."]], // 330
  [Keyboard.KP_DIVIDE, ["/", "/"]], // 331
  [Keyboard.KP_MULTIPLY, ["*", "*"]], // 332
  [Keyboard.KP_SUBTRACT, ["-", "-"]], // 333
  [Keyboard.KP_ADD, ["+", "+"]], // 334

  [Keyboard.LEFT_BRACKET, ["[", "{"]], // 91
  [Keyboard.BACKSLASH, ["\\", "|"]], // 92
  [Keyboard.RIGHT_BRACKET, ["]", "}"]], // 93
  [Keyboard.GRAVE_ACCENT, ["`", "~"]], // 96
]);
