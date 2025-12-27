/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
export enum ModCallbackRepentogon {
  /**
   * A modified version of `ModCallback.POST_USE_PILL`. This callback provides a `PillColor`
   * parameter.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillEffect` provided.
   *
   * ```ts
   * function postUsePill(
   *   effect: PillEffect,
   *   player: EntityPlayer,
   *   flags: BitFlags<UseFlag>,
   *   color: PillColor
   * ): void {}
   * ```
   */
  POST_USE_PILL = 10,

  /**
   * A modified version of `ModCallback.ENTITY_TAKE_DMG`. This callback now allows an interface to
   * be returned to further modify how the entity takes damage.
   *
   * Return false to cancel the damage from being applied. Alternatively, return an object with any
   * of the following optional fields to modify how the damage is applied:
   * - `DamageAmount`: The amount of damage to apply.
   * - `DamageFlags`: The damage flags to apply.
   * - `DamageCountdown`: The damage countdown to apply. Only works if the `DamageFlag.COUNTDOWN`
   *   flag is present.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preEntityTakeDmg(
   *   entity: Entity,
   *   damage: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   damageCountdown: int
   * ):
   *   | boolean
   *   | {
   *       Damage?: number;
   *       DamageFlags?: BitFlags<DamageFlag>;
   *       DamageCountdown?: int;
   *     }
   *   | undefined {}
   * ```
   */
  PRE_ENTITY_TAKE_DMG = 11,

  /**
   * A modified version of `ModCallback.PRE_FAMILIAR_COLLISION`. This callback now allows an
   * interface to be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarCollision(
   *   familiar: EntityFamiliar,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_FAMILIAR_COLLISION = 26,

  /**
   * A modified version of `ModCallback.PRE_NPC_COLLISION`. This callback now allows an interface to
   * be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCCollision(
   *   npc: EntityNPC,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_NPC_COLLISION = 30,

  /**
   * A modified version of `ModCallback.PRE_PLAYER_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerCollision(
   *   player: EntityPlayer,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_PLAYER_COLLISION = 33,

  /**
   * A modified version of `ModCallback.POST_PICKUP_SELECTION`. This callback now provides the
   * requested Variant and requested SubType.
   *
   * Internally, the game always attempts to randomize the spawned pickup's Variant and SubType,
   * even when re-entering an already visited room, however there are checks in place to make sure
   * that randomization only occurs if either of these values are initially set to 0. Therefore, you
   * should always check to see if `requestedVariant` is equal to `PickupVariant.NULL` or
   * `requestedSubType` is equal to `0`.
   *
   * When `requestedVariant` is equal to `PickupVariant.NULL`, the game will randomize both the
   * Variant and SubType of the pickup. In this case, the value of `requestedSubType` is used as a
   * variant blacklist.
   *
   * Return an array to modify the pickup selected. If the third element is set to true, the
   * callback will replace the chosen Variant and SubType and continue running, allowing for other
   * mods to modify the selection as well.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postPickupSelection(
   *   pickup: EntityPickup,
   *   variant: PickupVariant,
   *   subType: int | NullPickupSubType,
   *   requestedVariant: PickupVariant,
   *   requestedSubType: int,
   *   rng: RNG,
   * ): [pickupVariant: PickupVariant, subType: int, continueSelection?: boolean] | undefined {}
   * ```
   */
  POST_PICKUP_SELECTION = 37,

  /**
   * A modified version of `ModCallback.PRE_PICKUP_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupCollision(
   *   pickup: EntityPickup,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_PICKUP_COLLISION = 38,

  /**
   * A modified version of `ModCallback.PRE_TEAR_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearCollision(
   *   tear: EntityTear,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_TEAR_COLLISION = 42,

  /**
   * A modified version of `ModCallback.PRE_PROJECTILE_COLLISION`. This callback now allows an
   * interface to be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileCollision(
   *   projectile: EntityProjectile,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_PROJECTILE_COLLISION = 46,

  /**
   * A modified version of `ModCallback.PRE_KNIFE_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preKnifeCollision(
   *   knife: EntityKnife,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_KNIFE_COLLISION = 53,

  /**
   * A modified version of `ModCallback.PRE_BOMB_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombCollision(
   *   bomb: EntityBomb,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_BOMB_COLLISION = 60,

  /**
   * A modified version of `ModCallback.POST_ENTITY_KILL`. This callback now provides an `EntityRef`
   * of whoever killed the entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogonRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postEntityKill(entity: Entity, source: EntityRef): void {}
   * ```
   */
  POST_ENTITY_KILL = 68,

  /**
   * Fires before a collectible is added to the player's inventory.
   *
   * Return `CollectibleType` to override the collectible added. Alternatively, return `false` to
   * prevent the collectible from being added. Alternatively, return an array with the following
   * elements to override the collectible added:
   * - `collectibleType`: Overrides the collectible that will be added.
   * - `charge`: Overrides the charge of the collectible that will be added.
   * - `firstTime`: Overrides whether the collectible is being added for the first time.
   * - `slot`: Overrides the active slot the collectible will be added to.
   * - `varData`: Overrides the `VarData` of the collectible that will be added.
   * - `player`: Overrides the player the collectible will be added to.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function preAddCollectible(
   *   collectible: CollectibleType,
   *   charge: int,
   *   firstTime: boolean,
   *   slot: ActiveSlot,
   *   varData: int,
   *   player: EntityPlayer,
   * ):
   *   | boolean
   *   | [
   *       collectibleType?: CollectibleType;
   *       charge?: int;
   *       firstTime?: boolean;
   *       slot?: ActiveSlot;
   *       varData?: int;
   *       player?: EntityPlayer;
   *     ]
   *   | CollectibleType
   *   | undefined {}
   *   ```
   */
  PRE_ADD_COLLECTIBLE = 1004,

  /**
   * Fires after a collectible has been added to the player's inventory.
   *
   * Use this over Isaacscript-Common's `ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED` callback
   * as this is a lot more optimized.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postAddCollectible(
   *   collectible: CollectibleType,
   *   charge: int,
   *   firstTime: boolean,
   *   slot: ActiveSlot,
   *   varData: int,
   *   player: EntityPlayer,
   * ): void {}
   *   ```
   */
  POST_ADD_COLLECTIBLE = 1005,

  /**
   * Fires after an entity takes damage.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postEntityTakeDmg(
   *   entity: Entity,
   *   damage: number,
   *   flags: BitFlags<DamageFlag>
   *   source: EntityRef,
   *   damageCountdown: int
   * ): void {}
   */
  POST_ENTITY_TAKE_DMG = 1006,

  /**
   * Fires before `ModCallback.ENTITY_TAKE_DMG` regardless if the player is considered invincible or
   * has items such as Holy Mantle. This callback can be used to give player invincibility that
   * takes precedence over other damage negation effects, such as Holy Mantle.
   *
   * Return false to prevent the damage from being applied.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerRender(
   *   player: EntityPlayer,
   *   damage: number,
   *   flags: BitFlags<DamageFlag>
   *   source: EntityRef,
   *   damageCountdown: int
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_TAKE_DMG = 1008,

  /**
   * Fires before hearts are added to the player. `optionalArg` is reserved for certain
   * `Add(...)Hearts` functions, such as the `ignoreKeeper` argument for
   * `EntityPlayer.AddMaxHearts`.
   *
   * Return an integer to override the amount of hearts added.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `AddHealthTypeFlag` provided.
   *
   * ```ts
   * function prePlayerAddHearts(
   *   player: EntityPlayer,
   *   amount: int,
   *   addHealthTypeFlag: AddHealthTypeFlag,
   *   optionalArg: boolean
   * ): int | undefined {}
   * ```
   */
  PRE_PLAYER_ADD_HEARTS = 1009,

  /**
   * Fires after hearts are added to the player. `optionalArg` is reserved for certain
   * `Add(...)Hearts` functions, such as the `ignoreKeeper` argument for
   * `EntityPlayer.AddMaxHearts`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `AddHealthTypeFlag` provided.
   *
   * ```ts
   * function postPlayerAddHearts(
   *   player: EntityPlayer,
   *   amount: int,
   *   addHealthTypeFlag: AddHealthTypeFlag,
   *   optionalArg: boolean
   * ): void {}
   * ```
   */
  POST_PLAYER_ADD_HEARTS = 1010,

  /**
   * Fires after a rock is destroyed. `source` can be undefined if `GridEntity.Destroy` is called
   * instead of `GridEntity.DestroyWithSource`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridRockDestroy(
   *   rock: GridEntityRock,
   *   gridEntityType: GridEntityType,
   *   immediate: boolean,
   *   source: EntityRef | undefined
   * ): void {}
   * ```
   */
  POST_GRID_ROCK_DESTROY = 1011,

  /**
   * Fires before a `GridEntity` attempts to inflict damage on an entity.
   *
   * Return false to prevent the damage from being applied.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridHurtDamage(
   *   gridEntity: GridEntity,
   *   entity: Entity,
   *   playerDamageAmount: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   damageAmount: float,
   *   ignoreGridCollisionClass: boolean
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_HURT_DAMAGE = 1012,

  /**
   * Fires after a `GridEntity` has attempted to inflict damage on an entity. This does not
   * guarantee that the entity actually took damage, such as if the player is currently invincible.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridHurtDamage(
   *   gridEntity: GridEntity,
   *   entity: Entity,
   *   playerDamageAmount: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   damageAmount: number,
   *   ignoreGridCollisionClass: boolean
   * ): void {}
   * ```
   */
  POST_GRID_HURT_DAMAGE = 1013,

  /**
   * Fires before a trinket is added to the player.
   *
   * Return false to prevent the trinket from being added. Alternatively, return `TrinketType` to
   * override the trinket added.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function preAddTrinket(
   *   player: EntityPlayer,
   *   trinket: TrinketType,
   *   firstTime: boolean
   * ): TrinketType | boolean | undefined {}
   * ```
   */
  PRE_ADD_TRINKET = 1014,

  /**
   * Fires before a pickup is added to the player's Bag of Crafting.
   *
   * Return false to prevent the pickup from being added. Alternatively, return an array of
   * `BagOfCraftingPickup` to override the pickup(s) added.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function preAddToBagOfCrafting(
   *   player: EntityPlayer,
   *   pickup: EntityPickup,
   *   bagOfCraftingPickups: readonly BagOfCraftingPickup[]
   * ): BagOfCraftingPickup[] | boolean | undefined {}
   * ```
   */
  PRE_ADD_TO_BAG_OF_CRAFTING = 1015,

  /**
   * Fires after a pickup is added to the player's Bag of Crafting.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postAddToBagOfCrafting(player: EntityPlayer, pickup: EntityPickup): void {}
   * ```
   */
  POST_ADD_TO_BAG_OF_CRAFTING = 1016,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preHUDUpdate(): void {}
   * ```
   */
  PRE_HUD_UPDATE = 1020,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postHUDUpdate(): void {}
   * ```
   */
  POST_HUD_UPDATE = 1021,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preHUDRender(): void {}
   * ```
   */
  PRE_HUD_RENDER = 1022,

  /**
   * Fires each time the main menu renders on the screen.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postMainMenuRender(): void {}
   * ```
   */
  POST_MAIN_MENU_RENDER = 1023,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postHUDRender(): void {}
   * ```
   */
  POST_HUD_RENDER = 1024,

  /**
   * Fires when a split tear is fired.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SplitTearType` or string provided.
   *
   * ```ts
   * function postFireSplitTear(
   *   tear: EntityTear,
   *   source: Entity,
   *   splitType: SplitTearType | string
   * ): void {}
   * ```
   */
  POST_FIRE_SPLIT_TEAR = 1025,

  /**
   * Fires before a sound effect is played.
   *
   * Return a `SoundEffect` to override the sound being played. Alternatively, return false to
   * prevent the sound from being played. Alternatively, return an array with the following elements
   * to modify the sound being played:
   * - `sound`: Overrides the sound effect being played.
   * - `volume`: Overrides the volume of the sound effect being played.
   * - `frameDelay`: Overrides the frame delay of the sound effect being played.
   * - `loop`: Overrides whether the sound effect should loop.
   * - `pitch`: Overrides the pitch of the sound effect being played.
   * - `pan`: Overrides the pan of the sound effect being played.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SoundEffect` provided.
   *
   * ```ts
   *  function preSFXPlay(
   *   sound: SoundEffect,
   *   volume: number,
   *   frameDelay: int,
   *   loop: boolean,
   *   pitch: number,
   *   pan: number,
   * ):
   *   | SoundEffect
   *   | [
   *       sound?: SoundEffect,
   *       volume?: number,
   *       frameDelay?: int,
   *       loop?: boolean,
   *       pitch?: number,
   *       pan?: number,
   *     ]
   *   | boolean
   *   | undefined {}
   * ```
   */
  PRE_SFX_PLAY = 1030,

