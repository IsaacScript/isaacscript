import type {
  BloodExplosionSubType,
  EntityType,
} from "isaac-typescript-definitions";

declare global {
  interface Entity extends IsaacAPIClass {
    /**
     * Adds a baited effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames.
     */
    AddBaited: (source: EntityRef, duration: int) => void;

    /**
     * Adds a bleeding effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames.
     */
    AddBleeding: (source: EntityRef, duration: int) => void;

    /**
     * Adds a brimstone mark to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames.
     */
    AddBrimstoneMark: (source: EntityRef, duration: int) => void;

    /**
     * Adds the ice status effect to the entity.
     *
     * There is no visual indicator that determines if the status effect is active. If the entity
     * dies while the status effect is active, they will be frozen similar to how Uranus tears
     * freezes enemies.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames.
     */
    AddIce: (source: EntityRef, duration: int) => void;

    /**
     * Adds a knockback effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param pushDirection The direction to push the entity.
     * @param duration The number of frames that the effect should apply for. This is capped at 15
     * frames / 0.5 seconds.
     * @param takeImpactDamage Whether the entity should take damage if they collide into a solid
     *                         grid entity while the knockback effect is active.
     */
    AddKnockback: (
      source: EntityRef,
      pushDirection: Vector,
      duration: int,
      takeImpactDamage: boolean,
    ) => void;

    /**
     * Adds a magnetized effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames.
     */
    AddMagnetized: (source: EntityRef, duration: int) => void;

    /**
     * Adds a weakness effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames.
     */
    AddWeakness: (source: EntityRef, duration: int) => void;

    ComputeStatusEffectDuration: (initialLength: int, source: EntityRef) => int;

    /**
     * Copies the entity's status effects onto the specified target.
     *
     * @param target Optional. The target to receive the status effects. If undefined, the entity's
     *               status effects will be copied to its children instead. Default is undefined.
     * @param overwrite Optional. Whether all other status effects that the entity does not have
     *                  should be removed from the target. Default is false.
     */
    CopyStatusEffects: (target?: Entity, overwrite?: boolean) => void;

    /**
     * Attempts force the game to detect a collision between the entity and the provided `target`,
     * triggering all collision related code such as contact damage.
     *
     * @param target
     * @param low Optional. Default is false.
     */
    ForceCollide: (target: Entity, low?: boolean) => boolean;

    /** Returns how many frames are left until the baited status effect goes away. */
    GetBaitedCountdown: () => int;

    /** Returns how many frames are left until the bleeding status effect goes away. */
    GetBleedingCountdown: () => int;

    /**
     * Returns how many frames until the entity is able to receive another status effect. The
     * cooldown is only present in bosses.
     */
    GetBossStatusEffectCooldown: () => int;

    /** Returns how many frames are left until the brimstone mark status effect goes away. */
    GetBrimstoneMarkCountdown: () => int;

    /** Returns how many frames are left until the burn status effect goes away. */
    GetBurnCountdown: () => int;

    /**
     * Returns how many frames are left until the entity takes damage from the burn status effect.
     */
    GetBurnDamageTimer: () => int;

    /** Returns how many frames are left until the charmed status effect goes away. */
    GetCharmedCountdown: () => int;

    /**
     * Returns the entity's collision capsule.
     *
     * @param offset Optional. Default is `VectorZero`.
     */
    GetCollisionCapsule: (offset?: Vector) => Capsule;

    /**
     * Returns an array of all of the entity's `ColorParams` queued by the `Entity.SetColor`
     * method.
     */
    GetColorParams: () => ColorParams[];

    /** Returns how many frames are left until the confusion status effect goes away. */
    GetConfusionCountdown: () => int;

    /**
     * Returns how many frames until the entity can take damage with the `DamageFlag.COUNTDOWN`
     * damage flag again. This cooldown is only present when the entity takes damage with the
     * `DamageFlag.COUNTDOWN` flag.
     *
     * This is not the same as the player's invincibility frames. If you wish to see how many more
     * invincible frames the player has, use the `EntityPlayer.GetDamageCooldown` method.
     */
    GetDamageCountdown: () => int;

    /**
     * Returns the entity's debug shape.
     *
     * @param unknown The behavior of this parameter is currently unknown and remains undocumented.
     */
    GetDebugShape: (unknown: boolean) => Shape;

    /** Returns the entity's corresponding `EntityConfigEntity`. */
    GetEntityConfigEntity: () => EntityConfigEntity;

    /** Returns how many frames are left until the fear status effect goes away. */
    GetFearCountdown: () => int;

    /** Returns how many frames until the entity takes damage from the burn status effect. */
    GetFireDamageCooldown: () => int;

    /** Returns how many frames are left until the freeze status effect goes away. */
    GetFreezeCountdown: () => int;

    /** Returns the entity's hit list index. */
    GetHitListIndex: () => int;

    /** Returns how many frames are left until the ice status effect goes away. */
    GetIceCountdown: () => int;

    /** Returns how many frames are left until the knockback status effect goes away. */
    GetKnockbackCountdown: () => int;

    /**
     * Returns the direction the entity is being knocked back to when the knockback status effect is
     * present.
     */
    GetKnockbackDirection: () => int;

    /** Returns how many frames are left until the magnetized status effect goes away. */
    GetMagnetizedCountdown: () => int;

    /** Returns how many frames are left until the Midas Freeze status effect goes away. */
    GetMidasFreezeCountdown: () => int;

    /**
     * Returns the minecart the entity is riding. Returns undefined if the entity is not riding a
     * minecart.
     */
    GetMinecart: () => EntityNPC | undefined;

    /** Returns the entity's null capsule. */
    GetNullCapsule: (nullLayerNameOrId: string | int) => Capsule;

    /**
     * Returns the position of the null layer mark. If the layer is not visible or no frame is
     * available for the current animation, `VectorZero` is returned instead.
     */
    GetNullOffset: (nullLayerNameOrId: string | undefined) => Vector;

    /** Returns how many frames are left until the pause status effect goes away. */
    GetPauseTime: () => int;

    /** Returns how many frames are left until the poison status effect goes away. */
    GetPoisonCountdown: () => int;

    /** Returns how many frames until the entity takes damage from the poison status effect. */
    GetPoisonDamageTimer: () => int;

    /** Returns a dictionary with fields containing the entity's position and velocity. */
    GetPosVel: () => PosVel;

    /**
     * Returns the predicted position of a target entity after the specified delay.
     *
     * @param target
     * @param delay A multiplier for how far ahead the prediction should be, in frames. For example,
     *              a value of 1 would predict where the target's velocity would take them on the
     *              next update.
     */
    GetPredictedTargetPosition: (target: Entity, delay: number) => Vector;

    /** Returns the size of the entity's shadow. */
    GetShadowSize: () => number;

    /** Returns how many frames are left until the shrink status effect goes away. */
    GetShrinkCountdown: () => number;

    /** Returns how many frames are left until the slowness status effect goes away. */
    GetSlowingCountdown: () => number;

    /** Returns the entity's speed multiplier. */
    GetSpeedMultiplier: () => number;

    /** Returns the entity's `EntityType`. */
    GetType: () => EntityType;

    /** Returns how many frames are left until the weakness status effect goes away. */
    GetWeaknessCountdown: () => int;

    /**
     * Attempts to give the entity a minecart and places them in it. Returns the created minecart.
     */
    GiveMinecart: (position: Vector, velocity: Vector) => EntityNPC;

    /** Returns whether the entity should ignore status effects from the provided `EntityRef`. */
    IgnoreEffectFromFriendly: (source: EntityRef) => boolean;

    /**
     * Spawns two blood poof effects, one with a sub-type of `Poof2SubType.LARGE_BLOOD_POOF`
     * and `Poof2SubType.LARGE_BLOOD_POOF_FOREGROUND`. The former is returned with the latter set
     * as its child.
     *
     * @param position Optional. Default is the entity's current position.
     * @param color Optional.
     * @param scale Optional. Default is 1.
     */
    MakeBloodPoof: (
      position?: Vector,
      color?: Color,
      scale?: number,
    ) => EntityEffect;

    /**
     * Spawns two poof effects, one with a sub-type of `Poof2SubType.LARGE_GROUND_POOF`
     * and `Poof2SubType.LARGE_GROUND_POOF_FOREGROUND`. The former is returned with the latter set
     * as its child.
     *
     * @param position Optional. Default is the entity's current position.
     * @param color Optional.
     * @param scale Optional. Default is 1.
     */
    MakeGroundPoof: (
      position?: Vector,
      color?: Color,
      scale?: number,
    ) => EntityEffect;

    /**
     * Updates the remaining frames until the baited status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetBaitedCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the bleeding status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetBleedingCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the entity can be inflicted with another status effect. If
     * the entity is not a boss, then this cooldown will do nothing.
     */
    SetBossStatusEffectCooldown: (cooldown: int) => void;

    /**
     * Updates the remaining frames until the brimstone status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetBrimstoneMarkCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the burn status effect is removed. If the entity does not
     * have the status effect, then this method will do nothing.
     */
    SetBurnCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the entity takes damage from the burn status effect. If
     * the entity does not have the status effect, then this method will do nothing.
     */
    SetBurnDamageTimer: (countdown: int) => void;

    /**
     * Updates the remaining frames until the charmed status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetCharmedCountdown: (countdown: int) => void;

    /** Sets the entity's color parameters. */
    SetColorParams: (colorParams: readonly ColorParams[]) => void;

    /**
     * Updates the remaining frames until the confusion status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetConfusionCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the entity can take damage from the `DamageFlag.COUNTDOWN`
     * flag again.
     *
     * This is not the same as the player's invincibility frames.
     */
    SetDamageCountdown: (countdown: int) => void;

    /** Sets whether the entity is dead. */
    SetDead: (isDead: boolean) => void;

    /**
     * Updates the remaining frames until the fear status effect is removed. If the entity does not
     * have the status effect, then this method will do nothing.
     */
    SetFearCountdown: (countdown: int) => void;

    /** Updates the remaining frames until the entity can take fire damage again. */
    SetFireDamageCooldown: (cooldown: int) => void;

    /**
     * Updates the remaining frames until the freeze status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetFreezeCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the ice status effect is removed. If the entity does not
     * have the status effect, then this method will do nothing.
     */
    SetIceCountdown: (countdown: int) => void;

    /** Sets whether the entity is invincible. */
    SetInvincible: (isInvincible: boolean) => void;

    /**
     * Updates the remaining frames until the knockback status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetKnockbackCountdown: (countdown: int) => void;

    /**
     * Updates the direction the entity is being knocked back as a result of the knockback status
     * effect. If the entity does not have the status effect, then this method will do nothing.
     */
    SetKnockbackDirection: (direction: Vector) => void;

    /**
     * Updates the remaining frames until the magnetized status effect is removed. If the entity
     * does not have the status effect, then this method will do nothing.
     */
    SetMagnetizedCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the Midas Freeze status effect is removed. If the entity
     * does not have the status effect, then this method will do nothing.
     */
    SetMidasFreezeCountdown: (countdown: int) => void;

    /**
     * Sets how many frames the entity is paused for. Paused entities will remain in place and their
     * AI is disabled.
     */
    SetPauseTime: (duration: int) => void;

    /**
     * Updates the remaining frames until the poison status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetPoisonCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the entity takes damage from the poison status effect. If
     * the entity does not have the status effect, then this method will do nothing.
     */
    SetPoisonDamageTimer: (countdown: int) => void;

    /**
     * Updates the size of the entity's shadow. This method must be called every update as the game
     * will try to revert the shadow back to its original size.
     */
    SetShadowSize: (size: number) => void;

    /**
     * Updates the remaining frames until the shrink status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetShrinkCountdown: (countdown: int) => void;

    /**
     * Updates the remaining frames until the slowness status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetSlowingCountdown: (countdown: int) => void;

    /** Sets the entity's speed multiplier. */
    SetSpeedMultiplier: (multiplier: number) => void;

    /**
     * Updates the remaining frames until the weakness status effect is removed. If the entity does
     * not have the status effect, then this method will do nothing.
     */
    SetWeaknessCountdown: (countdown: int) => void;

    /**
     * Shortcut method of spawning `EntityEffect.BLOOD_EXPLOSION`.
     *
     * @param subType Optional. Default is `BloodExplosionSubType.MEDIUM_WITH_LEFTOVER_BLOOD`.
     * @param position Optional. Default is the entity's current position.
     * @param spriteOffset Optional. Default is `VectorZero`.
     * @param color Optional. Default is `ColorDefault`.
     * @param velocity Optional. Default is `VectorZero`.
     */
    SpawnBloodEffect: (
      subType?: BloodExplosionSubType,
      position?: Vector,
      spriteOffset?: Vector,
      color?: Color,
      velocity?: Vector,
    ) => EntityEffect;

    /**
     * Spawns a water impact effect. If `Room.GetWaterAmount` is less than or equal to 0.2, nothing
     * will spawn.
     */
    SpawnWaterImpactEffects: (
      position: Vector,
      velocity: Vector,
      strength: number,
    ) => void;

    TeleportToRandomPosition: () => void;

    /**
     * Casts an `Entity` into an `EntityDelirium`, which has delirium-specific methods and
     * properties. If the associated entity is not Delirium, then this method will return undefined.
     */
    ToDelirium: () => EntityDelirium | undefined;

    /**
     * Casts an `Entity` into an `EntitySlot`, which has delirium-specific methods and
     * properties. If the associated entity is not a slot, then this method will return undefined.
     */
    ToSlot: () => EntitySlot | undefined;

    /**
     * Attempts to throw the entity. This is the same effect as when the player is knocked up from
     * a Quakey stomping.
     *
     * Returns whether the entity was thrown successfully.
     */
    TryThrow: (
      source: EntityRef,
      throwDirection: Vector,
      force: number,
    ) => boolean;
  }
}
