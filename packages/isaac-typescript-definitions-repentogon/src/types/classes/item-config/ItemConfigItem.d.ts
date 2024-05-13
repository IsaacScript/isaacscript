declare interface ItemConfigItem extends IsaacAPIClass {
  GetCustomTags: () => string[];
  HasCustomTag: (tag: string) => boolean;
}
