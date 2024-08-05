declare interface ItemConfigItem extends IsaacAPIClass {
  GetCustomCacheTags: () => string[];
  GetCustomTags: () => string[];
  HasCustomCacheTag: (tagName: string) => boolean;
  HasCustomTag: (tag: string) => boolean;
}
