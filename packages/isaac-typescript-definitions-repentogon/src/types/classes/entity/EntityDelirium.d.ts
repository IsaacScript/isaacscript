import type { EntityType, NPCState } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface EntityDelirium extends Entity {
    /** Returns the number of frames remaining until Delirium teleports. */
    GetTeleportationTimer: () => int;

    /**
     * Returns whether delirium is in red mode.
     *
     * Red mode is a mechanic where Delirium's sprite is tinted red. While this mode is active,
     * Delirium's movement speed is increased in a way that cannot be normally observed through the
     * API as it occurs outside of the update callbacks.
     */
    IsRedMode: () => boolean;

    /**
     * Sets whether Delirium is in Red Mode.
     *
     * Red mode is a mechanic where Delirium's sprite is tinted red. While this mode is active,
     * Delirium's movement speed is increased in a way that cannot be normally observed through the
     * API as it occurs outside of the update callbacks.
     */
    SetRedMode: (isRedMode: boolean) => void;

    /** Sets the number of frames remaining until Delirium teleports. */
    SetTeleportationTimer: (timeLeft: int) => void;

    /**
     * Transforms Delirium into another entity.
     *
     * The transformation is not effective immediately; it will only take place on the next frame.
     *
     * @param variant Optional. Default is 0.
     * @param triggerCallback Optional. Whether to trigger the transformation callback. Default is
     *                        false.
     */
    Transform: (
      entityType: EntityType,
      variant?: int,
      triggerCallback?: boolean,
    ) => void;

    /**
     * Returns the angle of Delirium's projectiles.
     *
     * This variable is an eight-bit integer, so the allowed value is [0, 255]. You can use linear
     * interpolation between [0, 255] and [0, 360] in order to convert angles to work with this
     * system.
     *
     * All of Delirium's bullet hell patterns can be influenced by this variable. Unlike most
     * bosses, Delirium does not aim its projectiles at the player, instead spawning them in random
     * directions (with some control to prevent absurd patterns). For instance, if Delirium spawns
     * eight tears around it, and `angle` is set to 0, the 8 tears will fire in the cardinal and
     * ordinal directions. If `angle` is set to 32, all tears will be rotated by 45 degrees.
     *
     * Why Nicalis chose to represent this with a 8-bit integer is unknown.
     */
    Angle: int;

    /** Identifier for Delirium's current bullet hell pattern. */
    AttackID: int;

    /** The `EntityType` of the boss Delirium is currently transformed as. */
    BossType: EntityType;

    /** The variant of the boss Delirium is currently transformed as. */
    BossVariant: int;

    /**
     * Used to identify whether red mode is activated and the amount of time before Delirium
     * teleports.
     *
     * In most cases, you should not access this variable and instead rely on the
     * `EntityDelirium.GetTeleportationTimer`, `Delirium.SetTeleportationTimer`,
     * `EntityDelirium.IsRedMode`, and `EntityDelirium.SetRedMode` methods instead.
     *
     * The variable is 32 bits and is structured as follows: Bits [0, 6] are currently unknown. Bits
     * [7, 14] indicate whether red mode is active (It is active if any bit is set), and bits [15 -
     * 25] is the teleportation timer.
     */
    Cycle: int;

    /** The number of attacks before Delirium transforms into another boss. */
    RemainingAttacks: int;

    /** Delirium's internal `NPCState`. */
    StateD: NPCState;

    /** The remaining frames before Delirium transforms into another boss. */
    TransformationTimer: int;
  }
}
