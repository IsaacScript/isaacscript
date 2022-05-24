# IsaacScript Change Log

<!-- cspell:ignore Somdudewillson,Siramok -->

This page lists the changes to the IsaacScript framework.

## TODO

- [Fill in the rest of the history here.]

## November 21st, 2021

- The TypeScript definitions show now reflect the API for vanilla patch v1.7.6. (Thanks @KatTheFox)
- Added function definitions for the global functions provided by the Racing+ sandbox.
- Added the following helper functions:
  - `removeGridEntity`
  - `removeAllMatchingGridEntities`
  - `getLanguageName`
  - `getBombs`
  - `getEffects`
  - `getFamiliars`
  - `getKnives`
  - `getLasers`
  - `getPickups`
  - `getProjectiles`
  - `getTears`
  - `removeAllBombs`
  - `removeAllEffects`
  - `removeAllFamiliars`
  - `removeAllKnives`
  - `removeAllLasers`
  - `removeAllNPCs`
  - `removeAllPickups`
  - `removeAllProjectiles`
  - `removeAllTears`
  - `removeAllGridEntitiesExceptFor`
  - `addRoomClearCharges`
  - `addRoomClearCharge`
  - `addRoomClearChargeToSlot`
  - `playChargeSoundEffect`
  - `copyColor`
  - `copyKColor`
  - `copyVector`
  - `getDefaultColor`
  - `getDefaultKColor`
  - `getOneVector` (using this is safer than using the `Vector.One` variable because the variable can be overwritten or modified)
  - `getZeroVector` (using this is safer than using the `Vector.Zero` variable because the variable can be overwritten or modified)
  - `isPostBossVoidPortal`
  - `isSelfDamage`
  - `removeAllCollectibles`
  - `getHeartsUIWidth`
  - `getCollectibleDevilHeartPrice`
  - `getCollectibleItemType`
  - `addCollectibleCostume`
  - `addTrinketCostume`
  - `setLogFunctionsGlobal` (for easier debugging)
  - `setEntityRandomColor`
  - `getRandomHeartSubType`
  - `getRandomCard`
  - `isCard`
  - `isNotCardOrRune`
  - `isRune`
  - `getRandomRune`
  - `isAllPressurePlatesPushed`
  - `isAliveExceptionNPC`
  - `isRaglingDeathPatch`
  - `isBethany`
  - `getCollectibles`
  - `getEntities`
  - `getTrinkets`
  - `getSlots`
  - `getAzazelBrimstoneDistance`
  - `isMoveActionPressedOnAnyInput`
  - `isMoveActionTriggeredOnAnyInput`
  - `isShootActionPressedOnAnyInput`
  - `isShootActionTriggeredOnAnyInput`
  - `isDyingEggyWithNoSpidersLeft`
- Renamed the following helper functions:
  - `removeCostumeCollectible` --> `removeCollectibleCostume`
  - `removeCostumeTrinket` --> `removeTrinketCostume`
- Removed the `getLanguage` helper function. (You should now use `Options.Language` instead, which returns the language abbreviation / resource suffix.)
- The `getHUDOffsetVector` helper function will now use the vanilla `HUDOffset` setting (instead of the ModConfigMenu setting).
- The `getAliveBosses` and `getAliveNPCs` helper functions will now use an internal blacklist to exclude certain entities, such as Death's scythes or Big Horn holes.
- The `getNPCs` helper function now accepts optional arguments to match entity type, variant, and sub-type. It also accepts an optional argument to exclude friendly NPCs.
- Added the following constants:
  - `BOMB_EXPLODE_FRAME`
  - `UI_HEART_WIDTH`
  - `MAX_NUM_FAMILIARS`
  - `MOVEMENT_ACTIONS`
  - `SHOOTING_ACTIONS`
  - `AZAZEL_DEFAULT_BRIMSTONE_DISTANCE`
  - `EGGY_STATE_FRAME_OF_FINAL_SPIDER`
- Added the following enums:
  - `RenderMode`
  - `RoomDescriptorDisplayType` (to match the vanilla counterpart)
  - `RoomDescriptorFlag` (to match the vanilla counterpart)
  - `LanguageAbbreviation` (which corresponds to the string returned in `Options.Language`)
- Added `POOL_ULTRA_SECRET` to the `ItemPoolType` enum.
- Added the following custom callbacks:
  - `MC_POST_SLOT_DESTROYED`
- `MC_POST_GRID_ENTITY_INIT` and `MC_POST_GRID_ENTITY_REMOVE` now will fire on either the `MC_POST_UPDATE` frame or the `MC_POST_RENDER` frame, whichever happens first (instead of just the `MC_POST_UPDATE` frame). (This allows grid entities to be removed before any sprite shows up on the screen.)

## November 14th, 2021

