// These cached enum value arrays are only meant to be used internally within `isaacscript-common`.

import {
  ActiveSlot,
  CacheFlag,
  ControllerIndex,
  DoorSlot,
  DoorSlotFlag,
  GridEntityType,
  GridEntityXMLType,
  ItemConfigCardType,
  ItemConfigTag,
  Keyboard,
  PillColor,
  PlayerForm,
  PocketItemSlot,
  RoomShape,
  SoundEffect,
  TrinketSlot,
} from "isaac-typescript-definitions";
import { HealthType } from "../enums/HealthType";
import { SerializationBrand } from "../enums/SerializationBrand";
import { StatType } from "../enums/StatType";
import { getEnumValues } from "../functions/enums";

export const ACTIVE_SLOT_VALUES: readonly ActiveSlot[] =
  getEnumValues(ActiveSlot);

export const CACHE_FLAG_VALUES: readonly CacheFlag[] = getEnumValues(CacheFlag);

export const CONTROLLER_INDEX_VALUES: readonly ControllerIndex[] =
  getEnumValues(ControllerIndex);

export const DOOR_SLOT_FLAG_VALUES: readonly DoorSlotFlag[] =
  getEnumValues(DoorSlotFlag);

export const DOOR_SLOT_VALUES: readonly DoorSlot[] = getEnumValues(DoorSlot);

export const GRID_ENTITY_TYPE_VALUES: readonly GridEntityType[] =
  getEnumValues(GridEntityType);

export const GRID_ENTITY_XML_TYPE_VALUES: readonly GridEntityXMLType[] =
  getEnumValues(GridEntityXMLType);

export const ITEM_CONFIG_TAG_VALUES: readonly ItemConfigTag[] =
  getEnumValues(ItemConfigTag);

export const ITEM_CONFIG_CARD_TYPE_VALUES: readonly ItemConfigCardType[] =
  getEnumValues(ItemConfigCardType);

export const KEYBOARD_VALUES: readonly Keyboard[] = getEnumValues(Keyboard);

export const HEALTH_TYPE_VALUES: readonly HealthType[] =
  getEnumValues(HealthType);

export const PILL_COLOR_VALUES: readonly PillColor[] = getEnumValues(PillColor);

export const PLAYER_FORM_VALUES: readonly PlayerForm[] =
  getEnumValues(PlayerForm);

export const POCKET_ITEM_SLOT_VALUES: readonly PocketItemSlot[] =
  getEnumValues(PocketItemSlot);

export const ROOM_SHAPE_VALUES: readonly RoomShape[] = getEnumValues(RoomShape);

export const SERIALIZATION_BRAND_VALUES: readonly SerializationBrand[] =
  getEnumValues(SerializationBrand);

export const SOUND_EFFECT_VALUES: readonly SoundEffect[] =
  getEnumValues(SoundEffect);

export const STAT_TYPE_VALUES: readonly StatType[] = getEnumValues(StatType);

export const TRINKET_SLOT_VALUES: readonly TrinketSlot[] =
  getEnumValues(TrinketSlot);