  /**
   * Fires after a sound effect is played.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SoundEffect` provided.
   *
   * ```ts
   * function postSFXPlay(
   *   sound: SoundEffect,
   *   volume: number,
   *   frameDelay: int,
   *   loop: boolean,
   *   pitch: number,
   *   pan: number
   * ): void {}
   * ```
   */
  POST_SFX_PLAY = 1031,

  /**
   * Fires after a projectile is destroyed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileDeath(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_DEATH = 1032,

  /**
   * Fires after a tear is destroyed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearDeath(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_DEATH = 1033,

  /**
   * Fires before music is played. This callback is fired for both `MusicManager.Play` and
   * `MusicManager.Crossfade`. To distinguish the source, use the `isFade` parameter.
   *
   * Return `Music` to override the music being played. Alternatively, return `false` to prevent the
   * music from being played. Alternatively, return an array with the following elements to modify
   * the music being played:
   * - `music`: Overrides the music being played.
   * - `volumeOrFadeRate`: Overrides the volume or fade rate of the music being played.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Music` provided.
   *
   * ```ts
   * function preMusicPlay(
   *   music: Music,
   *   volumeOrFadeRate: float,
   *   isFade: boolean
   * ): Music | [music?: Music, volumeOrFadeRate?: number] | boolean | undefined {}
   * ```
   */
  PRE_MUSIC_PLAY = 1034,

  /**
   * Fires before the combat layer of the playing music is toggled. This only fires for
   * `MusicManager.EnableLayer` and not when the combat layer is automatically enabled in rooms with
   * a lot of enemies.
   *
   * Return `true` to enable the combat layer. Alternatively, return `false` to disable the combat
   * layer. Alternatively, return an integer to override the ID of the layer.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the integer provided.
   *
   * ```ts
   * function preMusicLayerToggle(layerID: int, enabled: boolean): boolean | int | undefined {}
   * ```
   */
  PRE_MUSIC_LAYER_TOGGLE = 1035,

  /**
   * Fires before the player's head is rendered.
   *
   * Return false to prevent the head from being rendered. Alternatively, return a `Vector` to
   * modify the render position of the head.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderPlayerHead(
   *   player: EntityPlayer,
   *   renderPos: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_PLAYER_HEAD = 1038,

  /**
   * Fires before the player's body is rendered.
   *
   * Return false to prevent the body from being rendered. Alternatively, return a `Vector` to
   * modify the render position of the body.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderPlayerBody(
   *   player: EntityPlayer,
   *   renderPos: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_PLAYER_BODY = 1039,

  /**
   * Fires before an entity is thrown by a player.
   *
   * Return a `Vector` to override the velocity of the thrown entity.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preEntityThrow(
   *   throwingPlayer: EntityPlayer,
   *   heldEntity: Entity,
   *   velocity: Vector
   * ): Vector | undefined {}
   * ```
   */
  PRE_ENTITY_THROW = 1040,

