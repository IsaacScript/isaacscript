/**
 * This is an object instead of a TypeScript enum because we need to specify that it contains bit
 * flags.
 */
declare const EntityFlagInternal: {
    /** 1 << 0 */
    readonly NO_STATUS_EFFECTS: number;
    /** 1 << 1 */
    readonly NO_INTERPOLATE: number;
    /** 1 << 2 */
    readonly APPEAR: number;
    /** 1 << 3 */
    readonly RENDER_FLOOR: number;
    /** 1 << 4 */
    readonly NO_TARGET: number;
    /** 1 << 5 */
    readonly FREEZE: number;
    /** 1 << 6 */
    readonly POISON: number;
    /** 1 << 7 */
    readonly SLOW: number;
    /** 1 << 8 */
    readonly CHARM: number;
    /** 1 << 9 */
    readonly CONFUSION: number;
    /** 1 << 10 */
    readonly MIDAS_FREEZE: number;
    /** 1 << 11 */
    readonly FEAR: number;
    /** 1 << 12 */
    readonly BURN: number;
    /** 1 << 13 */
    readonly RENDER_WALL: number;
    /** 1 << 14 */
    readonly INTERPOLATION_UPDATE: number;
    /** 1 << 15 */
    readonly APPLY_GRAVITY: number;
    /** 1 << 16 */
    readonly NO_BLOOD_SPLASH: number;
    /** 1 << 17 */
    readonly NO_REMOVE_ON_TEX_RENDER: number;
    /** 1 << 18 */
    readonly NO_DEATH_TRIGGER: number;
    /**
     * This shares the same value as `FLAG_LASER_POP` and `FLAG_ITEM_SHOULD_DUPLICATE`, but has a
     * different meaning depending on the entity type.
     *
     * 1 << 19
     */
    readonly NO_SPIKE_DAMAGE: number;
    /**
     * This shares the same value as `FLAG_NO_SPIKE_DAMAGE` and `FLAG_ITEM_SHOULD_DUPLICATE`, but has
     * a different meaning depending on the entity type.
     *
     * 1 << 19
     */
    readonly LASER_POP: number;
    /**
     * This shares the same value as `FLAG_NO_SPIKE_DAMAGE` and `FLAG_LASER_POP`, but has a different
     * meaning depending on the entity type.
     *
     * 1 << 19
     */
    readonly ITEM_SHOULD_DUPLICATE: number;
    /** 1 << 20 */
    readonly BOSS_DEATH_TRIGGERED: number;
    /** 1 << 21 */
    readonly DONT_OVERWRITE: number;
    /** 1 << 22 */
    readonly SPAWN_STICKY_SPIDERS: number;
    /** 1 << 23 */
    readonly SPAWN_BLACK_HP: number;
    /** 1 << 24 */
    readonly SHRINK: number;
    /** 1 << 25 */
    readonly NO_FLASH_ON_DAMAGE: number;
    /** 1 << 26 */
    readonly NO_KNOCKBACK: number;
    /** 1 << 27 */
    readonly SLIPPERY_PHYSICS: number;
    /** 1 << 28 */
    readonly ADD_JAR_FLY: number;
    /** 1 << 29 */
    readonly FRIENDLY: number;
    /** 1 << 30 */
    readonly NO_PHYSICS_KNOCKBACK: number;
    /** 1 << 31 */
    readonly DONT_COUNT_BOSS_HP: number;
    /** 1 << 32 */
    readonly NO_SPRITE_UPDATE: number;
    /** 1 << 33 */
    readonly CONTAGIOUS: number;
    /** 1 << 34 */
    readonly BLEED_OUT: number;
    /** 1 << 35 */
    readonly HIDE_HP_BAR: number;
    /** 1 << 36 */
    readonly NO_DAMAGE_BLINK: number;
    /** 1 << 37 */
    readonly PERSISTENT: number;
    /** 1 << 38 */
    readonly BACKDROP_DETAIL: number;
    /** 1 << 39 */
    readonly AMBUSH: number;
    /** 1 << 40 */
    readonly GLITCH: number;
    /** 1 << 41 */
    readonly SPIN: number;
    /** 1 << 42 */
    readonly NO_REWARD: number;
    /** 1 << 43 */
    readonly REDUCE_GIBS: number;
    /** 1 << 44 */
    readonly TRANSITION_UPDATE: number;
    /** 1 << 45 */
    readonly NO_PLAYER_CONTROL: number;
    /** 1 << 46 */
    readonly NO_QUERY: number;
    /** 1 << 47 */
    readonly KNOCKED_BACK: number;
    /** 1 << 48 */
    readonly APPLY_IMPACT_DAMAGE: number;
    /** 1 << 49 */
    readonly ICE_FROZEN: number;
    /** 1 << 50 */
    readonly ICE: number;
    /** 1 << 51 */
    readonly MAGNETIZED: number;
    /** 1 << 52 */
    readonly BAITED: number;
    /** 1 << 53 */
    readonly KILL_SWITCH: number;
    /** 1 << 54 */
    readonly WEAKNESS: number;
    /** 1 << 55 */
    readonly EXTRA_GORE: number;
    /** 1 << 56 */
    readonly BRIMSTONE_MARKED: number;
    /** 1 << 57 */
    readonly HELD: number;
    /** 1 << 58 */
    readonly THROWN: number;
    /** 1 << 59 */
    readonly FRIENDLY_BALL: number;
};
declare type EntityFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __entityFlagBrand: void;
};
declare type EntityFlagType = {
    [K in keyof typeof EntityFlagInternal]: EntityFlagValue;
};
export declare const EntityFlag: EntityFlagType;
export declare type EntityFlag = EntityFlagType[keyof EntityFlagType];
export declare const EntityFlagZero: BitFlags<EntityFlagValue>;
export {};
