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
    readonly Bar: () => void;
    readonly CanBlowOpen: () => boolean;
    readonly Close: (force: boolean) => void;
    readonly GetSpriteOffset: () => Readonly<Vector>;
    readonly GetVariant: () => DoorVariant;
    readonly IsBusted: () => boolean;
    readonly IsKeyFamiliarTarget: () => boolean;
    readonly IsLocked: () => boolean;
    readonly IsOpen: () => boolean;
    readonly IsRoomType: (roomType: RoomType) => boolean;
    readonly IsTargetRoomArcade: () => boolean;
    readonly Open: () => void;
    readonly SetLocked: (locked: boolean) => void;
    readonly SetRoomTypes: (currentRoomType: RoomType, targetRoomType: RoomType) => void;
    readonly SpawnDust: () => void;
    readonly TryBlowOpen: (fromExplosion: boolean, source: Entity) => boolean;
    readonly TryUnlock: (player: EntityPlayer, force: boolean) => boolean;

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
