import type {
  ActiveSlot,
  BackdropType,
  BombVariant,
  BossID,
  ButtonAction,
  CardType,
  Challenge,
  ChampionColor,
  CoinSubType,
  CollectibleType,
  DamageFlag,
  Dimension,
  EffectVariant,
  EntityType,
  FamiliarVariant,
  GridEntityType,
  InputHook,
  KnifeVariant,
  LaserVariant,
  LevelStage,
  Music,
  PickupVariant,
  PillColor,
  PillEffect,
  PlayerType,
  PlayerVariant,
  ProjectileVariant,
  SlotVariant,
  SoundEffect,
  StageType,
  TearVariant,
  TrinketSlot,
  TrinketType,
  UseFlag,
  WeaponType,
} from "isaac-typescript-definitions";
import type { CompletionMarkType } from "../../enums/CompletionMarkType";
import type { FollowerPriority } from "../../enums/FollowerPriority";
import type { GiantbookType } from "../../enums/GiantbookType";
import type { HealthType } from "../../enums/HealthType";
import type { ModCallbackRepentogon } from "../../enums/ModCallbackRepentogon";
import type { PillCardSlot } from "../../enums/PillCardSlot";
import type { AddHealthTypeFlag } from "../../enums/flags/AddHealthTypeFlag";
import type { ConceptionFamiliarFlag } from "../../enums/flags/ConceptionFamiliarFlag";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface AddCallbackParametersRepentogon {
    // 10
    [ModCallbackRepentogon.POST_USE_PILL]: [
      callback: (
        effect: PillEffect,
        player: EntityPlayer,
        flags: BitFlags<UseFlag>,
        color: PillColor,
      ) => void,
      pillEffect?: PillEffect,
    ];

    // 11
    [ModCallbackRepentogon.PRE_ENTITY_TAKE_DMG]: [
      callback: (
        entity: Entity,
        damage: number,
        damageFlags: BitFlags<DamageFlag>,
        source: EntityRef,
        damageCountdown: int,
      ) =>
        | boolean
        | {
            Damage?: number;
            DamageFlags?: BitFlags<DamageFlag>;
            DamageCountdown?: int;
          }
        | undefined,
      entityType?: EntityType,
    ];

    // 26
    [ModCallbackRepentogon.PRE_FAMILIAR_COLLISION]: [
      callback: (
        familiar: EntityFamiliar,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      familiarVariant?: FamiliarVariant,
    ];

    // 30
    [ModCallbackRepentogon.PRE_NPC_COLLISION]: [
      callback: (
        npc: EntityNPC,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      entityType?: EntityType,
    ];

    // 33
    [ModCallbackRepentogon.PRE_PLAYER_COLLISION]: [
      callback: (
        player: EntityPlayer,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 38
    [ModCallbackRepentogon.PRE_PICKUP_COLLISION]: [
      callback: (
        pickup: EntityPickup,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 42
    [ModCallbackRepentogon.PRE_TEAR_COLLISION]: [
      callback: (
        tear: EntityTear,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      tearVariant?: TearVariant,
    ];

    // 46
    [ModCallbackRepentogon.PRE_PROJECTILE_COLLISION]: [
      callback: (
        projectile: EntityProjectile,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      projectileVariant?: ProjectileVariant,
    ];

    // 53
    [ModCallbackRepentogon.PRE_KNIFE_COLLISION]: [
      callback: (
        knife: EntityKnife,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      knifeVariant?: KnifeVariant,
    ];

    // 60
    [ModCallbackRepentogon.PRE_BOMB_COLLISION]: [
      callback: (
        bomb: EntityBomb,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      bombVariant?: BombVariant,
    ];

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
        | boolean
        | {
            Type?: CollectibleType;
            Charge?: int;
            FirstTime?: boolean;
            Slot?: ActiveSlot;
            VarData?: int;
            Player?: EntityPlayer;
          }
        | CollectibleType
        | undefined,
      collectibleType?: CollectibleType,
    ];

    // 1005
    [ModCallbackRepentogon.POST_ADD_COLLECTIBLE]: [
      callback: (
        collectible: CollectibleType,
        charge: int,
        firstTime: boolean,
        slot: ActiveSlot,
        varData: int,
        player: EntityPlayer,
      ) => void,
      collectibleType?: CollectibleType,
    ];

    // 1006
    [ModCallbackRepentogon.POST_ENTITY_TAKE_DMG]: [
      callback: (
        entity: Entity,
        damage: number,
        flags: BitFlags<DamageFlag>,
        source: EntityRef,
        damageCountdown: int,
      ) => void,
      entityType?: EntityType,
    ];

    // 1008
    [ModCallbackRepentogon.PRE_PLAYER_TAKE_DMG]: [
      callback: (
        player: EntityPlayer,
        damage: number,
        flags: BitFlags<DamageFlag>,
        source: EntityRef,
        damageCountdown: int,
      ) => boolean | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 1009
    [ModCallbackRepentogon.PRE_PLAYER_ADD_HEARTS]: [
      callback: (
        player: EntityPlayer,
        amount: int,
        addHealthTypeFlag: AddHealthTypeFlag,
        optionalArg: boolean,
      ) => int | undefined,
      addHealthTypeFlag?: AddHealthTypeFlag,
    ];

    // 1010
    [ModCallbackRepentogon.POST_PLAYER_ADD_HEARTS]: [
      callback: (
        player: EntityPlayer,
        amount: int,
        addHealthType: AddHealthTypeFlag,
        optionalArg: boolean,
      ) => void,
      addHealthType?: AddHealthTypeFlag,
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
        gridEntity: GridEntity,
        entity: Entity,
        damageAmount: number,
        damageFlags: BitFlags<DamageFlag>,
        unknownFloat: float,
        unknownBoolean: boolean,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1013
    [ModCallbackRepentogon.POST_GRID_HURT_DAMAGE]: [
      callback: (
        gridEntity: GridEntity,
        entity: Entity,
        damageAmount: number,
        damageFlags: BitFlags<DamageFlag>,
        unknownFloat: number,
        unknownBoolean: boolean,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1020
    [ModCallbackRepentogon.PRE_HUD_UPDATE]: [callback: () => void];

    // 1021
    [ModCallbackRepentogon.POST_HUD_UPDATE]: [callback: () => void];

    // 1022
    [ModCallbackRepentogon.PRE_HUD_RENDER]: [callback: () => void];

    // 1023
    [ModCallbackRepentogon.POST_MAIN_MENU_RENDER]: [callback: () => void];

    // 1024
    [ModCallbackRepentogon.POST_HUD_RENDER]: [callback: () => void];

    // 1030
    [ModCallbackRepentogon.PRE_SFX_PLAY]: [
      callback: (
        sound: SoundEffect,
        volume: number,
        frameDelay: int,
        loop: boolean,
        pitch: number,
        pan: number,
      ) =>
        | SoundEffect
        | [SoundEffect, number, int, boolean, number, number]
        | boolean
        | undefined,
      soundEffect?: SoundEffect,
    ];

    // 1031
    [ModCallbackRepentogon.POST_SFX_PLAY]: [
      callback: (
        sound: SoundEffect,
        volume: number,
        frameDelay: int,
        loop: boolean,
        pitch: number,
        pan: number,
      ) => void,
      soundEffect?: SoundEffect,
    ];

    // 1032
    [ModCallbackRepentogon.POST_PROJECTILE_DEATH]: [
      callback: (projectile: EntityProjectile) => void,
      projectileVariant?: ProjectileVariant,
    ];

    // 1033
    [ModCallbackRepentogon.POST_TEAR_DEATH]: [
      callback: (tear: EntityTear) => void,
      tearVariant?: TearVariant,
    ];

    // 1034
    [ModCallbackRepentogon.PRE_MUSIC_PLAY]: [
      callback: (
        music: Music,
        volumeOrFadeRate: float,
        isFade: boolean,
      ) =>
        | Music
        | { ID?: Music; Volume?: float; FadeRate?: float }
        | boolean
        | undefined,
      music?: Music,
    ];

    // 1035
    [ModCallbackRepentogon.PRE_MUSIC_LAYER_TOGGLE]: [
      callback: (music: Music, enabled: boolean) => boolean | Music | undefined,
      music?: Music,
    ];

    // 1038
    [ModCallbackRepentogon.PRE_RENDER_PLAYER_HEAD]: [
      callback: (
        player: EntityPlayer,
        renderPos: Vector,
      ) => Vector | boolean | undefined,
      playerType?: PlayerType,
    ];

    // 1039
    [ModCallbackRepentogon.PRE_RENDER_PLAYER_BODY]: [
      callback: (
        player: EntityPlayer,
        renderPos: Vector,
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
        heldEntity: Entity,
        velocity: Vector,
      ) => void,
    ];

    // 1042
    [ModCallbackRepentogon.POST_PLAYER_INIT_LEVEL_STATS]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 1043
    [ModCallbackRepentogon.PRE_ROOM_EXIT]: [
      callback: (player: EntityPlayer, newLevel: boolean) => void,
    ];

    // 1047
    [ModCallbackRepentogon.PRE_COMPLETION_MARK_GET]: [
      callback: (
        completion: CompletionMarkType,
        playerType: PlayerType,
      ) => boolean | undefined,
      playerType?: PlayerType,
    ];

    // 1048
    [ModCallbackRepentogon.POST_COMPLETION_MARK_GET]: [
      callback: (
        completion: CompletionMarkType,
        playerType: PlayerType,
      ) => void,
      playerType?: PlayerType,
    ];

    // 1049
    [ModCallbackRepentogon.PRE_COMPLETION_EVENT]: [
      callback: (completion: CompletionMarkType) => boolean | undefined,
    ];

    // 1050
    [ModCallbackRepentogon.PRE_TRIGGER_PLAYER_DEATH]: [
      callback: (player: EntityPlayer) => boolean | undefined,
    ];

    // 1051
    [ModCallbackRepentogon.TRIGGER_PLAYER_DEATH_POST_CHECK_REVIVES]: [
      callback: (player: EntityPlayer) => boolean | undefined,
    ];

    // 1060
    [ModCallbackRepentogon.PRE_LEVEL_INIT]: [callback: () => void];

    // 1061
    [ModCallbackRepentogon.PRE_CHANGE_ROOM]: [
      callback: (
        targetRoomIndex: int,
        dimension: Dimension,
      ) => { TargetRoomIdx?: int; Dimension?: Dimension } | undefined,
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
      callback: (familiar: EntityFamiliar) => FollowerPriority | undefined,
      familiarVariant?: FamiliarVariant,
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
        pillColor: PillColor,
        player: EntityPlayer,
        useFlags: BitFlags<UseFlag>,
      ) => boolean | undefined,
    ];

    // 1066
    [ModCallbackRepentogon.GET_SHOP_ITEM_PRICE]: [
      callback: (
        pickupVariant: PickupVariant,
        pickupSubType: int,
        shopItemID: int,
        price: int,
      ) => int | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 1067
    [ModCallbackRepentogon.GET_PLAYER_HEALTH_TYPE]: [
      callback: (player: EntityPlayer) => HealthType | undefined,
      playerType?: PlayerType,
    ];

    // 1068
    [ModCallbackRepentogon.PRE_ROOM_TRIGGER_CLEAR]: [
      callback: (playSound: boolean) => void,
    ];

    // 1070
    [ModCallbackRepentogon.PRE_RESTOCK_SHOP]: [
      callback: (partial: boolean) => boolean | undefined,
    ];

    // 1071
    [ModCallbackRepentogon.POST_RESTOCK_SHOP]: [
      callback: (partial: boolean) => void,
    ];

    // 1072
    [ModCallbackRepentogon.GET_ACTIVE_MAX_CHARGE]: [
      callback: (
        collectible: CollectibleType,
        player: EntityPlayer,
        varData: int,
      ) => int | undefined,
      collectibleType?: CollectibleType,
    ];

    // 1073
    [ModCallbackRepentogon.GET_ACTIVE_MIN_USABLE_CHARGE]: [
      callback: (slot: ActiveSlot, player: EntityPlayer) => int | undefined,
      collectibleType?: CollectibleType,
    ];

    // 1074
    [ModCallbackRepentogon.GET_PLAYER_HEART_LIMIT]: [
      callback: (
        player: EntityPlayer,
        heartLimit: int,
        isKeeper: boolean,
      ) => int | undefined,
      playerType?: PlayerType,
    ];

    // 1075
    [ModCallbackRepentogon.POST_ITEM_OVERLAY_UPDATE]: [callback: () => void];

    // 1076
    [ModCallbackRepentogon.PRE_ITEM_OVERLAY_SHOW]: [
      callback: (
        giantbook: GiantbookType,
        delay: int,
        player: EntityPlayer,
      ) => boolean | GiantbookType | undefined,
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
        alpha: float,
        scale: float,
        chargeBarOffset: Vector,
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
        projectile: EntityProjectile,
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
        unknown: float,
        player: EntityPlayer,
      ) => void,
    ];

    // 1092
    [ModCallbackRepentogon.PRE_PLAYER_APPLY_INNATE_COLLECTIBLE_NUMBER]: [
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
    [ModCallbackRepentogon.POST_COLLECTIBLE_REMOVED]: [
      callback: (player: EntityPlayer, collectible: CollectibleType) => void,
      collectibleType?: CollectibleType,
    ];

    // 1096
    [ModCallbackRepentogon.POST_TRINKET_ADDED]: [
      callback: (
        player: EntityPlayer,
        trinket: TrinketType,
        firstTimePickingUp: boolean,
      ) => void,
      trinketType?: TrinketType,
    ];

    // 1097
    [ModCallbackRepentogon.POST_TRINKET_REMOVED]: [
      callback: (player: EntityPlayer, trinket: TrinketType) => void,
      trinketType?: TrinketType,
    ];

    // 1098
    [ModCallbackRepentogon.POST_TRIGGER_WEAPON_FIRED]: [
      callback: (
        fireDirection: Vector,
        fireAmount: int,
        owner: Entity,
        weapon: Weapon,
      ) => void,
      weaponType?: WeaponType,
    ];

    // 1099
    [ModCallbackRepentogon.POST_LEVEL_LAYOUT_GENERATED]: [
      callback: (levelGenerator: LevelGenerator) => void,
    ];

    // 1100
    [ModCallbackRepentogon.PRE_GRID_ENTITY_SPAWN]: [
      callback: (
        gridEntityType: GridEntityType,
        variant: int,
        varData: int,
        gridIndex: int,
        spawnSeed: Seed,
        desc?: GridEntityDesc,
      ) =>
        | GridEntityDesc
        | boolean
        | {
            Type?: GridEntityType;
            Variant?: int;
            Vardata?: int;
            SpawnSeed?: Seed;
          }
        | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1101
    [ModCallbackRepentogon.POST_GRID_ENTITY_SPAWN]: [
      callback: (grid: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1103
    [ModCallbackRepentogon.POST_NIGHTMARE_SCENE_SHOW]: [
      callback: (unknown: boolean) => void,
    ];

    // 1104
    [ModCallbackRepentogon.PRE_LEVEL_SELECT]: [
      callback: (
        level: LevelStage,
        stageType: StageType,
      ) => [LevelStage?, StageType?] | undefined,
    ];

    // 1105
    [ModCallbackRepentogon.POST_WEAPON_FIRE]: [
      callback: (
        weapon: Weapon,
        fireDirection: Vector,
        isShooting: boolean,
        isInterpolated: boolean,
      ) => void,
      weaponType?: WeaponType,
    ];

    // 1106
    [ModCallbackRepentogon.PRE_BACKDROP_RENDER_WALLS]: [callback: () => void];

    // 1107
    [ModCallbackRepentogon.PRE_BACKDROP_RENDER_FLOOR]: [callback: () => void];

    // 1108
    [ModCallbackRepentogon.PRE_BACKDROP_RENDER_WATER]: [callback: () => void];

    // 1109
    [ModCallbackRepentogon.POST_BACKDROP_PRE_RENDER_WALLS]: [
      callback: () => void,
    ];

    // 1110
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_STAGE_PENALTY]: [
      callback: () => boolean | undefined,
    ];

    // 1111
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_PLANETARIUM_PENALTY]: [
      callback: () => void,
    ];

    // 1112
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_TREASURE_ROOM_PENALTY]: [
      callback: () => boolean | undefined,
    ];

    // 1113
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_ITEMS]: [
      callback: (chance: float) => float | undefined,
    ];

    // 1114
    [ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_TELESCOPE_LENS]: [
      callback: (chance: float) => float | undefined,
    ];

    // 1115
    [ModCallbackRepentogon.PRE_PLANETARIUM_CALCULATE_FINAL]: [
      callback: (chance: float) => float | undefined,
    ];

    // 1116
    [ModCallbackRepentogon.PRE_REPLACE_SPRITESHEET]: [
      callback: (layerId: int, fileName: string) => [int, string] | undefined,
      fileName?: string,
    ];

    // 1117
    [ModCallbackRepentogon.POST_REPLACE_SPRITESHEET]: [
      callback: (layerId: int, fileName: string) => void,
      fileName?: string,
    ];

    // 1118
    [ModCallbackRepentogon.PRE_PLAYER_HUD_RENDER_HEARTS]: [
      callback: (
        offset: Vector,
        heartsSprite: Sprite,
        position: Vector,
        unknown: float,
        player: EntityPlayer,
      ) => boolean | undefined,
    ];

    // 1119
    [ModCallbackRepentogon.PRE_PLAYER_HUD_RENDER_ACTIVE_ITEM]: [
      callback: (
        player: EntityPlayer,
        slot: ActiveSlot,
        offset: Vector,
        alpha: float,
        scale: number,
        chargeBarOffset: Vector,
      ) => boolean | undefined,
    ];

    // 1120
    [ModCallbackRepentogon.CONSOLE_AUTOCOMPLETE]: [
      callback: (
        command: string,
        params: string,
      ) => Array<string | string[]> | undefined,
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
      callback: (
        slot: EntitySlot,
        collectible: CollectibleType,
      ) => CollectibleType | undefined,
      slotVariant?: SlotVariant,
    ];

    // 1126
    [ModCallbackRepentogon.POST_SLOT_SET_PRIZE_COLLECTIBLE]: [
      callback: (slot: EntitySlot, collectible: CollectibleType) => void,
      slotVariant?: SlotVariant,
    ];

    // 1127
    [ModCallbackRepentogon.PRE_PLAYER_LEVEL_INIT_STATS]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 1130
    [ModCallbackRepentogon.PRE_DEVIL_APPLY_ITEMS]: [
      callback: (chance: number) => number | undefined,
    ];

    // 1131
    [ModCallbackRepentogon.PRE_DEVIL_APPLY_STAGE_PENALTY]: [
      callback: () => boolean | undefined,
    ];

    // 1132
    [ModCallbackRepentogon.PRE_DEVIL_APPLY_SPECIAL_ITEMS]: [
      callback: (chance: number) => number | undefined,
    ];

    // 1133
    [ModCallbackRepentogon.PRE_DEVIL_CALCULATE_FINAL]: [
      callback: (chance: number) => number | undefined,
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

    // 1135
    [ModCallbackRepentogon.PRE_RENDER]: [callback: () => void];

    // 1137
    [ModCallbackRepentogon.PRE_LEVEL_PLACE_ROOM]: [
      callback: (
        slot: LevelGeneratorRoom,
        roomConfig: RoomConfig,
        seed: Seed,
      ) => RoomConfig | undefined,
    ];

    // 1141
    [ModCallbackRepentogon.PRE_BACKDROP_CHANGE]: [
      callback: (backdrop: BackdropType) => BackdropType,
    ];

    // 1150
    [ModCallbackRepentogon.PRE_GET_LIGHTING_ALPHA]: [
      callback: (float: number) => float | undefined,
    ];

    // 1151
    [ModCallbackRepentogon.PRE_RENDER_GRID_LIGHTING]: [
      callback: (
        grid: GridEntity,
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

    // 1160
    [ModCallbackRepentogon.PRE_PLAYER_UPDATE]: [
      callback: (player: EntityPlayer) => boolean | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 1161
    [ModCallbackRepentogon.PRE_TEAR_UPDATE]: [
      callback: (tear: EntityTear) => boolean | undefined,
      tearVariant?: TearVariant,
    ];

    // 1162
    [ModCallbackRepentogon.PRE_FAMILIAR_UPDATE]: [
      callback: (familiar: EntityFamiliar) => boolean | undefined,
      familiarVariant?: FamiliarVariant,
    ];

    // 1163
    [ModCallbackRepentogon.PRE_BOMB_UPDATE]: [
      callback: (bomb: EntityBomb) => boolean | undefined,
      bombVariant?: BombVariant,
    ];

    // 1164
    [ModCallbackRepentogon.PRE_KNIFE_UPDATE]: [
      callback: (knife: EntityKnife) => boolean | undefined,
      knifeVariant?: KnifeVariant,
    ];

    // 1165
    [ModCallbackRepentogon.PRE_PICKUP_UPDATE]: [
      callback: (pickup: EntityPickup) => boolean | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 1166
    [ModCallbackRepentogon.PRE_PROJECTILE_UPDATE]: [
      callback: (projectile: EntityProjectile) => boolean | undefined,
      projectileVariant?: ProjectileVariant,
    ];

    // 1167
    [ModCallbackRepentogon.PRE_LASER_UPDATE]: [
      callback: (laser: EntityLaser) => boolean | undefined,
      laserVariant?: LaserVariant,
    ];

    // 1168
    [ModCallbackRepentogon.PRE_EFFECT_UPDATE]: [
      callback: (effect: EntityEffect) => boolean | undefined,
      effectVariant?: EffectVariant,
    ];

    // 1169
    [ModCallbackRepentogon.PRE_SLOT_UPDATE]: [
      callback: (slot: EntitySlot) => boolean | undefined,
      slotVariant?: SlotVariant,
    ];

    // 1171
    [ModCallbackRepentogon.PRE_PLAYER_GRID_COLLISION]: [
      callback: (
        player: EntityPlayer,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1172
    [ModCallbackRepentogon.POST_PLAYER_GRID_COLLISION]: [
      callback: (
        player: EntityPlayer,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1173
    [ModCallbackRepentogon.PRE_TEAR_GRID_COLLISION]: [
      callback: (
        tear: EntityTear,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1174
    [ModCallbackRepentogon.POST_TEAR_GRID_COLLISION]: [
      callback: (
        tear: EntityTear,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1175
    [ModCallbackRepentogon.PRE_FAMILIAR_GRID_COLLISION]: [
      callback: (
        familiar: EntityFamiliar,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1176
    [ModCallbackRepentogon.POST_FAMILIAR_GRID_COLLISION]: [
      callback: (
        familiar: EntityFamiliar,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1177
    [ModCallbackRepentogon.PRE_BOMB_GRID_COLLISION]: [
      callback: (
        bomb: EntityBomb,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1178
    [ModCallbackRepentogon.POST_BOMB_GRID_COLLISION]: [
      callback: (
        bomb: EntityBomb,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1179
    [ModCallbackRepentogon.PRE_PICKUP_GRID_COLLISION]: [
      callback: (
        pickup: EntityPickup,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1180
    [ModCallbackRepentogon.POST_PICKUP_GRID_COLLISION]: [
      callback: (
        pickup: EntityPickup,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1181
    [ModCallbackRepentogon.PRE_PROJECTILE_GRID_COLLISION]: [
      callback: (
        projectile: EntityProjectile,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1182
    [ModCallbackRepentogon.POST_PROJECTILE_GRID_COLLISION]: [
      callback: (
        projectile: EntityProjectile,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1183
    [ModCallbackRepentogon.PRE_NPC_GRID_COLLISION]: [
      callback: (
        npc: EntityNPC,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1184
    [ModCallbackRepentogon.POST_NPC_GRID_COLLISION]: [
      callback: (
        npc: EntityNPC,
        gridIndex: int,
        gridEntity: GridEntity | undefined,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1190
    [ModCallbackRepentogon.PRE_M_MORPH_ACTIVE]: [
      callback: (
        player: EntityPlayer,
        collectible: CollectibleType,
      ) => CollectibleType | boolean | undefined,
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
      ) => boolean | [GridEntityType, int, int, Seed] | undefined,
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
        npc: EntityNPC,
        entityType: EntityType,
        variant: int,
        subType: int,
        championColor: ChampionColor,
      ) => boolean | [EntityType, int, int, ChampionColor?] | undefined,
    ];

    // 1213
    [ModCallbackRepentogon.PRE_PICKUP_MORPH]: [
      callback: (
        pickup: EntityPickup,
        entityType: EntityType,
        variant: int,
        subType: int,
        keepPrice: boolean,
        keepSeed: boolean,
        ignoreModifiers: boolean,
      ) =>
        | boolean
        | [EntityType, int, int, boolean?, boolean?, boolean?]
        | undefined,
    ];

    // 1214
    [ModCallbackRepentogon.POST_NPC_MORPH]: [
      callback: (
        npc: EntityNPC,
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
        keptPrice: boolean,
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

    // 1220
    [ModCallbackRepentogon.PRE_PLAYER_USE_BOMB]: [
      callback: (player: EntityPlayer) => boolean | undefined,
      playerVariant?: PlayerVariant,
    ];

    // 1221
    [ModCallbackRepentogon.POST_PLAYER_USE_BOMB]: [
      callback: (player: EntityPlayer, bomb: EntityBomb) => void,
      playerVariant?: PlayerVariant,
    ];

    // 1222
    [ModCallbackRepentogon.PRE_NPC_PICK_TARGET]: [
      callback: (npc: EntityNPC, target: Entity) => Entity | undefined,
      entityType?: EntityType,
    ];

    // 1223
    [ModCallbackRepentogon.POST_NPC_DARK_RED_CHAMPION_REGEN]: [
      callback: (npc: EntityNPC) => void,
      entityType?: EntityType,
    ];

    // 1231
    [ModCallbackRepentogon.POST_PLAYER_COLLISION]: [
      callback: (player: EntityPlayer, collider: Entity, low: boolean) => void,
      playerVariant?: PlayerVariant,
    ];

    // 1233
    [ModCallbackRepentogon.POST_TEAR_COLLISION]: [
      callback: (tear: EntityTear, collider: Entity, low: boolean) => void,
      tearVariant?: TearVariant,
    ];

    // 1235
    [ModCallbackRepentogon.POST_FAMILIAR_COLLISION]: [
      callback: (
        familiar: EntityFamiliar,
        collider: Entity,
        low: boolean,
      ) => void,
      familiarVariant?: FamiliarVariant,
    ];

    // 1237
    [ModCallbackRepentogon.POST_BOMB_COLLISION]: [
      callback: (bomb: EntityBomb, collider: Entity, low: boolean) => void,
      bombVariant?: BombVariant,
    ];

    // 1239
    [ModCallbackRepentogon.POST_PICKUP_COLLISION]: [
      callback: (pickup: EntityPickup, collider: Entity, low: boolean) => void,
      pickupVariant?: PickupVariant,
    ];

    // 1240
    [ModCallbackRepentogon.PRE_SLOT_COLLISION]: [
      callback: (
        slot: EntitySlot,
        collider: Entity,
        low: boolean,
      ) =>
        | boolean
        | { Collide?: boolean; SkipCollisionEffects?: boolean }
        | undefined,
      slotVariant?: SlotVariant,
    ];

    // 1241
    [ModCallbackRepentogon.POST_SLOT_COLLISION]: [
      callback: (slot: EntitySlot, collider: Entity, low: boolean) => void,
      slotVariant?: SlotVariant,
    ];

    // 1243
    [ModCallbackRepentogon.POST_KNIFE_COLLISION]: [
      callback: (knife: EntityKnife, collider: Entity, low: boolean) => void,
      knifeVariant?: KnifeVariant,
    ];

    // 1245
    [ModCallbackRepentogon.POST_PROJECTILE_COLLISION]: [
      callback: (
        projectile: EntityProjectile,
        collider: Entity,
        low: boolean,
      ) => void,
      projectileVariant?: ProjectileVariant,
    ];

    // 1247
    [ModCallbackRepentogon.POST_NPC_COLLISION]: [
      callback: (npc: EntityNPC, collider: Entity, low: boolean) => void,
      entityType?: EntityType,
    ];

    // 1248
    [ModCallbackRepentogon.PRE_LASER_COLLISION]: [
      callback: (laser: EntityLaser, collider: Entity) => boolean | undefined,
      laserVariant?: LaserVariant,
    ];

    // 1249
    [ModCallbackRepentogon.POST_LASER_COLLISION]: [
      callback: (laser: EntityLaser, collider: Entity) => void,
      laserVariant?: LaserVariant,
    ];

    // 1250
    [ModCallbackRepentogon.GET_COIN_VALUE]: [
      callback: (coin: EntityPickup) => int | undefined,
      coinSubType?: CoinSubType,
    ];

    // 1251
    [ModCallbackRepentogon.PRE_PLAYER_GET_MULTI_SHOT_PARAMS]: [
      callback: (player: EntityPlayer) => MultiShotParams | undefined,
      playerType?: PlayerType,
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
      callback: (knife: EntityKnife) => void,
    ];

    // 1255
    [ModCallbackRepentogon.POST_FIRE_BRIMSTONE]: [
      callback: (laser: EntityLaser) => void,
    ];

    // 1256
    [ModCallbackRepentogon.POST_FIRE_BRIMSTONE_BALL]: [
      callback: (ball: EntityEffect) => void,
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
      familiarVariant?: FamiliarVariant,
    ];

    // 1262
    [ModCallbackRepentogon.POST_FAMILIAR_FIRE_TECH_LASER]: [
      callback: (laser: EntityLaser) => void,
      familiarVariant?: FamiliarVariant,
    ];

    // 1263
    [ModCallbackRepentogon.GET_IS_PERSISTENT_ROOM_ENTITY]: [
      callback: (entityType: EntityType, variant: int) => boolean | undefined,
    ];

    // 1264
    [ModCallbackRepentogon.PRE_PLAYER_HUD_RENDER_TRINKET]: [
      callback: (
        slot: TrinketSlot,
        position: Vector,
        scale: number,
        player: EntityPlayer,
        cropOffset: Vector,
      ) =>
        | { Position?: Vector; Scale?: number; CropOffset?: Vector }
        | boolean
        | undefined,
    ];

    // 1265
    [ModCallbackRepentogon.PRE_PICKUP_VOIDED]: [
      callback: (
        pickup: EntityPickup,
        isBlackRune: boolean,
      ) => boolean | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 1266
    [ModCallbackRepentogon.PRE_PICKUP_VOIDED_ABYSS]: [
      callback: (pickup: EntityPickup) => boolean | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 1267
    [ModCallbackRepentogon.PRE_PICKUP_COMPOSTED]: [
      callback: (pickup: EntityPickup) => boolean | undefined,
      pickupVariant?: PickupVariant,
    ];

    // 1268
    [ModCallbackRepentogon.POST_PLAYER_TRIGGER_EFFECT_REMOVED]: [
      callback: (player: EntityPlayer, itemConfigItem: ItemConfigItem) => void,
    ];

    // 1269
    [ModCallbackRepentogon.POST_ROOM_TRIGGER_EFFECT_REMOVED]: [
      callback: (itemConfigItem: ItemConfigItem) => void,
    ];

    // 1270
    [ModCallbackRepentogon.POST_BOSS_INTRO_SHOW]: [
      callback: (boss1: BossID, boss2: BossID) => void,
    ];

    // 1280
    [ModCallbackRepentogon.PRE_BOSS_SELECT]: [
      callback: (
        bossID: BossID,
        bossPool: BossPool,
        levelStage: LevelStage,
        stageType: StageType,
      ) => BossID | undefined,
      bossID?: BossID,
    ];

    // 1171
    [ModCallbackRepentogon.POST_ROOM_TRANSITION_UPDATE]: [callback: () => void];

    // 1172
    [ModCallbackRepentogon.POST_ROOM_TRANSITION_RENDER]: [callback: () => void];

    // 1300
    [ModCallbackRepentogon.POST_GLOWING_HOURGLASS_SAVE]: [
      callback: (slot: int) => void,
    ];

    // 1301
    [ModCallbackRepentogon.POST_GLOWING_HOURGLASS_LOAD]: [
      callback: (slot: int) => void,
    ];

    // 1333
    [ModCallbackRepentogon.PRE_RENDER_CUSTOM_CHARACTER_MENU]: [
      callback: (
        playerType: PlayerType,
        renderPos: Vector,
        defaultSprite: Sprite,
      ) => void,
      playerType?: PlayerType,
    ];

    // 1334
    [ModCallbackRepentogon.PRE_PICKUP_GET_LOOT_LIST]: [
      callback: (
        pickup: EntityPickup,
        shouldAdvance: boolean,
      ) => LootList | undefined,
    ];

    // 1335
    [ModCallbackRepentogon.PRE_PICKUP_UPDATE_GHOST_PICKUPS]: [
      callback: (pickup: EntityPickup) => boolean | undefined,
    ];

    // 1350
    [ModCallbackRepentogon.PRE_PLAYER_ADD_CARD]: [
      callback: (
        player: EntityPlayer,
        card: CardType,
        slot: PillCardSlot,
      ) => boolean | CardType | undefined,
      cardType?: CardType,
    ];

    // 1351
    [ModCallbackRepentogon.POST_PLAYER_ADD_CARD]: [
      callback: (
        player: EntityPlayer,
        card: CardType,
        slot: PillCardSlot,
      ) => void,
      cardType?: CardType,
    ];

    // 1352
    [ModCallbackRepentogon.PRE_PLAYER_ADD_PILL]: [
      callback: (
        player: EntityPlayer,
        pill: PillColor,
        slot: PillCardSlot,
      ) => boolean | PillColor | undefined,
      pillColor?: PillCardSlot,
    ];

    // 1353
    [ModCallbackRepentogon.POST_PLAYER_ADD_PILL]: [
      callback: (
        player: EntityPlayer,
        pill: PillColor,
        slot: PillCardSlot,
      ) => void,
      pillColor?: PillCardSlot,
    ];

    // 1354
    [ModCallbackRepentogon.POST_PLAYER_REMOVE_CARD]: [
      callback: (
        player: EntityPlayer,
        card: CardType,
        slot: PillCardSlot,
      ) => void,
      cardType?: CardType,
    ];

    // 1355
    [ModCallbackRepentogon.POST_PLAYER_REMOVE_PILL]: [
      callback: (
        player: EntityPlayer,
        pill: PillColor,
        slot: PillCardSlot,
      ) => void,
      pillColor?: PillCardSlot,
    ];

    // 1356
    [ModCallbackRepentogon.PRE_PLAYER_COLLECT_CARD]: [
      callback: (
        player: EntityPlayer,
        pickup: EntityPickup,
      ) => boolean | undefined,
      cardType?: CardType,
    ];

    // 1357
    [ModCallbackRepentogon.POST_PLAYER_COLLECT_CARD]: [
      callback: (player: EntityPlayer, pickup: EntityPickup) => void,
      cardType?: CardType,
    ];

    // 1358
    [ModCallbackRepentogon.PRE_PLAYER_COLLECT_PILL]: [
      callback: (
        player: EntityPlayer,
        pickup: EntityPickup,
      ) => boolean | undefined,
      pillColor?: PillColor,
    ];

    // 1359
    [ModCallbackRepentogon.POST_PLAYER_COLLECT_PILL]: [
      callback: (player: EntityPlayer, pickup: EntityPickup) => void,
      pillColor?: CardType,
    ];

    // 1360
    [ModCallbackRepentogon.POST_PLAYER_DROP_CARD]: [
      callback: (
        player: EntityPlayer,
        pickup: EntityPickup,
        slot: PillCardSlot,
      ) => void,
      cardType?: CardType,
    ];

    // 1361
    [ModCallbackRepentogon.POST_PLAYER_DROP_PILL]: [
      callback: (
        player: EntityPlayer,
        pickup: EntityPickup,
        slot: PillCardSlot,
      ) => void,
      pillColor?: PillColor,
    ];

    // 1400
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DECORATION_UPDATE]: [
      callback: (decoration: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1401
    [ModCallbackRepentogon.POST_GRID_ENTITY_DECORATION_UPDATE]: [
      callback: (decoration: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1402
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DOOR_UPDATE]: [
      callback: (door: GridEntityDoor) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1403
    [ModCallbackRepentogon.POST_GRID_ENTITY_DOOR_UPDATE]: [
      callback: (door: GridEntityDoor) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1404
    [ModCallbackRepentogon.PRE_GRID_ENTITY_FIRE_UPDATE]: [
      callback: (fire: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1405
    [ModCallbackRepentogon.POST_GRID_ENTITY_FIRE_UPDATE]: [
      callback: (fire: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1406
    [ModCallbackRepentogon.PRE_GRID_ENTITY_GRAVITY_UPDATE]: [
      callback: (gravity: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1407
    [ModCallbackRepentogon.POST_GRID_ENTITY_GRAVITY_UPDATE]: [
      callback: (gravity: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1408
    [ModCallbackRepentogon.PRE_GRID_ENTITY_LOCK_UPDATE]: [
      callback: (lock: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1409
    [ModCallbackRepentogon.POST_GRID_ENTITY_LOCK_UPDATE]: [
      callback: (lock: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1410
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PIT_UPDATE]: [
      callback: (pit: GridEntityPit) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1411
    [ModCallbackRepentogon.POST_GRID_ENTITY_PIT_UPDATE]: [
      callback: (pit: GridEntityPit) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1412
    [ModCallbackRepentogon.PRE_GRID_ENTITY_POOP_UPDATE]: [
      callback: (poop: GridEntityPoop) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1413
    [ModCallbackRepentogon.POST_GRID_ENTITY_POOP_UPDATE]: [
      callback: (poop: GridEntityPoop) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1414
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PRESSURE_PLATE_UPDATE]: [
      callback: (pressurePlate: GridEntityPressurePlate) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1415
    [ModCallbackRepentogon.POST_GRID_ENTITY_PRESSURE_PLATE_UPDATE]: [
      callback: (pressurePlate: GridEntityPressurePlate) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1416
    [ModCallbackRepentogon.PRE_GRID_ENTITY_ROCK_UPDATE]: [
      callback: (rock: GridEntityRock) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1417
    [ModCallbackRepentogon.POST_GRID_ENTITY_ROCK_UPDATE]: [
      callback: (rock: GridEntityRock) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1418
    [ModCallbackRepentogon.PRE_GRID_ENTITY_SPIKES_UPDATE]: [
      callback: (spikes: GridEntitySpikes) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1419
    [ModCallbackRepentogon.POST_GRID_ENTITY_SPIKES_UPDATE]: [
      callback: (spikes: GridEntitySpikes) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1420
    [ModCallbackRepentogon.PRE_GRID_ENTITY_STAIRCASE_UPDATE]: [
      callback: (staircase: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1421
    [ModCallbackRepentogon.POST_GRID_ENTITY_STAIRCASE_UPDATE]: [
      callback: (staircase: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1422
    [ModCallbackRepentogon.PRE_GRID_ENTITY_STATUE_UPDATE]: [
      callback: (statue: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1423
    [ModCallbackRepentogon.POST_GRID_ENTITY_STATUE_UPDATE]: [
      callback: (statue: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1424
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TELEPORTER_UPDATE]: [
      callback: (teleporter: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1425
    [ModCallbackRepentogon.POST_GRID_ENTITY_TELEPORTER_UPDATE]: [
      callback: (teleporter: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1426
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TRAPDOOR_UPDATE]: [
      callback: (trapdoor: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1427
    [ModCallbackRepentogon.POST_GRID_ENTITY_TRAPDOOR_UPDATE]: [
      callback: (trapdoor: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1428
    [ModCallbackRepentogon.PRE_GRID_ENTITY_WEB_UPDATE]: [
      callback: (web: GridEntity) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1429
    [ModCallbackRepentogon.POST_GRID_ENTITY_WEB_UPDATE]: [
      callback: (web: GridEntity) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1430
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TNT_UPDATE]: [
      callback: (tnt: GridEntityTNT) => boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1431
    [ModCallbackRepentogon.POST_GRID_ENTITY_TNT_UPDATE]: [
      callback: (tnt: GridEntityTNT) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1432
    [ModCallbackRepentogon.PRE_GRID_ENTITY_SPIKES_RENDER]: [
      callback: (
        spikes: GridEntitySpikes,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1433
    [ModCallbackRepentogon.POST_GRID_ENTITY_SPIKES_RENDER]: [
      callback: (spikes: GridEntitySpikes, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1434
    [ModCallbackRepentogon.PRE_GRID_ENTITY_WEB_RENDER]: [
      callback: (
        web: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1435
    [ModCallbackRepentogon.POST_GRID_ENTITY_WEB_RENDER]: [
      callback: (spikes: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1436
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TNT_RENDER]: [
      callback: (
        tnt: GridEntityTNT,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1437
    [ModCallbackRepentogon.POST_GRID_ENTITY_TNT_RENDER]: [
      callback: (web: GridEntityTNT, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1438
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TRAPDOOR_RENDER]: [
      callback: (
        trapdoor: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1439
    [ModCallbackRepentogon.POST_GRID_ENTITY_TRAPDOOR_RENDER]: [
      callback: (trapdoor: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1440
    [ModCallbackRepentogon.PRE_GRID_ENTITY_STAIRCASE_RENDER]: [
      callback: (
        staircase: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1441
    [ModCallbackRepentogon.POST_GRID_ENTITY_STAIRCASE_RENDER]: [
      callback: (staircase: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1444
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DECORATION_RENDER]: [
      callback: (
        decoration: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1445
    [ModCallbackRepentogon.POST_GRID_ENTITY_DECORATION_RENDER]: [
      callback: (decoration: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1446
    [ModCallbackRepentogon.PRE_GRID_ENTITY_DOOR_RENDER]: [
      callback: (
        door: GridEntityDoor,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1447
    [ModCallbackRepentogon.POST_GRID_ENTITY_DOOR_RENDER]: [
      callback: (door: GridEntityDoor, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1448
    [ModCallbackRepentogon.PRE_GRID_ENTITY_FIRE_RENDER]: [
      callback: (
        fire: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1449
    [ModCallbackRepentogon.POST_GRID_ENTITY_FIRE_RENDER]: [
      callback: (fire: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1450
    [ModCallbackRepentogon.PRE_GRID_ENTITY_LOCK_RENDER]: [
      callback: (
        lock: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1451
    [ModCallbackRepentogon.POST_GRID_ENTITY_LOCK_RENDER]: [
      callback: (lock: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1452
    [ModCallbackRepentogon.PRE_GRID_ENTITY_TELEPORTER_RENDER]: [
      callback: (
        teleporter: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1453
    [ModCallbackRepentogon.POST_GRID_ENTITY_TELEPORTER_RENDER]: [
      callback: (teleporter: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1454
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PIT_RENDER]: [
      callback: (
        pit: GridEntityPit,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1455
    [ModCallbackRepentogon.POST_GRID_ENTITY_PIT_RENDER]: [
      callback: (pit: GridEntityPit, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1456
    [ModCallbackRepentogon.PRE_GRID_ENTITY_POOP_RENDER]: [
      callback: (
        poop: GridEntityPoop,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1457
    [ModCallbackRepentogon.POOP_GRID_ENTITY_POOP_RENDER]: [
      callback: (poop: GridEntityPoop, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1458
    [ModCallbackRepentogon.PRE_GRID_ENTITY_ROCK_RENDER]: [
      callback: (
        rock: GridEntityRock,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1459
    [ModCallbackRepentogon.POST_GRID_ENTITY_ROCK_RENDER]: [
      callback: (lock: GridEntityRock, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1460
    [ModCallbackRepentogon.PRE_GRID_ENTITY_PRESSURE_PLATE_RENDER]: [
      callback: (
        pressurePlate: GridEntityPressurePlate,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1461
    [ModCallbackRepentogon.POST_GRID_ENTITY_PRESSURE_PLATE_RENDER]: [
      callback: (
        pressurePlate: GridEntityPressurePlate,
        offset: Vector,
      ) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1462
    [ModCallbackRepentogon.PRE_GRID_ENTITY_WALL_RENDER]: [
      callback: (
        wall: GridEntity,
        offset: Vector,
      ) => Vector | boolean | undefined,
      gridEntityType?: GridEntityType,
    ];

    // 1463
    [ModCallbackRepentogon.POST_GRID_ENTITY_WALL_RENDER]: [
      callback: (wall: GridEntity, offset: Vector) => void,
      gridEntityType?: GridEntityType,
    ];

    // 1464
    [ModCallbackRepentogon.MENU_INPUT_ACTION]: [
      callback: (
        entity: Entity | undefined,
        hook: InputHook,
        buttonAction: ButtonAction,
      ) => boolean | float | undefined,
      inputHook?: InputHook,
    ];

    // 1470
    [ModCallbackRepentogon.POST_SAVE_SLOT_LOAD]: [
      callback: (saveSlot: int, isSlotSelected: boolean, rawSlot: int) => void,
    ];

    // 1471
    [ModCallbackRepentogon.PRE_CHALLENGE_DONE]: [
      callback: (
        challenge: Challenge,
        player: EntityPlayer,
      ) => boolean | undefined,
      challenge?: Challenge,
    ];

    // 1472
    [ModCallbackRepentogon.POST_CHALLENGE_DONE]: [
      callback: (challenge: Challenge, player: EntityPlayer) => void,
      challenge?: Challenge,
    ];

    // 1474
    [ModCallbackRepentogon.PRE_PLAYER_GIVE_BIRTH_CAMBION]: [
      callback: (
        player: EntityPlayer,
        flag: ConceptionFamiliarFlag,
      ) => boolean | undefined,
      conceptionFamiliarFlag?: ConceptionFamiliarFlag,
    ];

    // 1475
    [ModCallbackRepentogon.PRE_PLAYER_GIVE_BIRTH_IMMACULATE]: [
      callback: (
        player: EntityPlayer,
        flag: ConceptionFamiliarFlag,
      ) => boolean | undefined,
      conceptionFamiliarFlag?: ConceptionFamiliarFlag,
    ];

    // 1481
    [ModCallbackRepentogon.PRE_PLAYER_REVIVE]: [
      callback: (player: EntityPlayer) => boolean | undefined,
      playerType?: PlayerType,
    ];

    // 1482
    [ModCallbackRepentogon.POST_PLAYER_REVIVE]: [
      callback: (player: EntityPlayer) => void,
      playerType?: PlayerType,
    ];

    // 1483
    [ModCallbackRepentogon.PRE_FORTUNE_DISPLAY]: [
      callback: () => boolean | undefined,
    ];

    // 1484
    [ModCallbackRepentogon.PRE_ITEM_TEXT_DISPLAY]: [
      callback: (
        title: string,
        subtitle: string,
        isSticky: boolean,
        isCurseDisplay: boolean,
      ) => boolean | undefined,
    ];
  }
}
