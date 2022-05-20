# `isaacscript-common`

<!-- markdownlint-disable MD033 -->

The `isaacscript-common` package contains extra goodies that you can easily use in your [IsaacScript](https://isaacscript.github.io/) mods. Think of it as an expanded standard library beyond what the official Isaac API offers.

- For more information about IsaacScript, see the [official website](https://isaacscript.github.io/).
- Also see the [GitHub repository](https://github.com/IsaacScript/isaacscript-common) for `isaacscript-common`.

<br>

## Custom Callbacks

- The Isaac API offers a lot of callbacks, but a lot of times there isn't one for the specific thing that you are looking to do. So, `isaacscript-common` adds a bunch of new callbacks that you can easily use.
- The extra callbacks are efficient such that no code is ran until they have one or more subscriptions.
- See the [main website](https://isaacscript.github.io/docs/function-signatures-custom) for a full list.
- You must [upgrade your mod](modules/upgradeMod.html) before using a custom callback.

<br>

## Helper Functions

Don't copy-paste the same functions over and over in your mods. Simply use the standard library:

- [Array Functions](modules/functions_array.html)
- [Benchmark Functions](modules/functions_benchmark.html)
- [Bitwise Functions](modules/functions_bitwise.html)
- [Boss Functions](modules/functions_boss.html)
- [Cache Flag Functions](modules/functions_cacheFlag.html)
- [Card Functions](modules/functions_cards.html)
- [Challenge Functions](modules/functions_challenges.html)
- [Character Functions](modules/functions_character.html)
- [Charge Functions](modules/functions_charge.html)
- [Charge Bar Functions](modules/functions_chargeBar.html)
- [Collectible Functions](modules/functions_collectibles.html) & [Spawn Collectible Functions](modules/functions_spawnCollectible.html) & [Collectible Cache Flag Functions](modules/functions_collectibleCacheFlag.html) & [Collectible Set Functions](modules/functions_collectibleSet.html) & [Collectible Tag Functions](modules/functions_collectibleTag.html)
- [Color Functions](modules/functions_color.html)
- [Debug Functions](modules/functions_debug.html)
- [Deep Copy Functions](modules/functions_deepCopy.html)
- [Door Functions](modules/functions_doors.html)
- [Easing Functions](modules/functions_easing.html)
- [Entity Functions](modules/functions_entity.html)
- [Entity Specific-Type Functions](modules/functions_entitySpecific.html)
- [Entity Type Functions](modules/functions_entity_types.html)
- [Enum Functions](modules/functions_enums.html)
- [Familiar Functions](modules/functions_familiars.html)
- [Flag Functions](modules/functions_flag.html)
- [Flying Functions](modules/functions_flying.html)
- [Globals Functions](modules/functions_globals.html)
- [Grid Entity Functions](modules/functions_gridEntity.html)
- [Grid Entity Specific-Type Functions](modules/functions_gridEntitySpecific.html)
- [Input Functions](modules/functions_input.html)
- [Isaac API Class Functions](modules/functions_isaacAPIClass.html)
- [JSON Functions](modules/functions_jsonHelpers.html)
- [KColor Functions](modules/functions_kColor.html)
- [Language Functions](modules/functions_language.html)
- [Level Functions](modules/functions_level.html)
- [Log Functions](modules/functions_log.html)
- [Map Functions](modules/functions_map.html)
- [Math Functions](modules/functions_math.html)
- [NPC Functions](modules/functions_npc.html)
- [Pickup Functions](modules/functions_pickups.html)
- [Pickup Variant Functions](modules/functions_pickup_variants.html)
- [Pill Functions](modules/functions_pills.html)
- [Player Functions](modules/functions_player.html) & [Player Index Functions](modules/functions_playerIndex.html) & [Player Health Functions](modules/functions_playerHealth.html) & [Player Data Structure Functions](modules/functions_playerDataStructures.html)
- [Pocket Item Functions](modules/functions_pocketItems.html)
- [Position & Velocity Functions](modules/functions_positionVelocity.html)
- [Random Functions](modules/functions_random.html)
- [Revive Functions](modules/functions_revive.html)
- [RNG Object Functions](modules/functions_rng.html)
- [Room Functions](modules/functions_rooms.html)
- [Room Data Functions](modules/functions_roomData.html)
- [Room Grid Functions](modules/functions_roomData.html)
- [Room Shape Functions](modules/functions_roomShape.html)
- [Run Functions](modules/functions_run.html)
- [Seed Functions](modules/functions_seeds.html)
- [Serialization Functions](modules/functions_serialization.html)
- [Set Functions](modules/functions_set.html)
- [Sound Functions](modules/functions_sound.html)
- [Sprite Functions](modules/functions_sprite.html)
- [Stage Functions](modules/functions_stage.html)
- [String Functions](modules/functions_string.html)
- [Table Functions](modules/functions_table.html)
- [Tears Functions](modules/functions_tears.html)
- [Transformation Functions](modules/functions_transformations.html)
- [Trinket Functions](modules/functions_trinkets.html) & [Trinket Giving/Removing Functions](modules/functions_trinketGive.html) & [Trinket Set Functions](modules/functions_trinketSet.html) & [Trinket Cache Flag Functions](modules/functions_trinketCacheFlag.html)
- [TSTL Class Functions](modules/functions_tstlClass.html)
- [UI Functions](modules/functions_ui.html)
- [Utility Functions](modules/functions_utils.html)
- [Vector Functions](modules/functions_vector.html)

<br>

## Optional Features - Major

- [Save Data Manager](modules/features_saveDataManager_exports.html)
- [JSON Room Deployer](modules/features_deployJSONRoom.html)
- [Run in N Frames](modules/features_runInNFrames.html)
- [Extra Console Commands](modules/features_extraConsoleCommands_init.html) / [Command Documentation](modules/features_extraConsoleCommands_commands.html)
- [Character Stat Manager](modules/features_characterStats.html)
- [Character Health Conversion Manager](modules/features_characterHealthConversion.html)

<br>

## Optional Features - Minor

- [Cached Classes](modules/cachedClasses.html)
- [Input Disabler](modules/features_disableInputs.html)
- [Sound Disabler](modules/features_disableSound.html)
- [Fade-In Remover](modules/features_fadeInRemover.html)
- [Fast-Reset](modules/features_fastReset.html)
- [Debug Display](modules/features_debugDisplay.html)
- [Forgotten Switcher](modules/features_forgottenSwitch.html)
- [Get Collectible Item Pool Type](modules/features_getCollectibleItemPoolType.html)
- [Pony Detection Functions](modules/features_isPonyActive.html)
- [Player Inventory Tracker](modules/features_playerInventory.html)
- [Prevent Collectible Rotate](modules/features_preventCollectibleRotate.html)
- [Siren Boss Functions](modules/features_sirenHelpers.html)
- [Tainted Lazarus Functions](modules/features_taintedLazarusPlayers.html)

## Extra Data Structures

- [DefaultMap](classes/types_DefaultMap.DefaultMap.html)

<br>

## Extra Constants

- [Constants](modules/constants.html)
- [Constants (Max)](modules/constantsMax.html)

<br>
