The `isaacscript-common` package contains extra goodies that you can easily use in your [IsaacScript](https://isaacscript.github.io/) mods. Think of it as an expanded standard library beyond what the official Isaac API offers.

- For more information about IsaacScript, see the [official website](https://isaacscript.github.io/).
- Also see the [GitHub repository](https://github.com/IsaacScript/isaacscript-common) for `isaacscript-common`.

<br />

## Custom Callbacks

- The Isaac API offers a lot of callbacks, but a lot of times there isn't one for the specific thing that you are looking to do. So, `isaacscript-common` adds a bunch of new callbacks that you can easily use.
- The extra callbacks are efficient such that no code is ran until they have one or more subscriptions.
- See the [main website](https://isaacscript.github.io/docs/function-signatures-custom) for a full list.
- You must [upgrade your mod](modules/upgradeMod.html) before using a custom callback.

<br />

## Helper Functions

Don't copy-paste the same functions over and over in your mods. Simply use the standard library:

- [Array Functions](modules/functions_array.html)
- [Bitwise Functions](modules/functions_bitwise.html)
- [Card Functions](modules/functions_cards.html)
- [Challenge Functions](modules/functions_challenges.html)
- [Charge Functions](modules/functions_charge.html)
- [Collectible Functions](modules/functions_collectibles.html) & [Spawn Collectible Functions](modules/functions_spawnCollectible.html) & [Collectible Set Functions](modules/functions_collectibleSet.html)
- [Color Functions](modules/functions_color.html)
- [Debug Functions](modules/functions_debug.html)
- [Deep Copy Functions](modules/functions_deepCopy.html)
- [Door Functions](modules/functions_doors.html)
- [Entity Functions](modules/functions_entity.html)
- [Familiar Functions](modules/functions_familiars.html)
- [Flag Functions](modules/functions_flag.html)
- [Globals Functions](modules/functions_globals.html)
- [Grid Entity Functions](modules/functions_gridEntity.html)
- [Input Functions](modules/functions_input.html)
- [JSON Functions](modules/functions_json.html)
- [Language Functions](modules/functions_language.html)
- [Log Functions](modules/functions_log.html)
- [Math Functions](modules/functions_math.html)
- [NPC Functions](modules/functions_npc.html)
- [Pickup Functions](modules/functions_pickups.html)
- [Pill Functions](modules/functions_pills.html)
- [Player Functions](modules/functions_player.html) & [Player Health Functions](modules/functions_playerHealth.html)
- [Pocket Item Functions](modules/functions_pocketItems.html)
- [Position Functions](modules/functions_position.html)
- [Random Functions](modules/functions_random.html)
- [Revive Functions](modules/functions_revive.html)
- [Room Functions](modules/functions_rooms.html)
- [Seed Functions](modules/functions_seeds.html)
- [Sprite Functions](modules/functions_sprite.html)
- [Stage Functions](modules/functions_stage.html)
- [Tears Functions](modules/functions_tears.html)
- [Transformation Functions](modules/functions_transformations.html)
- [Trinket Functions](modules/functions_trinkets.html) & [Trinket Giving/Removing Functions](modules/functions_trinketGive.html) & [Trinket Set Functions](modules/functions_trinketSet.html)
- [UI Functions](modules/functions_ui.html)
- [Util Functions](modules/functions_util.html)
- [Vector Functions](modules/functions_vector.html)

<br />

## Optional Features and Abstractions

- [Save Data Manager](modules/features_saveDataManager_exports.html)
- [JSON Room Deployer](modules/features_deployJSONRoom.html)
- [Run in N Frames](modules/features_runInNFrames.html)
- [Input Disabler](modules/features_disableInputs.html)
- [Get Collectible Item Pool Type](modules/features_getCollectibleItemPoolType.html)
- [Prevent Collectible Rotate](modules/features_preventCollectibleRotate.html)
- [Forgotten Switcher](modules/features_forgottenSwitch.html)
- [Siren Boss Functions](modules/features_sirenHelpers.html)

<br />

## Extra Constants

- [Constants](modules/constants.html)

<br />

## Maps

- [Card Description Map](modules/maps_cardDescriptionMap.html)
- [Card Name Map](modules/maps_cardNameMap.html)
- [Collectible Description Map](modules/maps_collectibleDescriptionMap.html)
- [Collectible Name Map](modules/maps_collectibleNameMap.html)
- [Grid Entity XML Map](modules/maps_gridEntityXMLMap.html)
- [Pill Effect Name Map](modules/maps_pillEffectNameMap.html)
- [Room Shape to Top Left Wall Grid Index Map](modules/maps_roomShapeToTopLeftWallGridIndexMap.html)
- [Transformation Map](modules/maps_transformationMap.html)
- [Trinket Description Map](modules/maps_trinketDescriptionMap.html)
- [Trinket Name Map](modules/maps_trinketNameMap.html)