- Added the updates from vanilla patch v1.7.5.
- The `TemporaryEffects.RemoveCollectibleEffect`, `TemporaryEffects.RemoveNullEffect`, and `TemporaryEffects.RemoveTrinketEffect` methods will now throw compiler errors since they are broken in patch v1.7.5.
- `ItemConfigItem.Name`, `ItemConfigCard.Name`, and `ItemConfigPillEffect.Name` will only work for modded items, so it is recommended to use the helper functions of `getCollectibleName`, `getTrinketName`, `getCardName`, and `getPillEffectName` until the next patch.
- `Isaac.CountEntities` is now a legal method.
- Added the following helper functions:
  - `getPlayerHealth`
  - `setPlayerHealth`
  - `setFamiliarNoSirenSteal` (thanks @KatTheFox)
  - `hasSirenStolenFamiliar` (thanks @KatTheFox)
  - `getFinalPlayer`
  - `getClosestEntityTo`
  - `getCardName`
  - `getPillEffectName`
  - `removeAllPlayerHealth`
  - `getLanguage`
- Renamed the following helper functions:
  - `removeItemFromItemTracker` --> `removeCollectibleFromItemTracker`
- The `getItemName` helper function has been split up into `getCollectibleName` and `getTrinketName`.
- Added the following constants:
  - `COLLECTIBLE_NAME_MAP`
  - `TRINKET_NAME_MAP`
  - `CARD_NAME_MAP`
  - `PILL_EFFECT_NAME_MAP`
  - `MAX_PLAYER_HEART_CONTAINERS`
- Added the following enums:
  - `PoopEntityVariant`
  - `PoopSpellType` (from vanilla)
  - `LaserSubType` (from vanilla)
- Renamed the following enums:
  - `PoopVariant` --> `PoopGridEntityVariant`
- Added more entries to the `LaserVariant` enum.
- Added `COLLECTIBLE_GLASS_EYE`, `COLLECTIBLE_STYE`, and `COLLECTIBLE_MOMS_RING` to the vanilla `CollectibleType` enum.
- Added the following custom callbacks:
  - `MC_POST_BOMB_INIT_LATE`
  - `MC_POST_EFFECT_INIT_LATE`
  - `MC_POST_FAMILIAR_INIT_LATE`
  - `MC_POST_KNIFE_INIT_LATE`
  - `MC_POST_NPC_INIT_LATE`
  - `MC_POST_PROJECTILE_INIT_LATE`
  - `MC_POST_TEAR_INIT_LATE`

## November 7th, 2021

IsaacScript will now insert the following at the beginning of every transpiled "main.lua" file so that people reading the code will be less confused:

```lua
--[[

This Isaac mod was created with the IsaacScript tool.

The Lua code in this file is not actually the source code for the program. Rather, it was
automatically generated from higher-level TypeScript code, and might be hard to read. If you want to
understand how the code in this mod works, you should read the actual TypeScript source code
directly instead of trying to read this file. Usually, the link to the source code can be found in
the mod's description on the Steam Workshop. If not, you can ask the mod author directly if the
source code is publicly available.

IsaacScript provides a lot of advantages over using raw Lua. For more information about the tool,
see the official website: https://isaacscript.github.io/

--]]
```

- IsaacScript will now correctly handle symlinks and alternate versions of VSCode. (Thanks @KatTheFox)
- Added the following helper functions:
  - `getRandomArrayIndex`
  - `arrayRemoveInPlace`
  - `getMaxTrinketID`
  - `getTrinketSet`
  - `spawnGiantPoop`
  - `spawnGridEntity`
  - `spawnGridEntityWithVariant`
  - `getAliveNPCs`
  - `directionToVector` (thanks @KatTheFox)
  - `removeCostumeCollectible`
  - `removeCostumeTrinket`
  - `arrayShuffle`
  - `arrayShuffleInPlace`
- Renamed the following helper functions:
  - `initArray` --> `arrayInit` (to be more consistent with the other array functions)
