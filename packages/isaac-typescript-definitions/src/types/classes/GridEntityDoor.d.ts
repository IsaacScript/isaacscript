import type { DoorState } from "../../enums/collections/gridEntityStates";
import type { DoorVariant } from "../../enums/collections/gridEntityVariants";
import type { Direction } from "../../enums/Direction";
import type { DoorSlot } from "../../enums/DoorSlot";
import type { RoomType } from "../../enums/RoomType";

declare global {
  /**
   * Grid entities of type `GridEntityType.DOOR` (16) can be converted to this class with the
   * `GridEntity.ToDoor` method.
   */
  interface GridEntityDoor extends GridEntity {
    Bar: () => void;
    CanBlowOpen: () => boolean;
    Close: (force: boolean) => void;
    GetSpriteOffset: () => Readonly<Vector>;
    GetVariant: () => DoorVariant;
    IsBusted: () => boolean;
    IsKeyFamiliarTarget: () => boolean;
    IsLocked: () => boolean;
    IsOpen: () => boolean;
    IsRoomType: (roomType: RoomType) => boolean;
    IsTargetRoomArcade: () => boolean;
    Open: () => void;
    SetLocked: (locked: boolean) => void;
    SetRoomTypes: (currentRoomType: RoomType, targetRoomType: RoomType) => void;
    SpawnDust: () => void;
    TryBlowOpen: (fromExplosion: boolean, source: Entity) => boolean;
    TryUnlock: (player: EntityPlayer, force: boolean) => boolean;

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

    // - PreviousState is not implemented since it returns useless userdata.
    // - PreviousVariant is not implemented since it returns useless userdata.

    Slot: DoorSlot;
    State: DoorState;

    /** This corresponds to the room grid index. */
    TargetRoomIndex: int;

    TargetRoomType: RoomType;
  }
}
