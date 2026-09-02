import type { GridCollisionClass } from "../../enums/GridCollisionClass";
import type { GridEntityType } from "../../enums/GridEntityType";

declare global {
  interface GridEntity extends IsaacAPIClass {
    readonly Destroy: (immediate: boolean) => boolean;

    /** Added in Repentance+. */
    readonly DestroyWithSource: (
      immediate: boolean,
      source: EntityRef,
    ) => boolean;

    readonly GetGridIndex: () => int;

    /** The RNG returned is a reference (i.e. not a copy). */
    readonly GetRNG: () => RNG;

    readonly GetSaveState: () => GridEntityDesc;

    /** The `Sprite` returned is a reference (i.e. not a copy). */
    readonly GetSprite: () => Sprite;

    readonly GetType: () => GridEntityType;
    readonly GetVariant: () => int;
    readonly Hurt: (damage: int) => boolean;

    /** Added in Repentance+. */
    readonly HurtWithSource: (damage: int, source: EntityRef) => boolean;

    readonly Init: (seed: Seed) => void;
    readonly PostInit: () => void;
    readonly Render: (offset: Vector) => void;

    /**
     * Note that changing the type of a grid entity does not update the corresponding sprite. Use
     * the `setGridEntityType` helper function to work around this.
     *
     * Setting the new type to `GridEntityType.NULL` (0) will have no effect.
     */
    readonly SetType: (gridEntityType: GridEntityType) => void;

    readonly SetVariant: (variant: int) => void;
    readonly ToDoor: () => GridEntityDoor | undefined;
    readonly ToPit: () => GridEntityPit | undefined;
    readonly ToPoop: () => GridEntityPoop | undefined;
    readonly ToPressurePlate: () => GridEntityPressurePlate | undefined;
    readonly ToRock: () => GridEntityRock | undefined;
    readonly ToSpikes: () => GridEntitySpikes | undefined;
    readonly ToTNT: () => GridEntityTNT | undefined;
    readonly Update: () => void;

    CollisionClass: GridCollisionClass;

    // Desc is not implemented since it is deprecated by the `GridEntity.GetSaveState` method.

    /**
     * The attributes of this field are technically not read-only, but changing them seems to have
     * no effect. (Printing out the values after changing them reports that they were not changed.)
     */
    readonly Position: Readonly<Vector>;

    State: int;
    VarData: int;
  }
}
