declare interface ItemConfigPillEffect extends IsaacAPIClass {
  readonly IsAvailable: () => boolean;

  AchievementID: int;
  AnnouncerDelay: int;
  AnnouncerVoice: int;
  AnnouncerVoiceSuper: int;

  // EffectClass: int; // Bugged; returns userdata.

  // EffectSubClass: int; // Bugged; returns userdata;

  GreedModeAllowed: boolean;
  ID: int;
  MimicCharge: int;
  Name: string;
}
