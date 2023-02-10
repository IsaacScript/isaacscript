import {
  EntityType,
  GridEntityXMLType,
  ModCallback,
} from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.PRE_ROOM_ENTITY_SPAWN_FILTER;

export class PreRoomEntitySpawnFilter extends CustomCallback<T> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 71
      [ModCallback.PRE_ROOM_ENTITY_SPAWN, this.preRoomEntitySpawn],
    ];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [entityTypeOrGridEntityXMLType, variant, subType] = fireArgs;
    const [
      callbackEntityTypeOrGridEntityXMLType,
      callbackVariant,
      callbackSubType,
    ] = optionalArgs;

    return (
      (callbackEntityTypeOrGridEntityXMLType === undefined ||
        callbackEntityTypeOrGridEntityXMLType ===
          entityTypeOrGridEntityXMLType) &&
      (callbackVariant === undefined || callbackVariant === variant) &&
      (callbackSubType === undefined || callbackSubType === subType)
    );
  };

  // ModCallback.PRE_ROOM_ENTITY_SPAWN (71)
  private preRoomEntitySpawn = (
    entityTypeOrGridEntityXMLType: EntityType | GridEntityXMLType,
    variant: int,
    subType: int,
    gridIndex: int,
    seed: Seed,
  ) =>
    this.fire(entityTypeOrGridEntityXMLType, variant, subType, gridIndex, seed);
}
