/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface BossPool extends IsaacAPIClass {
  GetDoubleTroubleRoomID: () => int;
  GetEntries: () => BossPoolEntry[];
  GetName: () => string;
  GetRNG: () => RNG;
}
