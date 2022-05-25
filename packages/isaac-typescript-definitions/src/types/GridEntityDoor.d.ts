import { DoorState } from "../enums/collections/gridEntityState";
import { DoorVariant } from "../enums/collections/gridEntityVariants";
import { Direction } from "../enums/Direction";
import { DoorSlot } from "../enums/DoorSlot";
import { RoomType } from "../enums/RoomType";

declare global {
  interface GridEntityDoor extends GridEntity {
    Bar(): void;
    CanBlowOpen(): boolean;
    Close(force: boolean): void;
    GetSpriteOffset(): Readonly<Vector>;
    IsBusted(): boolean;
    IsKeyFamiliarTarget(): boolean;
    IsLocked(): boolean;
    IsOpen(): boolean;
    IsRoomType(roomType: RoomType): boolean;
    IsTargetRoomArcade(): boolean;
    Open(): void;
    SetLocked(locked: boolean): void;
    SetRoomTypes(currentRoomType: RoomType, targetRoomType: RoomType): void;
    SpawnDust(): void;
    TryBlowOpen(fromExplosion: boolean, source: Entity): boolean;
    TryUnlock(player: EntityPlayer, force: boolean): boolean;

    Busted: boolean;
    CloseAnimation: string;
    CurrentRoomType: RoomType;
    Direction: Direction;

    /**
     * Some doors use an additional sprite that is placed on top of the door (e.g. bars, chains,
     * wooden boards, etc.).
     */
    ExtraSprite: Sprite;

    /**
     * Toggles the visibility of the extra sprite. Some doors use an additional sprite that is
     * placed on top of the door (e.g. bars, chains, wooden boards, etc.).
     */
    ExtraVisible: boolean;

    LockedAnimation: string;
    OpenAnimation: string;
    OpenLockedAnimation: string;

    // PreviousState is not implemented since it returns useless userdata.

    PreviousVariant: DoorVariant;
    Slot: DoorSlot;
    State: DoorState;

    /** This corresponds to the room grid index. */
    TargetRoomIndex: int;

    TargetRoomType: RoomType;
  }
}
