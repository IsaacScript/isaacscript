import { GridCollisionClass } from "../enums/GridCollisionClass";
import { GridEntityType } from "../enums/GridEntityType";

declare global {
  interface GridEntity {
    Destroy(immediate: boolean): boolean;
    GetGridIndex(): int;

    /** The RNG returned is a reference (i.e. not a copy). */
    GetRNG(): RNG;

    GetSaveState(): GridEntityDesc;

    /** The Sprite returned is a reference (i.e. not a copy). */
    GetSprite(): Sprite;

    GetType(): GridEntityType;
    GetVariant(): int;
    Hurt(damage: int): boolean;
    Init(seed: Seed): void;
    PostInit(): void;
    Render(offset: Vector): void;
    SetType(gridEntityType: GridEntityType): void;
    SetVariant(variant: int): void;
    ToDoor(): GridEntityDoor | undefined;
    ToPit(): GridEntityPit | undefined;
    ToPoop(): GridEntityPoop | undefined;
    ToPressurePlate(): GridEntityPressurePlate | undefined;
    ToRock(): GridEntityRock | undefined;
    ToSpikes(): GridEntitySpikes | undefined;
    ToTNT(): GridEntityTNT | undefined;
    Update(): void;

    CollisionClass: GridCollisionClass;

    /**
     * Use the `GetSaveState()` method instead of accessing Desc directly, as it is a deprecated
     * property.
     */
    Desc: never; // GridEntityDesc;

    /**
     * The attributes of this property are technically not read-only, but changing them seems to
     * have no effect. (Printing out the values after changing them reports that they were not
     * changed.)
     */
    readonly Position: Readonly<Vector>;

    State: int;
    VarData: int;
  }
}
