declare enum RenderMode {
  /** Currently not rendering room entities. */
  RENDER_NULL = 0,

  /** Rendering room entities normally (in a dry room). */
  RENDER_NORMAL = 1,

  RENDER_SKIP = 2,

  /** Rendering room entities above the water in a flooded room. */
  RENDER_WATER_ABOVE = 3,

  /** Rendering room entities below the water in a flooded room. */
  RENDER_WATER_REFRACT = 4,

  /** Rendering the reflection of room entities in a flooded room. */
  RENDER_WATER_REFLECT = 5,
}
