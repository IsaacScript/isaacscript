# `isaacscript-common`

The `isaacscript-common` package contains extra goodies that you can easily use in your [IsaacScript](https://isaacscript.github.io/) mods. Think of it as an expanded standard library beyond what the official Isaac API offers.

- For more information about IsaacScript, see the [official website](https://isaacscript.github.io/).
- Also see the [GitHub repository](https://github.com/IsaacScript/isaacscript-common) for `isaacscript-common`.

<br />

## Custom Callbacks

- The Isaac API offers a lot of callbacks, but a lot of times there isn't one for the specific thing that you are looking to do. So, `isaacscript-common` adds a bunch of new callbacks that you can use.
- The extra callbacks are efficient such that no code is ran until they have one or more subscriptions.
- See the [main website](https://isaacscript.github.io/docs/function-signatures-custom) for a full list.
- You must [upgrade your mod](modules/upgradeMod.md) before using a custom callback.

<br />

## Helper Functions

Don't copy-paste the same functions over and over in your mods. Simply use the standard library:

- [Array Functions](modules/functions_array.md)
- [Benchmark Functions](modules/functions_benchmark.md)
- [Bitwise Functions](modules/functions_bitwise.md)
- [Boss Functions](modules/functions_boss.md)
- [Cache Flag Functions](modules/functions_cacheFlag.md)
- [Card Functions](modules/functions_cards.md)
- [Challenge Functions](modules/functions_challenges.md)
- [Character Functions](modules/functions_character.md)
- [Charge Functions](modules/functions_charge.md)
- [Charge Bar Functions](modules/functions_chargeBar.md)
- [Collectible Functions](modules/functions_collectibles.md)
- [Collectible Cache Flag Functions](modules/functions_collectibleCacheFlag.md)
- [Collectible Set Functions](modules/functions_collectibleSet.md)
- [Collectible Tag Functions](modules/functions_collectibleTag.md)
- [Color Functions](modules/functions_color.md)
- [Debug Functions](modules/functions_debug.md)
- [Deep Copy Functions](modules/functions_deepCopy.md)
- [Door Functions](modules/functions_doors.md)
- [Easing Functions](modules/functions_easing.md)
- [Eden Functions](modules/functions_eden.md)
- [Entity Functions](modules/functions_entity.md)
- [Entity Specific-Type Functions](modules/functions_entitySpecific.md)
- [Entity Type Functions](modules/functions_entityTypes.md)
- [Enum Functions](modules/functions_enums.md)
- [Familiar Functions](modules/functions_familiars.md)
- [Flag Functions](modules/functions_flag.md)
- [Flying Functions](modules/functions_flying.md)
- [Globals Functions](modules/functions_globals.md)
- [Grid Entity Functions](modules/functions_gridEntity.md)
- [Grid Entity Specific-Type Functions](modules/functions_gridEntitySpecific.md)
- [Input Functions](modules/functions_input.md)
- [Isaac API Class Functions](modules/functions_isaacAPIClass.md)
- [JSON Functions](modules/functions_jsonHelpers.md)
- [JSON Room Functions](modules/functions_jsonRoom.md)
- [KColor Functions](modules/functions_kColor.md)
- [Language Functions](modules/functions_language.md)
- [Level Functions](modules/functions_level.md)
- [Log Functions](modules/functions_log.md)
- [Map Functions](modules/functions_map.md)
- [Math Functions](modules/functions_math.md)
- [NPC Functions](modules/functions_npc.md)
- [Pickup Functions](modules/functions_pickups.md)
- [Pickup Variant Functions](modules/functions_pickupVariants.md)
- [Pill Functions](modules/functions_pills.md)
- [Player Functions](modules/functions_player.md)
- [Player Data Structure Functions](modules/functions_playerDataStructures.md)
- [Player Health Functions](modules/functions_playerHealth.md)
- [Player Index Functions](modules/functions_playerIndex.md)
- [Pocket Item Functions](modules/functions_pocketItems.md)
- [Position & Velocity Functions](modules/functions_positionVelocity.md)
- [Random Functions](modules/functions_random.md)
- [Revive Functions](modules/functions_revive.md)
- [RNG Object Functions](modules/functions_rng.md)
- [Room Functions](modules/functions_rooms.md)
- [Room Data Functions](modules/functions_roomData.md)
- [Room Grid Functions](modules/functions_roomData.md)
- [Room Shape Functions](modules/functions_roomShape.md)
- [Run Functions](modules/functions_run.md)
- [Seed Functions](modules/functions_seeds.md)
- [Serialization Functions](modules/functions_serialization.md)
- [Set Functions](modules/functions_set.md)
- [Sound Functions](modules/functions_sound.md)
- [Spawn Collectible Functions](modules/functions_spawnCollectible.md)
- [Sprite Functions](modules/functions_sprite.md)
- [Stage Functions](modules/functions_stage.md)
- [String Functions](modules/functions_string.md)
- [Table Functions](modules/functions_table.md)
- [Tears Functions](modules/functions_tears.md)
- [Transformation Functions](modules/functions_transformations.md)
- [Trinket Functions](modules/functions_trinkets.md)
- [Trinket Cache Flag Functions](modules/functions_trinketCacheFlag.md)
- [Trinket Giving/Removing Functions](modules/functions_trinketGive.md)
- [TSTL Class Functions](modules/functions_tstlClass.md)
- [UI Functions](modules/functions_ui.md)
- [Utility Functions](modules/functions_utils.md)
- [Vector Functions](modules/functions_vector.md)

<br />

## Optional Features - Major

- [Save Data Manager](modules/features_saveDataManager_exports.md)
- [JSON Room Deployer](modules/features_deployJSONRoom.md)
- [Run in N Frames](modules/features_runInNFrames.md)
- [Extra Console Commands](modules/features_extraConsoleCommands_init.md) / [Command Documentation](modules/features_extraConsoleCommands_commands.md)
- [Character Stat Manager](modules/features_characterStats.md)
- [Character Health Conversion Manager](modules/features_characterHealthConversion.md)

<br />

## Optional Features - Minor

- [Cached Classes](modules/cachedClasses.md)
- [Input Disabler](modules/features_disableInputs.md)
- [Sound Disabler](modules/features_disableSound.md)
- [Fade-In Remover](modules/features_fadeInRemover.md)
- [Fast-Reset](modules/features_fastReset.md)
- [Debug Display](modules/features_debugDisplay_debugDisplay.md)
- [Forgotten Switcher](modules/features_forgottenSwitch.md)
- [Get Collectible Item Pool Type](modules/features_getCollectibleItemPoolType.md)
- [Pony Detection Functions](modules/features_isPonyActive.md)
- [Player Inventory Tracker](modules/features_playerInventory.md)
- [Prevent Collectible Rotate](modules/features_preventCollectibleRotate.md)
- [Siren Boss Functions](modules/features_sirenHelpers.md)
- [Tainted Lazarus Functions](modules/features_taintedLazarusPlayers.md)

## Extra Data Structures

- [DefaultMap](classes/classes_DefaultMap.DefaultMap.md)

<br />

## Extra Constants

- [Constants](modules/constants.md)
- [Constants (Max)](modules/constantsMax.md)

<br />
