import type { ChampionColor, EntityType } from "isaac-typescript-definitions";

declare global {
  interface EntityDesc extends IsaacAPIClass {
    readonly GetHealth: () => void;
    readonly GetChampionId: () => ChampionColor | -1;
    readonly GetMaxHealth: () => number;
    readonly GetSubtype: () => int;
    readonly GetType: () => EntityType;
    readonly GetVariant: () => int;
    readonly IsPlayerControlled: () => boolean;
    readonly SetChampionId: (championColor: ChampionColor | -1) => void;
    readonly SetHealth: (health: int) => void;
    readonly SetMaxHealth: (maxHealth: number) => void;
    readonly SetPlayerControlled: (controlled: boolean) => void;
    readonly SetSubtype: (subType: int) => void;
    readonly SetType: (entityType: EntityType) => void;
    readonly SetVariant: (variant: int) => void;
  }

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
}
