/**
 * For EntityType.PROJECTILE (9)
 *
 * This is an object instead of a TypeScript enum because we need to specify that it contains bit
 * flags.
 *
 * This enum was renamed from "ProjectileFlags" to be consistent with the other flag enums.
 */
declare const ProjectileFlagInternal: {
    /** 1 << 0 */
    readonly SMART: number;
    /** 1 << 1 */
    readonly EXPLODE: number;
    /** 1 << 2 */
    readonly ACID_GREEN: number;
    /** 1 << 3 */
    readonly GOO: number;
    /** 1 << 4 */
    readonly GHOST: number;
    /** 1 << 5 */
    readonly WIGGLE: number;
    /** 1 << 6 */
    readonly BOOMERANG: number;
    /** 1 << 7 */
    readonly HIT_ENEMIES: number;
    /** 1 << 8 */
    readonly ACID_RED: number;
    /** 1 << 9 */
    readonly GREED: number;
    /** 1 << 10 */
    readonly RED_CREEP: number;
    /** 1 << 11 */
    readonly ORBIT_CW: number;
    /** 1 << 12 */
    readonly ORBIT_CCW: number;
    /** 1 << 13 */
    readonly NO_WALL_COLLIDE: number;
    /** 1 << 14 */
    readonly CREEP_BROWN: number;
    /** 1 << 15 */
    readonly FIRE: number;
    /** 1 << 16 */
    readonly BURST: number;
    /** 1 << 17 */
    readonly ANY_HEIGHT_ENTITY_HIT: number;
    /** 1 << 18 */
    readonly CURVE_LEFT: number;
    /** 1 << 19 */
    readonly CURVE_RIGHT: number;
    /** 1 << 20 */
    readonly TURN_HORIZONTAL: number;
    /** 1 << 21 */
    readonly SINE_VELOCITY: number;
    /** 1 << 22 */
    readonly MEGA_WIGGLE: number;
    /** 1 << 23 */
    readonly SAWTOOTH_WIGGLE: number;
    /** 1 << 24 */
    readonly SLOWED: number;
    /** 1 << 25 */
    readonly TRIANGLE: number;
    /** 1 << 26 */
    readonly MOVE_TO_PARENT: number;
    /** 1 << 27 */
    readonly ACCELERATE: number;
    /** 1 << 28 */
    readonly DECELERATE: number;
    /** 1 << 29 */
    readonly BURST3: number;
    /** 1 << 30 */
    readonly CONTINUUM: number;
    /** 1 << 31 */
    readonly CANT_HIT_PLAYER: number;
    /** 1 << 32 */
    readonly CHANGE_FLAGS_AFTER_TIMEOUT: number;
    /** 1 << 33 */
    readonly CHANGE_VELOCITY_AFTER_TIMEOUT: number;
    /** 1 << 34 */
    readonly STASIS: number;
    /** 1 << 35 */
    readonly FIRE_WAVE: number;
    /** 1 << 36 */
    readonly FIRE_WAVE_X: number;
    /** 1 << 37 */
    readonly ACCELERATE_EX: number;
    /** 1 << 38 */
    readonly BURST8: number;
    /** 1 << 39 */
    readonly FIRE_SPAWN: number;
    /** 1 << 40 */
    readonly ANTI_GRAVITY: number;
    /** 1 << 41 */
    readonly TRACTOR_BEAM: number;
    /** 1 << 42 */
    readonly BOUNCE: number;
    /** 1 << 43 */
    readonly BOUNCE_FLOOR: number;
    /** 1 << 44 */
    readonly SHIELDED: number;
    /** 1 << 45 */
    readonly BLUE_FIRE_SPAWN: number;
    /** 1 << 46 */
    readonly LASER_SHOT: number;
    /** 1 << 47 */
    readonly GODHEAD: number;
    /** 1 << 48 */
    readonly SMART_PERFECT: number;
    /** 1 << 49 */
    readonly BURST_SPLIT: number;
    /** 1 << 50 */
    readonly WIGGLE_ROTGUT: number;
    /** 1 << 51 */
    readonly FREEZE: number;
    /** 1 << 52 */
    readonly ACCELERATE_TO_POSITION: number;
    /**
     * The cluster of tears that Mother shoots.
     *
     * 1 << 53
     */
    readonly BROCCOLI: number;
    /** 1 << 54 */
    readonly BACK_SPLIT: number;
    /** 1 << 55 */
    readonly SIDE_WAVE: number;
    /** 1 << 56 */
    readonly ORBIT_PARENT: number;
    /** 1 << 57 */
    readonly FADEOUT: number;
};
declare type ProjectileFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __projectileFlagBrand: void;
};
declare type ProjectileFlagType = {
    [K in keyof typeof ProjectileFlagInternal]: ProjectileFlagValue;
};
export declare const ProjectileFlag: ProjectileFlagType;
export declare type ProjectileFlag = ProjectileFlagType[keyof ProjectileFlagType];
export declare const ProjectileFlagZero: BitFlags<ProjectileFlagValue>;
export {};
