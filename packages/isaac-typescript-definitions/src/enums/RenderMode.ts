export enum RenderMode {
  /** Currently not rendering room entities. */
  NULL = 0,

  /** Rendering room entities normally (in a dry room). */
  NORMAL = 1,

  SKIP = 2,

  /** Rendering room entities above the water in a flooded room. */
  WATER_ABOVE = 3,

  /** Rendering room entities below the water in a flooded room. */
  WATER_REFRACT = 4,

  /** Rendering the reflection of room entities in a flooded room. */
  WATER_REFLECT = 5,
}
