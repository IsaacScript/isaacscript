/*
eslint sort-exports/sort-exports: [
  "warn",
  {
    sortDir: "asc",
  },
]
*/

// These are validation functions for specific types of callbacks. (End-users can provide optional
// arguments during callback registration such that their function should only fire when certain
// conditions are met.)

// Since multiple callbacks can have the same kinds of filtration, we prevent repetition by
// abstracting the validation logic into separate functions here.

import type {
  BombVariant,
  CollectibleType,
  DamageFlag,
  DoorVariant,
  EffectVariant,
  EntityType,
  FamiliarVariant,
  GridEntityType,
  ItemType,
  KnifeVariant,
  LaserVariant,
  LevelStage,
  PickupVariant,
  PitVariant,
  PlayerType,
  PlayerVariant,
  PoopGridEntityVariant,
  PressurePlateVariant,
  ProjectileVariant,
  RoomType,
  SlotVariant,
  StageType,
  TearVariant,
  TrinketType,
} from "isaac-typescript-definitions";
import type { AmbushType } from "./enums/AmbushType";
import type { HealthType } from "./enums/HealthType";
import type { PlayerStat } from "./enums/PlayerStat";
import type { SlotDestructionType } from "./enums/SlotDestructionType";
import type { PickingUpItem } from "./types/PickingUpItem";
import type { PossibleStatType } from "./types/PossibleStatType";

export function shouldFireAmbush(
  fireArgs: [ambushType: AmbushType],
  optionalArgs: [ambushType?: AmbushType],
): boolean {
  const [ambushType] = fireArgs;
  const [callbackAmbushType] = optionalArgs;

  return callbackAmbushType === undefined || callbackAmbushType === ambushType;
}

export function shouldFireBomb(
  fireArgs:
    | [bomb: EntityBomb]
    | [bomb: EntityBomb, renderOffset: Vector]
    | [bomb: EntityBomb, collider: Entity, low: boolean],
  optionalArgs: [bombVariant?: BombVariant, subType?: int],
): boolean {
  const [bomb] = fireArgs;
  const [callbackBombVariant, callbackSubType] = optionalArgs;

  return (
    (callbackBombVariant === undefined || callbackBombVariant === bomb.Variant)
    && (callbackSubType === undefined || callbackSubType === bomb.SubType)
  );
}

export function shouldFireBoolean(
  fireArgs: [fireArg: boolean],
  optionalArgs: [optionalArg?: boolean],
): boolean {
  const [fireArg] = fireArgs;
  const [optionalArg] = optionalArgs;

  return optionalArg === undefined || optionalArg === fireArg;
}

export function shouldFireCollectibleType(
  fireArgs: [player: EntityPlayer, collectibleType: CollectibleType],
  optionalArgs: [collectibleType?: CollectibleType],
): boolean {
  const [_player, collectibleType] = fireArgs;
  const [callbackCollectibleType] = optionalArgs;

  return (
    callbackCollectibleType === undefined
    || callbackCollectibleType === collectibleType
  );
}

export function shouldFireDoor(
  fireArgs: [rock: GridEntityDoor],
  optionalArgs: [doorVariant?: DoorVariant],
): boolean {
  const [door] = fireArgs;
  const [callbackDoorVariant] = optionalArgs;

  const doorVariant = door.GetVariant();

  return (
    callbackDoorVariant === undefined || callbackDoorVariant === doorVariant
  );
}

export function shouldFireEffect(
  fireArgs:
    | [effect: EntityEffect]
    | [effect: EntityEffect, renderOffset: Vector]
    | [effect: EntityEffect, previousState: int, currentState: int],
  optionalArgs: [effectVariant?: EffectVariant, subType?: int],
): boolean {
  const [effect] = fireArgs;
  const [callbackEffectVariant, callbackSubType] = optionalArgs;

  return (
    (callbackEffectVariant === undefined
      || callbackEffectVariant === effect.Variant)
    && (callbackSubType === undefined || callbackSubType === effect.SubType)
  );
}

