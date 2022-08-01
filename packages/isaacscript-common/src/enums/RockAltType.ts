/** This is used in the various rock alt type helper functions. */
export enum RockAltType {
  URN,
  MUSHROOM,
  SKULL,
  POLYP,

  /**
   * Destroying buckets in Downpour give different outcomes than in Dross.
   *
   * See: https://bindingofisaacrebirth.fandom.com/wiki/Rocks#Buckets
   */
  BUCKET_DOWNPOUR,

  /**
   * Destroying buckets in Dross give different outcomes than in Downpour.
   *
   * See: https://bindingofisaacrebirth.fandom.com/wiki/Rocks#Buckets
   */
  BUCKET_DROSS,
}
