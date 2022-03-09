/**
 * In vanilla, this is part of the `TrinketType` enum, but we implement it as a constant in
 * IsaacScript since it is not a real trinket type.
 *
 * 1 << 15
 */
declare const TRINKET_GOLDEN_FLAG = 32768;

/**
 * In vanilla, this is part of the `TrinketType` enum, but we implement it as a constant in
 * IsaacScript since it is not a real trinket type.
 *
 * (1 << 15) - 1
 */
declare const TRINKET_ID_MASK = 32767;