- The `seed` argument for `getRandomFloat`, `getRandomInt`, `initRNG`, `getRandomArrayElement`, and `getRandomArrayIndex` functions are now optional and will use `Random()` if no seed is specified.
- Added the following enums:
  - `RockState`
  - `PokyVariant`
  - `GaperVariant`
  - `GusherVariant`
  - `PooterVariant`
  - `ClottyVariant`
  - `MulliganVariant`
  - `ShopkeeperVariant`
  - `LarryJrVariant`
  - `HiveVariant`
  - `ChargerVariant`
  - `GlobinVariant`
  - `BoomFlyVariant`
  - `MawVariant`
  - `HostVariant`
  - `ChubVariant`
  - `HopperVariant`
  - `BoilVariant`
  - `SpittyVariant`
  - `LeaperVariant`
  - `MrMawVariant`
  - `BabyVariant`
  - `GutsVariant`
  - `KnightVariant`
  - `StoneHeadVariant`
  - `Monstro2Variant`
  - `SlothVariant`
  - `LustVariant`
  - `WrathVariant`
  - `GluttonyVariant`
  - `GreedVariant`
  - `EnvyVariant`
  - `PrideVariant`
  - `DopleVariant`
  - `LeechVariant`
  - `MemBrainVariant`
  - `ParaBiteVariant`
  - `EyeVariant`
  - `SuckerVariant`
  - `WarVariant`
  - `DukeVariant`
  - `LokiVariant`
  - `FistulaVariant`
  - `MomsHeartVariant`
  - `GurgleVariant`
  - `WalkingBoilVariant`
  - `HeartVariant`
  - `MaskVariant`
  - `WidowVariant`
  - `DaddyLongLegsVariant`
  - `ConstantStoneShooterVariant`
  - `BabyLongLegsVariant`
  - `CrazyLongLegsVariant`
  - `FattyVariant`
  - `SwingerVariant`
  - `DipVariant`
  - `SquirtVariant`
  - `SkinnyVariant`
  - `BonyVariant`
  - `HomunculusVariant`
  - `TumorVariant`
  - `NerveEndingVariant`
  - `GurglingVariant`
  - `GrubVariant`
  - `WallCreepVariant`
  - `RageCreepVariant`
  - `RoundWormVariant`
  - `ConjoinedFattyVariant`
  - `PolycephalusVariant`
  - `MegaSatanVariant`
  - `MoveableTNTVariant`
  - `UltraCoinVariant`
  - `StoneyVariant`
  - `PortalVariant`
  - `LeperVariant`
  - `MrMineVariant`
  - `RagManVariant`
  - `UltraGreedVariant`
  - `RagMegaVariant`
  - `BloodPuppyVariant`
  - `SubHorfVariant`
  - `PoltyVariant`
  - `PreyVariant`
  - `RockSpiderVariant`
  - `FlyBombVariant`
  - `DannyVariant`
  - `GyroVariant`
  - `FacelessVariant`
  - `MoleVariant`
  - `BigBonyVariant`
  - `GuttyFattyVariant`
  - `ExorcistVariant`
  - `WhipperVariant`
  - `PeeperFattyVariant`
  - `RevenantVariant`
  - `CanaryVariant`
  - `Gaper2Variant`
  - `Charger2Variant`
  - `EvisVariant`
  - `DumpVariant`
  - `NeedleVariant`
  - `CultistVariant`
  - `VisFattyVariant`
  - `GoatVariant`
  - `VisageVariant`
  - `SirenVariant`
  - `ScourgeVariant`
  - `ChimeraVariant`
  - `SingeVariant`
  - `RaglichVariant`
  - `ClutchVariant`
  - `GenericPropVariant`
  - `ConstantStoneShooterSubType`
- Added the following constants:
  - `ONE_BY_ONE_ROOM_GRID_SIZE`

## October 31st, 2021

- IsaacScript will now warn you if your mods directory is a symlink.
- Added the following helper functions:
  - `logTable`
  - `nextSeed`
- `getGridEntities` now accepts a variadic amount of arguments (instead of just one).
- Swapped the order of the arguments of `runInNFrames` so that it matches the ordering of the `setTimeout` function.

## October 24th, 2021

- Added several parts of the `isaacscript-common` library to the docs that were previously undocumented, including constants and features.
- Renamed the `getScreen` helper functions to have a `Pos` suffix so that they match the naming convention of the vanilla functions.
- Added the following enums:
  - `RockVariant`
  - `PitVariant`
- Added a `GRID_ENTITY_XML_MAP` constant (for converting between `GridEntityXMLType` and `GridEntityType` / variant).

## October 17th, 2021

- The IsaacScript watcher emoji eyes have been changed to the TypeScript logo.
- `isaacscript.json` now has two new optional options:
  - `customTargetModDirectoryName` - By default, the target mod directory name will be the same as the project directory name. This setting allows you to customize it.
  - `enableIsaacScriptWatcherAutoRestart` - When your code is recompiled, IsaacScript watcher can restart the game to ensure that any run-related variables are properly reset. This is set to true by default.
