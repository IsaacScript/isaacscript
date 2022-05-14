/**
 * During serialization, we write an arbitrary string key to the object with a value of an empty
 * string. This is used during deserialization to instantiate the correct type of object.
 *
 * Note that we do not bother branding TSTL classes because we have no way to invoke the proper
 * constructor during deserialization.
 */
export enum SerializationBrand {
  // Specific TSTL class brands
  DEFAULT_MAP = "__TSTL_DEFAULT_MAP",
  MAP = "__TSTL_MAP",
  SET = "__TSTL_SET",

  // Specific Isaac API class brands
  COLOR = "__COLOR",
  K_COLOR = "__K_COLOR",
  RNG = "__RNG",
  VECTOR = "__VECTOR",

  /**
   * This is set to the value that represents the default value (instead of an empty string like the
   * other brands are).
   *
   * Default maps that use a factory function are unserializable, but do not throw runtime errors
   * because the merge function can derive the factory function from the already-instantiated
   * object.
   */
  DEFAULT_MAP_VALUE = "__TSTL_DEFAULT_MAP_VALUE",

  /**
   * The JSON library is unable to distinguish between a maps with number keys and an array. It will
   * assume that both of these are an array. Thus, in the case of a map with number keys, it will
   * insert null in every empty spot, leading to crashes.
   *
   * For example, a map with keys of 5 and 10 would be converted to the following array: `[null,
   * null, null, null, "myValueForKey5", null, null, null, null, "myValueForKey10"]`
   *
   * The deep copier works around this by converting number keys to strings. It inserts this brand
   * to keep track of the mutation.
   */
  OBJECT_WITH_NUMBER_KEYS = "__TSTL_OBJECT_WITH_NUMBER_KEYS",
}