export function shouldFireEntity(
  fireArgs:
    | [entity: Entity]
    | [
        entity: Entity,
        amount: number,
        damageFlags: BitFlags<DamageFlag>,
        source: EntityRef,
        countdownFrames: number,
      ],
  optionalArgs: [entityType?: EntityType, variant?: int, subType?: int],
): boolean {
  const [entity] = fireArgs;
  const [callbackEntityType, callbackVariant, callbackSubType] = optionalArgs;

  return (
    (callbackEntityType === undefined || callbackEntityType === entity.Type)
    && (callbackVariant === undefined || callbackVariant === entity.Variant)
    && (callbackSubType === undefined || callbackSubType === entity.SubType)
  );
}

export function shouldFireFamiliar(
  fireArgs:
    | [familiar: EntityFamiliar]
    | [familiar: EntityFamiliar, renderOffset: Vector]
    | [familiar: EntityFamiliar, collider: Entity, low: boolean]
    | [familiar: EntityFamiliar, previousState: int, currentState: int],
  optionalArgs: [familiarVariant?: FamiliarVariant, subType?: int],
): boolean {
  const [familiar] = fireArgs;
  const [callbackFamiliarVariant, callbackSubType] = optionalArgs;

  return (
    (callbackFamiliarVariant === undefined
      || callbackFamiliarVariant === familiar.Variant)
    && (callbackSubType === undefined || callbackSubType === familiar.SubType)
  );
}

export function shouldFireGridEntity(
  fireArgs:
    | [gridEntity: GridEntity]
    | [gridEntity: GridEntity, oldState: int, newState: int],
  optionalArgs: [gridEntityType?: GridEntityType, variant?: int],
): boolean {
  const [gridEntity] = fireArgs;
  const [callbackGridEntityType, callbackVariant] = optionalArgs;

  const gridEntityType = gridEntity.GetType();
  const variant = gridEntity.GetVariant();

  return (
    (callbackGridEntityType === undefined
      || callbackGridEntityType === gridEntityType)
    && (callbackVariant === undefined || callbackVariant === variant)
  );
}

export function shouldFireGridEntityCustom(
  fireArgs:
    | [gridEntity: GridEntity, gridEntityTypeCustom: GridEntityType]
    | [
        gridEntity: GridEntity,
        gridEntityTypeCustom: GridEntityType,
        oldState: int,
        newState: int,
      ],
  optionalArgs: [gridEntityTypeCustom?: GridEntityType],
): boolean {
  const [_gridEntity, gridEntityTypeCustom] = fireArgs;
  const [callbackGridEntityTypeCustom] = optionalArgs;

  return (
    callbackGridEntityTypeCustom === undefined
    || callbackGridEntityTypeCustom === gridEntityTypeCustom
  );
}

export function shouldFireItemPickup(
  fireArgs: [player: EntityPlayer, pickingUpItem: PickingUpItem],
  optionalArgs: [itemType?: ItemType, subType?: int],
): boolean {
  const [_player, pickingUpItem] = fireArgs;
  const [callbackItemType, callbackSubtype] = optionalArgs;

  return (
    (callbackItemType === undefined
      || callbackItemType === pickingUpItem.itemType)
    && (callbackSubtype === undefined
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      || callbackSubtype === pickingUpItem.subType)
  );
}

export function shouldFireKnife(
  fireArgs:
    | [knife: EntityKnife]
    | [knife: EntityKnife, renderOffset: Vector]
    | [knife: EntityKnife, collider: Entity, low: boolean],
  optionalArgs: [knifeVariant?: KnifeVariant, subType?: int],
): boolean {
  const [knife] = fireArgs;
  const [callbackKnifeVariant, callbackSubType] = optionalArgs;

  return (
    (callbackKnifeVariant === undefined
      || callbackKnifeVariant === knife.Variant)
    && (callbackSubType === undefined || callbackSubType === knife.SubType)
  );
}

export function shouldFireLaser(
  fireArgs: [laser: EntityLaser] | [laser: EntityLaser, renderOffset: Vector],
  optionalArgs: [laserVariant?: LaserVariant, subType?: int],
): boolean {
  const [laser] = fireArgs;
  const [callbackLaserVariant, callbackSubType] = optionalArgs;

  return (
    (callbackLaserVariant === undefined
      || callbackLaserVariant === laser.Variant)
    && (callbackSubType === undefined || callbackSubType === laser.SubType)
  );
}

