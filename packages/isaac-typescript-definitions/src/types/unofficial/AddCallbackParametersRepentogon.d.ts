import type { ActiveSlot } from "../../enums/ActiveSlot";
import type { ChampionColor } from "../../enums/ChampionColor";
import type { Dimension } from "../../enums/Dimension";
import type { EntityType } from "../../enums/EntityType";
import type { FollowerPriority } from "../../enums/FollowerPriority";
import type { GridEntityType } from "../../enums/GridEntityType";
import type { LevelStage } from "../../enums/LevelStage";
import type { ModCallbackRepentogon } from "../../enums/ModCallbackRepentogon";
import type { Music } from "../../enums/Music";
import type { PillEffect } from "../../enums/PillEffect";
import type { SoundEffect } from "../../enums/SoundEffect";
import type { StageType } from "../../enums/StageType";
import type { TrinketSlot } from "../../enums/TrinketSlot";
import type { WeaponType } from "../../enums/WeaponType";
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
  KnifeVariant,
  PickupVariant,
  PlayerVariant,
  ProjectileVariant,
  SlotVariant,
  TearVariant,
} from "../../enums/collections/variants";
import type { DamageFlag } from "../../enums/flags/DamageFlag";
import type { UseFlag } from "../../enums/flags/UseFlag";
import type { CompletionMarkType } from "../../enums/mods/repentogon/CompletionMarkType";
import type { GiantbookType } from "../../enums/mods/repentogon/GiantbookType";
import type { PlayerHealthType } from "../../enums/mods/repentogon/HealthType";

import type {
  RepentogonEntityWeapon,
  RepentogonGridEntityDecoration,
  RepentogonGridEntityFire,
  RepentogonGridEntityGravity,
  RepentogonGridEntityLock,
  RepentogonGridEntityStaircase,
  RepentogonGridEntityStatue,
  RepentogonGridEntityTeleporter,
  RepentogonGridEntityTrapdoor,
  RepentogonGridEntityWeb,
  RepentogonLevelGenerator,
  RepentogonLevelGeneratorRoom,
} from "../mods/Repentogon";

