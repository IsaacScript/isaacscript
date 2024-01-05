import type { EntityType } from "../../../enums/EntityType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface EntityDelirium {
    /**
     * This variable is an eight bit integers, so the allowed values are the integers from 0 to 255
     * (inclusive). You can use a linear interpolation between the [0: 255] and the [0: 360[ ranges
     * in order to convert angles in degree to this system.
     *
     * All of Delirium bullet hell patterns can be influenced by this variable. Unlike most bosses,
     * Delirium does not aim its projectiles at the player, instead spawning them in random
     * directions (with some control to prevent "absurd" patterns). For instance, if Delirium spawns
     * eight tears around it, and `Angle` is set to 0, the 8 tears will fire in the cardinal and
     * ordinal directions. If `Angle` is set to 32, all tears will be rotated by 45°. No, I have no
     * idea why Nicalis used an eight bits integer to represent an angle (analyzing the memory
     * layout of Delirium shows that it would have made no difference using a 32 bits float).
     */
    Angle: int;

    /**
     * Internal I1 value used by Delirium to identify the bullet hell pattern it is currently
     * executing.
     */
    AttackID: int;

    /** The EntityType of the boss that Delirium is currently transformed as. */
    BossType: EntityType;

    /** The variant of the boss that Delirium is currently transformed as. */
    BossVariant: int;

    /**
     * Internal I2 value used by Delirium to identify whether red mode is activated and the amount
     * of time before a teleportation. You should not use this variable directly and instead rely on
     * the `GetTeleportationTimer`, `SetTeleportationTimer`, `IsRedMode` and `SetRedMode` functions
     * instead. The only reason to use this variable directly is if you want to freeze it to a
     * certain value that you know will do exactly what you want (for instance disable red mode and
     * prevent teleportation).
     *
     * The variable is 32 bits wide and is structured as follows: bits 0 to 6 (inclusive) are
     * unknown, bits 7 to 14 (inclusive) indicate whether red mode is active (it is active if any of
     * the bits is set) and bits 15 to 25 (inclusive) are the teleportation timer.
     *
     * The aforementioned methods used to manipulate this variable preserve the bits of the variable
     * that are irrelevant to the operation performed. For instance, enabling or disabling red mode
     * will not change the transformation timer.
     */
    Cycle: int;

    /**
     * Number of attacks remaining before Delirium transforms into another boss.
     *
     * This variable is Nicalis answer to prevent Delirium from performing too many attacks as a
     * single boss before transforming. Under certain conditions, the game will decrement this value
     * by 1. If it reaches 0, Delirium transforms regardless of the transformation timer. The
     * conditions that must be met (simultaneously) are: the StateFrame variable must be 1 during
     * the current frame, and the State variable must be set to any of the attack states. This is
     * the reason why Delirium will sometimes initiate an attack as a boss and immediately
     * transform. You can refer to the complete breakdown of bosses AI configurations to see the AI
     * configuration of each attack.
     */
    RemainingAttacks: int;

    /** Internal State of Delirium. */
    StateD: int;

    /**
     * Get or set the amount of time before Delirium transforms into another boss.
     *
     * Delirium can transform in two situations: either this value reaches 0, or the value of
     * `RemainingAttacks` reaches 0. Refer to the documentation of `RemainingAttacks` for a more
     * detailed explanation of that mechanic.
     */
    TransformationTimer: int;

    /** Return the number of frames before Delirium teleports. */
    GetTeleportationTimer: () => int;

    /**
     * Returns true if Delirium is in Red mode.
     *
     * Red mode is mechanic in the Delirium fight where Delirium's sprite is tinted red. While this
     * mode is active, Delirium's movement speed is increased in a way that cannot be observed
     * through the modding API as it occurs outside of the update callbacks.
     */
    IsRedMode: () => boolean;

    /**
     * Enables or disables Delirium's Red mode.
     *
     * Red mode is mechanic in the Delirium fight where Delirium's sprite is tinted red. While this
     * mode is active, Delirium's movement speed is increased in a way that cannot be observed
     * through the modding API as it occurs outside of the update callbacks.
     */
    SetRedMode: (isRed: boolean) => void;

    /** Set the number of frames before Delirium teleports. Negative values are not allowed. */
    SetTeleportationTimer: (frames: int) => void;

    /**
     * Transform Delirium into the entity with the specified type and variant.
     *
     * The validation of the type and variant is only as strong as the validation performed by the
     * game when it attempts to transform Delirium. In other words, this behaves exactly as if the
     * game itself attempted to transform Delirium, with everything it implies if the specified
     * entity is invalid.
     *
     * In order to properly handle transformations, we use the native transformation mechanic of
     * Delirium. As such, the transformation will not be effective immediately, but instead on the
     * next frame. Internally, this function forces the transformation timer to 1 frame and lets
     * Delirium's AI update as needed.
     *
     * @param entityType
     * @param variant Default is 0.
     */
    Transform: (entityType: EntityType, variant?: int) => void;
  }
}
