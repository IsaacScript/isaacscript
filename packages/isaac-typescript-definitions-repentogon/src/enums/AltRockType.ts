/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
export enum AltRockType {
  URN = 1,
  MUSHROOM = 2,
  SKULL = 3,
  POLYP = 4,

  /**
   * Destroying buckets in Downpour give different outcomes than in Dross.
   *
   * See: https://bindingofisaacrebirth.fandom.com/wiki/Rocks#Buckets
   */
  BUCKET_DOWNPOUR = 5,

  /**
   * Destroying buckets in Dross give different outcomes than in Downpour.
   *
   * See: https://bindingofisaacrebirth.fandom.com/wiki/Rocks#Buckets
   */
  BUCKET_DROSS = 6,
}
