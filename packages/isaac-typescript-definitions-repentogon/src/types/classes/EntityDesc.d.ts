import type { ChampionColor, EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * Constructs an EntityDesc object.
   *
   * @param this
   * @param entityType Optional. Default is `EntityType.NULL`.
   * @param variant Optional. Default is 0.
   * @param subType Optional. Default is 0.
   * @param championColor Optional. Default is -1.
   * @param health Optional. Default is 0.
   * @param maxHealth Optional. Default is 0.
   * @param playerControlled Optional. Default is false.
   */
  function EntityDesc(
    this: void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
    championColor?: ChampionColor,
    health?: number,
    maxHealth?: number,
    playerControlled?: boolean,
  ): EntityDesc;

  interface EntityDesc extends IsaacAPIClass {
    GetHealth: () => void;
    GetMaxHealth: () => void;
    GetSubtype: () => int;
    GetType: () => EntityType;
    GetVariant: () => int;
    IsPlayerControlled: () => boolean;
    SetHealth: (health: int) => void;
    SetMaxHealth: (maxHealth: int) => void;
    SetPlayerControlled: (controlled: boolean) => void;
    SetSubtype: (subType: int) => void;
    SetType: (entityType: EntityType) => void;
    SetVariant: (variant: int) => void;
  }
}
