// We cannot use HeartSubType for this since it has no value for max hearts

enum HealthType {
  RED, // 5.10.1
  SOUL, // 5.10.3
  ETERNAL, // 5.10.4
  BLACK, // 5.10.6
  GOLDEN, // 5.10.7
  BONE, // 5.10.11
  ROTTEN, // 5.10.12
  MAX_HEARTS,
}
export default HealthType;
