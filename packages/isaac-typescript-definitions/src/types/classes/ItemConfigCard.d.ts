import type { ItemConfigCardType } from "../../enums/ItemConfigCardType";

declare global {
  interface ItemConfigCard extends IsaacAPIClass {
    IsAvailable: () => boolean;
    IsCard: () => boolean;
    IsRune: () => boolean;

    AchievementID: int;
    AnnouncerDelay: int;
    AnnouncerVoice: int;
    CardType: ItemConfigCardType;
    Description: string;
    GreedModeAllowed: boolean;
    HudAnim: string;
    ID: int;
    MimicCharge: int;
    Name: string;

    /**
     * Corresponds to the "pickup" value in "pocketitems.xml". This determines the visual look of
     * the card when it is dropped on the ground.
     */
    PickupSubtype: int;
  }
}