- The StageAPI definitions and the MinimapAPI definitions are now more complete. (Thanks @KatTheFox#3098)
- `CardConfigList.Get` will now cause a compiler error, since it returns useless userdata.
- Added the following helper functions:
  - `getLastHeart` (thanks @KatTheFox)
  - `getCircleDiscretizedPoints`

## October 10th, 2021

- Added the following helper functions:
  - `getKBitOfN`
  - `getNumBitsOfN`
  - `getRoomName`
  - `setBlindfold`
- Added the following constants:
  - `ISAAC_FRAMES_PER_SECOND`
  - `GAME_FRAMES_PER_SECOND`
- Added TypeScript definitions for the socket library.

## October 3rd, 2021

- Added the following helper functions:
  - `logColor`
  - `logKColor`

## September 26th, 2021

- Added the `hexToKColor` helper function.

## September 14th, 2021

- IsaacScript will now monkey patch your Lua code (after it is copied) to fix the `Map`/`Set` blowing-away issue.
  - This means that if you were disabling luaBundle for production builds, you can stop doing that.
  - And you can also un-namespace your mod directory if you did that as well.
  - I will remove the monkey patch code once TSTL fixes the bug upstream.
- There is a regression in the latest version of TSTL. If your `main.lua` file is no longer created inside of the mod directory, the fix is to do this:
  <https://github.com/IsaacScript/isaacscript/commit/d3dc85b8cdacb58b108641669fdb670492a296be>
- A particular bug that the monkey patch won't fix is that implicitly iterating over a `Map` (instead of `Map.entries()`), or iterating over a `Set` (instead of `Set.values()`) won't work anymore. Thus, you should change all of your code to be explicit.
- `isaacscript-lint` now contains a rule that warns on implicit `Map` or `Set` iteration. It comes with an auto-fixer so that all you have to do is save the file to fix the code.
- The save data manager now supports TSTL classes.
- Added a new linter rule to disallow void return types on unexported functions.
- Added the following helper functions:
  - `logMap`
  - `logSet`
  - `logArray`
  - `changeCollectibleSubType`
  - `inStartingRoom`
- The `getRoomIndexesForType` helper function now returns a `Set` (instead of an array).
- The `getDoors` helper function now takes an optional argument of `roomType`.
- The `getGridEntities` helper function now takes an optional argument of `gridEntityType` to narrow the returned array.
- Added the following enums:
  - `DeathsHeadVariant`
  - `RaglingVariant`
  - `VisVariant`
  - `DeathVariant`
  - `PeepVariant`
  - `BegottenVariant`
  - `MamaGurdyVariant`
  - `BigHornVariant`
  - `LittleHornVariant`
  - `ChargerVariant`

## September 7th, 2021

### `bundleEntry.ts`

- Before, `isaacscript init` set your bundle entry point in the `tsconfig.json` file to be `./src/main.ts`.
- Now, `isaacscript init` sets your bundle entry point to `bundleEntry.ts`, which in turn runs `main.ts`.

The reason for this is that any functions and variables that you declare in a TSTL bundle entry point will automatically become global variables. And you should (almost) never be creating any global variables. So, if you declare any functions or variables in your `main.ts` file, you can "fix" it by performing the following steps:

- In `tsconfig.json`, set `"luaBundleEntry": "./src/bundleEntry.ts"`
- Create `./src/bundleEntry.ts` and paste in: <https://github.com/IsaacScript/isaacscript/blob/main/file-templates/static/src/bundleEntry.ts>
- Put everything in your `main.ts` file into a `export default function main()` function

### `luaBundle`

I found an issue where if multiple IsaacScript mods are turned on at the same time, and they use maps, an issue with TSTL can cause map-related runtime errors to occur. Eventually, this bug should be fixed upstream, we just have to wait for them to fix it.

In the meantime, if you experience any map related errors with your production mod, the solution is to 1) turn `luaBundle` off in tsconfig.json, and 2) rename `bundleEntry.ts` to `main.ts` (see below).

Note that you don't want to do this in development, because having your mod split up into separate files will prevent `isaacscript-watcher` from hot-reloading your mod. Just change it before pushing out a production build.

That's all you technically need to do, but there is an additional gotcha. In Lua land, there is no concept of relative paths, which means that if you happen to have a file that is named exactly the same as someone else's file (like "globals.ts" or "util.ts"), it can cause conflicts. (This isn't just a problem for IsaacScript mods, it applies to _everyone_ making Isaac mods. It doesn't normally apply to IsaacScript mods though because everything is usually packed into a singe `main.lua`.)

So as an additional measure, you can namespace your entire mod into a subdirectory with the name of your mod:

```text
forgotten-fables/
└── src/ (TypeScript source code)
    ├── main.ts (with 1 line that just imports and runs "forgotten-fables/main")
    └── forgotten-fables/
        ├── main.ts (exporting a function to run)
        └── the rest of the code
```

This way, `./mod1/util.lua` won't "match" `./mod2/util.lua`, for example. Depending on how long it takes for TSTL to fix the bug, I can create tooling to automate most of this.

### `null` --> `undefined`

In the TypeScript definitions, all instances of `null` are now replaced with `undefined`.

Initially, I used `null` to represent `nil`, but this was an incorrect way to model the API because `null` is supposed to be an instantiated value that "exists" (even though it is transpiled to the same thing). In the future, TypeScriptToLua might transpile null to a real value, so I want to do this change now before that happens.

If you are upgrading to the latest version, this might be a breaking change, because code like the following:

```ts
const player2 = Isaac.GetPlayer(1); // player2 type is "EntityPlayer | null"
if (player2 === null) {
  return;
}
player2.AddHearts(1); // player2 type is "EntityPlayer"
```

Needs to be changed to:

```ts
const player2 = Isaac.GetPlayer(1); // player2 type is "EntityPlayer | undefined"
if (player2 === undefined) {
  return;
}
player2.AddHearts(1); // player2 type is "EntityPlayer"
```

You can still use `null` in your own variables, but make sure that it is for variables that you want to model as having an actual null-type defined value.

### Other

