declare interface ItemConfigItem extends IsaacAPIClass {
  /**
   * Returns an array of the strings defined in the item's `customcache` attribute in `items.xml`.
   *
   * The tags in the array are always in lowercase regardless of its casing in `items.xml`.
   */
  readonly GetCustomCacheTags: () => string[];

  /**
   * Returns an array of the strings defined in the item's `customtags` attribute in `items.xml`.
   *
   * The tags in the array are always in lowercase regardless of its casing in `items.xml`.
   */
  readonly GetCustomTags: () => string[];

  /**
   * Returns whether the provided cache tag was specified in the item's `customcache` attribute in
   * `items.xml`. The tag name is case insensitive.
   */
  readonly HasCustomCacheTag: (tagName: string) => boolean;

  /**
   * Returns whether the provided tag was specified in the item's `customtags` attribute in
   * `items.xml`. The tag name is case insensitive.
   */
  readonly HasCustomTag: (tag: string) => boolean;
}