export function shouldFireLevel(
  fireArgs: [stage: LevelStage, stageType: StageType],
  optionalArgs: [stage?: LevelStage, stageType?: StageType],
): boolean {
  const [stage, stageType] = fireArgs;
  const [callbackStage, callbackStageType] = optionalArgs;

  return (
    (callbackStage === undefined || callbackStage === stage)
    && (callbackStageType === undefined || callbackStageType === stageType)
  );
}

export function shouldFireNPC(
  fireArgs:
    | [npc: EntityNPC]
    | [npc: EntityNPC, previousState: int, currentState: int]
    | [npc: EntityNPC, renderOffset: Vector]
    | [npc: EntityNPC, collider: Entity, low: boolean],
  optionalArgs: [entityType?: EntityType, variant?: int, subType?: int],
): boolean {
  const [npc] = fireArgs;
  const [callbackEntityType, callbackVariant, callbackSubType] = optionalArgs;

  return (
    (callbackEntityType === undefined || callbackEntityType === npc.Type)
    && (callbackVariant === undefined || callbackVariant === npc.Variant)
    && (callbackSubType === undefined || callbackSubType === npc.SubType)
  );
}

export function shouldFirePickup(
  fireArgs:
    | [pickup: EntityPickup]
    | [pickup: EntityPickup, renderOffset: Vector]
    | [pickup: EntityPickup, player: EntityPlayer]
    | [pickup: EntityPickup, previousState: int, currentState: int]
    | [
        pickup: EntityPickup,
        oldVariant: PickupVariant,
        oldSubType: int,
        newVariant: PickupVariant,
        newSubType: int,
      ],
  optionalArgs: [pickupVariant?: PickupVariant, subType?: int],
): boolean {
  const [pickup] = fireArgs;
  const [callbackPickupVariant, callbackPickupSubType] = optionalArgs;

  return (
    (callbackPickupVariant === undefined
      || callbackPickupVariant === pickup.Variant)
    && (callbackPickupSubType === undefined
      || callbackPickupSubType === pickup.SubType)
  );
}

export function shouldFirePit(
  fireArgs: [pit: GridEntityPit],
  optionalArgs: [pitVariant?: PitVariant],
): boolean {
  const [pit] = fireArgs;
  const [callbackPitVariant] = optionalArgs;

  const pitVariant = pit.GetVariant();

  return callbackPitVariant === undefined || callbackPitVariant === pitVariant;
}

export function shouldFirePlayer(
  fireArgs:
    | [player: EntityPlayer]
    | [player: EntityPlayer, renderOffset: Vector]
    | [player: EntityPlayer, numSacrifices: int]
    | [player: EntityPlayer, collectible: EntityPickupCollectible]
    | [player: EntityPlayer, oldCharacter: PlayerType, newCharacter: PlayerType]
    | [
        player: EntityPlayer,
        healthType: HealthType,
        difference: int,
        oldValue: int,
        newValue: int,
      ]
    | [
        player: EntityPlayer,
        amount: float,
        damageFlags: BitFlags<DamageFlag>,
        source: EntityRef,
        countdownFrames: int,
      ]
    | [
        player: EntityPlayer,
        playerStat: PlayerStat,
        difference: int,
        oldValue: PossibleStatType,
        newValue: PossibleStatType,
      ],
  optionalArgs: [playerVariant?: PlayerVariant, character?: PlayerType],
): boolean {
  const [player] = fireArgs;
  const [callbackPlayerVariant, callbackCharacter] = optionalArgs;

  const character = player.GetPlayerType();

  return (
    (callbackPlayerVariant === undefined
      || callbackPlayerVariant === player.Variant)
    && (callbackCharacter === undefined || callbackCharacter === character)
  );
}

export function shouldFirePoop(
  fireArgs: [poop: GridEntityPoop],
  optionalArgs: [poopGridEntityVariant?: PoopGridEntityVariant],
): boolean {
  const [poop] = fireArgs;
  const [callbackPoopGridEntityVariant] = optionalArgs;

  const poopGridEntityVariant = poop.GetVariant();

  return (
    callbackPoopGridEntityVariant === undefined
    || callbackPoopGridEntityVariant === poopGridEntityVariant
  );
}