- Added the following helper functions:
  - `addTearsStat`
  - `getPlayerFromIndex`
  - `getVisibleHearts`
  - `getTotalCharge`
  - `isLost`
  - `getDeathAnimationName`
  - `getRoomIndexesForType`
  - `keyboardToString`
  - `controllerToString`
  - `inItLivesRoom`
  - `inBlueBabyRoom`
  - `inLambRoom`
  - `round`
  - `setCollectibleBlind`
  - `setCollectibleSprite`
  - `isChest`
  - `inDimension`
- Removed the following helper functions:
  - `getPlayerFromEntityPtr` (since `EntityPtr` is not serializable, `PlayerIndex` should be used instead)
- Renamed the following helper functions:
  - `isQuestItem` --> `isQuestCollectible`
- Added the following constants:
  - `SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES`
  - `MAX_ROOM_INDEX`
- Added the following enums:
  - `DaddyLongLegsState`
  - `ReapCreepState`
  - `BigHornState`
  - `DeathState`
  - `TrapdoorVariant`
  - `StairsVariant`
  - `PitfallVariant`
- Added the following custom callbacks:
  - `MC_POST_SLOT_INIT`
  - `MC_POST_SLOT_UPDATE`
  - `MC_POST_SLOT_RENDER`
- Added MinimapAPI definitions.

## August 31st, 2021

