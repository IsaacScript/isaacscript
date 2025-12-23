import type { ChampionColor, EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * Constructs an `EntityDesc` object. EntityDesc objects can only be constructed for NPCs,
   * therefore passing an `EntityType` that does not correspond to a NPC will result in an error.
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
    GetChampionId: () => ChampionColor | -1;
    GetMaxHealth: () => number;
    GetSubtype: () => int;
    GetType: () => EntityType;
    GetVariant: () => int;
    IsPlayerControlled: () => boolean;
    SetChampionId: (championColor: ChampionColor | -1) => void;
    SetHealth: (health: int) => void;
    SetMaxHealth: (maxHealth: number) => void;
    SetPlayerControlled: (controlled: boolean) => void;
    SetSubtype: (subType: int) => void;
    SetType: (entityType: EntityType) => void;
    SetVariant: (variant: int) => void;
  }
}
