/* eslint-disable deprecation/deprecation */

import type { ActiveSlot } from "../../enums/ActiveSlot";
import type { ButtonAction } from "../../enums/ButtonAction";
import type {
  CardType,
  CollectibleType,
  PillColor,
  PlayerType,
  TrinketType,
} from "../../enums/collections/subTypes";
import type {
  BombVariant,
  EffectVariant,
  FamiliarVariant,
  LaserVariant,
  PickupVariant,
  PlayerVariant,
  ProjectileVariant,
  TearVariant,
} from "../../enums/collections/variants";
import type { EntityType } from "../../enums/EntityType";
import type { CacheFlag } from "../../enums/flags/CacheFlag";
import type { DamageFlag } from "../../enums/flags/DamageFlag";
import type { LevelCurse } from "../../enums/flags/LevelCurse";
import type { UseFlag } from "../../enums/flags/UseFlag";
import type { GridEntityXMLType } from "../../enums/GridEntityXMLType";
import type { InputHook } from "../../enums/InputHook";
import type { ItemPoolType } from "../../enums/ItemPoolType";
import type { ModCallback } from "../../enums/ModCallback";
import type { PillEffect } from "../../enums/PillEffect";

declare global {
  interface AddCallbackParameters {
    // 0
    [ModCallback.POST_NPC_UPDATE]: [
      callback: (npc: EntityNPC) => void,
      entityType?: EntityType,
    ];

    // 1
    [ModCallback.POST_UPDATE]: [callback: () => void];

    // 2
    [ModCallback.POST_RENDER]: [callback: () => void];

    // 3
    [ModCallback.POST_USE_ITEM]: [
      callback: (
        collectibleType: CollectibleType,
        rng: RNG,
        player: EntityPlayer,
        useFlags: BitFlags<UseFlag>,
        activeSlot: ActiveSlot,
        customVarData: int,
      ) =>
        | boolean
        | { Discharge: boolean; Remove: boolean; ShowAnim: boolean }
        | undefined,
      collectibleType?: CollectibleType,
    ];

    // 4
    [ModCallback.POST_PEFFECT_UPDATE]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 5
    [ModCallback.POST_USE_CARD]: [
      callback: (
        cardType: CardType,
        player: EntityPlayer,
        useFlags: BitFlags<UseFlag>,
      ) => void,
      cardType?: CardType,
    ];

    // 6
    [ModCallback.POST_FAMILIAR_UPDATE]: [
      callback: (familiar: EntityFamiliar) => void,
      familiarVariant?: FamiliarVariant,
    ];

    // 7
    [ModCallback.POST_FAMILIAR_INIT]: [
      callback: (familiar: EntityFamiliar) => void,
      familiarVariant?: FamiliarVariant,
    ];

    // 8
    [ModCallback.EVALUATE_CACHE]: [
      callback: (player: EntityPlayer, cacheFlag: CacheFlag) => void,
      cacheFlag?: CacheFlag,
    ];

    // 9
    [ModCallback.POST_PLAYER_INIT]: [
      callback: (player: EntityPlayer) => void,
      playerVariant?: PlayerVariant,
    ];

    // 10
    [ModCallback.POST_USE_PILL]: [
      callback: (
        pillEffect: PillEffect,
        player: EntityPlayer,
        useFlags: BitFlags<UseFlag>,
      ) => void,
      pillEffect?: PillEffect,
    ];

    // 11
    [ModCallback.ENTITY_TAKE_DMG]: [
      callback: (
        entity: Entity,
        amount: float,
        damageFlags: BitFlags<DamageFlag>,
        source: EntityRef,
        countdownFrames: int,
      ) => boolean | undefined,
      entityType?: EntityType,
    ];

    // 12
    [ModCallback.POST_CURSE_EVAL]: [
      callback: (
        curses: BitFlags<LevelCurse>,
      ) => BitFlags<LevelCurse> | LevelCurse | undefined,
    ];

    // 13
    [ModCallback.INPUT_ACTION]: [
      callback: (
        entity: Entity | undefined,
        inputHook: InputHook,
        buttonAction: ButtonAction,
      ) => boolean | float | undefined,
      inputHook?: InputHook,
    ];

    // 14 is LEVEL_GENERATOR (not implemented).

    // 15
    [ModCallback.POST_GAME_STARTED]: [callback: (isContinued: boolean) => void];

    // 16
    [ModCallback.POST_GAME_END]: [callback: (isGameOver: boolean) => void];

    // 17
    [ModCallback.PRE_GAME_EXIT]: [callback: (shouldSave: boolean) => void];

    // 18
    [ModCallback.POST_NEW_LEVEL]: [callback: () => void];

    // 19
    [ModCallback.POST_NEW_ROOM]: [callback: () => void];

    // 20
    [ModCallback.GET_CARD]: [
      callback: (
        rng: RNG,
        cardType: CardType,
        includePlayingCards: boolean,
        includeRunes: boolean,
        onlyRunes: boolean,
      ) => CardType | undefined,
    ];

    // 21
    [ModCallback.GET_SHADER_PARAMS]: [
      callback: (shaderName: string) => Record<string, unknown> | undefined,
    ];

    // 22
    [ModCallback.EXECUTE_CMD]: [
      callback: (
        command: string,
        parameters: string,
        player: EntityPlayer,
      ) => void,
    ];

    // 23
    [ModCallback.PRE_USE_ITEM]: [
      callback: (
        collectibleType: CollectibleType,
        rng: RNG,
        player: EntityPlayer,
        useFlags: BitFlags<UseFlag>,
        activeSlot: ActiveSlot,
        customVarData: int,
      ) => boolean | undefined,
      collectibleType?: CollectibleType,
    ];

    // 24
    [ModCallback.PRE_ENTITY_SPAWN]: [
      callback: (
        entityType: EntityType,
        variant: int,
        subType: int,
        position: Vector,
        velocity: Vector,
        spawner: Entity | undefined,
        initSeed: Seed,
      ) =>
        | [entityType: EntityType, variant: int, subType: int, initSeed: Seed]
        | undefined,
    ];

    // 25
    [ModCallback.POST_FAMILIAR_RENDER]: [
      callback: (entityFamiliar: EntityFamiliar, renderOffset: Vector) => void,
      familiarVariant?: FamiliarVariant,
    ];

    // 26
    [ModCallback.PRE_FAMILIAR_COLLISION]: [
      callback: (
        familiar: EntityFamiliar,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      familiarVariant?: FamiliarVariant,
    ];

    // 27
    [ModCallback.POST_NPC_INIT]: [
      callback: (npc: EntityNPC) => void,
      entityType?: EntityType,
    ];

    // 28
    [ModCallback.POST_NPC_RENDER]: [
      callback: (npc: EntityNPC, renderOffset: Vector) => void,
      entityType?: EntityType,
    ];

    // 29
    [ModCallback.POST_NPC_DEATH]: [
      callback: (npc: EntityNPC) => void,
      entityType?: EntityType,
    ];

    // 30
    [ModCallback.PRE_NPC_COLLISION]: [
      callback: (
        npc: EntityNPC,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      entityType?: EntityType,
    ];

    // 31
    [ModCallback.POST_PLAYER_UPDATE]: [
      callback: (player: EntityPlayer) => void,
      playerVariant?: PlayerVariant,
    ];

    // 32
    [ModCallback.POST_PLAYER_RENDER]: [
      callback: (player: EntityPlayer, renderOffset: Vector) => void,
      playerVariant?: PlayerVariant,
    ];

    // 33
    [ModCallback.PRE_PLAYER_COLLISION]: [
      callback: (
        player: EntityPlayer,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 34
    [ModCallback.POST_PICKUP_INIT]: [
      callback: (pickup: EntityPickup) => void,
      pickupVariant?: PickupVariant,
    ];

    // 35
    [ModCallback.POST_PICKUP_UPDATE]: [
      callback: (pickup: EntityPickup) => void,
      pickupVariant?: PickupVariant,
    ];

    // 36
    [ModCallback.POST_PICKUP_RENDER]: [
      callback: (pickup: EntityPickup, renderOffset: Vector) => void,
      pickupVariant?: PickupVariant,
    ];

    // 37
    [ModCallback.POST_PICKUP_SELECTION]: [
      callback: (
        pickup: EntityPickup,
        variant: PickupVariant,
        subType: int,
      ) => [pickupVariant: PickupVariant, subType: int] | undefined,
    ];

    // 38
    [ModCallback.PRE_PICKUP_COLLISION]: [
      callback: (
        pickup: EntityPickup,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 39
    [ModCallback.POST_TEAR_INIT]: [
      callback: (tear: EntityTear) => void,
      tearVariant?: TearVariant,
    ];

    // 40
    [ModCallback.POST_TEAR_UPDATE]: [
      callback: (tear: EntityTear) => void,
      tearVariant?: TearVariant,
    ];

    // 41
    [ModCallback.POST_TEAR_RENDER]: [
      callback: (tear: EntityTear, renderOffset: Vector) => void,
      tearVariant?: TearVariant,
    ];

    // 42
    [ModCallback.PRE_TEAR_COLLISION]: [
      callback: (
        tear: EntityTear,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      tearVariant?: TearVariant,
    ];

    // 43
    [ModCallback.POST_PROJECTILE_INIT]: [
      callback: (projectile: EntityProjectile) => void,
      projectileVariant?: ProjectileVariant,
    ];

    // 44
    [ModCallback.POST_PROJECTILE_UPDATE]: [
      callback: (projectile: EntityProjectile) => void,
      projectileVariant?: ProjectileVariant,
    ];

    // 45
    [ModCallback.POST_PROJECTILE_RENDER]: [
      callback: (projectile: EntityProjectile, renderOffset: Vector) => void,
      projectileVariant?: ProjectileVariant,
    ];

    // 46
    [ModCallback.PRE_PROJECTILE_COLLISION]: [
      callback: (
        projectile: EntityProjectile,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      projectileVariant?: ProjectileVariant,
    ];

    // 47
    [ModCallback.POST_LASER_INIT]: [
      callback: (laser: EntityLaser) => void,
      laserVariant?: LaserVariant,
    ];

    // 48
    [ModCallback.POST_LASER_UPDATE]: [
      callback: (laser: EntityLaser) => void,
      laserVariant?: LaserVariant,
    ];

    // 49
    [ModCallback.POST_LASER_RENDER]: [
      callback: (laser: EntityLaser, renderOffset: Vector) => void,
      laserVariant?: LaserVariant,
    ];

    // 50
    [ModCallback.POST_KNIFE_INIT]: [
      callback: (knife: EntityKnife) => void,
      subType?: int, // The vanilla callback is bugged and uses sub-type instead of `KnifeVariant`.
    ];

    // 51
    [ModCallback.POST_KNIFE_UPDATE]: [
      callback: (knife: EntityKnife) => void,
      subType?: int, // The vanilla callback is bugged and uses sub-type instead of `KnifeVariant`.
    ];

    // 52
    [ModCallback.POST_KNIFE_RENDER]: [
      callback: (knife: EntityKnife, renderOffset: Vector) => void,
      subType?: int, // The vanilla callback is bugged and uses sub-type instead of `KnifeVariant`.
    ];

    // 53
    [ModCallback.PRE_KNIFE_COLLISION]: [
      callback: (
        knife: EntityKnife,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      subType?: int, // The vanilla callback is bugged and uses sub-type instead of `KnifeVariant`.
    ];

    // 54
    [ModCallback.POST_EFFECT_INIT]: [
      callback: (effect: EntityEffect) => void,
      effectVariant?: EffectVariant,
    ];

    // 55
    [ModCallback.POST_EFFECT_UPDATE]: [
      callback: (effect: EntityEffect) => void,
      effectVariant?: EffectVariant,
    ];

    // 56
    [ModCallback.POST_EFFECT_RENDER]: [
      callback: (effect: EntityEffect, renderOffset: Vector) => void,
      effectVariant?: EffectVariant,
    ];

    // 57
    [ModCallback.POST_BOMB_INIT]: [
      callback: (bomb: EntityBomb) => void,
      bombVariant?: BombVariant,
    ];

    // 58
    [ModCallback.POST_BOMB_UPDATE]: [
      callback: (bomb: EntityBomb) => void,
      bombVariant?: BombVariant,
    ];

    // 59
    [ModCallback.POST_BOMB_RENDER]: [
      callback: (bomb: EntityBomb, renderOffset: Vector) => void,
      bombVariant?: BombVariant,
    ];

    // 60
    [ModCallback.PRE_BOMB_COLLISION]: [
      callback: (
        bomb: EntityBomb,
        collider: Entity,
        low: boolean,
      ) => boolean | undefined,
      bombVariant?: BombVariant,
    ];

    // 61
    [ModCallback.POST_FIRE_TEAR]: [callback: (tear: EntityTear) => void];

    // 62
    [ModCallback.PRE_GET_COLLECTIBLE]: [
      callback: (
        itemPoolType: ItemPoolType,
        decrease: boolean,
        seed: Seed,
      ) => CollectibleType | undefined,
    ];

    // 63
    [ModCallback.POST_GET_COLLECTIBLE]: [
      callback: (
        collectibleType: CollectibleType,
        itemPoolType: ItemPoolType,
        decrease: boolean,
        seed: Seed,
      ) => CollectibleType | undefined,
    ];

    // 64
    [ModCallback.GET_PILL_COLOR]: [
      callback: (seed: Seed) => PillColor | undefined,
    ];

    // 65
    [ModCallback.GET_PILL_EFFECT]: [
      callback: (
        pillEffect: PillEffect,
        pillColor: PillColor,
      ) => PillEffect | undefined,
    ];

    // 66
    [ModCallback.GET_TRINKET]: [
      callback: (trinketType: TrinketType, rng: RNG) => TrinketType | undefined,
    ];

    // 67
    [ModCallback.POST_ENTITY_REMOVE]: [
      callback: (entity: Entity) => void,
      entityType?: EntityType,
    ];

    // 68
    [ModCallback.POST_ENTITY_KILL]: [
      callback: (entity: Entity) => void,
      entityType?: EntityType,
    ];

    // 69
    [ModCallback.PRE_NPC_UPDATE]: [
      callback: (npc: EntityNPC) => boolean | undefined,
      entityType?: EntityType,
    ];

    // 70
    [ModCallback.PRE_SPAWN_CLEAR_AWARD]: [
      callback: (rng: RNG, spawnPosition: Vector) => boolean | undefined,
    ];

    // 71
    [ModCallback.PRE_ROOM_ENTITY_SPAWN]: [
      callback: (
        entityTypeOrGridEntityXMLType: EntityType | GridEntityXMLType,
        variant: int,
        subType: int,
        gridIndex: int,
        initSeed: Seed,
      ) =>
        | [type: EntityType | GridEntityXMLType, variant: int, subType: int]
        | undefined,
    ];

    // 72
    [ModCallback.PRE_ENTITY_DEVOLVE]: [
      callback: (entity: Entity) => boolean | undefined,
    ];

    // 73
    [ModCallback.PRE_MOD_UNLOAD]: [callback: (mod: Mod) => void];
  }
}
