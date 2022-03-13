/**
 * This represents the type of health that is either given or taken away from a player. Note that
 * we cannot use the HeartSubType enum for this purpose this since it has no value for broken hearts
 * or max hearts.
 */
export enum HealthType {
  RED, // 5.10.1
  SOUL, // 5.10.3
  ETERNAL, // 5.10.4
  BLACK, // 5.10.6
  GOLDEN, // 5.10.7
  BONE, // 5.10.11
  ROTTEN, // 5.10.12
  BROKEN,
  MAX_HEARTS,
}