declare global {
  interface AddCallbackParametersRepentogon {
    // 1004
    [ModCallbackRepentogon.PRE_ADD_COLLECTIBLE]: [
      callback: (
        collectible: CollectibleType,
        charge: int,
        firstTime: boolean,
        slot: ActiveSlot,
        varData: int,
        player: EntityPlayer,
      ) =>
        | CollectibleType
        | [CollectibleType, int, boolean, ActiveSlot, int, EntityPlayer]
        | undefined,
      collectible?: CollectibleType,
    ];

    // 1005
    [ModCallbackRepentogon.POST_ADD_COLLECTIBLE]: [
      callback: (
        collectible: CollectibleType,
        charge: int,
        firstTime: boolean,
        activeSlot: ActiveSlot,
        varData: int,
        player: EntityPlayer,
      ) => void,
      collectible?: CollectibleType,
    ];

    // 1006
    [ModCallbackRepentogon.POST_ENTITY_TAKE_DMG]: [
      callback: (
        entity: Entity,
        damage: number,
        damageFlags: BitFlags<DamageFlag>,
        source: EntityRef,
        damageCountdown: int,
      ) => void,
      entityType?: EntityType,
    ];

    // 1007
    [ModCallbackRepentogon.PRE_ENTITY_TAKE_DMG]: [
      callback: (
        entity: Entity,
        damage: number,
        damageFlags: BitFlags<DamageFlag>,
        source: EntityRef,
        damageCountdown: int,
      ) => [int, BitFlags<DamageFlag>, int] | boolean | undefined,
      entityType?: EntityType,
    ];

    // 1008
    [ModCallbackRepentogon.PRE_PLAYER_TAKE_DMG]: [
      callback: (
        player: EntityPlayer,
        damage: number,
        damageFlags: BitFlags<DamageFlag>,
        source: EntityRef,
        damageCountdown: int,
      ) => boolean | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 1011
    [ModCallbackRepentogon.POST_GRID_ROCK_DESTROY]: [
      callback: (
        rock: GridEntityRock,
        gridEntityType: GridEntityType,
        immediate: boolean,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1012
    [ModCallbackRepentogon.PRE_GRID_HURT_DAMAGE]: [
      callback: (
        grid: GridEntityType,
        tookDamage: Entity,
        damageAmount: int,
        damageFlags: BitFlags<DamageFlag>,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1013
    [ModCallbackRepentogon.POST_GRID_HURT_DAMAGE]: [
      callback: (
        grid: GridEntityType,
        tookDamage: Entity,
        damageAmount: int,
        damageFlags: BitFlags<DamageFlag>,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1020
    [ModCallbackRepentogon.HUD_UPDATE]: [callback: () => void];

    // 1021
    [ModCallbackRepentogon.HUD_POST_UPDATE]: [callback: () => void];

    // 1022
    [ModCallbackRepentogon.POST_HUD_RENDER]: [callback: () => void];

    // 1023
    [ModCallbackRepentogon.POST_MAIN_MENU_RENDER]: [callback: () => void];

    // 1030
    [ModCallbackRepentogon.PRE_SFX_PLAY]: [
      callback: (
        id: SoundEffect,
        volume: number,
        frameDelay: int,
        pitch: number,
        pan: number,
      ) =>
        | boolean
        | [SoundEffect, number, number, boolean, number, number]
        | undefined,
      soundEffect?: SoundEffect,
    ];

    // 1031
    [ModCallbackRepentogon.POST_SFX_PLAY]: [
      callback: (
        id: SoundEffect,
        volume: number,
        frameDelay: int,
        pitch: number,
        pan: number,
      ) => number,
      soundEffect?: SoundEffect,
    ];

    // 1034
    [ModCallbackRepentogon.PRE_MUSIC_PLAY]: [
      callback: (
        music: Music,
        volumeOrFadeRate: number,
        isFade: boolean,
      ) => Music | [Music, number] | boolean | undefined,
      music?: Music,
    ];

    // 1035
    [ModCallbackRepentogon.PRE_MUSIC_LAYER_TOGGLE]: [
      callback: (
        layerId: int,
        currentState: boolean,
      ) => int | boolean | undefined,
      layer?: int,
    ];

    // 1038
    [ModCallbackRepentogon.PRE_RENDER_PLAYER_HEAD]: [
      callback: (
        player: EntityPlayer,
        renderPosition: Vector,
      ) => Vector | boolean | undefined,
      playerType?: PlayerType,
    ];

    // 1039
    [ModCallbackRepentogon.PRE_RENDER_PLAYER_BODY]: [
      callback: (
        player: EntityPlayer,
        renderPosition: Vector,
      ) => Vector | boolean | undefined,
      playerType?: PlayerType,
    ];

    // 1040
    [ModCallbackRepentogon.PRE_ENTITY_THROW]: [
      callback: (
        throwingPlayer: EntityPlayer,
        heldEntity: Entity,
        velocity: Vector,
      ) => Vector | undefined,
    ];

    // 1041
    [ModCallbackRepentogon.POST_ENTITY_THROW]: [
      callback: (
        throwingPlayer: EntityPlayer,
        thrownEntity: Entity,
        velocity: Vector,
      ) => void,
    ];

    // 1042
    [ModCallbackRepentogon.POST_PLAYER_LEVEL_STATS_INIT]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 1043
    [ModCallbackRepentogon.PRE_ROOM_EXIT]: [
      callback: (playerWhoExited: EntityPlayer, newLevel: boolean) => void,
    ];

    // 1047
    [ModCallbackRepentogon.PRE_COMPLETION_MARK_GET]: [
      callback: (
        completionType: CompletionMarkType,
        playerType: PlayerType,
      ) => boolean | undefined,
      playerType?: PlayerType,
    ];

    // 1048
    [ModCallbackRepentogon.POST_COMPLETION_MARK_GET]: [
      callback: (
        completionType: CompletionMarkType,
        playerType: PlayerType,
      ) => void,
      playerType?: PlayerType,
    ];

    // 1049
    [ModCallbackRepentogon.PRE_COMPLETION_EVENT]: [
      callback: (completionType: CompletionMarkType) => boolean | undefined,
    ];

    // 1050
    [ModCallbackRepentogon.PRE_TRIGGER_PLAYER_DEATH]: [
      callback: (player: EntityPlayer) => boolean | undefined,
    ];

    // 1060
    [ModCallbackRepentogon.PRE_LEVEL_INIT]: [callback: () => void];

    // 1061
    [ModCallbackRepentogon.PRE_CHANGE_ROOM]: [
      callback: (
        targetRoomIndex: int,
        dimension: Dimension,
      ) => [int, Dimension] | undefined,
    ];

    // 1062
    [ModCallbackRepentogon.POST_PICKUP_SHOP_PURCHASE]: [
      callback: (
        pickup: EntityPickup,
        player: EntityPlayer,
        moneySpent: int,
      ) => void,
      pickupVariant?: PickupVariant,
    ];

    // 1063
    [ModCallbackRepentogon.GET_FOLLOWER_PRIORITY]: [
      callback: (
        familiar: EntityFamiliar,
      ) => int | FollowerPriority | undefined,
      familiarVariant?: FamiliarVariant,
    ];

    // 1070
    [ModCallbackRepentogon.PRE_RESTOCK_SHOP]: [
      callback: (partial: boolean) => boolean | undefined,
    ];

    // 1071
    [ModCallbackRepentogon.POST_RESTOCK_SHOP]: [
      callback: (partial: boolean) => void,
    ];

    // 1064
    [ModCallbackRepentogon.PRE_USE_CARD]: [
      callback: (
        card: CardType,
        player: EntityPlayer,
        useFlags: BitFlags<UseFlag>,
      ) => boolean | undefined,
    ];

    // 1065
    [ModCallbackRepentogon.PRE_USE_PILL]: [
      callback: (
        pillEffect: PillEffect,
        pillColor: PillConfigList,
        player: EntityPlayer,
        useFlags: BitFlags<UseFlag>,
      ) => boolean | undefined,
    ];

    // 1066
    [ModCallbackRepentogon.GET_SHOP_ITEM_PRICE]: [
      callback: (
        variant: PickupVariant,
        subType: int,
        shopItemID: int,
      ) => int | undefined,
    ];

    // 1067
    [ModCallbackRepentogon.PLAYER_GET_HEALTH_TYPE]: [
      callback: (player: EntityPlayer) => PlayerHealthType | undefined,
    ];

    // 1068
    [ModCallbackRepentogon.PRE_ROOM_TRIGGER_CLEAR]: [callback: () => void];

    // 1069
    [ModCallbackRepentogon.PRE_PLAYER_TRIGGER_ROOM_CLEAR]: [
      callback: (player: EntityPlayer) => boolean | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 1072
    [ModCallbackRepentogon.PLAYER_GET_ACTIVE_MAX_CHARGE]: [
      callback: (
        collectible: CollectibleType,
        player: EntityPlayer,
        varData: int,
      ) => int | undefined,
      collectible?: CollectibleType,
    ];

    // 1073
    [ModCallbackRepentogon.PLAYER_GET_ACTIVE_MIN_USABLE_CHARGE]: [
      callback: (slot: ActiveSlot) => int | undefined,
      collectible?: CollectibleType,
    ];

    // 1074
    [ModCallbackRepentogon.PLAYER_GET_HEART_LIMIT]: [
      callback: (
        player: EntityPlayer,
        heartLimit: int,
        isKeeper: boolean,
      ) => int | undefined,
      playerType?: PlayerType,
    ];

    // 1075
    [ModCallbackRepentogon.POST_ITEM_OVERLAY_UPDATE]: [
      callback: () => void,
      giantbookType?: GiantbookType,
    ];

    // 1076
    [ModCallbackRepentogon.PRE_ITEM_OVERLAY_SHOW]: [
      callback: (
        giantbookType: GiantbookType,
        delay: int,
        player: EntityPlayer,
      ) => GiantbookType | boolean | undefined,
      giantbookType?: GiantbookType,
    ];

    // 1077
    [ModCallbackRepentogon.POST_PLAYER_NEW_ROOM_TEMP_EFFECTS]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 1078
    [ModCallbackRepentogon.POST_PLAYER_NEW_LEVEL]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 1079
    [ModCallbackRepentogon.POST_PLAYER_HUD_RENDER_ACTIVE_ITEM]: [
      callback: (
        player: EntityPlayer,
        slot: ActiveSlot,
        offset: Vector,
        alpha: number,
      ) => void,
    ];

    // 1080
    [ModCallbackRepentogon.PRE_FAMILIAR_RENDER]: [
      callback: (
        familiar: EntityFamiliar,
        offset: Vector,
      ) => Vector | boolean | undefined,
      familiarVariant?: FamiliarVariant,
    ];

    // 1081
    [ModCallbackRepentogon.PRE_NPC_RENDER]: [
      callback: (
        npc: EntityNPC,
        offset: Vector,
      ) => Vector | boolean | undefined,
      entityType?: EntityType,
    ];

    // 1082
    [ModCallbackRepentogon.PRE_PLAYER_RENDER]: [
      callback: (
        player: EntityPlayer,
        offset: Vector,
      ) => Vector | boolean | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 1083
    [ModCallbackRepentogon.PRE_PICKUP_RENDER]: [
      callback: (
        pickup: EntityPickup,
        offset: Vector,
      ) => Vector | boolean | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 1084
    [ModCallbackRepentogon.PRE_TEAR_RENDER]: [
      callback: (
        tear: EntityTear,
        offset: Vector,
      ) => Vector | boolean | undefined,
      tearVariant?: TearVariant,
    ];

    // 1085
    [ModCallbackRepentogon.PRE_PROJECTILE_RENDER]: [
      callback: (
        player: EntityPlayer,
        offset: Vector,
      ) => Vector | boolean | undefined,
      projectileVariant?: ProjectileVariant,
    ];

    // 1086
    [ModCallbackRepentogon.PRE_KNIFE_RENDER]: [
      callback: (
        knife: EntityKnife,
        offset: Vector,
      ) => Vector | boolean | undefined,
      knifeVariant?: KnifeVariant,
    ];

    // 1087
    [ModCallbackRepentogon.PRE_EFFECT_RENDER]: [
      callback: (
        effect: EntityEffect,
        offset: Vector,
      ) => Vector | boolean | undefined,
      effectVariant?: EffectVariant,
    ];

    // 1088
    [ModCallbackRepentogon.PRE_BOMB_RENDER]: [
      callback: (
        bomb: EntityBomb,
        offset: Vector,
      ) => Vector | boolean | undefined,
      bombVariant?: BombVariant,
    ];

    // 1089
    [ModCallbackRepentogon.PRE_SLOT_RENDER]: [
      callback: (
        slot: EntitySlot,
        offset: Vector,
      ) => Vector | boolean | undefined,
      slotVariant?: SlotVariant,
    ];

    // 1090
    [ModCallbackRepentogon.POST_SLOT_RENDER]: [
      callback: (slot: EntitySlot, offset: Vector) => void,
      slotVariant?: SlotVariant,
    ];

    // 1091
    [ModCallbackRepentogon.POST_PLAYER_HUD_RENDER_HEARTS]: [
      callback: (
        offset: Vector,
        heartsSprite: Sprite,
        position: Vector,
      ) => void,
    ];

    // 1092
    [ModCallbackRepentogon.PRE_PLAYER_APPLY_INNATE_COLLECTIBLE_NUM]: [
      callback: (
        modCount: int,
        player: EntityPlayer,
        collectible: CollectibleType,
        onlyCountTrueItems: boolean,
      ) => int | undefined,
    ];

    // 1094
    [ModCallbackRepentogon.PRE_MUSIC_PLAY_JINGLE]: [
      callback: (music: Music) => Music | boolean | undefined,
      music?: Music,
    ];

    // 1095
    [ModCallbackRepentogon.POST_TRIGGER_COLLECTIBLE_REMOVED]: [
      callback: (player: EntityPlayer, collectible: CollectibleType) => void,
      collectibleType?: CollectibleType,
    ];

    // 1096
    [ModCallbackRepentogon.POST_TRIGGER_TRINKET_ADDED]: [
      callback: (
        player: EntityPlayer,
        trinketType: TrinketType,
        firstTimePickingUp: boolean,
      ) => void,
      trinketType?: TrinketType,
    ];

    // 1097
    [ModCallbackRepentogon.POST_TRIGGER_TRINKET_REMOVED]: [
      callback: (
        player: EntityPlayer,
        trinketType: TrinketType,
        firstTimePickingUp: boolean,
      ) => void,
      trinketType?: TrinketType,
    ];

    // 1098
    [ModCallbackRepentogon.POST_TRIGGER_WEAPON_FIRED]: [
      callback: (fireDirection: Vector, fireAmount: int, owner: Entity) => void,
      weaponType?: WeaponType,
    ];

    // 1099
    [ModCallbackRepentogon.POST_LEVEL_LAYOUT_GENERATED]: [
      callback: (levelGenerator: RepentogonLevelGenerator) => void,
    ];

    // 1001
    [ModCallbackRepentogon.POST_USE_PILL]: [
      callback: (
        effect: PillEffect,
        player: EntityPlayer,
        flags: BitFlags<UseFlag>,
        color: PillColor,
      ) => void,
      pillEffect?: PillEffect,
    ];

    // 1100
    [ModCallbackRepentogon.PRE_GRID_ENTITY_SPAWN]: [
      callback: (
        gridEntityType: GridEntityType,
        variant: int,
        varData: int,
        gridIndex: int,
        spawnSeed: Seed,
        desc: GridEntityDesc,
      ) => [GridEntityType, int, int, Seed] | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1101
    [ModCallbackRepentogon.POST_GRID_ENTITY_SPAWN]: [
      callback: (
        gridEntityType: GridEntityType,
        variant: int,
        varData: int,
        gridIndex: int,
        spawnSeed: Seed,
        desc: GridEntityDesc,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1102
    [ModCallbackRepentogon.POST_NIGHTMARE_SCENE_RENDER]: [callback: () => void];

    // 1103
    [ModCallbackRepentogon.POST_NIGHTMARE_SCENE_SHOW]: [callback: () => void];

    // 1104
    [ModCallbackRepentogon.MC_PRE_LEVEL_SELECT]: [
      callback: (
        level: LevelStage,
        stageType: StageType,
      ) => [LevelStage?, StageType?] | undefined,
    ];

    // 1105
    [ModCallbackRepentogon.POST_WEAPON_FIRE]: [
      callback: (
        weapon: RepentogonEntityWeapon,
        fireDirection: Vector,
        isShooting: boolean,
        isInterpolated: boolean,
      ) => void,
      weaponType?: WeaponType,
    ];

    // 1110
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_STAGE_PENALTY]: [
      callback: () => boolean | undefined,
    ];

    // 1111
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_PLANETARIUM_PENALTY]: [
      callback: () => boolean | undefined,
    ];

    // 1112
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_TREASURE_PENALTY]: [
      callback: (treasureRoomsVisited: int) => boolean | int | undefined,
    ];

    // 1113
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_ITEMS]: [
      callback: (chance: number) => number | undefined,
    ];

    // 1114
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_TELESCOPE_LENS]: [
      callback: (chance: number) => number | undefined,
    ];

    // 1115
    [ModCallbackRepentogon.POST_PLANETARIUM_CALCULATE]: [
      callback: (chance: number) => number | undefined,
    ];

    // 1116
    [ModCallbackRepentogon.PRE_REPLACE_SPRITESHEET]: [
      callback: (layerId: int, fileName: string) => string | undefined,
      anm2FileName?: string,
    ];

    // 1117
    [ModCallbackRepentogon.POST_REPLACE_SPRITESHEET]: [
      callback: (layerId: int, fileName: string) => void,
      anm2FileName?: string,
    ];

    // 1120
    [ModCallbackRepentogon.CONSOLE_AUTOCOMPLETE]: [
      callback: (
        command: string,
        params: string,
      ) => [string, string?] | undefined,
      command?: string,
    ];

    // 1121
    [ModCallbackRepentogon.POST_SLOT_INIT]: [
      callback: (slot: EntitySlot) => void,
      slotVariant?: SlotVariant,
    ];

    // 1122
    [ModCallbackRepentogon.POST_SLOT_UPDATE]: [
      callback: (slot: EntitySlot) => void,
      slotVariant?: SlotVariant,
    ];

    // 1123
    [ModCallbackRepentogon.PRE_SLOT_CREATE_EXPLOSION_DROPS]: [
      callback: (slot: EntitySlot) => boolean | undefined,
      slotVariant?: SlotVariant,
    ];

    // 1124
    [ModCallbackRepentogon.POST_SLOT_CREATE_EXPLOSION_DROPS]: [
      callback: (slot: EntitySlot) => void,
      slotVariant?: SlotVariant,
    ];

    // 1125
    [ModCallbackRepentogon.PRE_SLOT_SET_PRIZE_COLLECTIBLE]: [
      callback: (slot: EntitySlot) => CollectibleType | undefined,
      slotVariant?: SlotVariant,
    ];

    // 1126
    [ModCallbackRepentogon.POST_SLOT_SET_PRIZE_COLLECTIBLE]: [
      callback: (slot: EntitySlot) => void,
      slotVariant?: SlotVariant,
    ];

    // 1127
    [ModCallbackRepentogon.PLAYER_INIT_PRE_LEVEL_INIT_STATS]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 1130
    [ModCallbackRepentogon.PRE_DEVIL_APPLY_ITEMS]: [
      callback: () => boolean | undefined,
    ];

    // 1131
    [ModCallbackRepentogon.PRE_DEVIL_APPLY_STAGE_PENALTY]: [
      callback: () => boolean | undefined,
    ];

    // 1132
    [ModCallbackRepentogon.PRE_DEVIL_APPLY_SPECIAL_ITEMS]: [
      callback: () => int | undefined,
    ];

    // 1133
    [ModCallbackRepentogon.POST_DEVIL_CALCULATE]: [
      callback: () => int | undefined,
    ];

    // 1134
    [ModCallbackRepentogon.POST_ITEM_OVERLAY_SHOW]: [
      callback: (
        giantbook: GiantbookType,
        delay: int,
        player: EntityPlayer,
      ) => void,
      giantbookType?: GiantbookType,
    ];

    // 1137
    [ModCallbackRepentogon.PRE_LEVEL_PLACE_ROOM]: [
      callback: (
        slot: RepentogonLevelGeneratorRoom,
        roomConfig: RoomConfig,
        seed: Seed,
      ) => RoomConfig | undefined,
    ];

    // 1150
    [ModCallbackRepentogon.PRE_GET_LIGHTING_ALPHA]: [
      callback: (originalAlpha: number) => number | undefined,
    ];

    // 1151
    [ModCallbackRepentogon.PRE_RENDER_GRID_LIGHTING]: [
      callback: (
        gridEntity: GridEntityType,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1152
    [ModCallbackRepentogon.PRE_RENDER_ENTITY_LIGHTING]: [
      callback: (
        entity: Entity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      entityType?: EntityType,
    ];

    // 1191
    [ModCallbackRepentogon.PRE_NPC_SPLIT]: [
      callback: (npc: EntityNPC, isBlacklisted: boolean) => boolean | undefined,
      entityType?: EntityType,
    ];

    // 1192
    [ModCallbackRepentogon.PRE_ROOM_GRID_ENTITY_SPAWN]: [
      callback: (
        gridEntityType: GridEntityType,
        variant: int,
        varData: int,
        gridIndex: int,
        spawnSeed: Seed,
      ) => boolean | [GridEntityType, int, int, int, Seed] | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1200
    [ModCallbackRepentogon.PRE_NEW_ROOM]: [
      callback: (room: Room, descriptor: RoomDescriptor) => void,
    ];

    // 1201
    [ModCallbackRepentogon.PRE_MEGA_SATAN_ENDING]: [
      callback: () => boolean | undefined,
    ];

    // 1210
    [ModCallbackRepentogon.POST_MODS_LOADED]: [callback: () => void];

    // 1212
    [ModCallbackRepentogon.PRE_NPC_MORPH]: [
      callback: (
        entityType: EntityType,
        variant: int,
        subType: int,
        championColor: ChampionColor,
      ) => [EntityType, int, int, ChampionColor] | boolean | undefined,
    ];

    // 1213
    [ModCallbackRepentogon.PRE_PICKUP_MORPH]: [
      callback: (
        pickup: EntityPickup,
        entityType: EntityType,
        variant: int,
        subType: int,
        keepPrice: int,
        keepSeed: boolean,
        ignoreModifiers: boolean,
      ) =>
        | [EntityType, int, int, boolean, boolean, boolean]
        | [EntityType, int, int]
        | boolean
        | undefined,
    ];

    // 1214
    [ModCallbackRepentogon.POST_NPC_MORPH]: [
      callback: (
        previousType: EntityType,
        previousVariant: int,
        previousSubType: int,
      ) => void,
    ];

    // 1215
    [ModCallbackRepentogon.POST_PICKUP_MORPH]: [
      callback: (
        pickup: EntityPickup,
        previousType: EntityType,
        previousVariant: int,
        previousSubType: int,
        keptPrice: int,
        keptSeed: boolean,
        ignoredModifiers: boolean,
      ) => void,
    ];

    // 1216
    [ModCallbackRepentogon.PRE_COMPLETION_MARKS_RENDER]: [
      callback: (
        completionMarksSprite: Sprite,
        renderPos: Vector,
        renderScale: Vector,
        playerType: PlayerType,
      ) => boolean | undefined,
    ];

    // 1217
    [ModCallbackRepentogon.POST_COMPLETION_MARKS_RENDER]: [
      callback: (
        completionMarksSprite: Sprite,
        renderPos: Vector,
        renderScale: Vector,
        playerType: PlayerType,
      ) => void,
    ];

    // 1218
    [ModCallbackRepentogon.PRE_PAUSE_SCREEN_RENDER]: [
      callback: (pauseBody: Sprite, pauseStats: Sprite) => boolean | undefined,
    ];

    // 1219
    [ModCallbackRepentogon.POST_PAUSE_SCREEN_RENDER]: [
      callback: (pauseBody: Sprite, pauseStats: Sprite) => void,
    ];

    // 1251
    [ModCallbackRepentogon.PRE_PLAYER_GET_MULTI_SHOT_PARAMS]: [
      callback: (player: EntityPlayer) => MultiShotParams | undefined,
    ];

    // 1252
    [ModCallbackRepentogon.POST_FAMILIAR_FIRE_PROJECTILE]: [
      callback: (tear: EntityTear) => void,
      familiarVariant?: FamiliarVariant,
    ];

    // 1253
    [ModCallbackRepentogon.POST_FIRE_BOMB]: [
      callback: (bomb: EntityBomb) => void,
    ];

    // 1254
    [ModCallbackRepentogon.POST_FIRE_BONE_CLUB]: [
      callback: (club: EntityKnife) => void,
    ];

    // 1255
    [ModCallbackRepentogon.POST_FIRE_BRIMSTONE]: [
      callback: (brimstone: EntityPickupBattery) => void,
    ];

    // 1256
    [ModCallbackRepentogon.POST_FIRE_BRIMSTONE_BALL]: [
      callback: (brimstone: EntityEffect) => void,
    ];

    // 1257
    [ModCallbackRepentogon.POST_FIRE_KNIFE]: [
      callback: (knife: EntityKnife) => void,
    ];

    // 1258
    [ModCallbackRepentogon.POST_FIRE_SWORD]: [
      callback: (sword: EntityKnife) => void,
    ];

    // 1259
    [ModCallbackRepentogon.POST_FIRE_TECH_LASER]: [
      callback: (laser: EntityLaser) => void,
    ];

    // 1260
    [ModCallbackRepentogon.POST_FIRE_TECH_X_LASER]: [
      callback: (laser: EntityLaser) => void,
    ];

    // 1261
    [ModCallbackRepentogon.POST_FAMILIAR_FIRE_BRIMSTONE]: [
      callback: (laser: EntityLaser) => void,
    ];

    // 1262
    [ModCallbackRepentogon.POST_FAMILIAR_FIRE_TECH_LASER]: [
      callback: (laser: EntityLaser) => void,
    ];

    // 1263
    [ModCallbackRepentogon.GET_IS_PERSISTENT_ROOM_ENTITY]: [
      callback: (entityType: EntityType, variant: int) => boolean | undefined,
    ];

    // 1264
    [ModCallbackRepentogon.PRE_PLAYER_HUD_TRINKET_RENDER]: [
      callback: (
        slot: TrinketSlot,
        position: Vector,
        scale: number,
        player: EntityPlayer,
      ) => [Vector, number] | boolean | undefined,
      trinketSlot?: TrinketSlot,
    ];

    // 1400
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DECORATION_UPDATE]: [
      callback: (grid: RepentogonGridEntityDecoration) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1401
    [ModCallbackRepentogon.POST_GRID_ENTITY_DECORATION_UPDATE]: [
      callback: (grid: RepentogonGridEntityDecoration) => void,
      gridEntityType?: boolean,
    ];

    // 1402
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DOOR_UPDATE]: [
      callback: (grid: GridEntityDoor) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1403
    [ModCallbackRepentogon.POST_GRID_ENTITY_DOOR_UPDATE]: [
      callback: (grid: GridEntityDoor) => void,
      gridEntityType?: boolean,
    ];

    // 1404
    [ModCallbackRepentogon.PRE_GRID_ENTITY_FIRE_UPDATE]: [
      callback: (grid: RepentogonGridEntityFire) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1405
    [ModCallbackRepentogon.POST_GRID_ENTITY_FIRE_UPDATE]: [
      callback: (grid: RepentogonGridEntityFire) => void,
      gridEntityType?: boolean,
    ];

    // 1406
    [ModCallbackRepentogon.PRE_GRID_ENTITY_GRAVITY_UPDATE]: [
      callback: (grid: RepentogonGridEntityGravity) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1407
    [ModCallbackRepentogon.POST_GRID_ENTITY_GRAVITY_UPDATE]: [
      callback: (grid: RepentogonGridEntityGravity) => void,
      gridEntityType?: boolean,
    ];

    // 1408
    [ModCallbackRepentogon.PRE_GRID_ENTITY_LOCK_UPDATE]: [
      callback: (grid: RepentogonGridEntityLock) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1409
    [ModCallbackRepentogon.POST_GRID_ENTITY_LOCK_UPDATE]: [
      callback: (grid: RepentogonGridEntityLock) => void,
      gridEntityType?: boolean,
    ];

    // 1410
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PIT_UPDATE]: [
      callback: (grid: GridEntityPit) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1411
    [ModCallbackRepentogon.POST_GRID_ENTITY_PIT_UPDATE]: [
      callback: (grid: GridEntityPit) => void,
      gridEntityType?: boolean,
    ];

    // 1412
    [ModCallbackRepentogon.PRE_GRID_ENTITY_POOP_UPDATE]: [
      callback: (grid: GridEntityPoop) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1413
    [ModCallbackRepentogon.POST_GRID_ENTITY_POOP_UPDATE]: [
      callback: (grid: GridEntityPoop) => void,
      gridEntityType?: boolean,
    ];

    // 1414
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PRESSURE_PLATE_UPDATE]: [
      callback: (grid: GridEntityPressurePlate) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1415
    [ModCallbackRepentogon.POST_GRID_ENTITY_PRESSURE_PLATE_UPDATE]: [
      callback: (grid: GridEntityPressurePlate) => void,
      gridEntityType?: boolean,
    ];

    // 1416
    [ModCallbackRepentogon.PRE_GRID_ENTITY_ROCK_UPDATE]: [
      callback: (grid: GridEntityRock) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1417
    [ModCallbackRepentogon.POST_GRID_ENTITY_ROCK_UPDATE]: [
      callback: (grid: GridEntityRock) => void,
      gridEntityType?: boolean,
    ];

    // 1418
    [ModCallbackRepentogon.PRE_GRID_ENTITY_SPIKES_UPDATE]: [
      callback: (grid: GridEntitySpikes) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1419
    [ModCallbackRepentogon.POST_GRID_ENTITY_SPIKES_UPDATE]: [
      callback: (grid: GridEntitySpikes) => void,
      gridEntityType?: boolean,
    ];

    // 1420
    [ModCallbackRepentogon.PRE_GRID_ENTITY_STAIRCASE_UPDATE]: [
      callback: (grid: RepentogonGridEntityStaircase) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1421
    [ModCallbackRepentogon.POST_GRID_ENTITY_STAIRCASE_RENDER]: [
      callback: (grid: RepentogonGridEntityStaircase) => void,
      gridEntityType?: boolean,
    ];

    // 1422
    [ModCallbackRepentogon.PRE_GRID_ENTITY_STATUE_UPDATE]: [
      callback: (grid: RepentogonGridEntityStatue) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1423
    [ModCallbackRepentogon.POST_GRID_ENTITY_STATUE_UPDATE]: [
      callback: (grid: RepentogonGridEntityStatue) => void,
      gridEntityType?: boolean,
    ];

    // 1424
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TRAPDOOR_UPDATE]: [
      callback: (grid: RepentogonGridEntityTrapdoor) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1427
    [ModCallbackRepentogon.POST_GRID_ENTITY_TRAPDOOR_UPDATE]: [
      callback: (grid: RepentogonGridEntityTrapdoor) => void,
      gridEntityType?: boolean,
    ];

    // 1428
    [ModCallbackRepentogon.PRE_GRID_ENTITY_WEB_UPDATE]: [
      callback: (grid: RepentogonGridEntityWeb) => boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1429
    [ModCallbackRepentogon.POST_GRID_ENTITY_WEB_UPDATE]: [
      callback: (grid: RepentogonGridEntityWeb) => void,
      gridEntityType?: boolean,
    ];

    // 1432
    [ModCallbackRepentogon.PRE_GRID_ENTITY_SPIKES_RENDER]: [
      callback: (grid: GridEntitySpikes) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1433
    [ModCallbackRepentogon.POST_GRID_ENTITY_SPIKES_RENDER]: [
      callback: (grid: GridEntitySpikes) => void,
      gridEntityType?: boolean,
    ];

    // 1434
    [ModCallbackRepentogon.PRE_GRID_ENTITY_WEB_RENDER]: [
      callback: (grid: RepentogonGridEntityWeb) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1435
    [ModCallbackRepentogon.POST_GRID_ENTITY_WEB_RENDER]: [
      callback: (grid: RepentogonGridEntityWeb) => void,
      gridEntityType?: boolean,
    ];

    // 1436
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TNT_RENDER]: [
      callback: (grid: GridEntityTNT) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1437
    [ModCallbackRepentogon.POST_GRID_ENTITY_TNT_RENDER]: [
      callback: (grid: GridEntityTNT) => void,
      gridEntityType?: boolean,
    ];

    // 1438
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TRAPDOOR_RENDER]: [
      callback: (
        grid: RepentogonGridEntityTrapdoor,
      ) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1439
    [ModCallbackRepentogon.POST_GRID_ENTITY_TRAPDOOR_RENDER]: [
      callback: (grid: RepentogonGridEntityTrapdoor) => void,
      gridEntityType?: boolean,
    ];

    // 1440
    [ModCallbackRepentogon.PRE_GRID_ENTITY_STAIRCASE_RENDER]: [
      callback: (
        grid: RepentogonGridEntityStaircase,
      ) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1441
    [ModCallbackRepentogon.POST_GRID_ENTITY_STAIRCASE_RENDER]: [
      callback: (grid: RepentogonGridEntityStaircase) => void,
      gridEntityType?: boolean,
    ];

    // 1444
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DECORATION_RENDER]: [
      callback: (
        grid: RepentogonGridEntityDecoration,
      ) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1445
    [ModCallbackRepentogon.POST_GRID_ENTITY_DECORATION_RENDER]: [
      callback: (grid: RepentogonGridEntityDecoration) => void,
      gridEntityType?: boolean,
    ];

    // 1446
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DOOR_RENDER]: [
      callback: (grid: GridEntityDoor) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1447
    [ModCallbackRepentogon.POST_GRID_ENTITY_DOOR_RENDER]: [
      callback: (grid: GridEntityDoor) => void,
      gridEntityType?: boolean,
    ];

    // 1448
    [ModCallbackRepentogon.PRE_GRID_ENTITY_FIRE_RENDER]: [
      callback: (
        grid: RepentogonGridEntityFire,
      ) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1449
    [ModCallbackRepentogon.POST_GRID_ENTITY_FIRE_RENDER]: [
      callback: (grid: RepentogonGridEntityFire) => void,
      gridEntityType?: boolean,
    ];

    // 1450
    [ModCallbackRepentogon.PRE_GRID_ENTITY_LOCK_RENDER]: [
      callback: (
        grid: RepentogonGridEntityLock,
      ) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1451
    [ModCallbackRepentogon.POST_GRID_ENTITY_LOCK_RENDER]: [
      callback: (grid: RepentogonGridEntityLock) => void,
      gridEntityType?: boolean,
    ];

    // 1452
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TELEPORTER_RENDER]: [
      callback: (
        grid: RepentogonGridEntityTeleporter,
      ) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1453
    [ModCallbackRepentogon.POST_GRID_ENTITY_TELEPORTER_RENDER]: [
      callback: (grid: RepentogonGridEntityTeleporter) => void,
      gridEntityType?: boolean,
    ];

    // 1454
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PIT_RENDER]: [
      callback: (grid: GridEntityPit) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1455
    [ModCallbackRepentogon.POST_GRID_ENTITY_PIT_RENDER]: [
      callback: (grid: GridEntityPit) => void,
      gridEntityType?: boolean,
    ];

    // 1456
    [ModCallbackRepentogon.PRE_GRID_ENTITY_POOP_RENDER]: [
      callback: (grid: GridEntityPoop) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1457
    [ModCallbackRepentogon.POST_GRID_ENTITY_POOP_RENDER]: [
      callback: (grid: GridEntityPoop) => void,
      gridEntityType?: boolean,
    ];

    // 1458
    [ModCallbackRepentogon.PRE_GRID_ENTITY_ROCK_RENDER]: [
      callback: (grid: GridEntityRock) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1459
    [ModCallbackRepentogon.POST_GRID_ENTITY_ROCK_RENDER]: [
      callback: (grid: GridEntityRock) => void,
      gridEntityType?: boolean,
    ];

    // 1460
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PRESSURE_PLATE_RENDER]: [
      callback: (
        grid: RepentogonGridEntityTrapdoor,
      ) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1461
    [ModCallbackRepentogon.POST_GRID_ENTITY_PRESSURE_PLATE_RENDER]: [
      callback: (grid: RepentogonGridEntityTrapdoor) => void,
      gridEntityType?: boolean,
    ];

    // 1462
    [ModCallbackRepentogon.PRE_GRID_ENTITY_WALL_RENDER]: [
      callback: (grid: RepentogonGridEntityWeb) => Vector | boolean | undefined,
      gridEntityType?: boolean,
    ];

    // 1463
    [ModCallbackRepentogon.POST_GRID_ENTITY_WALL_RENDER]: [
      callback: (grid: RepentogonGridEntityWeb) => void,
      gridEntityType?: boolean,
    ];

    // 1470
    [ModCallbackRepentogon.POST_SAVE_SLOT_LOAD]: [
      callback: (saveSlot: int, isSlotSelected: boolean, rawSlot: int) => void,
    ];
  }
}
