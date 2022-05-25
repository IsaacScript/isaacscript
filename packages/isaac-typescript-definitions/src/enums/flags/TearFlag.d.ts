/**
 * For EntityType.TEAR (2)
 *
 * This is an object instead of a TypeScript enum because we need to specify that it contains bit
 * flags. Furthermore, enums cannot be instantiated with `BitSet128` objects.
 *
 * This enum was renamed from "TearFlags" to be consistent with the other flag enums.
 */
declare const TearFlagInternal: {
    /** Default tear (no special effects). */
    readonly NORMAL: BitSet128;
    /**
     * Goes through obstacles. Used by Ouija Board.
     *
     * 1 << 0
     */
    readonly SPECTRAL: BitSet128;
    /**
     * Goes through enemies. Used by Cupid's Arrow.
     *
     * 1 << 1
     */
    readonly PIERCING: BitSet128;
    /**
     * Used by Spoon Bender.
     *
     * 1 << 2
     */
    readonly HOMING: BitSet128;
    /**
     * Slows enemies on contact. Used by Spider Bite.
     *
     * 1 << 3
     */
    readonly SLOW: BitSet128;
    /**
     * Used by The Common Cold.
     *
     * 1 << 4
     */
    readonly POISON: BitSet128;
    /**
     * Freezes enemies in place. (For the ice effect, see `TearFlag.TEAR_ICE`.) Used by Mom's
     * Contacts.
     *
     * 1 << 5
     */
    readonly FREEZE: BitSet128;
    /**
     * Splits into two different tears on collision. Used by The Parasite.
     *
     * 1 << 6
     */
    readonly SPLIT: BitSet128;
    /**
     * The tear increases in size and damage the longer it travels. Used by Lump of Coal.
     *
     * 1 << 7
     */
    readonly GROW: BitSet128;
    /**
     * Returns backwards after traveling for a little while. Used by My Reflection.
     *
     * 1 << 8
     */
    readonly BOOMERANG: BitSet128;
    /**
     * Keeps going past enemies that it kills (with less damage). Used by Polyphemus.
     *
     * 1 << 9
     */
    readonly PERSISTENT: BitSet128;
    /**
     * Used by the Wiggle Worm trinket.
     *
     * 1 << 10
     */
    readonly WIGGLE: BitSet128;
    /**
     * Created a blue fly on hit. Used by The Mulligan.
     *
     * 1 << 11
     */
    readonly MULLIGAN: BitSet128;
    /**
     * Explodes on hit. Used by Ipecac.
     *
     * 1 << 12
     */
    readonly EXPLOSIVE: BitSet128;
    /**
     * Used by Mom's Eyeshadow.
     *
     * 1 << 13
     */
    readonly CHARM: BitSet128;
    /**
     * Used by Iron Bar.
     *
     * 1 << 14
     */
    readonly CONFUSION: BitSet128;
    /**
     * Enemies killed have a 33% chance to drop a heart. Used by Tainted Magdalene.
     *
     * 1 << 15
     */
    readonly HP_DROP: BitSet128;
    /**
     * Tears orbit around the player. Used by Tiny Planet.
     *
     * 1 << 16
     */
    readonly ORBIT: BitSet128;
    /**
     * Floats in place until the player releases the fire button. Used by Anti-Gravity.
     *
     * 1 << 17
     */
    readonly WAIT: BitSet128;
    /**
     * Splits into four different tears on collision. Used by Cricket's Body.
     *
     * 1 << 18
     */
    readonly QUAD_SPLIT: BitSet128;
    /**
     * Bounces off of enemies, walls, rocks, and so on. Used by Rubber Cement.
     *
     * 1 << 19
     */
    readonly BOUNCE: BitSet128;
    /**
     * Used by Mom's Perfume.
     *
     * 1 << 20
     */
    readonly FEAR: BitSet128;
    /**
     * The tear shrinks the longer it travels. Used by Proptosis.
     *
     * 1 << 21
     */
    readonly SHRINK: BitSet128;
    /**
     * Used by Fire Mind.
     *
     * 1 << 22
     */
    readonly BURN: BitSet128;
    /**
     * Attracts enemies and pickups. Used by Strange Attractor.
     *
     * 1 << 23
     */
    readonly ATTRACTOR: BitSet128;
    /**
     * Pushes enemies back further than normal.
     *
     * 1 << 24
     */
    readonly KNOCKBACK: BitSet128;
    /**
     * Used by Pulse Worm.
     *
     * 1 << 25
     */
    readonly PULSE: BitSet128;
    /**
     * Used by Ring Worm.
     *
     * 1 << 26
     */
    readonly SPIRAL: BitSet128;
    /**
     * Used by Flat Worm.
     *
     * 1 << 27
     */
    readonly FLAT: BitSet128;
    /**
     * Makes tears explode out of the bomb. Used by Sad Bombs.
     *
     * 1 << 28
     */
    readonly SAD_BOMB: BitSet128;
    /**
     * Damages everything in the room when it explodes. Used by Butt Bombs.
     *
     * 1 << 29
     */
    readonly BUTT_BOMB: BitSet128;
    /**
     * Used by Hook Worm.
     *
     * 1 << 30
     */
    readonly SQUARE: BitSet128;
    /**
     * Creates an aura around the tear. Used by Godhead.
     *
     * 1 << 31
     */
    readonly GLOW: BitSet128;
    /**
     * Slows enemies and colors them black. Used by Lil Gish.
     *
     * 1 << 32
     */
    readonly GISH: BitSet128;
    /**
     * Spawns green creep on hit. Used by Mysterious Liquid.
     *
     * 1 << 33
     */
    readonly MYSTERIOUS_LIQUID_CREEP: BitSet128;
    /**
     * Deletes projectiles that it collides with. Used by Lost Contact.
     *
     * 1 << 34
     */
    readonly SHIELDED: BitSet128;
    /**
     * Spawns a pickup upon exploding. Used by Glitter Bombs.
     *
     * 1 << 35
     */
    readonly GLITTER_BOMB: BitSet128;
    /**
     * Splits into 5 little bombs upon exploding. Used by Scatter Bombs.
     *
     * 1 << 36
     */
    readonly SCATTER_BOMB: BitSet128;
    /**
     * Sticks to enemies and continues to deal damage. Used by Explosivo and Sticky Bombs.
     *
     * 1 << 37
     */
    readonly STICKY: BitSet128;
    /**
     * Pass through walls to loop around the screen. Used by Continuum.
     *
     * 1 << 38
     */
    readonly CONTINUUM: BitSet128;
    /**
     * Creates a light beam on hit. Used by Holy Light.
     *
     * 1 << 39
     */
    readonly LIGHT_FROM_HEAVEN: BitSet128;
    /**
     * Spawns a coin on hit. Used by Bumbo.
     *
     * 1 << 40
     */
    readonly COIN_DROP: BitSet128;
    /**
     * Enemies killed will spawn a black heart.
     *
     * 1 << 41
     */
    readonly BLACK_HP_DROP: BitSet128;
    /**
     * Follows the parent player's beam. Used by Tractor Beam.
     *
     * 1 << 42
     */
    readonly TRACTOR_BEAM: BitSet128;
    /**
     * Shrink enemies on hit. Used by God's Flesh.
     *
     * 1 << 43
     */
    readonly GODS_FLESH: BitSet128;
    /**
     * Have a chance to spawn a coin on hit.
     *
     * 1 << 44
     */
    readonly GREED_COIN: BitSet128;
    /**
     * Causes a large explosion in the shape of a cross. Used by Bomber Boy.
     *
     * 1 << 45
     */
    readonly CROSS_BOMB: BitSet128;
    /**
     * Used by Ouroboros Worm.
     *
     * 1 << 46
     */
    readonly BIG_SPIRAL: BitSet128;
    /**
     * Used by Glaucoma.
     *
     * 1 << 47
     */
    readonly PERMANENT_CONFUSION: BitSet128;
    /**
     * Sticks to enemies and does damage over time. Used by Sinus Infection.
     *
     * 1 << 48
     */
    readonly BOOGER: BitSet128;
    /**
     * Spawns creep on hit and spawns blue flies or spiders. Used by Parasitoid.
     *
     * 1 << 49
     */
    readonly EGG: BitSet128;
    /**
     * Can open doors or break grid entities. Used by Sulfuric Acid.
     *
     * 1 << 50
     */
    readonly ACID: BitSet128;
    /**
     * Splits into two tears. Used by Compound Fracture.
     *
     * 1 << 51
     */
    readonly BONE: BitSet128;
    /**
     * Piercing. When passing through an enemy, gains homing and does double damage. Used by Eye of
     * Belial.
     *
     * 1 << 52
     */
    readonly BELIAL: BitSet128;
    /**
     * Enemies turn gold and drop coins on death. Used by Midas' Touch.
     *
     * 1 << 53
     */
    readonly MIDAS: BitSet128;
    /**
     * Used by Euthanasia.
     *
     * 1 << 54
     */
    readonly NEEDLE: BitSet128;
    /**
     * Causes electricity to ripple around the room, damaging enemies. Used by Jacob's Ladder.
     *
     * 1 << 55
     */
    readonly JACOBS: BitSet128;
    /**
     * Void tears. Instantly kills enemies. Used by Little Horn.
     *
     * 1 << 56
     */
    readonly HORN: BitSet128;
    /**
     * Electricity arcs between tears. Used by Technology Zero.
     *
     * 1 << 57
     */
    readonly LASER: BitSet128;
    /**
     * Tears stay in the air and bump into each other. Used by Pop!
     *
     * 1 << 58
     */
    readonly POP: BitSet128;
    /**
     * Tears combine when they collide into each other. Used by Lachryphagy.
     *
     * 1 << 59
     */
    readonly ABSORB: BitSet128;
    /**
     * Lasers are generated on top of the tear. Used by Trisagion.
     *
     * 1 << 60
     */
    readonly LASER_SHOT: BitSet128;
    /**
     * Continually bounces as it travels. Used by Flat Stone.
     *
     * 1 << 61
     */
    readonly HYDRO_BOUNCE: BitSet128;
    /**
     * Arcing shots that split into smaller tears on impact. Used by Haemolacria.
     *
     * 1 << 62
     */
    readonly BURST_SPLIT: BitSet128;
    /**
     * Spawns green creep. Used by Bob's Bladder.
     *
     * 1 << 63
     */
    readonly CREEP_TRAIL: BitSet128;
    /**
     * Knockback tears. Used by Knockout Drops.
     *
     * 1 << 64
     */
    readonly PUNCH: BitSet128;
    /**
     * Enemies become frozen on death. (For the freeze-in-place effect, see `TearFlag.FREEZE`.)
     *
     * 1 << 65
     */
    readonly ICE: BitSet128;
    /**
     * Enemies being magnetized and pull other things towards them. Used by Lodestone.
     *
     * 1 << 66
     */
    readonly MAGNETIZE: BitSet128;
    /**
     * Marks enemies. Marked enemies will attack and damage each other, as well as have reduced
     * movement speed. Used by Rotten Tomato.
     *
     * 1 << 67
     */
    readonly BAIT: BitSet128;
    /**
     * Velocity can be adjusted by the player while in the air. Used by Eye of the Occult.
     *
     * 1 << 68
     */
    readonly OCCULT: BitSet128;
    /**
     * Tears orbit in a narrow and stable orbit. Used by Saturnus.
     *
     * 1 << 69
     */
    readonly ORBIT_ADVANCED: BitSet128;
    /**
     * Chance to break rocks and open doors. Deals extra damage to rock-type enemies.
     *
     * 1 << 70
     */
    readonly ROCK: BitSet128;
    /**
     * Tears turn and go horizontally when moving past an enemy. Used by Brain Worm.
     *
     * 1 << 71
     */
    readonly TURN_HORIZONTAL: BitSet128;
    /**
     * Spawns red creep.
     *
     * 1 << 72
     */
    readonly BLOOD_BOMB: BitSet128;
    /**
     * Enemies are turned into poop.
     *
     * 1 << 73
     */
    readonly ECOLI: BitSet128;
    /**
     * Enemies have a chance to drop a coin on death. Used by The Hanged Man?
     *
     * 1 << 74
     */
    readonly COIN_DROP_DEATH: BitSet128;
    /**
     * Explosion creates a Brimstone laser cross pattern.
     *
     * 1 << 75
     */
    readonly BRIMSTONE_BOMB: BitSet128;
    /**
     * Creates a black hole on impact.
     *
     * 1 << 76
     */
    readonly RIFT: BitSet128;
    /**
     * Sticks to enemies and multiplies on enemy death.
     *
     * 1 << 77
     */
    readonly SPORE: BitSet128;
    /**
     * Spawns a ghost upon explosion.
     *
     * 1 << 78
     */
    readonly GHOST_BOMB: BitSet128;
    /**
     * Killed enemies will drop a random tarot card.
     *
     * 1 << 79
     */
    readonly CARD_DROP_DEATH: BitSet128;
    /**
     * Killed enemies will drop a random rune.
     *
     * 1 << 80
     */
    readonly RUNE_DROP_DEATH: BitSet128;
    /**
     * Enemies will teleport to a different part of the room on hit.
     *
     * 1 << 81
     */
    readonly TELEPORT: BitSet128;
    /**
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 115
     */
    readonly REROLL_ROCK_WISP: BitSet128;
    /**
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 116
     */
    readonly MOM_STOMP_WISP: BitSet128;
    /**
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 117
     */
    readonly ENEMY_TO_WISP: BitSet128;
    /**
     * Chance to reroll the enemy on hit. Used by D10 wisps.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 118
     */
    readonly REROLL_ENEMY: BitSet128;
    /**
     * Causes giant explosions that create pits. Used by Giga Bombs.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 119
     */
    readonly GIGA_BOMB: BitSet128;
    /**
     * Enemies explode into more gibs on death than normal. Used by Berserk!
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 120
     */
    readonly EXTRA_GORE: BitSet128;
    /**
     * Lasers cycle between colors, causing a rainbow effect.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 121
     */
    readonly RAINBOW: BitSet128;
    /**
     * Bombs can be detonated by Remote Detonator.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 122
     */
    readonly DETONATE: BitSet128;
    /**
     * Tears stick to each other and form a chain that can be swung around. Used by Akeldama.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 123
     */
    readonly CHAIN: BitSet128;
    /**
     * Black aura effect. Used by Dark Matter.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 124
     */
    readonly DARK_MATTER: BitSet128;
    /**
     * Bombs dropped while having a Golden Bomb will have this flag.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 125
     */
    readonly GOLDEN_BOMB: BitSet128;
    /**
     * Bombs dropped while having Fast Bombs will have this flag.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 126
     */
    readonly FAST_BOMB: BitSet128;
    /**
     * A single tear controlled by the player with the shooting keys. Used by The Ludovico Technique.
     *
     * This is a reserved flag and cannot be randomly picked.
     *
     * 1 << 127
     */
    readonly LUDOVICO: BitSet128;
};
declare type TearFlagValue = BitSet128 & {
    readonly __bitFlag128Brand: void;
    readonly __tearFlagBrand: void;
};
declare type TearFlagType = {
    [K in keyof typeof TearFlagInternal]: TearFlagValue;
};
export declare const TearFlag: TearFlagType;
export declare type TearFlag = TearFlagType[keyof TearFlagType];
export declare const TearFlagZero: TearFlagValue;
export {};