export function shouldFirePressurePlate(
  fireArgs: [pressurePlate: GridEntityPressurePlate],
  optionalArgs: [pressurePlateVariant?: PressurePlateVariant],
): boolean {
  const [pressurePlate] = fireArgs;
  const [callbackPressurePlateVariant] = optionalArgs;

  const pressurePlateVariant = pressurePlate.GetVariant();

  return (
    callbackPressurePlateVariant === undefined
    || callbackPressurePlateVariant === pressurePlateVariant
  );
}

export function shouldFireProjectile(
  fireArgs:
    | [projectile: EntityProjectile]
    | [projectile: EntityProjectile, renderOffset: Vector]
    | [projectile: EntityProjectile, collider: Entity, low: boolean],
  optionalArgs: [projectileVariant?: ProjectileVariant, subType?: int],
): boolean {
  const [projectile] = fireArgs;
  const [callbackProjectileVariant, callbackSubType] = optionalArgs;

  return (
    (callbackProjectileVariant === undefined
      || callbackProjectileVariant === projectile.Variant)
    && (callbackSubType === undefined || callbackSubType === projectile.SubType)
  );
}

export function shouldFireRock(
  fireArgs: [rock: GridEntityRock],
  optionalArgs: [gridEntityType?: GridEntityType, variant?: int],
): boolean {
  const [rock] = fireArgs;
  const [callbackGridEntity, callbackVariant] = optionalArgs;

  const gridEntityType = rock.GetType();
  const variant = rock.GetVariant();

  return (
    (callbackGridEntity === undefined || callbackGridEntity === gridEntityType)
    && (callbackVariant === undefined || callbackVariant === variant)
  );
}

export function shouldFireRoom(
  fireArgs: [roomType: RoomType],
  optionalArgs: [roomType?: RoomType],
): boolean {
  const [roomType] = fireArgs;
  const [callbackRoomType] = optionalArgs;

  return callbackRoomType === undefined || callbackRoomType === roomType;
}

export function shouldFireSlot(
  fireArgs:
    | [slot: EntitySlot]
    | [slot: EntitySlot, player: EntityPlayer]
    | [slot: EntitySlot, slotDestructionType: SlotDestructionType]
    | [slot: EntitySlot, previousAnimation: string, currentAnimation: string],
  optionalArgs: [slotVariant?: SlotVariant, subType?: int],
): boolean {
  const [slot] = fireArgs;
  const [callbackSlotVariant, callbackSubType] = optionalArgs;

  return (
    (callbackSlotVariant === undefined || callbackSlotVariant === slot.Variant)
    && (callbackSubType === undefined || callbackSubType === slot.SubType)
  );
}

export function shouldFireSpikes(
  fireArgs: [spikes: GridEntitySpikes],
  optionalArgs: [variant?: int],
): boolean {
  const [spikes] = fireArgs;
  const [callbackVariant] = optionalArgs;

  const variant = spikes.GetVariant();

  return callbackVariant === undefined || callbackVariant === variant;
}

export function shouldFireTNT(
  fireArgs: [tnt: GridEntityTNT],
  optionalArgs: [variant?: int],
): boolean {
  const [tnt] = fireArgs;
  const [callbackVariant] = optionalArgs;

  const variant = tnt.GetVariant();

  return callbackVariant === undefined || callbackVariant === variant;
}

export function shouldFireTear(
  fireArgs:
    | [tear: EntityTear]
    | [tear: EntityTear, renderOffset: Vector]
    | [tear: EntityTear, collider: Entity, low: boolean],
  optionalArgs: [tearVariant?: TearVariant, subType?: int],
): boolean {
  const [tear] = fireArgs;
  const [callbackTearVariant, callbackSubType] = optionalArgs;

  return (
    (callbackTearVariant === undefined || callbackTearVariant === tear.Variant)
    && (callbackSubType === undefined || callbackSubType === tear.SubType)
  );
}

export function shouldFireTrinketType(
  fireArgs: [player: EntityPlayer, trinketType: TrinketType],
  optionalArgs: [trinketType?: TrinketType],
): boolean {
  const [_player, trinketType] = fireArgs;
  const [callbackTrinketType] = optionalArgs;

  return (
    callbackTrinketType === undefined || callbackTrinketType === trinketType
  );
}
