import type { GridCollisionClass } from "../../enums/GridCollisionClass";
import type { GridEntityType } from "../../enums/GridEntityType";

declare global {
  interface GridEntity extends IsaacAPIClass {
    Destroy: (immediate: boolean) => boolean;
    DestroyWithSource: (immediate: boolean, source: EntityRef) => boolean;
    GetGridIndex: () => int;

    /** The RNG returned is a reference (i.e. not a copy). */
    GetRNG: () => RNG;

    GetSaveState: () => GridEntityDesc;

    /** The `Sprite` returned is a reference (i.e. not a copy). */
    GetSprite: () => Sprite;

    GetType: () => GridEntityType;
    GetVariant: () => int;
    Hurt: (damage: int) => boolean;
    HurtWithSource: (damage: int, source: EntityRef) => boolean;
    Init: (seed: Seed) => void;
    PostInit: () => void;
    Render: (offset: Vector) => void;

    /**
     * Note that changing the type of a grid entity does not update the corresponding sprite. Use
     * the `setGridEntityType` helper function to work around this.
     *
     * Setting the new type to `GridEntityType.NULL` (0) will have no effect.
     */
    SetType: (gridEntityType: GridEntityType) => void;

    SetVariant: (variant: int) => void;
    ToDoor: () => GridEntityDoor | undefined;
    ToPit: () => GridEntityPit | undefined;
    ToPoop: () => GridEntityPoop | undefined;
    ToPressurePlate: () => GridEntityPressurePlate | undefined;
    ToRock: () => GridEntityRock | undefined;
    ToSpikes: () => GridEntitySpikes | undefined;
    ToTNT: () => GridEntityTNT | undefined;
    Update: () => void;

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