  /**
   * Fires after an entity is thrown by a player.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postEntityThrow(
   *   throwingPlayer: EntityPlayer,
   *   heldEntity: Entity,
   *   velocity: Vector
   * ): void {}
   * ```
   */
  POST_ENTITY_THROW = 1041,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerInitLevelStats(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_INIT_LEVEL_STATS = 1042,

  /**
   * Fires before the current room is unloaded from being exited. `newLevel` is set to `true` when
   * entering a new level or exiting the run.
   *
   * ```ts
   * function preRoomExit(player: EntityPlayer, newLevel: boolean): void {}
   * ```
   */
  PRE_ROOM_EXIT = 1043,

  /**
   * Fires after all entities and grid entities in the room have been rendered, but before effects
   * like overlays, shockwaves, and the mirror world shaders are applied. Rendering done in this
   * callback is also preserved in room transition animations.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postRoomRenderEntities(): void {}
   * ```
   */
  POST_ROOM_RENDER_ENTITIES = 1044,

  /**
   * Fires before the completion mark is set. Return `false` to prevent it from being set.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preCompletionMarkSet(
   *   completion: CompletionType,
   *   playerType: PlayerType
   *  ): boolean | undefined {}
   * ```
   */
  PRE_COMPLETION_MARK_SET = 1047,

  /**
   * Fires after the completion mark is set.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postCompletionMarkSet(completion: CompletionType, playerType: PlayerType): void {}
   * ```
   */
  POST_COMPLETION_MARK_SET = 1048,

  /**
   * Fires before a completion event is recorded, such as when defeating an end boss or unlocking a
   * tainted character.
   *
   * Return `CompletionType` to override the completion event. Alternatively, return `false` to
   * prevent the completion event from being recorded. Cancelling it will also prevent all marks and
   * completion event related stuff to trigger for all players.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preCompletionEvent(completion: CompletionType): boolean | CompletionType | undefined {}
   * ```
   */
  PRE_COMPLETION_EVENT = 1049,

  /**
   * Fires before the game checks for vanilla revive effects like 1UP before determining whether to
   * show the game over screen.
   *
   * Return `false` or call `EntityPlayer.Revive` to cancel the death, reviving the player in-place
   * with half a heart.
   *
   * Returning `false` or calling `EntityPlayer.Revive` may remove the current run's ability to
   * save. This occurs because the game immediately deletes the run save during the death animation
   * if there's no pending revives. In order to prevent this, only attempt to revive the player if
   * they have an item or effect with REPENTOGON's "revive" custom tag, which allows the item/effect
   * to count as an extra life on the HUD.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preTriggerPlayerDeath(player: EntityPlayer): boolean | undefined {}
   * ```
   *
   * @see https://repentogon.com/xml/items.html
   */
  PRE_TRIGGER_PLAYER_DEATH = 1050,

  /**
   * Fires after the game checks for vanilla revive effects like 1UP before determining whether to
   * show the game over screen.
   *
   * Return `false` or call `EntityPlayer.Revive` to cancel the death, reviving the player in-place
   * with half a heart.
   *
   * Returning `false` or calling `EntityPlayer.Revive` may remove the current run's ability to
   * save. This occurs because the game immediately deletes the run save during the death animation
   * if there's no pending revives. In order to prevent this, only attempt to revive the player if
   * they have an item or effect with REPENTOGON's "revive" custom tag, which allows the item/effect
   * to count as an extra life on the HUD.
   *
   * ```ts
   * function triggerPlayerDeathPostCheckRevives(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  TRIGGER_PLAYER_DEATH_POST_CHECK_REVIVES = 1051,

  /**
   * Fires before a completion event is recorded, such as when defeating an end boss or unlocking a
   * tainted character.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postCompletionEvent(completion: CompletionType): void {}
   * ```
   */
  POST_COMPLETION_EVENT = 1052,

  /**
   * Fires before a level is initialized.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preLevelInit(): void {}
   * ```
   */
  PRE_LEVEL_INIT = 1060,

  /**
   * Returning a Dimension that does not exist in the current floor will crash the game.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preChangeRoom(
   *   targetRoomIndex: int,
   *   dimension: Dimension
   * ): { TargetRoomIdx?: int, Dimension?: Dimension } | undefined {}
   * ```
   */
  PRE_CHANGE_ROOM = 1061,

  /**
   * Fires after a player purchased a pickup from a shop. This also fires for Devil Deals taken.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * postPickupShopPurchase(pickup: EntityPickup, player: EntityPlayer, moneySpent: int): void {}
   * ```
   */
  POST_PICKUP_SHOP_PURCHASE = 1062,

  /**
   * Fires when `EntityFamiliar.GetFollowerPriority` is called.
   *
   * Return `FollowerPriority` or an integer to override the priority of the familiar.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function getFollowerPriority(familiar: EntityFamiliar): FollowerPriority | | int | undefined {}
   * ```
   */
  GET_FOLLOWER_PRIORITY = 1063,

  /**
   * Fires before a card is used.
   *
   * Return `true` to prevent the card from being used.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function preUseCard(
   *   card: CardType,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>
   * ): boolean | undefined {}
   * ```
   */
  PRE_USE_CARD = 1064,

  /**
   * Fires before a pill is used.
   *
   * Return `true` to prevent the pill from being used.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillEffect` provided.
   *
   * ```ts
   * function preUsePill(
   *   pillEffect: PillEffect,
   *   pillColor: PillColor,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>
   * ): boolean | undefined {}
   * ```
   */
  PRE_USE_PILL = 1065,

  /**
   * Fires before the price of a shop item is set.
   *
   * Return an integer or `PickupPrice` to override the price of the shop item.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function getShopItemPrice(
   *   pickupVariant: PickupVariant,
   *   pickupSubType: int,
   *   shopItemID: int,
   *   price: int
   *  ): int | PickupPrice | undefined {}
   * ```
   */
  GET_SHOP_ITEM_PRICE = 1066,

  /**
   * Fires when `EntityPlayer.GetHealthType` is called.
   *
   * This callback is usually not efficient. For setting the player's default health type, prefer to
   * set their `healthtype` in `players.xml`. For items, use the `healthtype` custom cache in
   * `items.xml`.
   *
   * Return `HealthType` to override the player's health type.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function getPlayerHealthType(player: EntityPlayer): HealthType | undefined {}
   * ```
   *
   * @see https://repentogon.com/xml/players.html
   * @see https://repentogon.com/xml/items.html
   */
  GET_PLAYER_HEALTH_TYPE = 1067,

  /**
   * Fires before room clear effects are triggered.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preRoomTriggerClear(playSound: boolean): void {}
   * ```
   */
  PRE_ROOM_TRIGGER_CLEAR = 1068,

  /**
   * Fires before room clear effects are triggered for a specific player.
   *
   * Return `false` to cancel the effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerTriggerRoomClear(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_TRIGGER_ROOM_CLEAR = 1069,

  /**
   * Fires before a shop is restocked from effects such as the Restock collectible or restock
   * machines.
   *
   * This callback is called for both `Room.ShopRestockFull` and `Room.ShopRestockPartial`. Use the
   * `partial` parameter to distinguish between the two.
   *
   * Return `false` to cancel the restock.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preRestockShop(partial: boolean): boolean | undefined {}
   * ```
   */
  PRE_RESTOCK_SHOP = 1070,

  /**
   * Fires after a shop is restocked from effects such as the Restock collectible or restock
   * machines.
   *
   * This callback is called for both `Room.ShopRestockFull` and `Room.ShopRestockPartial`. Use the
   * `partial` parameter to distinguish between the two.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postRestockShop(partial: boolean): void {}
   * ```
   */
  POST_RESTOCK_SHOP = 1071,

  /**
   * Fires when `EntityPlayer.GetActiveMaxCharge` is called.
   *
   * Return an integer to override the maximum charge of the active item.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function getActiveMaxCharge(
   *   collectible: CollectibleType,
   *   player: EntityPlayer,
   *   varData: int,
   *   currentMaxCharges: int
   * ): int | undefined {}
   * ```
   */
  GET_ACTIVE_MAX_CHARGE = 1072,

  /**
   * Fires when `EntityPlayer.GetActiveMinUsableCharge` is called.
   *
   * The minimum usable charge are the minimum charges required to use an active item. If the item
   * has the minimum amount of charge, it'll also show the white outline.
   *
   * Return an integer to override the minimum usable charge of the active item.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function getActiveMinUsableCharge(
   *   slot: ActiveSlot,
   *   player: EntityPlayer,
   *   currentMinUsableCharge: int,
   * ): int | undefined {}
   * ```
   */
  GET_ACTIVE_MIN_USABLE_CHARGE = 1073,

  /**
   * Fires when `EntityPlayer.GetHeartLimit` is called.
   *
   * Return an integer to override the heart limit of the player.
   *
   * While you can set the limit to any arbitrary amount, the game can only render up to 4 lines of
   * hearts in the HUD. However, hearts not being rendered in the HUD will still function normally.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function getPlayerHeartLimit(
   *   player: EntityPlayer,
   *   heartLimit: int,
   *   isKeeper: boolean
   * ): int | undefined {}
   * ```
   */
  GET_PLAYER_HEART_LIMIT = 1074,

  /**
   * Fires when the Giantbook animation updates.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GiantbookType` provided.
   *
   * ```ts
   * function postItemOverlayUpdate(giantbookID: GiantbookType, skipAnimation: boolean): void {}
   * ```
   */
  POST_ITEM_OVERLAY_UPDATE = 1075,

  /**
   * Fires before the 1076 plays.
   *
   * Return `GiantbookType` to override the Giantbook being shown. Alternatively, return `true` to
   * prevent the animation from playing.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GiantbookType` provided.
   *
   * ```ts
   * function preItemOverlayShow(
   *   giantbook: GiantbookType,
   *   delay: int,
   *   player: EntityPlayer
   * ): boolean | GiantbookType | undefined {}
   * ```
   */
  PRE_ITEM_OVERLAY_SHOW = 1076,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerNewRoomTempEffects(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_NEW_ROOM_TEMP_EFFECTS = 1077,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerNewLevel(
   *   player: EntityPlayer,
   *   fromPlayerUpdate: boolean,
   *   postLevelInitFinished: boolean
   * ): void {}
   * ```
   */
  POST_PLAYER_NEW_LEVEL = 1078,

  /**
   * Fires after an active item is rendered on the player's HUD.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postPlayerHUDRenderActiveItem(
   *   player: EntityPlayer,
   *   slot: ActiveSlot,
   *   position: Vector,
   *   alpha: float,
   *   scale: float,
   *   chargeBarPosition: Vector
   * ): void {}
   * ```
   */
  POST_PLAYER_HUD_RENDER_ACTIVE_ITEM = 1079,

  /**
   * Fires before a familiar is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * familiar from being rendered.
   *
   * Preventing a familiar from being rendered doesn't prevent the familiar's shadow from being
   * rendered. To prevent this, call `Entity.SetShadowSize(0)` in
   * `ModCallback.POST_FAMILIAR_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarRender(
   *   familiar: EntityFamiliar,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_FAMILIAR_RENDER = 1080,

  /**
   * Fires before a NPC is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the NPC
   * from being rendered.
   *
   * Preventing a NPC from being rendered doesn't prevent the NPC's shadow from being rendered. To
   * prevent this, call `Entity.SetShadowSize(0)` in `ModCallback.POST_NPC_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCRender(npc: EntityNPC, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_NPC_RENDER = 1081,

  /**
   * Fires before a player is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * player from being rendered.
   *
   * Preventing a player from being rendered doesn't prevent the player's shadow from being
   * rendered. To prevent this, call `Entity.SetShadowSize(0)` in
   * `ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerRender(player: EntityPlayer, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_PLAYER_RENDER = 1082,

  /**
   * Fires before a pickup is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * pickup from being rendered.
   *
   * Preventing a pickup from being rendered doesn't prevent the pickup's shadow from being
   * rendered. To prevent this, call `Entity.SetShadowSize(0)` in `ModCallback.POST_PICKUP_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupRender(pickup: EntityPickup, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_PICKUP_RENDER = 1083,

  /**
   * Fires before a tear is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * tear from being rendered.
   *
   * Preventing a tear from being rendered doesn't prevent the tear's shadow from being rendered. To
   * prevent this, call `Entity.SetShadowSize(0)` in `ModCallback.POST_TEAR_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearRender(tear: EntityTear, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_TEAR_RENDER = 1084,

  /**
   * Fires before a projectile is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * projectile from being rendered.
   *
   * Preventing a projectile from being rendered doesn't prevent the projectile's shadow from being
   * rendered. To prevent this, call `Entity.SetShadowSize(0)` in
   * `ModCallback.POST_PROJECTILE_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileRender(
   *   projectile: EntityProjectile,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_PROJECTILE_RENDER = 1085,

  /**
   * Fires before a knife is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * knife from being rendered.
   *
   * Preventing a knife from being rendered doesn't prevent the knife's shadow from being rendered.
   * To prevent this, call `Entity.SetShadowSize(0)` in `ModCallback.POST_KNIFE_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preKnifeRender(knife: EntityKnife, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_KNIFE_RENDER = 1086,

  /**
   * Fires before an effect is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * effect from being rendered.
   *
   * Preventing a effect from being rendered doesn't prevent the effect's shadow from being
   * rendered. To prevent this, call `Entity.SetShadowSize(0)` in `ModCallback.POST_EFFECT_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   *
   * ```ts
   * function preEffectRender(effect: EntityEffect, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_EFFECT_RENDER = 1087,

  /**
   * Fires before a bomb is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * bomb from being rendered.
   *
   * Preventing a bomb from being rendered doesn't prevent the bomb's shadow from being rendered. To
   * prevent this, call `Entity.SetShadowSize(0)` in `ModCallback.POST_BOMB_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombRender(bomb: EntityBomb, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_BOMB_RENDER = 1088,

  /**
   * Fires before an `EntitySlot` is rendered.
   *
   * Return a `Vector` to modify the render offset. Alternatively, return `false` to prevent the
   * slot from being rendered.
   *
   * Preventing a slot from being rendered doesn't prevent the slot's shadow from being rendered. To
   * prevent this, call `Entity.SetShadowSize(0)` in `ModCallback.POST_SLOT_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotRender(slot: EntitySlot, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_SLOT_RENDER = 1089,

  /**
   * Fires after an `EntitySlot` is rendered.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotRender(slot: EntitySlot, offset: Vector): void {}
   * ```
   */
  POST_SLOT_RENDER = 1090,

  /**
   * Fires after the player's hearts are rendered on the HUD.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postPlayerHUDRenderHearts(
   *   offset: Vector,
   *   heartsSprite: Sprite,
   *   position: Vector,
   *   spriteScale: float,
   *   player: EntityPlayer
   * ): void {}
   * ```
   */
  POST_PLAYER_HUD_RENDER_HEARTS = 1091,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerApplyInnateCollectibleNumber(
   *   modCount: int,
   *   player: EntityPlayer,
   *   collectible: CollectibleType,
   *   onlyCountTrueItems: boolean
   * ): int | undefined {}
   * ```
   */
  PRE_PLAYER_APPLY_INNATE_COLLECTIBLE_NUMBER = 1092,

  /**
   * Fires before a jingle plays.
   *
   * Return `Music` to override the jingle being played. Alternatively, return `false` to prevent
   * the jingle from playing.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Music` provided.
   *
   * ```ts
   * function preMusicPlayJingle(music: Music): Music | boolean | undefined {}
   * ```
   */
  PRE_MUSIC_PLAY_JINGLE = 1094,

  /**
   * Fires after a collectible has been removed from a player.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postCollectibleRemoved(
   *   player: EntityPlayer,
   *   collectible: CollectibleType,
   *   removeFromPlayerForm: boolean, wisp: boolean
   * ): void {}
   * ```
   */
  POST_COLLECTIBLE_REMOVED = 1095,

  /**
   * Fires after a trinket has been added to a player.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function postTrinketAdded(
   *   player: EntityPlayer,
   *   trinket: TrinketType,
   *   firstTimePickingUp: boolean
   * ): void {}
   * ```
   */
  POST_TRINKET_ADDED = 1096,

  /**
   * Fires after a trinket has been removed from a player.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function postTrinketRemoved(player: EntityPlayer, trinket: TrinketType): void {}
   * ```
   */
  POST_TRINKET_REMOVED = 1097,

  /**
   * Fires after the a weapon's attack is triggered.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `WeaponType` provided.
   *
   * ```ts
   * function postTriggerWeaponFired(
   *   fireDirection: Vector,
   *   fireAmount: int,
   *   owner: Entity,
   *   weapon: Weapon
   * ): void {}
   * ```
   */
  POST_TRIGGER_WEAPON_FIRED = 1098,

  /**
   * Fires after the level's layout has been generated.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postLevelLayoutGenerated(levelGenerator: LevelGenerator): void {}
   * ```
   */
  POST_LEVEL_LAYOUT_GENERATED = 1099,

  /**
   * Fires before a grid entity is spawned outside of room initialization.
   *
   * The `desc` argument is undefined in most cases. The exceptions to this are poops spawned by the
   * Mole enemy, grid entities spawned with `Room.TurnGold`, and grid entities spawned via the
   * modding API.
   *
   * Return `false` to prevent the grid entity from spawning. Alternatively, return a
   * `GridEntityDesc` to override the grid entity. Alternatively, return an array with the following
   * elements to modify it:
   * - `Type`: The `GridEntityType` to override.
   * - `Variant`: The variant to override.
   * - `Vardata`: The vardata to override.
   * - `SpawnSeed`: The spawn seed to override.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   *  function preGridEntitySpawn(
   *   gridEntityType: GridEntityType,
   *   variant: int,
   *   varData: int,
   *   gridIndex: int,
   *   spawnSeed: Seed,
   *   desc: GridEntityDesc | undefined,
   * ):
   *   | GridEntityDesc
   *   | boolean
   *   | [ type?: GridEntityType, variant?: int, vardata?: int, spawnSeed?: Seed ]
   *   | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPAWN = 1100,

  /**
   * Fires after a grid entity has spawned in the room.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpawn(grid: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_SPAWN = 1101,

  /**
   * Fires each frame the nightmare scene renders.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postNightmareSceneRender(): void {}
   * ```
   */
  POST_NIGHTMARE_SCENE_RENDER = 1102,

  /**
   * Fires when the Nightmare Screen first appears on the screen.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postNightmareSceneShow(isDogmaNightmare: boolean): void {}
   * ```
   */
  POST_NIGHTMARE_SCENE_SHOW = 1103,

  /**
   * Fires before the game selects which stage to load, usually when entering a trapdoor.
   *
   * Return an array with the following elements to override the selected stage:
   * - `levelStage`: The `LevelStage` to override.
   * - `stageType`: The `StageType` to override.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preLevelSelect(
   *   levelStage: LevelStage,
   *   stageType: StageType
   * ): [levelStage?: LevelStage, stageType?: StageType] | undefined {}
   * ```
   */
  PRE_LEVEL_SELECT = 1104,

  /**
   * Fires each frame the weapon updates.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `WeaponType` provided.
   *
   * ```ts
   * function postWeaponFire(
   *   weapon: Weapon,
   *   fireDirection: Vector,
   *   isShooting: boolean,
   *   isInterpolated: boolean
   * ): void {}
   */
  POST_WEAPON_FIRE = 1105,

  /**
   * Fires before the walls of the backdrop are rendered.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropRenderWalls(wallColor: Color): void {}
   * ```
   */
  PRE_BACKDROP_RENDER_WALLS = 1106,

  /**
   * Fires before the floor of the backdrop is rendered.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropRenderFloor(floorColor: Color): void {}
   * ```
   */
  PRE_BACKDROP_RENDER_FLOOR = 1107,

  /**
   * Fires before the water is rendered.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropRenderWater(): void {}
   * ```
   */
  PRE_BACKDROP_RENDER_WATER = 1108,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postBackdropPreRenderWalls(): void {}
   * ```
   */
  POST_BACKDROP_PRE_RENDER_WALLS = 1109,

  /**
   * Fires when the game first calculates the chance to spawn a Planetarium by checking if the
   * current floor is valid. By default, the game prevents Planetariums from spawning after Chapter
   * 3 (or Chapter 4 with Telescope Lens).
   *
   * Return false to bypass the stage penalty and allow the Planetarium chance to be calculated as
   * normal.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyStagePenalty(): boolean | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_STAGE_PENALTY = 1110,

  /**
   * Fires after `ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_STAGE_PENALTY` and when the chance
   * penalty is applied. The penalty locks the planetarium chance to 1% (or 10% with Telescope Lens)
   * if a Planetarium has been entered before.
   *
   * Return false to bypass the planetarium chance penalty.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyPlanetariumPenalty(): void {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_PLANETARIUM_PENALTY = 1111,

  /**
   * Fires after `ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_PLANETARIUM_PENALTY` and when the game
   * applies the Treasure Room visit penalty. By default, the game applies a penalty depending on
   * how many Treasure Rooms have been visited. If the amount of treasure rooms entered is greater
   * than or equal to the current stage number, the chance will be locked at 1% (or 10% with
   * Telescope Lens).
   *
   * Return an integer to override how many Treasure Rooms has been visited. Alternatively, return
   * false to bypass the Treasure Room visit penalty.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyTreasureRoomPenalty(
   *  treasureRoomsVisited: int,
   * ): boolean | int | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_TREASURE_ROOM_PENALTY = 1112,

  /**
   * Fires after `ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_TREASURE_ROOM_PENALTY` and when the
   * game modifies the Planetarium chance from items such as Crystal Ball and Magic 8 Ball.
   *
   * This callback only applies a flat chance after all penalties have been applied. To modify the
   * base chance, use `ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_TELESCOPE_LENS`.
   *
   * Return a float to modify the chance.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyItems(chance: float): float | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_ITEMS = 1113,

  /**
   * Fires after `ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_ITEMS` and when the game calculates
   * the additional 9% chance from having Telescope Lens.
   *
   * Return a float to modify the chance.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyTelescopeLens(chance: float): float | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_TELESCOPE_LENS = 1114,

  /**
   * Fires after `ModCallbackRepentogon.PRE_PLANETARIUM_APPLY_TELESCOPE_LENS` and when the final
   * planetarium chance is calculated.
   *
   * Return a float to modify the final chance.
   *
   * ```ts
   * function prePlanetariumCalculateFinal(chance: float): float | undefined {}
   * ```
   */
  PRE_PLANETARIUM_CALCULATE_FINAL = 1115,

  /**
   * Fires before a spritesheet is loaded.
   *
   * Return an array with the following elements to override the replacement:
   * - `layerId`: The layer ID to override.
   * - `fileName`: The `.png` file to override.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function preReplaceSpritesheet(layerID: int, fileName: string): [layerId?: int, pngFileName?: string] | undefined {}
   * ```
   */
  PRE_REPLACE_SPRITESHEET = 1116,

  /**
   * Fires after a spritesheet has been loaded.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function preReplaceSpritesheet(layerID: int, fileName: string): void {}
   * ```
   */
  POST_REPLACE_SPRITESHEET = 1117,

  /**
   * Fires before the hearts UI is rendered on the player's HUD.
   *
   * Return `true` to prevent the hearts from rendering.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerHUDRenderHearts(
   *   offset: Vector,
   *   heartsSprite: Sprite,
   *   position: Vector,
   *   spriteScale: float,
   *   player: EntityPlayer
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_HUD_RENDER_HEARTS = 1118,

  /**
   * Fires before an active item is rendered on the player's HUD. Return true to prevent the item
   * from rendering.
   *
   * Return `true` to prevent the active item from rendering. Alternatively, return an object with
   * the following fields to modify how the item renders:
   * - `HideItem`: Determines whether the item should be hidden from the active slot or not.
   * - `HideOutline`: Determines whether the item outline should be hidden or not.
   * - `HideChargeBar`: Determines whether the chargebar should be hidden or not.
   * - `CropOffset`: Determines the rectangular area of the active item that will be rendered in the
   *   active slot.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function prePlayerHudRenderActiveItem(
   *   player: EntityPlayer,
   *   slot: ActiveSlot,
   *   position: Vector,
   *   alpha: float,
   *   scale: number,
   *   chargeBarPosition: Vector,
   * ):
   *   | {
   *       HideItem?: boolean;
   *       HideOutline?: boolean;
   *       HideChargeBar?: boolean;
   *       CropOffset?: Vector;
   *     }
   *   | boolean
   *   | undefined {}
   * ```
   */
  PRE_PLAYER_HUD_RENDER_ACTIVE_ITEM = 1119,

  /**
   * Fires whenever a command with its autocomplete type set to `AutocompleteType.CUSTOM` is being
   * autocompleted in the console.
   *
   * Return an array to determine what is listed in the autocomplete suggestions. Each element can
   * be a string, which only shows the name of the suggestion, or an array of two strings, where the
   * first element is the name of the suggestion and the second element is the description.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function consoleAutocomplete(
   *   command: string,
   *   params: string
   * ): Array<string | [name: string, description: string]>| undefined {}
   * ```
   */
  CONSOLE_AUTOCOMPLETE = 1120,

  /**
   * Fries after an `EntitySlot` spawns.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotInit(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_INIT = 1121,

  /**
   * Fires after an `EntitySlot` updates.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotUpdate(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_UPDATE = 1122,

  /**
   * Fires before an `EntitySlot` spawns random pickups when blown up.
   *
   * Return `false` to prevent the drops from being created.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotCreateExplosionDrops(slot: EntitySlot): boolean | undefined {}
   * ```
   */
  PRE_SLOT_CREATE_EXPLOSION_DROPS = 1123,

  /**
   * Fires after an `EntitySlot` spawns random pickups when blown up.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCreateExplosionDrops(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_CREATE_EXPLOSION_DROPS = 1124,

  /**
   * Fires before an `EntitySlot` sets its prize collectible. This is used by Shell Game, Hell Game,
   * and Crane Game.
   *
   * Return a `CollectibleType` to override the prize collectible.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotSetPrizeCollectible(
   *   slot: EntitySlot,
   *   collectible: CollectibleType
   * ): CollectibleType | undefined {}
   * ```
   */
  PRE_SLOT_SET_PRIZE_COLLECTIBLE = 1125,

  /**
   * Fires after an `EntitySlot` sets its prize collectible. This is used by Shell Game, Hell Game,
   * and Crane Game.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCreateExplosionDrops(slot: EntitySlot, collectible: CollectibleType): void {}
   * ```
   */
  POST_SLOT_SET_PRIZE_COLLECTIBLE = 1126,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function prePlayerLevelInitStats(player: EntityPlayer): void {}
   * ```
   */
  PRE_PLAYER_LEVEL_INIT_STATS = 1127,

  /**
   * Fires after a player's `HealthType` changes, but before their existing health is corrected to
   * fit the new health type. After the callback runs, if the player's new health type doesn't
   * support Red Heart containers, they will automatically be converted to an appropriate type.
   *
   * You may modify the player's health differently within this callback, such as removing the heart
   * containers entirely.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerHealthTypeChange(
   *   player: EntityPlayer,
   *   newHealthType: HealthType,
   *   previousHealthType: HealthType,
   *   defaultHealthType: HealthType
   * ): void {}
   * ```
   */
  POST_PLAYER_HEALTH_TYPE_CHANGE = 1128,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postForcePillEffect(pillEffect: PillEffect, pillColor: PillColor): void {}
   * ```
   */
  POST_FORCE_ADD_PILL_EFFECT = 1129,

  /**
   * Fires when the game starts to tally up vanilla items for calculating the chance of Devil and
   * Angel Deals. This is called before the stage penalty is applied.
   *
   * Return a float to modify the chance in this step of the calculation.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilApplyItems(chance: number): number | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_ITEMS = 1130,

  /**
   * Fires after `ModCallbackRepentogon.PRE_DEVIL_APPLY_ITEMS` is called and when the game
   * calculates the stage penalty if a Devil or Angel Deal has appeared on a previous floor.
   *
   * Return false to prevent the stage penalty from being applied.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilApplyStagePenalty(): boolean | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_STAGE_PENALTY = 1131,

  /**
   * Fires after `ModCallbackRepentogon.PRE_DEVIL_APPLY_STAGE_PENALTY`is called and when the game
   * calculates the chance from items which bypasses the stage penalty such as Goat Head and
   * Eucharist.
   *
   * Return a float to modify the chance in this step of the calculation.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilApplySpecialItems(chance: number): number | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_SPECIAL_ITEMS = 1132,

  /**
   * Fires after `ModCallbackRepentogon.PRE_DEVIL_APPLY_SPECIAL_ITEMS`. This is the final step of
   * calculating the Devil and Angel Deal chance.
   *
   * Return a float to modify the final chance.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilCalculateFinal(chance: number): number | undefined {}
   * ```
   */
  PRE_DEVIL_CALCULATE_FINAL = 1133,

  /**
   * Fires when a Giantbook begins to play its animation.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GiantbookType` provided.
   *
   * ```ts
   * function postItemOverlayShow(
   *   giantbook: GiantbookType,
   *   delay: int,
   *   player: EntityPlayer
   * ): void {}
   * ```
   */
  POST_ITEM_OVERLAY_SHOW = 1134,

  /**
   * Fires before the game begins to render its contents.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preRender(): void {}
   * ```
   */
  PRE_RENDER = 1135,

  /**
   * Fires before a room is placed in the level layout.
   *
   * Return a `RoomConfigRoom` to override the room being placed. The new `RoomShape` must be the
   * same, and the new available door slots must be compatible with the original room doors.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preLevelPlaceRoom(
   *   slot: LevelGeneratorRoom,
   *   roomConfig: RoomConfigRoom,
   *   seed: Seed
   * ): RoomConfigRoom | undefined {}
   * ```
   */
  PRE_LEVEL_PLACE_ROOM = 1137,

  /**
   * Fires after room clear effects have been triggered for a specific player.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerTriggerRoomClear(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_TRIGGER_ROOM_CLEAR = 1138,

  /**
   * Fires each frame after the Giantbook renders on the screen.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GiantbookType` provided.
   *
   * ```ts
   * function postItemOverlayRender(giantbook: GiantbookType): void {}
   * ```
   */
  POST_ITEM_OVERLAY_RENDER = 1139,

  /**
   * Fires after an active item has been discharged.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postDischargeActiveItem(
   *   collectible: CollectibleType,
   *   collectibleRemoved: boolean,
   *   player: EntityPlayer,
   *   slot: ActiveSlot
   * ): void {}
   * ```
   */
  POST_DISCHARGE_ACTIVE_ITEM = 1140,

  /**
   * Fires before a backdrop changes.
   *
   * Return a `BackdropType` to override the backdrop being set.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropChange(backdrop: BackdropType): BackdropType | undefined {}
   * ```
   */
  PRE_BACKDROP_CHANGE = 1141,

  /**
   * Fires after a backdrop has changed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BackdropType` provided.
   *
   * ```ts
   * function postBackdropChange(backdrop: BackdropType): void {}
   * ```
   */
  POST_BACKDROP_CHANGE = 1142,

  /**
   * Fires after room clear effects has been triggered.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postRoomTriggerClear(playSound: boolean): void {}
   * ```
   */
  POST_ROOM_TRIGGER_CLEAR = 1143,

  /**
   * Fires after a player drops a trinket onto the ground from their inventory.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function postPlayerDropTrinket(
   *   trinketType: TrinketType,
   *   dropPos: Vector,
   *   player: EntityPlayer,
   *   isGoldenTrinket: boolean,
   *   replacedTrinket: boolean
   * ): void {}
   */
  POST_PLAYER_DROP_TRINKET = 1144,

  /**
   * Fires before the lighting alpha is set.
   *
   * Return a number to modify the lighting alpha. It is recommended to return a value between 0 and
   * 1.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preGetLightingAlpha(float: number): float | undefined {}
   * ```
   */
  PRE_GET_LIGHTING_ALPHA = 1150,

  /**
   * Fires before a grid entity's lighting is rendered.
   *
   * Return a `Vector` to override the render offset. Alternatively, return `false` to prevent the
   * lighting from rendering.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preRenderGridLighting(
   *   grid: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_GRID_LIGHTING = 1151,

  /**
   * Fires before an entity's lighting is rendered.
   *
   * Return a `Vector` to override the render offset. Alternatively, return `false` to prevent the
   * lighting from rendering.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preRenderEntityLighting(
   *   entity: Entity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_ENTITY_LIGHTING = 1152,

  /**
   * Fires before the player is updated.
   *
   * Return `true` to prevent the player from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerUpdate(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_UPDATE = 1160,

  /**
   * Fires before the tear is updated.
   *
   * Return `true` to prevent the tear from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearUpdate(tear: EntityTear): boolean | undefined {}
   * ```
   */
  PRE_TEAR_UPDATE = 1161,

  /**
   * Fires before the familiar is updated.
   *
   * Return `true` to prevent the familiar from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarVariant(familiar: EntityFamiliar): boolean | undefined {}
   * ```
   */
  PRE_FAMILIAR_UPDATE = 1162,

  /**
   * Fires before the bomb is updated.
   *
   * Return `true` to prevent the bomb from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombUpdate(bomb: EntityBomb): boolean | undefined {}
   * ```
   */
  PRE_BOMB_UPDATE = 1163,

  /**
   * Fires before the pickup is updated.
   *
   * Return `true` to prevent the pickup from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupUpdate(pickup: EntityPickup): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_UPDATE = 1164,

  /**
   * Fires before the knife is updated.
   *
   * Return `true` to prevent the knife from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preKnifeUpdate(knife: EntityKnife): boolean | undefined {}
   * ```
   */
  PRE_KNIFE_UPDATE = 1165,

  /**
   * Fires before the projectile is updated.
   *
   * Return `true` to prevent the projectile from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileUpdate(projectile: EntityProjectile): boolean | undefined {}
   * ```
   */
  PRE_PROJECTILE_UPDATE = 1166,

  /**
   * Fires before the laser is updated.
   *
   * Return `true` to prevent the laser from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function preLaserUpdate(laser: EntityLaser): boolean | undefined {}
   * ```
   */
  PRE_LASER_UPDATE = 1167,

  /**
   * Fires before the effect is updated.
   *
   * Return `true` to prevent the effect from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   *
   * ```ts
   * function preEffectUpdate(effect: EntityEffect): boolean | undefined {}
   * ```
   */
  PRE_EFFECT_UPDATE = 1168,

  /**
   * Fires before the `EntitySlot` is updated.
   *
   * Return `true` to prevent the `EntitySlot` from updating, ignoring its internal AI.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotUpdate(slot: EntitySlot): boolean | undefined {}
   * ```
   */
  PRE_SLOT_UPDATE = 1169,

  /**
   * Fires before a player collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerGridCollision(
   *   player: EntityPlayer,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_GRID_COLLISION = 1171,

  /**
   * Fires after the player collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerGridCollision(
   *   player: EntityPlayer,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): void {}
   * ```
   */
  POST_PLAYER_GRID_COLLISION = 1172,

  /**
   * Fires before the tear collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preTearGridCollision(
   *   tear: EntityTear,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_TEAR_GRID_COLLISION = 1173,

  /**
   * Fires after the tear collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearGridCollision(
   *   tear: EntityTear,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): void {}
   * ```
   */
  POST_TEAR_GRID_COLLISION = 1174,

  /**
   * Fires before the familiar collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarGridCollision(
   *   familiar: EntityFamiliar,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_FAMILIAR_GRID_COLLISION = 1175,

  /**
   * Fires after the familiar collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarGridCollision(
   *   familiar: EntityFamiliar,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): void {}
   * ```
   */
  POST_FAMILIAR_GRID_COLLISION = 1176,

  /**
   * Fires before the bomb collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombGridCollision(
   *   bomb: EntityBomb,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_BOMB_GRID_COLLISION = 1177,

  /**
   * Fires before the bomb collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombGridCollision(
   *   bomb: EntityBomb,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): void {}
   * ```
   */
  POST_BOMB_GRID_COLLISION = 1178,

  /**
   * Fires before the pickup collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupGridCollision(
   *   pickup: EntityPickup,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_GRID_COLLISION = 1179,

  /**
   * Fires after the pickup collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupGridCollision(
   *   pickup: EntityPickup,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): void {}
   * ```
   */
  POST_PICKUP_GRID_COLLISION = 1180,

  /**
   * Fires before the projectile collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileGridCollision(
   *   projectile: EntityProjectile,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_PROJECTILE_GRID_COLLISION = 1181,

  /**
   * Fires after the projectile collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileGridCollision(
   *   projectile: EntityProjectile,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): void {}
   * ```
   */
  POST_PROJECTILE_GRID_COLLISION = 1182,

  /**
   * Fires before the NPC collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCGridCollision(
   *   npc: EntityNPC,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_NPC_GRID_COLLISION = 1183,

  /**
   * Fires after the NPC collides with a grid entity.
   *
   * `gridEntity` can be undefined as it's possible for a grid collision to happen if the tile's
   * `GridPath` value is >= 1000.
   *
   * Use this over Isaacscript Common's `ModCallbackCustom.POST_GRID_ENTITY_COLLISION` callback as
   * this callback offers significantly better performance than the former.
   *
   * Return `true` to ignore the collision.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCGridCollision(
   *   npc: EntityNPC,
   *   gridIndex: int,
   *   gridEntity: GridEntity | undefined
   * ): void {}
   * ```
   */
  POST_NPC_GRID_COLLISION = 1184,

  /**
   * Fires before the player's active item is morphed from the 'M trinket. Return false to prevent
   * the item from being rerolled. Return a `CollectibleType` to override what the item rerolls
   * into.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preMMorphActive(
   *   player: EntityPlayer,
   *   collectible: CollectibleType
   * ): CollectibleType | boolean | undefined {}
   * ```
   */
  PRE_M_MORPH_ACTIVE = 1190,

  /**
   * Fires before an NPC is split from the Meat Cleaver item effect. Return true to prevent the NPC
   * from splitting. NPCs will still take damage from the Meat Cleaver even if you return true.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCSplit(npc: EntityNPC, isBlacklisted: boolean): boolean | undefined {}
   * ```
   */
  PRE_NPC_SPLIT = 1191,

  /**
   * Fires when a grid entity spawns during room initialization. This does not fire for grid
   * entities spawned after room initialization or floor decorations. If you wish to modify those,
   * use `ModCAllbackRepentogon.PRE_GRID_ENTITY_SPAWN` instead.
   *
   * Return `false` to prevent the grid entity from spawning. Alternatively, return an array with
   * the following fields to modify the grid entity being spawned:
   * - `gridType`: The type of grid entity to spawn.
   * - `variant`: The variant of the grid entity to spawn.
   * - `varData`: The `VarData` of the grid entity to spawn.
   * - `spawnSpeed`: The grid entity's spawn seed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preRoomGridEntitySpawn(
   *   gridEntityType: GridEntityType,
   *   variant: int,
   *   varData: int,
   *   gridIndex: int,
   *   spawnSeed: Seed,
   * ):
   *   | boolean
   *   | [gridType?: GridEntityType, variant?: int, varData?: int, spawnSeed?: Seed]
   *   | undefined {}
   * ```
   */
  PRE_ROOM_GRID_ENTITY_SPAWN = 1192,

  /**
   * Fires before a new room is loaded.
   *
   * While a `room` object is provided, the callback fires before the new room is fully initialized.
   * Therefore, many functions may not work as intended and are considered to be unstable.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preNewRoom(room: Room, descriptor: RoomDescriptor): void {}
   * ```
   */
  PRE_NEW_ROOM = 1200,

  /**
   * Fires before the Mega Satan ending cutscene plays, forcibly ending the game.
   *
   * Return `true` to prevent the ending from occurring, guaranteeing a portal to the Void.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preMegaSatanEnding(): boolean | undefined {}
   * ```
   */
  PRE_MEGA_SATAN_ENDING = 1201,

  /**
   * Fires after all mods have their Lua scripts loaded. This is ideal for implementing mod
   * compatibility without abusing load order in `metadata.xml`.
   *
   * ```ts
   * function postModsLoaded(): void {}
   * ```
   */
  POST_MODS_LOADED = 1210,

  /**
   * Fires before a NPC morphs.
   *
   * Return `false` to prevent the NPC from morphing. Alternatively, return an array with the
   * following elements to override the morph:
   * - `entityType`: The new `EntityType` for the NPC.
   * - `variant`: The new variant for the NPC.
   * - `subType`: The new sub type for the NPC.
   * - `championColor`: Optional. The new `ChampionColor` for the NPC.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preNPCMorph(
   *   npc: EntityNPC,
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   championColor: ChampionColor,
   * ):
   *   | boolean
   *   | [
   *       entityType?: EntityType,
   *       variant?: int,
   *       subType?: int,
   *       championColor?: ChampionColor,
   *     ]
   *   | undefined {}
   * ```
   */
  PRE_NPC_MORPH = 1212,

  /**
   * Fires before a pickup morphs.
   *
   * Return `false` to prevent the pickup from morphing. Alternatively, return an array with the
   * following elements to override the morph:
   * - `entityType`: The new `EntityType` for the entity.
   * - `variant`: The new variant for the pickup.
   * - `subType`: The new sub type for the pickup.
   * - `keepPrice`: Optional. Whether to keep the pickup's price.
   * - `keepSeed`: Optional. Whether to keep the pickup's `InitSeed`.
   * - `ignoreModifiers`: Optional. Whether to ignore the pickup's modifiers when morphing.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePickupMorph(
   *   pickup: EntityPickup,
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   keepPrice: boolean,
   *   keepSeed: boolean,
   *   ignoreModifiers: boolean,
   * ):
   *   | boolean
   *   | [
   *       entityType: EntityType,
   *       variant: int,
   *       subType: int,
   *       keepPrice?: boolean,
   *       keepSeed?: boolean,
   *       ignoreModifiers?: boolean,
   *     ]
   *   | undefined {}
   * ```
   */
  PRE_PICKUP_MORPH = 1213,

  /**
   * Fires after a NPC morphs.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postNPCMorph(
   *   npc: EntityNPC,
   *   previousType: EntityType,
   *   previousVariant: int,
   *   previousSubType: int
   * ): void {}
   * ```
   */
  POST_NPC_MORPH = 1214,

  /**
   * Fires after a pickup morphs.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postPickupMorph(
   *   pickup: EntityPickup,
   *   previousType: EntityType,
   *   previousVariant: int,
   *   previousSubType: int,
   *   keptPrice: boolean,
   *   keptSeed: boolean,
   *   ignoredModifiers: boolean
   * ): void {}
   * ```
   */
  POST_PICKUP_MORPH = 1215,

  /**
   * Fires before the completion marks render on the screen.
   *
   * Return `false` to prevent the completion marks from rendering.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preCompletionMarksRender(
   *   completionMarksSprite: Sprite,
   *   renderPos: Vector,
   *   renderScale: Vector
   *   playerType: PlayerType
   * ): boolean | undefined {}
   * ```
   */
  PRE_COMPLETION_MARKS_RENDER = 1216,

  /**
   * Fires after the completion marks render on the screen.
   *
   * ```ts
   * function postCompletionMarksRender(
   *   completionMarksSprite: Sprite,
   *   renderPos: Vector,
   *   renderScale: Vector
   *   playerType: PlayerType
   * ): void {}
   * ```
   */
  POST_COMPLETION_MARKS_RENDER = 1217,

  /**
   * Fires before the pause screen renders on the screen.
   *
   * Return `false` to prevent the pause screen from rendering. Doing so will also prevent the
   * screen from darkening.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePauseScreenRender(pauseBody: Sprite, pauseStats: Sprite): boolean | undefined {}
   * ```
   */
  PRE_PAUSE_SCREEN_RENDER = 1218,

  /**
   * Fires after the pause screen renders on the screen.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postPauseScreenRender(pauseBody: Sprite, pauseStats: Sprite): void {}
   * ```
   */
  POST_PAUSE_SCREEN_RENDER = 1219,

  /**
   * Fires when the player is about to place a bomb. Return false to prevent the bomb from being
   * placed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerUseBomb(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_USE_BOMB = 1220,

  /**
   * Fires after the player places a bomb.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerUseBomb(player: EntityPlayer, bomb: EntityBomb): void {}
   * ```
   */
  POST_PLAYER_USE_BOMB = 1221,

  /**
   * Fires whenever a NPC selects its target, such as when `EntityNPC.GetPlayerTarget` is called.
   *
   * Return an `Entity` to override the target selected.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCPickTarget(npc: EntityNPC, target: Entity): Entity | undefined {}
   * ```
   */
  PRE_NPC_PICK_TARGET = 1222,

  /**
   * Fires when a Dark Red Champion NPC regenerates from a pile of goo.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCDarkRedChampionRegen(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_DARK_RED_CHAMPION_REGEN = 1223,

  /**
   * Fires when a custom cache flag is being evaluated. Return a number to set the value of the
   * custom cache flag.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function evaluateCustomCache(
   *   player: EntityPlayer,
   *   customCacheTag: string,
   *   value: number
   * ): number | undefined {}
   * ```
   */
  EVALUATE_CUSTOM_CACHE = 1224,

  /**
   * Fires when a familiar's multiplier is being evaluated. Return a number to override the
   * familiar's multiplier.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function evaluateFamiliarMultiplier(
   *   familiar: EntityFamiliar,
   *   multiplier: number,
   *   player: EntityPlayer
   * ): number | undefined {}
   * ```
   */
  EVALUATE_FAMILIAR_MULTIPLIER = 1225,

  /**
   * Fires when the player's stats are being calculated. This should not be confused with
   * `ModCallback.EVALUATE_CACHE`, which fires when a `CacheFlag` is being evaluated.
   *
   * Unless you want to perform complicated conditions/calculations, it's strongly recommended that
   * you use REPENTOGON's XML item stats features over this callback.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EvaluateStatStage` provided.
   *
   * ```ts
   * function evaluateStat(player: EntityPlayer, stat: EvaluateStatStage, value: number): void {}
   * ```
   *
   * @see https://repentogon.com/xml/items.html
   */
  EVALUATE_STAT = 1226,

  /**
   * Fires after a player collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerCollision(
   *   player: EntityPlayer,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_PLAYER_COLLISION = 1231,

  /**
   * Fires after a tear collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearCollision(tear: EntityTear, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_TEAR_COLLISION = 1233,

  /**
   * Fires after a familiar collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarCollision(
   *   familiar: EntityFamiliar,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_FAMILIAR_COLLISION = 1235,

  /**
   * Fires after a bomb collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombCollision(bomb: EntityBomb, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_BOMB_COLLISION = 1237,

  /**
   * Fires after a pickup collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupCollision(pickup: EntityPickup, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_PICKUP_COLLISION = 1239,

  /**
   * Fires before an `EntitySlot` collides with an entity.
   *
   * Return `true` to ignore the collision and prevent collision effects from being ran. Return
   * `false` to allow the collision but prevent collision effects from being ran. Alternatively,
   * return an object with any of the following optional fields to modify the collision behavior:
   * - `Collide`: Whether the familiar should collide with the collider.
   * - `SkipCollisionEffects`: Whether to skip running collision effects.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotCollision(
   *   slot: EntitySlot,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_SLOT_COLLISION = 1240,

  /**
   * Fires after an `EntitySlot` collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCollision(
   *   slot: EntitySlot,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_SLOT_COLLISION = 1241,

  /**
   * Fires after a knife collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function postKnifeCollision(knife: EntityKnife, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_KNIFE_COLLISION = 1243,

  /**
   * Fires after a projectile collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileCollision(
   *   projectile: EntityProjectile,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_PROJECTILE_COLLISION = 1245,

  /**
   * Fires after a NPC collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCCollision(npc: EntityNPC, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_NPC_COLLISION = 1247,

  /**
   * Fires before a laser collides with an entity.
   *
   * Return `true` to ignore the collision.
   *
   * Fires when an `EntityLaser` is about to collide with an entity. Return true to prevent the
   * collision from happening.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function preLaserCollision(laser: EntityLaser, collider: Entity): boolean | undefined {}
   * ```
   */
  PRE_LASER_COLLISION = 1248,

  /**
   * Fires after a laser collides with an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function postLaserCollision(laser: EntityLaser, collider: Entity): void {}
   * ```
   */
  POST_LASER_COLLISION = 1249,

  /**
   * Fires after `EntityPickup.GetCoinValue` is called to determine the value of a coin pickup.
   *
   * Return an integer to override the coin's value, modifying the amount of coins it gives on
   * pickup.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CoinSubType` provided.
   *
   * ```ts
   * function getCoinValue(coin: EntityPickup): int | undefined {}
   * ```
   */
  GET_COIN_VALUE = 1250,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function prePlayerGetMultiShotParams(
   *   player: EntityPlayer,
   *   multiShotParams: MultiShotParams,
   *   weaponType: WeaponType
   * ): MultiShotParams | undefined {}
   * ```
   *
   * @deprecated Use `ModCallbackRepentogon.EVALUATE_MULTI_SHOT_PARAMS` instead.
   */
  PRE_PLAYER_GET_MULTI_SHOT_PARAMS = 1251,

  /**
   * Fires when a familiar fires a tear.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarFireProjectile(tear: EntityTear): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_PROJECTILE = 1252,

  /**
   * Fires when a player fires a Dr. Fetus bomb.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBomb(bomb: EntityBomb): void {}
   * ```
   */
  POST_FIRE_BOMB = 1253,

  /**
   * Fires when the player fires the Bone Club. This is only called when the club is initially
   * spawned, not when it's swung or thrown.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBoneClub(knife: EntityKnife): void {}
   * ```
   */
  POST_FIRE_BONE_CLUB = 1254,

  /**
   * Fires when a player fires a Brimstone laser.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBrimstone(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_BRIMSTONE = 1255,

  /**
   * Fires when a player fires a Brimstone ball.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBrimstoneBall(ball: EntityEffect): void {}
   * ```
   */
  POST_FIRE_BRIMSTONE_BALL = 1256,

  /**
   * Fires when the player fires a knife from Mom's Knife.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireKnife(knife: EntityKnife): void {}
   * ```
   */
  POST_FIRE_KNIFE = 1257,

  /**
   * Fires when the player swings the Spirit Sword.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireSword(sword: EntityKnife): void {}
   * ```
   */
  POST_FIRE_SWORD = 1258,

  /**
   * Fires when the player fires a Tech laser.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireTechLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_TECH_LASER = 1259,

  /**
   * Fires when the player fires a Tech X laser.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireTechXLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_TECH_X_LASER = 1260,

  /**
   * Fires when the familiar fires a Brimstone laser.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarFireBrimstone(laser: EntityLaser): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_BRIMSTONE = 1261,

  /**
   * Fires when the familiar fires a Tech laser.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarFireTechLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_TECH_LASER = 1262,

  /**
   * Fires when `Room.IsPersistentRoomEntity` is called.
   *
   * Return `true` to allow the entity to respawn.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function getIsPersistentRoomEntity(
   *   entityType: EntityType,
   *   variant: int
   * ): boolean | undefined {}
   * ```
   */
  GET_IS_PERSISTENT_ROOM_ENTITY = 1263,

  /**
   * Fires before a trinket is rendered on the player's HUD. Return true to prevent the trinket from
   * rendering. You can return an object with various fields to override how the trinket renders on
   * the HUD.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketSlot` provided.
   *
   * ```ts
   * function prePlayerHUDRenderTrinket(
   *   position: Vector,
   *   scale: number,
   *   player: EntityPlayer,
   *   cropOffset: Vector
   * ): { Position?: Vector, Scale?: number, CropOffset?: Vector } | boolean | undefined {}
   * ```
   */
  PRE_PLAYER_HUD_RENDER_TRINKET = 1264,

  /**
   * Fires before a pickup is consumed from effects such as Void and Black Rune. Return false to
   * prevent the pickup from being consumed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupVoided(pickup: EntityPickup, isBlackRune: boolean): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_VOIDED = 1265,

  /**
   * Fires before a pickup is consumed from The Abyss. Return false to prevent the pickup from being
   * consumed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupVoidedAbyss(pickup: EntityPickup): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_VOIDED_ABYSS = 1266,

  /**
   * Fires before a pickup is consumed from Compost. Return false to prevent the pickup from being
   * consumed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupComposted(pickup: EntityPickup): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_COMPOSTED = 1267,

  /**
   * Fires after a `TemporaryEffect` of an `ItemConfigItem` is removed from a player.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postPlayerTriggerEffectRemoved(
   *   player: EntityPlayer,
   *   itemConfigItem: ItemConfigItem
   *   count: int
   * ): void {}
   * ```
   */
  POST_PLAYER_TRIGGER_EFFECT_REMOVED = 1268,

  /**
   * Fires after a `TemporaryEffect` of an `ItemConfigItem` is removed from the room.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postRoomTriggerEffectRemoved(itemConfig: ItemConfigItem): void {}
   * ```
   */
  POST_ROOM_TRIGGER_EFFECT_REMOVED = 1269,

  /**
   * Fires after the boss intro is initialized.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postBossIntroShow(boss1: BossID, boss2: BossID): void {}
   * ```
   */
  POST_BOSS_INTRO_SHOW = 1270,

  /**
   * Fires each frame the room transition animation updates.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RoomTransitionAnim` provided.
   *
   * ```ts
   * function postRoomTransitionUpdate(): void {}
   * ```
   */
  POST_ROOM_TRANSITION_UPDATE = 1271,

  /**
   * Fires each frame the room transition animation renders.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RoomTransitionAnim` provided.
   *
   * ```ts
   * function postRoomTransitionRender(): void {}
   * ```
   */
  POST_ROOM_TRANSITION_RENDER = 1272,

  /**
   * Fires after a `TemporaryEffect` is added to a player.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ItemConfigItem` provided.
   *
   * ```ts
   * function postPlayerAddEffect(
   *   player: EntityPlayer,
   *   itemConfigItem: ItemConfigItem,
   *   addCostume: boolean,
   *   count: int
   * ): void {}
   * ```
   */
  POST_PLAYER_ADD_EFFECT = 1273,

  /**
   * Fires after a `TemporaryEffect` is added to the room.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ItemConfigItem` provided.
   *
   * ```ts
   * function postRoomAddEffect(itemConfig: ItemConfigItem): void {}
   * ```
   */
  POST_ROOM_ADD_EFFECT = 1274,

  /**
   * Fires after `Game.BombDamage` is called. This is used by the game to damage entities within a
   * radius for explosions and similar effects.
   *
   * The optional third argument is used for the source entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postBombDamage(
   *   position: Vector,
   *   damage: number,
   *   radius: number,
   *   lineCheck: boolean,
   *   source: Entity | undefined,
   *   tearFlags: BitFlags<TearFlag>,
   *   damageFlags: BitFlags<DamageFlag>,
   *   damageSource: boolean
   * ): void {}
   * ```
   */
  POST_BOMB_DAMAGE = 1275,

  /**
   * Fires after `Game.BombTearflagEffects` is called. This is used by the game when `TearFlag`
   * based effects are triggered from an explosion.
   *
   * The optional third argument is used for the source entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postBombTearflagEffects(
   *   position: Vector,
   *   radius: number,
   *   tearFlags: BitFlags<TearFlag>,
   *   source: Entity | undefined,
   *   radiusMulti: number
   * ): void {}
   * ```
   */
  POST_BOMB_TEAR_FLAG_EFFECTS = 1276,

  /**
   * Fires before the effects of Tear Flags are applied to an enemy upon being hit or damaged.
   *
   * Return `false` to prevent the effects from being applied. Alternatively, return an object with
   * the following fields to override how the effects are applied:
   * - `Position`: The relevant position for the effects. Only used for specific `TearFlag` effects.
   * - `TearFlags`: The Tear Flags to apply.
   * - `Damage`: The damage of the Tear Flag effects.
   *
   * The optional `EntityType` third argument is used for the source entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preApplyTearFlagEffects(
   *   npc: EntityNPC,
   *   position: Vector,
   *   tearFlags: BitFlags<TearFlag>,
   *   source: Entity | undefined,
   *   damage: number,
   * ):
   *   | boolean
   *   | undefined
   *   | { Position?: Vector; TearFlags?: BitFlags<TearFlag>; Damage?: number } {}
   * ```
   */
  PRE_APPLY_TEAR_FLAG_EFFECTS = 1277,

  /**
   * Fires after the effects of Tear Flags are applied to an enemy upon being hit or damaged.
   *
   * The optional `EntityType` third argument is used for the source entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postApplyTearFlagEffects(
   *   npc: EntityNPC,
   *   position: Vector,
   *   tearFlags: BitFlags<TearFlag>,
   *   source: Entity | undefined,
   *   damage: number,
   * ): void {}
   * ```
   */
  POST_APPLY_TEAR_FLAG_EFFECTS = 1278,

  /**
   * Fires before a boss is selected for the floor.
   *
   * Return a `BossID` to override the selected boss.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BossID` provided.
   *
   * ```ts
   * function preBossSelect(
   *   bossID: BossID,
   *   bossPool: BossPool,
   *   levelStage: LevelStage,
   *   stageType: StageType
   * ): BossID | undefined {}
   * ```
   */
  PRE_BOSS_SELECT = 1280,

  /**
   * Fires before a costume is added to the player.
   *
   * Return `true` to prevent the costume from being added. Alternatively, return an
   * `ItemConfigItem` to replace the costume.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerAddCostume(
   *   itemConfig: ItemConfigItem,
   *   player: EntityPlayer,
   *   itemStateOnly: boolean
   * ): boolean | ItemConfigItem | undefined {}
   * ```
   */
  PRE_PLAYER_ADD_COSTUME = 1281,

  /**
   * Fires before the game tries to remove a costume from the player.
   *
   * Return `true` to prevent the costume from being removed.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerAddCostume(
   *   itemConfig: ItemConfigItem,
   *   player: EntityPlayer
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_REMOVE_COSTUME = 1282,

  /**
   * Fires after a costume is added to the player.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postPlayerAddCostume(
   *   itemConfig: ItemConfigItem,
   *   player: EntityPlayer,
   *   itemStateOnly: boolean
   * ): void {}
   * ```
   */
  POST_PLAYER_ADD_COSTUME = 1283,

  /**
   * Fires after a costume is removed from the player.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postPlayerAddCostume(
   *   itemConfig: ItemConfigItem,
   *   player: EntityPlayer
   * ): void {}
   * ```
   */
  POST_PLAYER_REMOVE_COSTUME = 1284,

  /**
   * Fires before the effects of sleeping on a bed are granted after the cutscene, such as healing.
   * Return true to prevent the effects from activating.
   *
   * This callback does not prevent the sleep cutscene from happening. To prevent this, use
   * `ModCallbackRepentogon.PRE_BED_SLEEP`.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preTriggerBedSleepEffect(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_TRIGGER_BED_SLEEP_EFFECT = 1285,

  /**
   * Fires after the effects of sleeping on a bed are granted after the cutscene, such as healing.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postTriggerBedSleepEffect(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  POST_TRIGGER_BED_SLEEP_EFFECT = 1286,

  /**
   * Fires before the player's pocket items are swapped. Return true to prevent them from swapping.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerPocketItemSwap(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_POCKET_ITEMS_SWAP = 1287,

  /**
   * Fires before the player sleeps on a bed after colliding with it. Return true to prevent the
   * player from sleeping on the bed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BedSubType` provided.
   *
   * ```ts
   * function preBedSleep(player: EntityPlayer, bed: EntityPickup): boolean | undefined {}
   * ```
   */
  PRE_BED_SLEEP = 1288,

  /**
   * Fires before the `MultiShotParams` for a player are updated.
   *
   * Return `MultiShotParams` to modify the parameters of the player's shooting behavior. The
   * modified `MultiShotParams` is passed along the remaining callbacks.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function evaluateMultiShotParams(
   *   player: EntityPlayer,
   *   multiShotParams: MultiShotParams,
   *   weaponType: WeaponType
   * ): MultiShotParams | undefined {}
   * ```
   */
  EVALUATE_MULTI_SHOT_PARAMS = 1289,

  /**
   * Fires when the game tries to get a random available room index on the floor.
   *
   * Return an integer to override the target room index.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preGetRandomRoomIndex(
   *   roomIndex: int,
   *   iAmErrorRoom: boolean,
   *   seed: Seed
   * ): int | undefined {}
   * ```
   */
  PRE_GET_RANDOM_ROOM_INDEX = 1290,

  /**
   * Fires after the Glowing Hourglass state is saved.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postGlowingHourglassSave(slot: int): void {}
   * ```
   */
  POST_GLOWING_HOURGLASS_SAVE = 1300,

  /**
   * Fires after the Glowing Hourglass state is loaded.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postGlowingHourglassSave(slot: int): void {}
   * ```
   */
  POST_GLOWING_HOURGLASS_LOAD = 1301,

  /**
   * Fires before the Glowing Hourglass state is saved.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preGlowingHourglassSave(slot: int): void {}
   * ```
   */
  PRE_GLOWING_HOURGLASS_SAVE = 1302,

  /**
   * Fires before the Glowing Hourglass state is loaded.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preGlowingHourglassLoad(slot: int): void {}
   * ```
   */
  PRE_GLOWING_HOURGLASS_LOAD = 1303,

  /**
   * Fires after the room saves all entities and grid entities.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postRoomSaveState(room: Room, roomDescriptor: RoomDescriptor): void {}
   * ```
   */
  POST_ROOM_SAVE_STATE = 1304,

  /**
   * Fires before the room respawns all saved entities.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preRoomRestoreState(room: Room, roomDescriptor: RoomDescriptor): void {}
   * ```
   */
  PRE_ROOM_RESTORE_STATE = 1305,

  /**
   * Fires after two rooms have been swapped due to the Curse of the Maze.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postSwapRooms(roomDesc1: RoomDescriptor, roomDesc2: RoomDescriptor): void {}
   * ```
   */
  POST_SWAP_ROOMS = 1306,

  /**
   * Fires when a room previously encountered on a floor has been saved. The saved room is restored
   * later to be used for the Ascent route.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postBackwardsRoomSave(
   *   stage: LevelStage,
   *   roomDesc: RoomDescriptor,
   *   id: string
   * ): void {}
   * ```
   */
  POST_BACKWARDS_ROOM_SAVE = 1307,

  /**
   * Fires when a room previously encountered on a floor is loaded back into the game during the
   * Ascent route.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postBackwardsRoomRestore(
   *   stage: LevelStage,
   *   roomDesc: RoomDescriptor,
   *   id: string
   * ): void {}
   * ```
   */
  POST_BACKWARDS_ROOM_RESTORE = 1308,

  /**
   * Fires before the character menu is rendered on the screen while a custom character is selected.
   * This callback does not trigger for vanilla characters.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderCustomCharacterMenu(
   *   playerType: PlayerType,
   *   renderPos: Vector,
   *   defaultSprite: Sprite
   * ): void {}
   * ```
   */
  PRE_RENDER_CUSTOM_CHARACTER_MENU = 1333,

  /**
   * Fires before the `LootList` of a pickup is selected.
   *
   * Return a `LootList` to override the loot list used for the pickup.
   *
   * ```ts
   * function prePickupGetLootList(
   * pickup: EntityPickup,
   * shouldAdvance: boolean
   * ) => LootList | undefined {}
   * ```
   */
  PRE_PICKUP_GET_LOOT_LIST = 1334,

  /**
   * Fires before the ghost pickup effect from Guppy's Eye updates. Return false to prevent the
   * ghost pickups from displaying.
   *
   * Return `false` to prevent the ghost pickups from being displayed.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function prePickupUpdateGhostPickups(pickup: EntityPickup) => boolean | undefined {}
   * ```
   */
  PRE_PICKUP_UPDATE_GHOST_PICKUPS = 1335,

  /**
   * Fires before a card is added to the player's inventory.
   *
   * Return `false` to prevent the card from being added. Alternatively, return a `CardType` to
   * override the card being added.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function prePlayerAddCard(
   *   player: EntityPlayer,
   *   cardType: CardType,
   *   slot: PillCardSlot
   * ): boolean | CardType | undefined {}
   * ```
   */
  PRE_PLAYER_ADD_CARD = 1350,

  /**
   * Fires after a card is added to the player's inventory.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function postPlayerAddCard(
   *   player: EntityPlayer,
   *   cardType: CardType,
   *   slot: PillCardSlot
   * ): void {}
   * ```
   */
  POST_PLAYER_ADD_CARD = 1351,

  /**
   * Fires before a pill is added to the player's inventory.
   *
   * Return `false` to prevent the pill from being added. Alternatively, return a `PillColor` to
   * override the pill being added.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillColor` provided.
   *
   * ```ts
   * function prePlayerAddPill(
   *   player: EntityPlayer,
   *   pillColor: PillColor,
   *   slot: PillCardSlot
   * ): boolean | PillColor | undefined {}
   * ```
   */
  PRE_PLAYER_ADD_PILL = 1352,

  /**
   * Fires after a pill is added to the player's inventory.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillColor` provided.
   *
   * ```ts
   * function postPlayerAddPill(
   *   player: EntityPlayer,
   *   pillColor: PillColor,
   *   slot: PillCardSlot
   * ): void {}
   * ```
   */
  POST_PLAYER_ADD_PILL = 1353,

  /**
   * Fires after a card is removed from the player's inventory.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function postPlayerRemoveCard(
   *   player: EntityPlayer,
   *   cardType: CardType,
   *   slot: PillCardSlot
   * ): void {}
   * ```
   */
  POST_PLAYER_REMOVE_CARD = 1354,

  /**
   * Fires after a pill is removed from the player's inventory.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillColor` provided.
   *
   * ```ts
   * function postPlayerRemovePill(
   *   player: EntityPlayer,
   *   pillColor: PillColor,
   *   slot: PillCardSlot
   * ): void {}
   * ```
   */
  POST_PLAYER_REMOVE_PILL = 1355,

  /**
   * Fires before the player picks up a card off the ground.
   *
   * Return `false` to prevent the card from being picked up.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function prePlayerCollectCard(
   *   player: EntityPlayer,
   *   pickup: EntityPickup
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_COLLECT_CARD = 1356,

  /**
   * Fires after the player picks up a card off the ground.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function postPlayerCollectCard(player: EntityPlayer, pickup: EntityPickup): void {}
   * ```
   */
  POST_PLAYER_COLLECT_CARD = 1357,

  /**
   * Fires before the player picks up a pill off the ground.
   *
   * Return `false` to prevent the pill from being picked up.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillColor` provided.
   *
   * ```ts
   * function prePlayerCollectPill(
   *   player: EntityPlayer,
   *   pickup: EntityPickup
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_COLLECT_PILL = 1358,

  /**
   * Fires after the player picks up a pill off the ground.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillColor` provided.
   *
   * ```ts
   * function postPlayerCollectPill(player: EntityPlayer, pickup: EntityPickup): void {}
   * ```
   */
  POST_PLAYER_COLLECT_PILL = 1359,

  /**
   * Fires after the player drops a card from their inventory.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function postPlayerDropCard(
   *   player: EntityPlayer,
   *   pickup: EntityPickup,
   *   slot: PillCardSlot
   * ): void {}
   * ```
   */
  POST_PLAYER_DROP_CARD = 1360,

  /**
   * Fires after the player drops a pill from their inventory.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillColor` provided.
   *
   * ```ts
   * function postPlayerDropPill(
   *   player: EntityPlayer,
   *   pickup: EntityPickup,
   *   slot: PillCardSlot
   * ): void {}
   * ```
   */
  POST_PLAYER_DROP_PILL = 1361,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDecorationUpdate(
   *   decoration: GridEntity
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DECORATION_UPDATE = 1400,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDecorationUpdate(decoration: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_DECORATION_UPDATE = 1401,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorUpdate(door: GridEntityDoor): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DOOR_UPDATE = 1402,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorUpdate(door: GridEntityDoor): void {}
   * ```
   */
  POST_GRID_ENTITY_DOOR_UPDATE = 1403,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.PRE_NPC_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorUpdate(fire: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_FIRE_UPDATE = 1404,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.POST_NPC_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorUpdate(fire: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_FIRE_UPDATE = 1405,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityGravityUpdate(gravity: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_GRAVITY_UPDATE = 1406,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityGravityUpdate(gravity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_GRAVITY_UPDATE = 1407,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityLockUpdate(lock: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_LOCK_UPDATE = 1408,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityLockUpdate(lock: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_LOCK_UPDATE = 1409,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPitUpdate(pit: GridEntityPit): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PIT_UPDATE = 1410,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPitUpdate(pit: GridEntityPit): void {}
   * ```
   */
  POST_GRID_ENTITY_PIT_UPDATE = 1411,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.PRE_NPC_UPDATE` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPoopUpdate(poop): GridEntityPoop): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_POOP_UPDATE = 1412,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.POST_NPC_UPDATE` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPoopUpdate(poop): GridEntityPoop): boolean | undefined {}
   * ```
   */
  POST_GRID_ENTITY_POOP_UPDATE = 1413,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPressurePlateUpdate(
   *   pressurePlate: GridEntityPressurePlate
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PRESSURE_PLATE_UPDATE = 1414,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPressurePlateUpdate(pressurePlate: GridEntityPressurePlate): void {}
   * ```
   */
  POST_GRID_ENTITY_PRESSURE_PLATE_UPDATE = 1415,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityRockUpdate(rock: GridEntityRock): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_ROCK_UPDATE = 1416,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityRockUpdate(rock: GridEntityRock): void {}
   * ```
   */
  POST_GRID_ENTITY_ROCK_UPDATE = 1417,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntitySpikesUpdate(spikes: GridEntitySpikes): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPIKES_UPDATE = 1418,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpikesUpdate(spikes: GridEntitySpikes): void {}
   * ```
   */
  POST_GRID_ENTITY_SPIKES_UPDATE = 1419,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStaircaseUpdate(staircase: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STAIRCASE_UPDATE = 1420,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStaircaseUpdate(staircase: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_STAIRCASE_UPDATE = 1421,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStatueUpdate(statue: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STATUE_UPDATE = 1422,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStatueUpdate(statue: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_STATUE_UPDATE = 1423,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTeleporterUpdate(
   *   teleporter: GridEntity
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TELEPORTER_UPDATE = 1424,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTeleporterUpdate(teleporter: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_TELEPORTER_UPDATE = 1425,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTrapdoorUpdate(trapdoor: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TRAPDOOR_UPDATE = 1426,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTrapdoorUpdate(trapdoor: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_TRAPDOOR_UPDATE = 1427,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWebUpdate(web: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WEB_UPDATE = 1428,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWebUpdate(web: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_WEB_UPDATE = 1429,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTNTUpdate(tnt: GridEntityTNT): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TNT_UPDATE = 1430,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTNTUpdate(tnt: GridEntityTNT): void {}
   * ```
   */
  POST_GRID_ENTITY_TNT_UPDATE = 1431,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntitySpikesRender(
   *   spikes: GridEntitySpikes,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPIKES_RENDER = 1432,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpikesRender(spikes: GridEntitySpikes, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_SPIKES_RENDER = 1433,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWebRender(
   *   web: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WEB_RENDER = 1434,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWebRender(spikes: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_WEB_RENDER = 1435,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTNTRender(
   *   tnt: GridEntityTNT,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TNT_RENDER = 1436,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTNTRender(web: GridEntityTNT, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_TNT_RENDER = 1437,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTrapdoorRender(
   *   trapdoor: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TRAPDOOR_RENDER = 1438,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTrapdoorRender(trapdoor: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_TRAPDOOR_RENDER = 1439,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStaircaseRender(
   *   staircase: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STAIRCASE_RENDER = 1440,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStaircaseRender(staircase: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_STAIRCASE_RENDER = 1441,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDecorationRender(
   *   decoration: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DECORATION_RENDER = 1444,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDecorationRender(
   *   decoration: GridEntity,
   *   offset: Vector
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_DECORATION_RENDER = 1445,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorRender(
   *   door: GridEntityDoor,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DOOR_RENDER = 1446,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorRender(door: GridEntityDoor, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_DOOR_RENDER = 1447,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.PRE_NPC_RENDER`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityFireRender(
   *   fire: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_FIRE_RENDER = 1448,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.POST_NPC_RENDER`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityFireRender(fire: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_FIRE_RENDER = 1449,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityLockRender(
   *   lock: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_LOCK_RENDER = 1450,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityLockRender(lock: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_LOCK_RENDER = 1451,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTeleporterRender(
   *   teleporter: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TELEPORTER_RENDER = 1452,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTeleporterRender(
   *   teleporter: GridEntity,
   *   offset: Vector
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_TELEPORTER_RENDER = 1453,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPitRender(
   *   pit: GridEntityPit,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PIT_RENDER = 1454,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPitRender(pit: GridEntityPit, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_PIT_RENDER = 1455,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.PRE_NPC_RENDER` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPoopRender(
   *   poop: GridEntityPoop,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_POOP_RENDER = 1456,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.POST_NPC_RENDER` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPoopRender(poop: GridEntityPoop, offset: Vector): void {}
   * ```
   */
  POOP_GRID_ENTITY_POOP_RENDER = 1457,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityRock` provided.
   *
   * ```ts
   * function preGridEntityRockRender(
   *   rock: GridEntityRock,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_ROCK_RENDER = 1458,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityRockRender(lock: GridEntityRock, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_ROCK_RENDER = 1459,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPressurePlateRender(
   *   pressurePlate: GridEntityPressurePlate,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PRESSURE_PLATE_RENDER = 1460,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPressurePlateRender(
   *   pressurePlate: GridEntityPressurePlate,
   *   offset: Vector
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_PRESSURE_PLATE_RENDER = 1461,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWallRender(
   *   wall: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WALL_RENDER = 1462,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWallRender(wall: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_WALL_RENDER = 1463,

  /**
   * Behaves like `ModCallback.INPUT_ACTION` except it only works on the main menu.
   *
   * Return a boolean to force whether to force an input if `hook` is `InputHook.IS_ACTION_PRESSED`
   * or `InputHook.IS_ACTION_TRIGGERED`, or return a float to override the value if `hook` is
   * `InputHook.GET_ACTION_VALUE`.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `InputHook` provided.
   *
   * ```ts
   * function menuInputAction(
   *   entity: Entity | undefined,
   *   hook: InputHook,
   *   buttonAction: ButtonAction
   * ): boolean | float | undefined {}
   * ```
   */
  MENU_INPUT_ACTION = 1464,

  /**
   * Fires before a status effect is applied to an entity.
   *
   * Return `false` to prevent the status effect from being applied.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `StatusEffect` provided.
   *
   * ```ts
   * function preStatusEffectApply(
   *  statusEffect: StatusEffect,
   *  entity: Entity,
   *  source: EntityRef,
   *  duration: int
   * ): boolean | undefined {}
   * ```
   */
  PRE_STATUS_EFFECT_APPLY = 1465,

  /**
   * Fires after a status effect is applied to an entity.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `StatusEffect` provided.
   *
   * ```ts
   * function preStatusEffectApply(
   *  statusEffect: StatusEffect,
   *  entity: Entity,
   *  source: EntityRef,
   *  duration: int
   * ): void {}
   * ```
   */
  POST_STATUS_EFFECT_APPLY = 1466,

  /**
   * Fires when a save slot is loaded by the game.
   *
   * This callback cannot be filtered.
   *
   * ```ts
   * function postSaveSlotLoad(saveSlot: int, isSlotSelected: boolean, rawSlot: int): void {}
   * ```
   */
  POST_SAVE_SLOT_LOAD = 1470,

  /**
   * Fires before a challenge is marked as completed.
   *
   * Return `false` to prevent the challenge from being marked as completed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Challenge` provided.
   *
   * ```ts
   * function preChallengeDone(challenge: Challenge, player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_CHALLENGE_DONE = 1471,

  /**
   * Fires after a challenge is marked as completed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Challenge` provided.
   *
   * ```ts
   * function postChallengeDone(challenge: Challenge, player: EntityPlayer): void {}
   * ```
   */
  POST_CHALLENGE_DONE = 1472,

  /**
   * Fires before `EntityFamiliar.CanCharm` is called. This is used ot determine whether the Siren
   * can charm a familiar.
   *
   * Return `false` to prevent the familiar from being charmed.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarCanCharm(familiar: EntityFamiliar): boolean | undefined {}
   * ```
   */
  PRE_FAMILIAR_CAN_CHARM = 1473,

  /**
   * Fires before the player gives birth to a familiar due to Cambion Conception. Return false to
   * prevent the player from spawning the familiar.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ConceptionFamiliarFlag` provided.
   *
   * ```ts
   * function prePlayerGiveBirthCambion(
   *   player: EntitYPlayer,
   *   flag: ConceptionFamiliarFlag
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_GIVE_BIRTH_CAMBION = 1474,

  /**
   * Fires before the player gives birth to a familiar due to Immaculate Conception. Return false to
   * prevent the player from spawning the familiar.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ConceptionFamiliarFlag` provided.
   *
   * ```ts
   * function prePlayerGiveBirthImmaculate(
   *   player: EntitYPlayer,
   *   flag: ConceptionFamiliarFlag
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_GIVE_BIRTH_IMMACULATE = 1475,

  /**
   * Fires after an achievement is unlocked.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Achievement` provided.
   *
   * ```ts
   * function postAchievementUnlock(achievement: Achievement): void {}
   * ```
   */
  POST_ACHIEVEMENT_UNLOCK = 1476,

  /**
   * Fires before the minimap is updated.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preMinimapUpdate(): void {}
   * ```
   */
  PRE_MINIMAP_UPDATE = 1477,

  /**
   * Fires after the minimap is updated.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postMinimapUpdate(): void {}
   * ```
   */
  POST_MINIMAP_UPDATE = 1478,

  /**
   * Fires before the minimap is rendered.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preMinimapRender(): void {}
   * ```
   */
  PRE_MINIMAP_RENDER = 1479,

  /**
   * Fires after the minimap is rendered.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postMinimapRender(): void {}
   * ```
   */
  POST_MINIMAP_RENDER = 1480,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function prePlayerRevive(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_REVIVE = 1481,

  /**
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerRevive(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_REVIVE = 1482,

  /**
   * Fires before a fortune is displayed on the screen.
   *
   * Return `false` to prevent the fortune from displaying.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preFortuneDisplay(): boolean | undefined {}
   * ```
   */
  PRE_FORTUNE_DISPLAY = 1483,

  /**
   * Fires before the item display text appears. Return false to prevent it from appearing.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preItemTextDisplay(
   *   title: string,
   *   subtitle: string,
   *   isSticky: boolean,
   *   isCurseDisplay: boolean
   * ): boolean | undefined {}
   * ```
   */
  PRE_ITEM_TEXT_DISPLAY = 1484,

  /**
   * Fires before a status effect target of an entity is set.
   *
   * Return an `Entity` to change targets.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function getStatusEffectTarget(entity: Entity): Entity | undefined {}
   * ```
   */
  GET_STATUS_EFFECT_TARGET = 1485,

  /**
   * Fires before the entity's color is set with `Entity.SetColor`. This callback does not fire if
   * the `Entity.Color` field is directly modified.
   *
   * Return `false` to prevent the color from being set. Alternatively, return a `Color` to override
   * the color set.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preEntitySetColor(
   *   entity: Entity,
   *   color: Color,
   *   duration: int,
   *   priority: int,
   *   fadeOut: boolean,
   *   share: boolean
   * ): Color | boolean | undefined {}
   * ```
   */
  PRE_ENTITY_SET_COLOR = 1486,

  /**
   * Fires after the entity's color is set with `Entity.SetColor`. This callback does not fire if
   * the `Entity.Color` field is directly modified.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postEntitySetColor(
   *   entity: Entity,
   *   color: Color,
   *   duration: int,
   *   priority: int,
   *   fadeOut: boolean,
   *   share: boolean
   * ): void {}
   * ```
   */
  POST_ENTITY_SET_COLOR = 1487,

  /**
   * Fires when a challenge/boss rush room wave starts.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postStartAmbushWave(bossAmbush: boolean): void {}
   * ```
   */
  POST_START_AMBUSH_WAVE = 1488,

  /**
   * Fires when a Greed Mode wave starts.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postStartGreedWave(): void {}
   * ```
   */
  POST_START_GREED_WAVE = 1489,

  /**
   * Fires before the player's `TearParams` object is calculated.
   *
   * Return a `TearParams` object to override the player's `TearParams` object. The modified
   * `TearParams` is passed along the remaining callbacks.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function evaluateTearHitParams(
   *   player: EntityPlayer,
   *   tearParams: TearParams
   *   weaponType: WeaponType,
   *   damageScale: float,
   *   tearDisplacement: int,
   *   source: Entity
   * ): TearParams | undefined {}
   * ```
   */
  EVALUATE_TEAR_HIT_PARAMS = 1490,

  /**
   * Fires before a chest is opened.
   *
   * Return `false` to prevent the chest from being opened.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function preOpenChest(
   *   chest: EntityPickup
   *   player: EntityPlayer | undefined
   * ): boolean | undefined {}
   * ```
   */
  PRE_OPEN_CHEST = 1491,

  /**
   * Fires after a chest is opened.
   *
   * When registering this callback with the `Mod.AddCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postOpenChest(
   *   chest: EntityPickup
   *   player: EntityPlayer | undefined
   * ): void {}
   * ```
   */
  POST_OPEN_CHEST = 1492,
}
