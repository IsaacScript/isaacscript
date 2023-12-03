// These cached enum value arrays are only meant to be used internally within `isaacscript-common`.

import {
  ActiveSlot,
  BossID,
  CacheFlag,
  ControllerIndex,
  DoorSlot,
  DoorSlotFlag,
  GridEntityType,
  GridEntityXMLType,
  ItemConfigCardType,
  ItemConfigTag,
  ItemPoolType,
  Keyboard,
  PillColor,
  PlayerForm,
  PocketItemSlot,
  RoomShape,
  SeedEffect,
  SoundEffect,
  TrinketSlot,
} from "isaac-typescript-definitions";
import { HealthType } from "../enums/HealthType";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { PlayerStat } from "../enums/PlayerStat";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { getEnumValues } from "../functions/enums";

export const ACTIVE_SLOT_VALUES = getEnumValues(ActiveSlot);

export const BOSS_IDS = getEnumValues(BossID);

export const CACHE_FLAG_VALUES = getEnumValues(CacheFlag);

export const CONTROLLER_INDEX_VALUES = getEnumValues(ControllerIndex);

export const DOOR_SLOT_FLAG_VALUES = getEnumValues(DoorSlotFlag);

export const DOOR_SLOT_VALUES = getEnumValues(DoorSlot);

export const GRID_ENTITY_TYPE_VALUES = getEnumValues(GridEntityType);

export const GRID_ENTITY_XML_TYPE_VALUES = getEnumValues(GridEntityXMLType);

export const MOD_CALLBACK_CUSTOM_VALUES = getEnumValues(ModCallbackCustom);

export const ITEM_CONFIG_TAG_VALUES = getEnumValues(ItemConfigTag);

export const ITEM_CONFIG_CARD_TYPE_VALUES = getEnumValues(ItemConfigCardType);

export const ITEM_POOL_TYPE_VALUES = getEnumValues(ItemPoolType);

export const KEYBOARD_VALUES = getEnumValues(Keyboard);

export const HEALTH_TYPE_VALUES = getEnumValues(HealthType);

export const PILL_COLOR_VALUES = getEnumValues(PillColor);

export const PLAYER_FORM_VALUES = getEnumValues(PlayerForm);

export const POCKET_ITEM_SLOT_VALUES = getEnumValues(PocketItemSlot);

export const ROOM_SHAPE_VALUES = getEnumValues(RoomShape);

export const SEED_EFFECTS = getEnumValues(SeedEffect);

export const SERIALIZATION_BRAND_VALUES = getEnumValues(SerializationBrand);

export const SOUND_EFFECT_VALUES = getEnumValues(SoundEffect);

export const PLAYER_STAT_VALUES = getEnumValues(PlayerStat);

export const TRINKET_SLOT_VALUES = getEnumValues(TrinketSlot);