- Added the following helper functions:
  - `hasLostCurse`
  - `getPlayerCollectibleMap`
  - `getCollectibleList`
  - `temporarilyRemoveTrinkets`
  - `giveTrinketsBack`
  - `vectorToDirection` (thanks @KatTheFox)
  - `teleport` (use this instead of `Game.StartRoomTransition` so that you don't forget to set `Level.LeaveDoor`)
  - `forgottenSwitch` (requires an upgraded mod)
  - `getClosestPlayer`
  - `enableAllInputs`
  - `disableAllInputs`
  - `enableAllInputsExceptFor`
  - `disableAllInputsExceptFor`
  - `disableMovementInputs`
  - `disableShootingInputs`
  - `getBosses`
  - `arrayInArray`
  - `getAliveBosses`
  - `isKeeper`
  - `hasOpenActiveItemSlot`
  - `getTransformationsForItem`
  - `removeItemFromItemTracker`
  - `getPlayerFromEntityPtr`
  - `getPlayersOfType`
  - `getNewestPlayer`
  - `getCollectibleInitCharges`
  - `getCollectibleMaxCharges`
  - `isKeyboardPressed`
  - `runNextFrame`
  - `runInNFrames`
  - `logEntity`
- Renamed the following helper functions:
  - `getCollectibleList` --> `getCollectibleSet` (it now returns a `Set` instead of an array)
  - `getRoomNPCs` --> `getNPCs`
- Added the following constants:
  - `GOLDEN_TRINKET_SHIFT`
  - `TRANSFORMATION_TO_TAG_MAP`
  - `TRANSFORMATION_TO_ITEMS_MAP`
  - `ITEM_TO_TRANSFORMATION_MAP`
- Added the following enums:
  - `PurgatorySubType` (thanks @KatTheFox)
  - `DisplayFlag`
  - `HeavenLightDoorSubType`
  - `IsaacVariant` (thanks @KatTheFox)
- Added the following custom callbacks:
  - `MC_PRE_CUSTOM_REVIVE`
  - `MC_POST_CUSTOM_REVIVE`
  - `MC_POST_PLAYER_RENDER_REORDERED`
  - `MC_POST_PURCHASE`
- The save data manager will now properly handle TypeScriptToLua Sets.
- The save data manager now supports maps within maps.
- The save data manager now merges by iterating over the new table instead of the old object. This is necessary to capture values with a data type of `something | null`.
- The `addFlag`, `removeFlag`, and `hasFlag` functions are now variadic, meaning that you can pass N flags to them at a time.

## August 24th, 2021

- Added the following helper functions:
  - `isQuestItem`
  - `in2x1Room`
  - `inLRoom`
  - `anyEntityCloserThan`
  - `removeAllEntities`
  - `removeAllMatchingEntities`
  - `getSurroundingGridEntities`
  - `getRepentanceDoor`
  - `isRepentanceDoor`
  - `isDoorToDownpour`
  - `isDoorToMines`
  - `isDoorToMausoleum`
  - `isDoorToMausoleumAscent`
  - `isDoorToMomsHeart`
  - `getCurrentDimension`
  - `getEffectiveStage`
  - `isDevilRoomDoor`
  - `isAngelRoomDoor`
  - `getDevilRoomDoor`
  - `getAngelRoomDoor`
  - `getDevilOrAngelRoomDoor`
  - `logAllGameStateFlags`
  - `getRoomData`
  - `getRoomDataType`
  - `getRoomVariant`
  - `getRoomStageID`
  - `getRoomSubType`
  - `inGenesisRoom`
  - `isChildPlayer`
  - `removeDeadEyeMultiplier`
  - `willPlayerRevive` (the vanilla `EntityPlayer.WillPlayerRevive` function is broken and that you should use this helper function instead)
  - `willMysteriousPaperRevive`
  - `getFinalFrameOfAnimation`
  - `willReviveFromSpiritShackles`
  - `isJacobOrEsau`
  - `inBeastRoom`
- Added the following constants:
  - `DISTANCE_OF_GRID_SQUARE`
  - `DOOR_HITBOX_DISTANCE`
  - `MAX_PLAYER_SPEED_IN_UNITS`
  - `CHARACTERS_WITH_NO_RED_HEARTS`
  - `GENESIS_ROOM_VARIANT`
  - `GRID_INDEX_CENTER_OF_1X1_ROOM`
  - `MAX_PLAYER_POCKET_ITEM_SLOTS`
  - `MAX_PLAYER_TRINKET_SLOTS`
- Renamed the following constants:
  - `DISTANCE_OF_GRID_SQUARE` --> `DISTANCE_OF_GRID_TILE` (since that is the terminology that the game uses)
- Added the following enums:
  - `LadderSubType`
  - `PinVariant`
  - `DarkEsauVariant`
  - `PlayerItemAnimation`
  - `CollectibleAnimation`
  - `PocketItemSlot`
  - `TrinketSlot`
  - `ControllerIndex`
- Added the following custom callbacks:
  - `MC_POST_PICKUP_INIT_LATE`
  - `MC_POST_PICKUP_COLLECT`
  - `MC_POST_PLAYER_CHANGE_HEALTH`
  - `MC_POST_PLAYER_FATAL_DAMAGE`
  - `MC_POST_LASER_INIT_LATE`
  - `MC_POST_PLAYER_INIT_LATE`
- `GridEntity.Desc` is added back to the definitions, but only for the purposes of throwing a compiler error. (It is assigned a `never` type.) As per the developers, modders should always use `GridEntity.GetSaveState` instead of accessing `GridEntity.Desc` directly.
- Using `Level.GetCurrentRoomDesc` is now allowed again, since it is the only way to get the current dimension. It now returns a `RoomDescriptorReadOnly` class, which is a read-only version of the `RoomDescriptor` class. Every property of the new class has a JSDoc comment informing you to use the `Level.GetRoomByIdx` method instead.
- `GetPtrHash` now accepts a `RoomDescriptor` or a `RoomDescriptorReadOnly`.
- The `getRandomArrayElement` helper function now throws an error if you provide it an array with 0 elements.
- You can now pass an optional 2nd argument to the `upgradeMod` function to enable verbose logging at the beginning and end of every callback that fires. This can be useful to troubleshoot code that is causing the game to crash.
- Changed the return type of the `GetPtrHash` function from an `int` to a `PtrHash`, which is simply a branded number for better type safety and code clarity.
- The Save Data Manager will now automatically handle the special case where you are using number keys for a TSTL Map.
  - Without any special handling, the JSON serializer will interpret it as an array and insert N null elements for each skipped entry. This can lead to hundreds of thousands of null elements, which can crash the game.
  - The manager converts all number keys to strings when serializing, and then converts them back when deserializing.
- Changed the type of `RoomDescriptor.Data` from `RoomConfig` to `RoomConfig | null`, since it doesn't exist for some rooms until you enter them. You can also set it to null to delete an already-initialized room in certain circumstances.
- The `getEnumValues` helper function will now automatically sort the returned array.

## August 17th, 2021

- Added the following helper functions:
  - `isArray`
  - `isEven`
  - `isOdd`
  - `getPlayerIndexVanilla`
  - `isFirstPlayer`
  - `getMaxCollectibleID`
  - `collectibleHasTag`
  - `tableClear`
  - `initTransformationTracking`
  - `getPlayerNumTransformationCollectibles`
  - `isGlitchedCollectible`
  - `inAngelShop`
  - `isVector`
  - `onFinalFloor`
  - `getPlayerCloserThan`
  - `getPocketItems`
  - `hasOpenTrinketSlot`
  - `hasOpenPocketItemSlot`
  - `arrayToString`
  - `arraySum`
  - `isSecretRoomDoor`
  - `isHiddenSecretRoomDoor`
- Added the following constants:
  - `BEAST_ROOM_SUBTYPE`
  - `FIRST_TMTRAINER_COLLECTIBLE_TYPE`
  - `MAX_NUM_DOORS`
  - `MAX_NUM_INPUTS`
  - `MAX_VANILLA_COLLECTIBLE_TYPE`
- Renamed the following constants:
  - `FIRST_TMTRAINER_COLLECTIBLE_TYPE` --> `FIRST_GLITCHED_COLLECTIBLE_TYPE`
- Added the following custom callbacks:
  - `PostPlayerInitReordered`
  - `PostPlayerUpdateReordered`
- Added the following enums:
  - `DevilRoomSubType`
  - `AngelRoomSubType`
  - `BackwardsPathRoomSubType`
  - `HomeRoomSubType`
  - `TeleporterState`
  - `SatanVariant`
- The save data manager now supports maps:
  - Maps will automatically be converted to `LuaTable` upon saving to disk, and then automatically converted back when loading from disk.
  - Use `Map` instead of `LuaTable` to prevent the manager from thinking that a data structure is "old" and shouldn't be merged.
- The save data manager will now accept Vectors (and it will serialize/deserialize them properly).
- The `TemporaryEffects.AddCollectibleEffect` method now throws a compiler error, since it reliably causes the game to crash.
- Using `Level.GetCurrentRoomDesc` now throws a compiler error. (`Level.GetRoomByIdx` should always be used instead.)

## August 10th, 2021

- Added many more helper functions to `isaacscript-common`, sorted by subcategory:
  - Array:
    - `arrayEquals`
    - `arrayRemove`
    - `getRandomArrayElement`
    - `initArray`
    - `arrayEmpty`
  - Entity:
    - `getRoomNPCs`
  - Flag:
    - `addFlag`
    - `hasFlag`
    - `removeFlag`
  - Grid Entity:
    - `getDoors`
    - `getGridEntities`
    - `openAllDoors`
  - Input:
    - `isActionPressedOnAnyInput`
    - `isActionTriggeredOnAnyInput`
  - JSON:
    - `jsonEncode`
    - `jsonDecode`
  - Log:
    - `log`
    - `logAllEntityFlags`
    - `logAllDamageFlags`
    - `logAllFlags`
    - `logAllProjectileFlags`
    - `logAllUseFlags`
  - Math:
    - `sign`
    - `tanh`
  - Player:
    - `anyPlayerCloserThan`
    - `anyPlayerHasCollectible`
    - `anyPlayerHasTrinket`
    - `anyPlayerIs`
    - `getOpenTrinketSlot`
    - `getPlayerIndex`
    - `getPlayer`
    - `getTotalPlayerCollectibles`
    - `getPlayerNumAllHearts`
  - Random:
    - `getRandom`
    - `getRandomFloat`
    - `getRandomInt`
  - Stage:
    - `onChest`
    - `onDarkRoom`
    - `onRepentanceStage`
    - `onCathedral`
    - `onSheol`
  - Tears:
    - `getFireDelay`
    - `getTearsStat`
  - UI:
    - `getHUDOffsetVector`
    - `getScreenBottomLeft`
    - `getScreenBottomRight`
    - `getScreenCenter`
    - `getScreenTopLeft`
    - `getScreenTopRight`
  - Util:
    - `changeRoom`
    - `deepCopy`
    - `ensureAllCases`
    - `getAngleDifference`
    - `getEnumValues`
    - `getItemName`
    - `getRoomIndex`
    - `gridToPos`
    - `inCrawlspace`
    - `initRNG`
    - `lerp`
    - `lerpAngleDegrees`
    - `onSetSeed`
- All of the functions are automatically [documented online](https://isaacscript.github.io/isaacscript-common/) using the TypeDoc generator.
- Added a Save Data Manager system that you can automatically use in your IsaacScript mods.
  - The manager does two things:
    - Resets variables at appropriate times.
    - Automatically saves/loads from the "save#.dat" file to make everything persistent.
  - Using the manager is great because it keeps all your variables locally & properly scoped and abstracts away all the complexity of having to use JSON.
  - You can force the save data manager to write to disk with the `saveDataManagerSave` function.
  - You can use the `saveDataManagerSetGlobal` function to put all of the save data variables on a global variable "g" for debugging purposes.
  - The documentation is [here](https://isaacscript.github.io/isaacscript-common/modules/features_saveDataManager.html).
- Added `REPENTANCE` definition. (Thanks @Siramok)
- Added some more Mod Config Menu definitions. (Thanks @Siramok)
- Added new custom callbacks that you can use in your mods:
  - `MC_POST_GAME_STARTED_REORDERED`
  - `MC_POST_NEW_LEVEL_REORDERED`
  - `MC_POST_NEW_ROOM_REORDERED`
  - `MC_PRE_ITEM_PICKUP`
  - `MC_POST_ITEM_PICKUP`
  - `MC_POST_PLAYER_CHANGE_TYPE`
  - `MC_POST_FLIP`
  - `MC_POST_FIRST_FLIP`
  - `MC_POST_ESAU_JR`
  - `MC_POST_FIRST_ESAU_JR`
  - `MC_POST_TRANSFORMATION`
  - `MC_POST_GRID_ENTITY_INIT`
  - `MC_POST_GRID_ENTITY_UPDATE`
  - `MC_POST_GRID_ENTITY_REMOVE`
  - `MC_POST_SACRIFICE`
  - `MC_POST_CURSED_TELEPORT`
- The custom callbacks are documented [here](https://isaacscript.github.io/docs/function-signatures/#custom-callbacks).
- Added the `GridPath` enums.

## August 3rd, 2021

- Released the `isaacscript-common` package, which includes helper functions that you can use in your IsaacScript mods. Right now there are not that many functions, but I plan to increase this in the future. They are documented [here](https://isaacscript.github.io/isaacscript-common/index.html).
- Breaking changes:
  - The `isaacscript` package is no longer a meta-package that provides everything else. (It was getting too big and hard to handle.)
  - This means that instead of having 1 NPM dependency of just `isaacscript`, new IsaacScript mods created with `init` are initialized with 4 dependencies:
    - `isaacscript` - The monitoring program.
    - `isaacscript-lint` - The linting config.
    - `isaacscript-common` - Optional helper functions that you can use in your mods.
    - `isaac-typescript-definitions` - Provides the types for all the Isaac API classes, like `EntityPlayer` and so forth.
  - For reference, this is the template `package.json` file for a new mod: <https://github.com/IsaacScript/isaacscript/blob/main/file-templates/dynamic/package.json>
  - If you are upgrading your existing mod to the latest version of IsaacScript, simply add the 3 extra dependencies to your `package.json` file, and everything should work the way it did before.
  - Remember that you can use the `update.sh` helper script to update all of your dependencies at once.
- Added Algolia search to the IsaacScript website.
- Added the following enums:
  - `DogmaVariant`
  - `PressurePlateVariant`
  - `PressurePlateState`
  - `StatueVariant`
- Added definitions for `ModConfigMenu`.
- The ESLint config no longer complains about `@category` in JSDoc.
- Added a new ESLint rule: [`eslint-plugin-no-template-curly-in-string-fix`](https://github.com/Zamiell/eslint-plugin-no-template-curly-in-string-fix)

## July 27th, 2021

- Fixed the wrong type in the `MC_INPUT_ACTION` callback. (Thanks to @KatTheFox)
- Fixed some bugs in the `RoomConfig` class. (Thanks @Somdudewillson)
- Added definitions for External Item Descriptions. (Thanks @Somdudewillson)
- Added definitions for Music Mod Callback. (Thanks @KatTheFox)
- Added definitions for StageAPI. (Thanks @Somdudewillson)
- Added the following enums:
  - `RotgutVariant`
  - `MotherVariant`
  - `HauntVariant`
  - `AngelVariant`
  - `FallenVariant`
  - `DingleVariant`
  - `LambVariant`
  - `BeastVariant`
  - `MomVariant`
- Turned off the following ESLint rules:
  - `jsdoc/require-param`
  - `jsdoc/require-returns`
  - `jsdoc/require-param-type`
  - `jsdoc/require-returns-type`
- The `isaacscript.json` file no longer contains a `projectName` property. Instead, IsaacScript will always read the project name from the current working directory.
  - (You should remove the `projectName` field from the `isaacscript.json` file in your current projects when you upgrade your dependencies.)
- The `isaacscript.json` file now contains only per-user settings. Thus, it should not be committed to a repository. If no `isaacscript.json` file exists, IsaacScript will create one upon the first invocation in a new directory. (Previously, it would throw an error and exit.)
- The `isaacscript.json` file is now automatically added to the `.gitignore` file for new projects.
  - (You should add it to the `.gitignore` in your current projects when you upgrade your dependencies.)
- The `monitor` command will now output the mod target directory upon first invocation.
- Changed the type of EntityPtr.Ref from `Readonly<Entity>` to `Entity | null`.
- The linter meta-package now includes `cspell` so that you can spell check from command-line and/or CI.
- `isaacscript init` will now create the following additional files:
  - `ci.yml` - for GitHub Actions
  - `.prettierrc.js` - to ensure trailing commas and LF line endings
  - `.env_template` - for publishing convenience
  - `mod/metadata.vdf` - for publishing convenience
  - `build.sh` - helper script to compile the project (used in CI)
  - `lint.sh` - helper script to lint and spell check the project (used in CI)
  - `publish.sh` - helper script to invoke `npx isaacscript publish`
  - `run.sh` - helper script to run `npx isaacscript`
  - `update.sh` - helper script to automatically update project dependencies

## July 20th, 2021

- Added JSDoc lint rules from the [recommended config](https://github.com/gajus/eslint-plugin-jsdoc).

## July 3rd, 2021

- Added a linting rule that catches the following bug: `myArray.push()`
- Added a new linting plugin that changes all ESLint rules to warnings, so that you can more-easily disambiguate them from TypeScript compiler errors.
- For vectors, the methods of `__add`, `__sub`, and so forth have been deprecated in favor of `add`, `sub`, and so on. The former can cause the game to crash in Repentance.

## June 26th, 2021

- The `Isaac.GetPlayer` method now returns `EntityPlayer` instead of `EntityPlayer | null`. This means that you can remove type narrowing and/or non-null assertions from your code.
- Added `KnifeVariant` enum.
- The `MC_USE_ITEM` and `PRE_USE_ITEM` callbacks can now return void.
- Changed several callbacks to use `void` instead of `null` in order to simplify the signatures and have less friction for new users. This might be a breaking change for some users if you are using these callbacks in exported functions, but the fix is simple: just change `null` to `void`.
