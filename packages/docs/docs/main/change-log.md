---
title: Change Log
---

<!-- markdownlint-disable MD024 -->
<!-- cspell:ignore aleksander,ciesielski,gamonymous,popjam,siramok,somdudewillson -->

This page lists the changes to the IsaacScript framework.

<br />

## December 17th, 2013

- `isaacscript-common` now provides JavaScript files alongside Lua files. (`isaac-typescript-definitions` already does this.)
- `isaac-lua-polyfills` now provides more polyfills such that you can import `isaacscript-common` in JavaScript code without any run-time errors.
- Added the following helper functions:
  - `getMainCharacter`
- Changed the following helper functions:
  - `eRange` - The reverse functionality has been removed.
  - `iRange` - The reverse functionality has been removed.
- Renamed the following helper functions:
  - `characterCanHaveRedHearts` --> `canCharacterHaveRedHearts`
  - `characterCanHaveSoulHearts` --> `canCharacterHaveSoulHearts`
  - `characterCanTakeFreeDevilDeals` --> `canCharacterTakeFreeDevilDeals`
  - `characterGetsBlackHeartFromEternalHeart` --> `canCharacterGetBlackHeartFromEternalHeart`
  - `characterStartsWithActiveItem` --> `doesCharacterStartWithActiveItem`

## December 10th, 2023

- Added the following helper functions:
  - `getAllBosses`
  - `getAllNonStoryBosses`
  - `getArrayDuplicateElements`
  - `getBossIDsForStage`
  - `getBossIDsForStageID`
  - `getBossStageIDs`
  - `getEdenStartingActiveCollectible`
  - `getEdenStartingPassiveCollectible`
  - `getEdenStartingCollectibles`
  - `isArrayElementsUnique`
- Added the following types:
  - `ReadonlyRecord`
- Added the following lint rules:
  - `prefer-readonly-parameter-types`
  - `strict-void-functions`
  - `strict-undefined-functions`
  - `no-undefined-return-type`
- Deleted the following helper functions:
  - `getBossSet`
  - `getAllBossesSet`
- Added the following custom commands:
  - `horse`

## December 1st, 2023

- Most of the functions from `isaacscript-common` that return arrays now return read-only versions of those arrays.
- Added the following helper functions:
  - `isValidCardType`
  - `isValidPillEffect`
  - `isValidTrinketType`
  - `parseIntSafe`
- Removed the following constants:
  - `FIRST_ROOM_TYPE`
  - `FIRST_STAGE`
  - `LAST_ROOM_TYPE`
  - `LAST_STAGE`
- Added the following lint rules:
  - `no-mutable-return`

## November 17th, 2023

- Added the following helper functions:
  - `getChests`
  - `is2x1RoomShape`
  - `objectKeysToSet`
  - `objectKeysToReadonlySet`
  - `objectToMap`
  - `objectToReadonlyMap`
  - `objectValuesToSet`
  - `objectValuesToReadonlySet`
  - `removeAllChests`
  - `uncapitalizeFirstLetter`
- Renamed the following helper functions:
  - `stageTypeToLetter` --> `getStageTypeSuffix`
- Removed the following helper functions:
  - `goToStage` (use `setStage` instead)
  - `isRoomDangerous` (use `Room.IsClear` instead, since it is more performant)
- Added the following enums:
  - `AngelicBabySubType` (Thanks popjam)
  - `DarkEsauSubType` (Thanks popjam)
  - `DeepGaperSubType` (Thanks popjam)
  - `DragonFlySubType` (Thanks popjam)
  - `LeperSubType` (Thanks popjam)
  - `MazeRoamerSubType` (Thanks popjam)
  - `MomsHeartSubType` (Thanks popjam)
  - `MotherBallSubType` (Thanks popjam)
  - `MorningStarSubType` (Thanks popjam)
  - `QuakeGrimaceSubType` (Thanks popjam)
  - `RottenGaperSubType` (Thanks popjam)
- Added the following types:
  - `StoryBossID`

## November 10th, 2023

- The location of the plugins in the "isaacscript" package have changed. See the [new "tsconfig.json" template](https://github.com/IsaacScript/isaacscript/blob/main/packages/isaacscript-cli/file-templates/static-mod/tsconfig.json).
- Scripts in new mods no longer use Bash and are now native TypeScript scripts.
- The `isaacscript-common-node` library is released, which contains helper functions for Bash-like scripts.
- The `canRunUnlockAchievements` helper function must now be activated with `ISCFeature.UNLOCK_ACHIEVEMENTS_DETECTION`.
- The following enums are no longer const enums and have to be explicitly imported:
  - `EncyclopediaItemPoolType`
  - `ModConfigMenuOptionType`
  - `StageAPILayoutButtonVariant`
  - `StageAPILayoutCornyPoopSubtype`
  - `StageAPILayoutGridType`
  - `StageAPILayoutPitfallVariant`
  - `StageAPILayoutPoopSubtype`
  - `StageAPILayoutRockSubtype`
  - `StageAPILayoutSpikesOnOffVariant`
- CI in new mods now runs build and lint in a separate jobs so that they run faster.
- Added the following helper functions:
  - `getAdjustedPrice`
  - `getRoomClearRenderFrame`
  - `hasCard`
  - `shouldWhoreOfBabylonBeActive`
- Changed the following helper functions:
  - `spawnCollectible` (is now pure)
  - `preventCollectibleRotation` (is now pure)
- Functions from `ISCFeature.MODDED_ELEMENT_SETS` now return arrays instead of sets.
- Removed the following helper functions:
  - `spawnCollectibleUnsafe` (use the `spawnCollectible` function instead)
- Added the following enums:
  - `NPCID` (Thanks popjam)

## November 2nd, 2023

- Helper functions that deal with randomness now require you to pass the seed. If you want unseeded behavior, then you must explicitly pass `undefined`.
- Added the following helper functions:
  - `asRoomType`
  - `crc32`
  - `getDefaultCollectibleTypesInItemPool`
  - `getDefaultItemPoolsForCollectibleType`
  - `getItemPoolName`
  - `inGrid`
  - `isActiveEnemy`
  - `isCollectibleTypeInDefaultItemPool`
  - `logItemPoolTypes`
- Added the following enums:
  - `ConquestState`
  - `FamineState`
  - `PestilenceState`
  - `UltraGreedState`
  - `UltraGreedierState`
  - `WarState`
  - `WarWithoutHorseState`
- Removed the following helper types:
  - `Expand`

## October 18th, 2023

- Added the following helper functions:
  - `getChallengeCollectibleTypes`
  - `getChallengeTrinketType`
  - `isFamiliarCollectible`
  - `isRoomDangerous`
  - `parseSemanticVersion`
  - `splitNumber`

## October 9th, 2023

- IsaacScript now requires that TypeScript and other development-related dependencies are placed in the "devDependencies" array in the "package.json" file (instead of the "dependencies" array). This is to prevent TypeScript-related functions from sneaking into VSCode's auto-complete list.
- Added the following helper functions:
  - `assertNotNull`
  - `clearChallenge`
  - `getBossName`
  - `getChallengeBoss`
  - `getChallengeCharacter`
  - `getElapsedGameFramesSince`
  - `getElapsedRenderFramesSince`
  - `getElapsedRoomFramesSince`
  - `getElapsedTimeSince`
  - `getGridEntityANM2Path`
  - `getRockPNGPath`
  - `getSurroundingGridIndexes`
  - `getVanillaCollectibleTypesOfQuality`
  - `getVanillaPillEffectsOfType`
  - `hasHoming`
  - `inBigRoom`
  - `isAfterGameFrame`
  - `isAfterRenderFrame`
  - `isAfterRoomFrame`
  - `isBeforeGameFrame`
  - `isBeforeRenderFrame`
  - `isBeforeRoomFrame`
  - `isBigRoom`
  - `isBigRoomShape`
  - `isGridIndexAdjacentToDoor`
  - `isStoryBossID`
  - `onAnyChallenge`
  - `onChallenge`
  - `onGameFrame`
  - `onOrAfterGameFrame`
  - `onOrAfterRenderFrame`
  - `onOrAfterRoomFrame`
  - `onOrBeforeGameFrame`
  - `onOrBeforeRenderFrame`
  - `onOrBeforeRoomFrame`
  - `onRenderFrame`
  - `onRoomFrame`
  - `runNextRun`
  - `setChallenge`
  - `setRunSeed`
- Renamed the following helper functions:
  - `removeCollectibleFromItemTracker` --> `rebirthItemTrackerRemoveCollectible`
  - `getMoveActions` --> `getMoveButtonActions`
  - `getShootActions` --> `getShootButtonActions`
- Removed the following helper functions:
  - `isGreedMode` (use `Game.IsGreedMode` instead)
- Added the following constants:
  - `MAX_QUALITY`
- Renamed the following constants:
  - `MOVEMENT_ACTIONS` --> `MOVEMENT_BUTTON_ACTIONS`
  - `MOVEMENT_ACTIONS_SET` --> `MOVEMENT_BUTTON_ACTIONS_SET`
  - `SHOOTING_ACTIONS` --> `SHOOTING_BUTTON_ACTIONS`
  - `SHOOTING_ACTIONS_SET` --> `SHOOTING_BUTTON_ACTIONS_SET`
- Added the following enums:
  - `CarpetSubType`
- Added the following helper types:
  - `WidenLiteral`
- Added the following custom commands:
  - `xl` (alias for "labyrinth")

## October 2nd, 2023

- Added the following helper functions:
  - `anyEasterEggEnabled` (alias for `anySeedEffectEnabled`)
  - `anySeedEffectEnabled`
  - `getCharacterStartingTrinketType`
  - `getBatteryName`
  - `getBombName`
  - `getBossID`
  - `getBossIDFromEntityTypeVariant`
  - `getBossNamePNGFilePath`
  - `getBossPortraitPNGFilePath`
  - `getBossRushDoor`
  - `getCharacterNamePNGFilePath`
  - `getCharacterPortraitPNGFilePath`
  - `getCharacterSpritePNGFilePath`
  - `getChestName`
  - `getCoinName`
  - `getCollectibleTypesOfQuality`
  - `getEntityTypeVariantFromBossID`
  - `getEnumNames`
  - `getHeartName`
  - `getKeyName`
  - `getNormalTrinketType`
  - `getPlayerCollectiblesOfQuality`
  - `getPlayerTrinkets`
  - `getSackName`
  - `getSeedEffects`
  - `getSlotName`
  - `getVanillaWallGridIndexSetForRoomShape`
  - `inCrawlSpaceWithBlackMarketEntrance`
  - `inDogmaRoom`
  - `isBossRushDoor`
  - `isCrawlSpaceWithBlackMarketEntrance`
  - `isDogmaRoom`
  - `isRepentanceBoss`
  - `onVictoryLap`
  - `setGridEntityType`
- Changed the following helper functions:
  - `arrayRemoveInPlace` now returns the removed elements.
  - `arrayRemoveIndexInPlace` now returns the removed elements.
  - `getAllBossesSet` now returns a set of `BossID` and does not include the four ultra horsemen.
  - `getBossSet` now returns a set of `BossID` and does not include the four ultra horsemen.
  - `getCombinedBossSet` now returns a set of `BossID` and does not include the four ultra horsemen.
- Renamed the following helper functions:
  - `getEnglishLevelName` --> `getLevelName`
  - `getPlayerInventory` --> `getPlayerCollectibleTypes`
  - `getPlayerLastPassiveCollectible` --> `getPlayerLastPassiveCollectibleType`
  - `getCharacterStartingCollectibles` --> `getCharacterStartingCollectibleTypes`
  - `isPassiveCollectible` --> `isPassiveOrFamiliarCollectible`
- Added the following constants:
  - `CHEST_PICKUP_VARIANTS`
  - `CHEST_PICKUP_VARIANTS_SET`
  - `COLLECTIBLE_NAME_TO_TYPE_MAP`
  - `TRINKET_NAME_TO_TYPE_MAP`
  - `QUALITIES`
- Added the following helper types:
  - `CompositionTypeSatisfiesEnum`
- Renamed the following features:
  - `ISCFeature.PLAYER_INVENTORY` --> `ISCFeature.PLAYER_COLLECTIBLE_TRACKING`
  - `ISCFeature.EDEN_STARTING_STATS` --> `ISCFeature.EDEN_STARTING_STATS_HEALTH`

## September 25th, 2023

- Added the following helper functions:
  - `getPillEffects`
  - `getPillEffectsSet`
  - `anyPlayerHasCollectibleEffect`
  - `anyPlayerHasTrinketEffect`
  - `anyPlayerHasNullEffect`
  - `getObjectPartialMatch`
  - `getMegaSatanDoor`
  - `getModdedPillEffects`
  - `getModdedPillEffectsSet`
  - `getVoidDoor`
  - `inRedKeyRoom`
  - `isGridEntityXMLType` (for the `PRE_ROOM_ENTITY_SPAWN` callback)
  - `isMainCharacter`
  - `isMegaSatanDoor`
  - `isVoidDoor`
- Renamed the following helper functions:
  - `isPoopGridEntityType` --> `isPoopGridEntityXMLType`
  - `getCardArray` --> `getCardTypes`
  - `getCardSet` --> `getCardTypesSet`
  - `getCollectibleArray` --> `getCollectibleTypes`
  - `getCollectibleSet` --> `getCollectibleTypesSet`
  - `getCollectiblesForTransformation` --> `getCollectibleTypesForTransformation`
  - `getCollectiblesWithCacheFlag` --> `getCollectibleTypesWithCacheFlag`
  - `getCollectiblesWithTag` --> `getCollectibleTypesWithTag`
  - `getEdenActiveCollectibles` --> `getEdenActiveCollectibleTypes`
  - `getEdenPassiveCollectibles` --> `getEdenPassiveCollectibleTypes`
  - `getFlyingCollectibles` --> `getFlyingCollectibleTypes`
  - `getFlyingTrinkets` --> `getFlyingTrinketTypes`
  - `getModdedCardArray` --> `getModdedCardTypes`
  - `getModdedCardSet` --> `getModdedCardTypesSet`
  - `getModdedCollectibleArray` --> `getModdedCollectibleTypes`
  - `getModdedCollectibleSet` --> `getModdedCollectibleTypesSet`
  - `getModdedTrinketArray` --> `getModdedTrinketTypes`
  - `getModdedTrinketSet` --> `getModdedTrinketTypesSet`
  - `getRandomEdenActiveCollectible` --> `getRandomEdenActiveCollectibleType`
  - `getRandomEdenPassiveCollectible` --> `getRandomEdenPassiveCollectibleType`
  - `getTrinketArray` --> `getTrinketTypes`
  - `getTrinketSet` --> `getTrinketTypesSet`
  - `getTrinketsWithCacheFlag` --> `getTrinketsTypesWithCacheFlag`
- Removed the following helper functions:
  - `getAllCardTypes` (use `getCardTypes` instead)
  - `getAllDimensions` (use the `DIMENSIONS` constant instead)
  - `getAllPillEffects` (use `getPillEffects` instead)
  - `getVanillaCardArray` (use the `VANILLA_CARD_TYPES` constant instead)
  - `getVanillaCardSet` (use the `VANILLA_CARD_TYPES_SET` constant instead)
  - `getVanillaCollectibleArray` (use the `VANILLA_COLLECTIBLE_TYPES` constant instead)
  - `getVanillaCollectibleTypeRange` (use the `VANILLA_COLLECTIBLE_TYPE_RANGE` constant instead)
  - `getVanillaCollectibleSet` (use the `VANILLA_COLLECTIBLE_TYPES_SET` constant instead)
  - `getVanillaPillEffects` (use the `VANILLA_PILL_EFFECTS` constant instead)
  - `getVanillaTrinketArray` (use the `VANILLA_TRINKET_TYPES` constant instead)
  - `getVanillaTrinketTypeRange` (use the `VANILLA_TRINKET_TYPE_RANGE` constant instead)
  - `getVanillaTrinketSet` (use the `VANILLA_TRINKET_TYPES_SET` constant instead)
- Added the following constants:
  - `DIMENSIONS`
  - `FLYING_CHARACTERS`
  - `MAIN_CHARACTERS`
  - `NUM_VANILLA_CHALLENGES`
  - `VANILLA_CARD_TYPE_RANGE`
  - `VANILLA_CARD_TYPES`
  - `VANILLA_CARD_TYPES_SET`
  - `VANILLA_COLLECTIBLE_TYPE_RANGE`
  - `VANILLA_COLLECTIBLE_TYPES`
  - `VANILLA_COLLECTIBLE_TYPES_SET`
  - `VANILLA_PILL_EFFECT_RANGE`
  - `VANILLA_PILL_EFFECTS`
  - `VANILLA_PILL_EFFECTS_SET`
  - `VANILLA_TRINKET_TYPE_RANGE`
  - `VANILLA_TRINKET_TYPES`
  - `VANILLA_TRINKET_TYPES_SET`
- Changed the following constants:
  - `NUM_PILLS_IN_POOL` --> `NUM_PILL_COLORS_IN_POOL`
- Added the following helper types:
  - `ERange`
  - `TupleKeys`
- Renamed the following helper types:
  - `Range` --> `IRange`

## September 18th, 2023

- Added the following helper functions:
  - `asFloat`
  - `asInt`
  - `getLowestEnumValue`
- Removed the following helper functions:
  - `getLastElement` (TSTL supports the `Array.at` method now)
- Added the following custom commands:
  - `collectible` (alias for the `spawnCollectible` command)
  - `goldTrinket` (alias for the `spawnGoldenTrinket` command)
  - `goldenTrinket` (alias for the `spawnGoldenTrinket` command)
  - `spawnCollectibleAt`
  - `spawnTrinketAt`
  - `spawnGoldTrinket` (alias for the `spawnGoldenTrinket` command)
  - `spawnGoldenTrinketAt`
  - `trinket` (alias for the `spawnTrinket` command)

## September 11th, 2023

- The save data manager now supports rewinding a `persistent` object if `__rewindWithGlowingHourGlass` is specified.
- The "Extra Console Commands" feature will now work properly if two or more mods have it enabled.
- Added the following helper functions:
  - `getHighestArrayElement`
  - `getLevelBossIDs`
  - `getLowestArrayElement`
  - `hasAnyTrinket`
  - `hasPiercing`
  - `hasSpectral`
  - `hasTrinket`
  - `inRoomShape`
  - `isMissedTear`
  - `isPoopGridEntityType`
  - `isRoomShape`
  - `levelHasBossID`
  - `rebirthItemTrackerWriteToFile`
  - `removeAllConsoleCommands`
  - `useCardTemp`
- Renamed the following helper functions:
  - `addStat` --> `addPlayerStat`
- Added the following enums:
  - `DebugCommand`
  - `PortalTeleportSubType`

## September 4th, 2023

- Added the following helper functions:
  - `getMoveActions`
  - `getShootActions`
  - `isChestVariant`
  - `isFinalFloor`
  - `isInteger`
  - `isRedHeartSubType`
  - `isStageWithNaturalDevilRoom`
  - `isStageWithRandomBossCollectible`
  - `isStageWithSecretExitToDownpour`
  - `isStageWithSecretExitToMausoleum`
  - `isStageWithSecretExitToMines`
  - `isStageWithShovelTrapdoors`
  - `isStageWithStoryBoss`
  - `onStageWithStoryBoss`
- Added the following constants:
  - `MOVEMENT_ACTIONS_SET`
  - `SHOOTING_ACTIONS_SET`
- Renamed the following helper functions:
  - `onStageWithShovelWorking` --> `onStageWithShovelTrapdoors`

## August 27th, 2023

- Added the following helper function:
  - `assertDefined` (for more concise type-narrowing)
  - `isEnumValue`
  - `renderTextOnEntity`
  - `renderScaledTextOnEntity`
- Added the following constants:
  - `MODIFIER_KEYS`
  - `MOVEMENT_ACTIONS`
  - `SHOOTING_ACTIONS`

## August 20th, 2023

- Added the following helper types:
  - `TupleWithLengthBetween`

## August 10th, 2023

- Added the following helper functions:
  - `filterMap`
  - `is2x1Room`
  - `isBeastRoom`
  - `isBossRoomOf`
  - `isCrawlSpace`
  - `isDeathCertificateArea`
  - `isDevilsCrownTreasureRoom`
  - `isDoubleTrouble`
  - `isGenesisRoom`
  - `isHomeCloset`
  - `isLRoom`
  - `isMegaSatanRoom`
  - `isMinibossRoomOf`
  - `isMirrorRoom`
  - `isRoomType`
  - `isSecretExit`
  - `isSecretShop`
- Renamed the following helper functions:
  - `initArray` --> `newArray`
  - `isLRoom` --> `isLRoomShape`
- Changed the following helper functions:
  - `newRoom` - Added `ensureDeadEnd` and `customRoomData` optional arguments.
  - `getNewRoomCandidate` - Added `ensureDeadEnd` optional argument.
  - `getNewRoomCandidatesForLevel` - Added `ensureDeadEnd` optional argument.
  - `getNewRoomCandidatesBesideRoom` - Added `ensureDeadEnd` optional argument.

## August 3rd, 2023

- `eslint-config-isaacscript` is rewritten from scratch. It no longer relies on any upstream configs and is now [documented officially on the website](https://isaacscript.github.io/eslint-config-isaacscript).

## June 30th, 2023

- Added the following helper functions:
  - `defaultMapGetNPC`
  - `defaultMapSetNPC`
  - `mapDeleteNPC`
  - `mapGetNPC`
  - `mapHasNPC`
  - `mapSetNPC`
  - `setAddNPC`
  - `setDeleteNPC`
  - `setHasNPC`

## June 5th, 2023

- Added the following helper functions:
  - `pocketItemsEquals`
  - `getPillColorFromEffect`
  - `logTableShallow`

## April 24th, 2023

- Added the following helper functions:
  - `doesGridEntityExist`
  - `getPlayerStats`
  - `getEdenStartingStat`
  - `getEdenStartingStats`
- Added the following custom console commands:
  - `spikes` (spawns a spikes grid entity next to the player)

## March 28th, 2023

- Added the following helper functions:
  - `areInputsEnabled`
- Added the following custom console commands:
  - `poop` (spawns a poop grid entity next to the player)

## March 21st, 2023

- Added the following helper functions:
  - `newSprite`

## March 13th, 2023

- Added the following helper functions:
  - `getUsableActiveItemSlots`
  - `logDisplayFlags`
  - `getClosestVectorTo`
  - `vectorToRoomGridIndex`
- Renamed the following helper functions:
  - `roomGridIndexToXY` --> `roomGridIndexToVector`
- Changed the following helper functions:
  - `getCustomGridEntities` (returns an array of objects instead of tuples)
  - `getStageHistory` (returns an array of objects instead of tuples)
  - `getNewRoomCandidatesBesideRoom` (returns an array of objects instead of tuples)
  - `getNewRoomCandidatesForLevel` (returns an array of objects instead of tuples)
  - `getNewRoomCandidate` (returns an array of objects instead of tuples)
  - `anyPlayerHasCollectible` (now takes an optional param of `ignoreModifiers`)
  - `anyPlayerHasTrinket` (now takes an optional param of `ignoreModifiers`)
- Added the following custom callbacks:
  - `POST_TEAR_KILL` (Thanks 4Grabs)
  - `POST_PROJECTILE_KILL` (Thanks 4Grabs)
- Added the following constants:
  - `STARTING_ROOM_GRID_INDEX`

## March 6th, 2023

- Added the following helper functions:
  - `onStageOrHigher`
  - `onStageOrLower`
  - `getFirstCard`
  - `getFirstPill`
  - `mapDeletePlayer`
  - `hasDoorType`
- Changed the following helper functions:
  - `spawnPersistentEntity` - Now returns an object instead of a tuple.
- Removed the following helper functions:
  - `getCollectibleIndex` (use `getPickupIndex` instead)
- Added the following custom callbacks:
  - `POST_USE_PILL_FILTER` (which also passes the pill color)
  - `POST_GAME_END_FILTER`
- Removed the following custom callbacks:
  - `POST_COLLECTIBLE_INIT_FIRST` (use `POST_PICKUP_INIT_FIRST` instead)
- The `pills` command will now spawn horse pills in addition to normal pills.

## February 24th, 2023

- Added the following helper functions:
  - `removeCollectible`
  - `getCharacterStartingCollectibles`
  - `hasCollectibleInActiveSlot`
  - `getScreenBottomY`
  - `getScreenRightX`
  - `removeCollectibleFromPools`
  - `removeTrinketFromPools`
  - `isMultiplayer`
  - `getRoomDescriptorsForType`
  - `levelHasRoomType`
  - `inFirstRoom`
  - `deleteLastRoomDescription`
  - `stableSort`
  - `hideRoomOnMinimap`
  - `isSecretRoomType`
  - `onStage`
  - `onStageType`
  - `onEffectiveStage`
  - `onStageWithSecretExitToDownpour`
  - `onStageWithSecretExitToMines`
  - `onStageWithSecretExitToMausoleum`
  - `onStageWithShovelWorking`
  - `onStageWithRandomBossCollectible`
  - `setHas`
- Renamed the following helper functions:
  - `playerAddCollectible` --> `addCollectible`
  - `playerHasCollectible` --> `hasCollectible`
  - `playerHasForm` --> `hasForm`
  - `getActiveItemSlot` --> `getActiveItemSlots`
  - `getLastEnumValue` --> `getHighestEnumValue`
  - `asNpcState` --> `asNPCState`
- Changed the following helper functions:
  - `getFlyingCollectibles` - The argument is changed from `pruneConditionalItems` to `includeConditionalItems`.
- Many logging helper functions now take an optional `name` argument.
- Renamed the following enums:
  - `NpcState` --> `NPCState`
- Added the following constants:
  - `RESOLUTION_FULL_SCREEN`
  - `RESOLUTION_1600_900`
  - `TIME_GAME_OPENED`
  - `MAPPING_COLLECTIBLES`
- Added the following custom callbacks:
  - `POST_ENTITY_KILL_FILTER`
  - `POST_FAMILIAR_INIT_FILTER`
  - `POST_FAMILIAR_UPDATE_FILTER`
  - `POST_FAMILIAR_RENDER_FILTER`
  - `PRE_FAMILIAR_COLLISION_FILTER`
  - `POST_EFFECT_INIT_FILTER`
  - `POST_EFFECT_UPDATE_FILTER`
  - `POST_EFFECT_RENDER_FILTER`
  - `POST_LASER_INIT_FILTER`
  - `POST_LASER_UPDATE_FILTER`
  - `POST_LASER_RENDER_FILTER`
  - `POST_KNIFE_INIT_FILTER`
  - `POST_KNIFE_UPDATE_FILTER`
  - `POST_KNIFE_RENDER_FILTER`
  - `PRE_KNIFE_COLLISION_FILTER`
  - `POST_TEAR_INIT_FILTER`
  - `POST_TEAR_UPDATE_FILTER`
  - `POST_TEAR_RENDER_FILTER`
  - `PRE_TEAR_COLLISION_FILTER`
  - `POST_PROJECTILE_INIT_FILTER`
  - `POST_PROJECTILE_UPDATE_FILTER`
  - `POST_PROJECTILE_RENDER_FILTER`
  - `PRE_PROJECTILE_COLLISION_FILTER`
  - `POST_BOMB_INIT_FILTER`
  - `POST_BOMB_UPDATE_FILTER`
  - `POST_BOMB_RENDER_FILTER`
  - `PRE_BOMB_COLLISION_FILTER`
- Changed the following custom callbacks:
  - `POST_GAME_STARTED_REORDERED` and `POST_GAME_STARTED_REORDERED_LAST` now require a third argument of `isContinued: boolean | undefined`. (This is mandatory in order to prevent users from shooting themselves in the foot with respect to logic unexpectedly being executed on continued runs.)
  - `POST_NEW_ROOM_EARLY` - Provides `roomType` as the first argument. Can now filter by `RoomType`.
  - `POST_NEW_ROOM_REORDERED` - Provides `roomType` as the first argument. Can now filter by `RoomType`.
  - `POST_NEW_LEVEL_REORDERED` - Provides `stage` as the first argument and `stageType` as the second argument. Can now filter by `LevelStage` and `StageType`.
- Added the following helper types:
  - `Range`
  - `NaturalNumbersLessThan`
  - `NaturalNumbersEqualToOrLessThan`
  - `Tuple`
  - `TupleWithMaxLength`
  - `Increment`
  - `Decrement`
- Added the following custom commands:
  - `flies` (to get max blue flies)
- Added the following lint rules for IsaacScript mods:
  - `require-v-registration` - Checks for `v` constants that are not registered with the save data manager.
- Disabled the following lint rules for IsaacScript mods:
  - `class-methods-use-this` (since it is idiomatic to have `v` outside of the class)

## February 17th, 2023

- Functions that return `Vector`, `Color`, and `KColor` will now return read-only versions.
- The "toggleDisplay" helper functions now accept an optional "force" argument.
- Added the following helper functions:
  - `sortObjectArrayByKey`
  - `getStageID`
  - `getRandomItemPool`
  - `setAllDisplayFlags`
  - `clearRoomDisplayFlags`
- Renamed the following helper functions:
  - `twoDimensionalSort` --> `sortTwoDimensionalArray`
  - `setDisplayFlags` --> `setFloorDisplayFlags`
- Added the following method to the `ModUpgraded` class:
  - `AddPriorityCallbackCustom` - Works in the same way that `AddPriorityCallback` does.
- Renamed the following types:
  - `ModUpgradedBase` --> `ModUpgraded`
  - `ModUpgraded` --> `ModUpgradedWithFeatures`
- Added the following custom callbacks:
  - `POST_KEYBOARD_PRESSED`
- The `require-capital-read-only` lint rule will now work with objects.
- Added the following lint rules:
  - `@typescript-eslint/no-confusing-void-expression`
  - `n/file-extension-in-import` (TypeScript projects only)

## February 7th, 2023

### `package.json`

IsaacScript mods now require that "isaacscript-tsconfig" is listed as a dependency in your "package.json" file. In other words, type one of the following commands:

```sh
# If you use npm:
npm install --save isaacscript-tsconfig

# If you use Yarn:
yarn add isaacscript-tsconfig

# If you use pnpm:
pnpm add isaacscript-tsconfig
```

### Other

- Added [a GitHub action for uploading mods to the Steam Workshop](https://github.com/IsaacScript/isaac-steam-workshop-upload).
- `isaacscript` has new commands:
  - `check` will check your template files (for an IsaacScript mod) to see if they are up to date.
  - `init-ts` will bootstrap a TypeScript project.
  - `publish-ts` will publish a TypeScript project.
  - `check-ts` will check your template files (for an TypeScript project) to see if they are up to date.
- The `cspell-check-unused-words` tool can now be used to check for unused words in your "cspell.jsonc" file.
- Removed support for `steamcmd` from the `publish` command.
- Added the following helper functions:
  - `isFoundSoul`

## January 31st, 2023

- The custom stages feature now accepts `music` as an option in the `tsconfig.json` file.
- Collectible helper functions that take an argument of `CollectibleType` now also accept the collectible itself.
- Added the following helper functions:
  - `getMusicForStage`
  - `setCollectiblePedestalType`
  - `doesAnyEntityExist`
  - `newReadonlyVector`
  - `newReadonlyColor`
  - `newReadonlyKColor`
  - `getReversedMap`
- Removed the following helper types:
  - `HasAllEnumKeys` (use `Record` instead)
- Added the following helper constructors:
  - `ReadonlyMap`
  - `ReadonlySet`
- Added the following custom console commands:
  - `music`

## January 22nd, 2023

- The functions from `ISCFeature.RUN_IN_N_FRAMES` now take an optional parameter to cancel the function if a new room is loaded.
- The `log` functions no longer take a `self` argument, so they can be used more easily while debugging.
- The `log` function now takes an optional parameter to disable the function prefix.
- Added the following helper functions:
  - `isSlotMachine`
  - `logAndPrint`
  - `setSpriteOpacity`
  - `setEntityOpacity`
  - `isMoveActionPressed`
  - `isMoveActionTriggered`
  - `isShootActionPressed`
  - `isShootActionTriggered`
  - `isTSTLClass`
  - `initModFeatures`
  - `doesVectorHaveLength`
  - `getNumRoomsVisited`
  - `getMysteriousPaperEffectForFrame`
- Removed the following helper functions:
  - `printConsole` (use `print` instead)
  - `isUserDefinedTSTLClass`
- Added the following enums:
  - `LarryJrSubType`
  - `HollowSubType`
  - `MonstroSubType`
  - `ChubSubType`
  - `CarrionQueenSubType`
  - `GurdySubType`
  - `Monstro2SubType`
  - `MomSubType`
  - `PinSubType`
  - `FrailSubType`
  - `FamineSubType`
  - `PestilenceSubType`
  - `WarSubType`
  - `DeathSubType`
  - `DukeOfFliesSubType`
  - `HuskSubType`
  - `PeepSubType`
  - `BloatSubType`
  - `FistulaSubType`
  - `GeminiSubType`
  - `GurdyJrSubType`
  - `WidowSubType`
  - `GurglingSubType`
  - `HauntSubType`
  - `DingleSubType`
  - `MegaMawSubType`
  - `GateSubType`
  - `MegaFattySubType`
  - `CageSubType`
  - `PolycephalusSubType`
  - `StainSubType`
  - `BrownieSubType`
  - `ForsakenSubType`
  - `LittleHornSubType`
  - `RagManSubType`
- Renamed the following enums:
  - `DukeVariant` --> `DukeOfFliesVariant`
- Added `isaacscript-common-ts`, a library that has several helper functions and can be consumed by TypeScript projects. (`isaacscript-common` is compiled to Lua, so it cannot be used for this purpose.)
- Added the following linting rules:
  - `require-capital-read-only`
- Some linting rules have been renamed:
  - `require-const-assertions` --> `require-capital-const-assertions`
- Some linting rules have been changed:
  - `require-capital-const-assertions` - Now applies to arrays.

## January 13th, 2023

- Added the following helper functions:
  - `playerHasForm`
  - `directionToMoveAction`
  - `directionToShootAction`
  - `onStageWithNaturalDevilRoom`
- Changed the following helper functions:
  - `getClosestEntityTo` now takes an optional `filterFunc` argument.
- Added the following constants:
  - `GAME_FRAMES_PER_MINUTE`
  - `RENDER_FRAMES_PER_MINUTE`
- Added the following custom callbacks:
  - `ENTITY_TAKE_DMG_PLAYER`
  - `INPUT_ACTION_FILTER`
  - `INPUT_ACTION_PLAYER`
  - `POST_PICKUP_INIT_FILTER`
  - `POST_PICKUP_UPDATE_FILTER`
  - `POST_PICKUP_RENDER_FILTER`
  - `POST_PICKUP_SELECTION_FILTER`
  - `PRE_ENTITY_SPAWN_FILTER`
  - `PRE_ROOM_ENTITY_SPAWN_FILTER`
- Added the following lint rules:
  - `import/no-default-export`
  - `isaacscript/no-empty-line-comments`
  - `isaacscript/no-throw`
  - `jsdoc/require-param` (with specific context)
- Changed the following lint rules:
  - `isaacscript/no-implicit-map-set-loops` --> `isaacscript/no-explicit-map-set-loops`
  - The `complete-sentences-jsdoc` and `complete-sentences-line-comments` lint rules will now catch sentences that end with a double period.

## January 6th, 2023

- The `ModFeature` class now has a `shouldCallbackMethodsFire` property that you can override if you want to have all of your callback methods run conditionally.
- `spawn` and all of the related helper functions will now accept a grid index in place of a position vector.
- Added the following helper functions:
  - `dequeueItem`
  - `isActionPressed`
  - `isActionTriggered`
  - `inRange`

## December 26th, 2022

- Added the following helper functions:
  - `getEnglishLevelName`

## December 17th, 2022

- Persistent entities will now no longer respawn when they are removed.
- Added the following custom commands:
  - `secretShop` (to warp to the Secret Shop)

## December 8th, 2022

- The IsaacScript framework now includes all of the features from the latest vanilla patches.
- Several card functions have been moved to the `ModdedElementSets` feature, since `ItemConfigCardType` no longer has to be hard-coded.
- Added the following helper functions:
  - `isPaused` (part of `Pause`)
- Added the following constants:
  - `ITEM_CONFIG_CARD_TYPES_FOR_CARDS`

## November 15th, 2022

- The `upgradeMod` function now takes an optional parameter containing the custom callbacks that you will be subscribing to in the future (for the purposes of early initializing them).
- Added the following helper functions:
  - `pressInput`
  - `removeCollectibleFromAllPlayers`
- Renamed the following helper functions:
  - `getVanillaTrinketTypes` --> `getVanillaTrinketTypeRange`

## November 6th, 2022

- Added the following helper functions:
  - `getGridEntitiesInRadius` (Thanks NFrost)
  - `getGridEntityCollisionPoints` (Thanks NFrost)
  - `getConstituentsFromEntityID`
  - `getConstituentsFromGridEntityID`
  - `spawnEntityID`
  - `inRoomType`
- Added the following custom callbacks:
  - `POST_NPC_INIT_FILTER`
  - `POST_NPC_UPDATE_FILTER`
  - `ENTITY_TAKE_DMG_FILTER` (Thanks 4Grabs)
  - `PRE_NPC_UPDATE_FILTER` (Thanks 4Grabs)
  - `POST_NPC_RENDER_FILTER` (Thanks 4Grabs)
  - `POST_NPC_DEATH_FILTER` (Thanks 4Grabs)
  - `PRE_NPC_COLLISION_FILTER` (Thanks 4Grabs)
- Added the following types:
  - `EntityID`
  - `GridEntityID`

## October 10th, 2022

- `isaacscript-common` has been rewritten to only enable the custom features that you are actually using (rather than all of them). The idea here is to keep the library blazing fast and allow it to scale well into the future as more features are added.
- Breaking:
  - All of the extra feature functions in `isaacscript-common` are now attached to the `ModUpgraded` object (instead of being normal functions that you import). The idea here is to eliminate run-time errors from non-upgraded mods. See [the website](https://isaacscript.github.io/isaacscript-common#using-extra-features) for more details.
- Added the following helper functions:
  - `removeUrnRewards`
  - `removeEntitiesSpawnedFromGridEntity`
  - `spawnRockAltRewardUrn`
  - `spawnRockAltRewardMushroom`
  - `spawnRockAltRewardSkull`
  - `spawnRockAltRewardPolyp`
  - `spawnRockAltRewardBucketDownpour`
  - `spawnRockAltRewardBucketDross`
  - `getPlayerCollectiblesWithTag`
  - `getPlayerCollectiblesForTransformation`
  - `getEdenActiveCollectibles`
  - `getRandomEdenActiveCollectible`
  - `spawnCollectibleUnsafe`
  - `isPlayerAbleToAim`
- Renamed the following helper functions:
  - `hasSirenStolenFamiliar` --> `isFamiliarStolenBySiren`
  - `getCollectiblesForCacheFlag` --> `getCollectibleTypesWithCacheFlag`
  - `getTrinketsForCacheFlag` --> `getTrinketsWithCacheFlag`
  - `getPlayerCollectiblesForCacheFlag` --> `getPlayerCollectiblesWithCacheFlag`
  - `getPlayerTrinketsForCacheFlag` --> `getPlayerTrinketsWithCacheFlag`
  - `getCollectibleTypesWithTag` --> `getCollectiblesWithTag`
  - `getCollectibleTypesForTransformation` --> `getCollectiblesForTransformation`
  - `getEdenPassives` --> `getEdenPassiveCollectibles`
  - `getRandomEdenPassive` --> `getRandomEdenPassiveCollectible`
- Removed the following helper functions:
  - `isIsaacScriptCommonClass`
  - `isVanillaTSTLClass`
  - `getPlayerNumCollectiblesWithTag` (use `getPlayerCollectiblesWithTag` instead)
  - `getPlayerNumCollectiblesForTransformation` (use `getPlayerCollectiblesForTransformation` instead)
  - `enableDevFeatures`
- Added the following helper types:
  - `AnyClass`
  - `HasFunction`
  - `TupleToUnion`
  - `TupleToIntersection`
  - `Writable`

## September 30th, 2022

- Added the `@Callback` and `@CustomCallback` method decorators, which automatically subscribe the decorated method to the corresponding callback. This unlocks a new style of Isaac mods where you do not have to manage adding callbacks directly. In order for this to work properly, your mod features should be represented by classes that extend from the `ModFeature` class.
- Added the following helper functions:
  - `isGreedMode`
  - `validateInterfaceMatchesEnum`
  - `newObjectWithEnumKeys`
  - `getPlayerFromPtr`
  - `saveDataManagerRemove`
  - `getTSTLClassConstructor`
  - `isTableEmpty`
  - `logTableKeys`
  - `getRandomIndexFromWeightedArray`
  - `merge`
- The helper functions relating to charge now have an `activeSlot` parameter that defaults to `ActiveSlot.PRIMARY`.
- Added the following helper types:
  - `HasAllEnumKeys`
  - `UnionToIntersection`
  - `AllButFirst`
  - `AllButLast`
  - `LowercaseKeys`
  - `UppercaseKeys`
  - `StartsWithLowercase`
  - `StartsWithUppercase`
  - `AnyFunction`

## September 22th, 2022

- The save data manager will now restore any data on a `run` or `level` object when the Glowing Hourglass is used to what it was when the room was entered.
- The custom door feature of the standard library is removed. (It may be reimplemented in the future if needed.)
- Added the following helper functions:
  - `isTearFromPlayer`
  - `isTearFromFamiliar`
  - `setEntityDamageFlash`
  - `hasArmor`
  - `defaultMapGetHash`
  - `defaultMapSetHash` (just an alias for `mapSetHash`)
  - `mapSetHash`
  - `setAdd`
  - `isVanillaWallGridIndex`
  - `inHomeCloset`
  - `getGridIndexesBetween`
  - `setConditionalHotkey`
  - `unsetConditionalHotkey`
  - `preventGridEntityRespawn`
  - `getTime`
  - `setTracebackFunctionsGlobal` (for easier debugging)
  - `getParentFunctionDescription`
  - `spawnCollectibleFromPool`
  - `getAmbushType`
- Renamed the following helper functions:
  - `getPlayerFromTear` --> `getPlayerFromEntity`
  - `registerHotkey` --> `setHotkey`
  - `irange` --> `iRange` <!-- cspell:disable-line -->
  - `erange` --> `eRange` <!-- cspell:disable-line -->
- Changed the following helper functions:
  - `iRange` and `eRange` now take an optional `increment` argument.
- Added the following enums:
  - `LadderSubTypeCustom`
- Renamed the following enums:
  - `LadderSubType` --> `TallLadderSubType`
- Added the following custom commands:
  - `transformation`
  - `playerForm` (alias for `transformation`)
  - `getCharge`
- The `damage`, `tears`, and `speed` custom commands now take optional arguments to set the player's stat to the specific amount.

## September 13th, 2022

- Added the following helper functions:
  - `getWeightedRandom` (Thanks popjam)
  - `hasUnusedDoorSlot`

## September 4th, 2022

- `isaac-typescript-definitions` and `isaacscript-common` can now be imported by Lua mods. See [the documentation](https://isaacscript.github.io/main/isaacscript-in-lua).
- `isaacscript init` now has a `--dev` flag for setting up a mod that will be testing out a development version of `isaacscript-common`. For more information, see the [README](https://github.com/IsaacScript/isaacscript#working-with-isaacscript-common).
- `isaacscript.json` now has [a schema file](https://raw.githubusercontent.com/IsaacScript/isaacscript/main/packages/isaacscript-cli/schemas/isaacscript-schema.json).
- IsaacScript now provides the `isaac-lua-polyfill` package, which assists in unit testing your mods using e.g. Jest. Thanks to Aleksander Ciesielski for this.
- Added the following helper functions:
  - `removeAllNonAlphanumericCharacters`
  - `addRoomDisplayFlag`
  - `setRoomVisible`
  - `canPickEternalHearts`
  - `getCollectibleChargeType`
- Added the following enums:
  - `CollectibleSpriteLayer`
- Added the following constants:
  - `K_COLORS` (a collection of pre-defined `KColor` objects)
- Added the following custom callbacks:
  - `PRE_PICKUP_COLLISION` (Thanks popjam)
- Added the following custom commands:
  - `hush` (to warp to the Blue Womb Boss Room)
  - `spawnCollectible` (to spawn a collectible by name)
  - `spawnTrinket` (to spawn a collectible by name)

## August 25th, 2022

- TSTL plugins are now compiled and located inside of the `isaacscript` package. See the new [`tsconfig.json` template](https://github.com/IsaacScript/isaacscript/blob/main/packages/isaacscript-cli/file-templates/static/tsconfig.json) for more information. This means that you no longer need to have to have a "plugins" directory in your mod. You can also remove your dependencies of `@types/node` and `ts-node` in the "package.json" file.
- Added the following helper functions:
  - `logCollectibleTypes`
  - `onFirstFloor`
  - `getTeleporters`
  - `removeAllTeleporters`
  - `spawnTeleporter`
  - `spawnTeleporterWithVariant`
  - `inSecretExit`
  - `isBlueWombDoor`
  - `getBlueWombDoor`
  - `getEntityFromPtrHash`
  - `logPtrHash`
  - `logPtrHashes`
  - `isDyingDump`
  - `getPlayersWithControllerIndex`
  - `getPlayersOnKeyboard`
- Added the following enums:
  - `GridEntityFireplaceVariant`
- Added the following constants:
  - `TELEPORTER_ACTIVATION_DISTANCE`
- Added the following custom commands:
  - `dadsNote` (to warp to the Mausoleum 2 Boss Room with Dad's Note in it)
  - `reloadRoom`
  - `darkness` (for permanent Curse of Darkness)
  - `labyrinth` (for permanent Curse of the Labyrinth)
  - `lost` (for permanent Curse of the Lost)
  - `unknown` (for permanent Curse of the Unknown)
  - `cursed` (for permanent Curse of the Cursed)
  - `maze` (for permanent Curse of the Maze)
  - `blind` (for permanent Curse of the Blind)
  - `giant` (for permanent Curse of the Giant)
- Removed the following custom commands:
  - `eh` (use `eternalHearts` instead)
  - `bh` (use `blackHearts` instead)

## August 18th, 2022

- The `Card` enum is now renamed to `CardType` in order to be more consistent with the `CollectibleType` and the `TrinketType` enums. Many helper functions have also changed accordingly, like `isVanillaCard` --> `isVanillaCardType`.
- Added the following helper functions:
  - `removeAllActiveItems`
  - `removeAllPlayerTrinkets`
  - `getPartialMatch`
  - `isVanillaCardType`
  - `isVanillaCollectibleType`
  - `isModdedCollectibleType`
  - `isVanillaTrinketType`
  - `isModdedTrinketType`
  - `isVanillaPillEffect`
  - `isModdedPillEffect`
  - `getTrinketGfxFilename`
  - `newCollectibleSprite`
  - `newTrinketSprite`
  - `getCurseIDByName`
  - `removeAllTrapdoors`
  - `removeAllCrawlSpaces`
  - `spawnTrapdoor`
  - `spawnTrapdoorWithVariant`
  - `spawnCrawlspace`
  - `spawnCrawlspaceWithVariant`
- Renamed the following helper functions:
  - `isGoldenTrinket` --> `isGoldenTrinketType`
- Changed the following helper functions:
  - `getAllBosses` now takes an optional `includeStoryBosses` parameter.
- Added the following constant-related helper functions:
  - `getFirstModdedCollectibleType`
  - `getLastCollectibleType`
  - `getNumCollectibleTypes`
  - `getNumModdedCollectibleTypes`
  - `getFirstModdedTrinketType`
  - `getLastTrinketType`
  - `getNumTrinketTypes`
  - `getNumModdedTrinketTypes`
  - `getFirstModdedCardType`
  - `getLastCardType`
  - `getNumCards`
  - `getNumModdedCards`
  - `getFirstModdedPillEffect`
  - `getLastPillEffect`
  - `getNumPillEffects`
  - `getNumModdedPillEffects`
- The constants relating to the aforementioned helper functions have been deleted, since they must be retrieved at run-time after at least one callback has been fired.
- Added the following custom commands:
  - `getChallenge`

## August 11th, 2022

- Added the following helper functions:
  - `spawnCustomTrapdoorToVanilla`
  - `getAdjacentExistingRoomGridIndexes`
  - `getAdjacentNonExistingRoomGridIndexes`
  - `wouldDamageTaintedMagdaleneNonTemporaryHeartContainers`
  - `removeCharactersBefore`
  - `getModdedTrinketArray`
  - `getModdedTrinketSet`
  - `getTrinketArray`
  - `getVanillaTrinketArray`
  - `getVanillaTrinketSet`
  - `getDoorSlotEnterPosition`
  - `disableInputs`
  - `canRunUnlockAchievements`
- Renamed the following helper functions:
  - `removeAllGridExcept` --> `removeAllGridEntitiesExcept`
- Changed the following helper functions:
  - `getRoomShapeNeighborGridIndexDeltas` --> `getRoomShapeAdjacentGridIndexDeltas`
  - `getRoomShapeNeighborGridIndexes` --> `getRoomShapeAdjacentGridIndexes`
  - `getRoomNeighbors` --> `getRoomAdjacentGridIndexes`
  - `getRoomShapeNeighborGridIndexDeltas` --> `getRoomShapeAdjacentGridIndexDeltas`
- Added the following custom callbacks:
  - `POST_SLOT_COLLISION`
- Added the following custom commands:
  - `bossNextRoom` (to go to the room next to the boss)

## August 4rd, 2022

- IsaacScript now supports [custom stages](https://isaacscript.github.io/main/custom-stages).
- The save data manager now supports serializing/deserializing `BitSet128` objects.
- The save data manager will now throw a custom compiler error if you try to register variables that are not serializable.
- Added the following helper functions:
  - `isCollectibleInItemPool`
  - `getAdjacentRoomGridIndexes`
  - `isDeadEnd`
  - `getRoomShapeNeighborGridIndexes`
  - `getNewRoomCandidatesBesideRoom`
  - `getNewRoomCandidatesForLevel`
  - `getNewRoomCandidate`
  - `hasCurse`
  - `newRoom`
  - `setRoomData`
  - `getRoomDataForTypeVariant`
  - `setBackdrop`
  - `reloadRoom`
  - `getPlayerStat`
  - `asNumber`
  - `asString`
  - `asCollectibleType`
  - `asTrinketType`
  - `asCard`
  - `asPillColor`
  - `asPillEffect`
  - `asPlayerType`
  - `enableDevFeatures`
  - `isCustomGridEntity`
  - `getCustomGridEntityType`
  - `doorSlotFlagsToDoorSlots`
- Renamed the following helper functions:
  - `isRoomInsideMap` --> `isRoomInsideGrid`
  - `getRoomsInGrid` --> `getRoomsInsideGrid`
  - `getDoorSlotFlags` --> `doorSlotsToDoorSlotFlags`
- Changed the following helper functions:
  - `spawnCustomGridEntity` now supports using any vanilla grid entity type and variant as a base.
  - `keyboardToString` now requires an argument of `uppercase`.
  - `todo` now supports a variadic amount of arguments.
- Added the following constants:
  - `ALL_DISPLAY_FLAGS`
- Added the following enums:
  - `StatType`
- Added the following interfaces:
  - `StatTypeType`
- Added the following types:
  - `Immutable` (used for recursively immutable objects/arrays/maps/sets)
  - `PossibleStatType`
- Added the following custom callbacks:
  - `POST_PLAYER_CHANGE_STAT`
  - `POST_GRID_ENTITY_CUSTOM_INIT`
  - `POST_GRID_ENTITY_CUSTOM_REMOVE`
  - `POST_GRID_ENTITY_CUSTOM_STATE_CHANGED`
- Changed the following custom callbacks:
  - `POST_PLAYER_CHANGE_HEALTH` now passes the old value and the new value (in addition to the difference).

## July 27th, 2022

- A new version of TSTL has been released that speeds up compilation by a factor of 2. Make sure to upgrade!
- Added the following helper functions:
  - `getCharacterDamageMultiplier`
  - `getOtherPlayers`
  - `isEntity`
  - `isBomb`
  - `isEffect`
  - `isFamiliar`
  - `isKnife`
  - `isLaser`
  - `isNPC`
  - `isPickup`
  - `isPlayer`
  - `isProjectile`
  - `isTear`
  - `isGridEntity`
  - `isDoor`
  - `isPit`
  - `isPoop`
  - `isPressurePlate`
  - `isRock`
  - `isSpikes`
  - `isTNT`
  - `getRoomHistory`
  - `getPreviousRoomDescription`
  - `getLatestRoomDescription`
  - `getPickupIndex`
  - `onAscent`
  - `sumMap`
  - `sumSet`
  - `getRandomVector`
  - `getRandomColor`
  - `getRandomKColor`
  - `smeltTrinkets`
  - `serializeIsaacAPIClass`
  - `fireProjectilesInCircle`
  - `spawnRockAltReward`
  - `isDaddyLongLegsChildStompEntity`
- Renamed the following helper functions:
  - `spawnCustomGrid` --> `spawnCustomGridEntity`
  - `removeCustomGrid` --> `removeCustomGridEntity`
  - `isBomb` --> `isBombPickup`
  - `isPoop` --> `isPoopPickup`
  - `logEffects` --> `logPlayerEffects`
- Changed the following helper functions:
  - `fireProjectiles` now accepts an undefined NPC for the cases where you do not want the projectiles to come from anything in particular.
- Added the following enums:
  - `UrnVariant`
  - `MushroomVariant`
  - `SkullVariant`
  - `PolypVariant`
  - `BucketVariant`
- Added the following custom callbacks:
  - `POST_PLAYER_INIT_FIRST` (use this for e.g. custom character initialization)
  - `POST_GRID_ENTITY_CUSTOM_UPDATE`
  - `POST_GRID_ENTITY_CUSTOM_RENDER`
  - `POST_GRID_ENTITY_CUSTOM_COLLISION`
  - `POST_GRID_ENTITY_CUSTOM_BROKEN`
- Removed the following custom callbacks:
  - `POST_PLAYER_INIT_REORDERED` (use `POST_PLAYER_INIT_FIRST` or `POST_GAME_STARTED_REORDERED` instead)
- Changed the following custom callbacks:
  - `POST_FLIP` and `POST_FIRST_FLIP` now pass the old player object in addition to the new one.
- Added the following custom commands:
  - `angelRoom` (alias for `angel`)
  - `bossRoom` (alias for `boss`)
  - `devilRoom` (alias for `devil`)
  - `errorRoom` (alias for `error`)
  - `iAmErrorRoom` (alias for `iAmError`)
  - `sacrificeRoom` (alias for `sacrifice`)
  - `secretRoom` (alias for `secret`)
  - `superSecretRoom` (alias for `superSecret`)
  - `startRoom` (alias for `fool`)
  - `startingRoom` (alias for `fool`)
  - `treasureRoom` (alias for `treasure`)
  - `ultraSecretRoom` (alias for `ultraSecret`)
  - `tests` (alias for `runTests`)
- Removed the following custom commands:
  - `h`
  - `mh`
  - `rh`
  - `sh`

## July 20th, 2022

- The shader crash fix will now be automatically be applied to any upgraded mods. (The method was originally discovered by AgentCucco.)
- Breaking:
  - The `removeAllNPCs` function now takes "entityType", "variant", and "subType" parameters, which moves the location of the "cap" parameter.
- Added the following helper functions:
  - `getRoomShapeDoorSlot`
  - `getJSONRoomDoorSlotFlags`
  - `getGotoCommand`
  - `getPlayerFamiliars`
  - `movePlayersToCenter`
  - `runNextRoom`
  - `reorderedCallbacksSetStage`
  - `isNarrowRoom`
  - `getRoomShapeCorners`
  - `pause`
  - `unpause`
  - `getEntityIDFromConstituents`
  - `getGridEntityIDFromConstituents`
  - `getScreenTopCenterPos`
  - `getScreenBottomCenterPos`
  - `getRockAltType`
  - `setUnseeded`
  - `getBombPickups`
  - `removeAllBombPickups`
  - `spawnBombPickup`
  - `spawnBombPickupWithSeed`
  - `removeAllRedHearts`
  - `removeGridEntities`
  - `removeAllPits`
  - `removeAllPoops`
  - `removeAllPressurePlates`
  - `removeAllRocks`
  - `removeAllSpikes`
  - `removeAllTNT`
  - `spawnDoor`
  - `spawnPit`
  - `spawnPoop`
  - `spawnPressurePlate`
  - `spawnRock`
  - `spawnSpikes`
  - `spawnTNT`
  - `logEntities`
  - `logEntity`
  - `logGridEntities`
  - `logGridEntity`
  - `restartNextRenderFrame`
- Renamed the following helper functions:
  - `removeGrid` --> `removeGridEntity`
  - `spawnGrid` --> `spawnGridEntity`
  - `spawnGridWithVariant` --> `spawnGridEntityWithVariant`
  - `logEntities` --> `logAllEntities`
  - `logGridEntities` --> `logAllGridEntities`
- Removed the following helper functions:
  - `getGotoCommandPrefix` (use `getGotoCommand` instead)
  - `getDefaultColor` (use `ColorDefault`)
  - `getDefaultKColor` (use `KColorDefault` instead)
- Changed the following helper functions:
  - All of the `get` grid entity helper functions now take a variant parameter.
  - The JSON helper functions now use a [custom JSON parser](https://github.com/rxi/json.lua), which is 11.8 times faster than the vanilla parser.
- Added the following constants:
  - `NEW_RUN_PLAYER_STARTING_POSITION`
  - `NEW_FLOOR_STARTING_POSITION_NORMAL_MODE`
  - `NEW_FLOOR_STARTING_POSITION_GREED_MODE`
  - `ColorDefault`
  - `KColorDefault`
  - `fonts` (which contains all 7 pre-loaded vanilla fonts)
- Added the following custom console commands:
  - `flight`
  - `unseed`
  - `gridCosts`
  - `runTests`
- The `grid` and `grid2` custom console commands have been switched.
- The [`no-unsafe-plusplus`](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/no-unsafe-plusplus.md), [`prefer-plusplus`](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/prefer-plusplus.md), and [`prefer-postfix-plusplus`](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/prefer-postfix-plusplus.md) ESLint rules have been added to the standard linting configuration.

## July 12th, 2022

- Breaking:
  - `addRoomClearCharge` now has an argument of `bigRoomDoubleCharge` (instead of the old argument of `ignoreBigRoomDoubleCharge`), so you will need to invert the boolean.
  - `arrayRemove` will now only remove the first matching element (instead of every matching element). Use `arrayRemoveAll` for that behavior instead.
  - Renamed `ISAAC_FRAMES_PER_SECOND` --> `RENDER_FRAMES_PER_SECOND`
  - Renamed `getDoorEnterPositionOffset` --> `getDoorSlotEnterPositionOffset`
- Added the following helper functions:
  - `playerHasHealthLeft`
  - `clearFloorDisplayFlags`
  - `isRoomShapeDoubleCharge`
  - `getRoomShapeCharges`
  - `getRoomShapeDoorSlotCoordinates`
  - `getGridEntitiesExcept`
  - `spawnCustomGrid`
  - `removeCustomGrid`
  - `addCharge`
  - `arrayRemoveAll`
  - `arrayRemoveAllInPlace`
- Changed the following helper functions:
  - All of the `spawn` helper functions now have the option to pass an RNG object instead of a seed.
  - `addRoomClearCharge` and `addRoomClearChargeToSlot` now take an optional argument of `playSoundEffect`.
  - `registerHotkey` now will accept a function that returns a `Keyboard` in addition to a `Keyboard`.
- Added the following custom callbacks:
  - `POST_COLLECTIBLE_EMPTY`

## July 5th, 2022

- Breaking changes:
  - The values of `ChallengeRoomSubType.NORMAL` and `ChallengeRoomSubType.BOSS` changed, since they were bugged.
- Added the following helper functions:
  - `validateEnumContiguous`
  - `getMatchingGridEntities`
  - `getTrapdoors`
  - `getCrawlSpaces`
  - `getRoomClearGameFrame`
  - `getRoomClearRoomFrame`
  - `anyPlayerUsingPony`
  - `getStageHistory`
  - `hasVisitedStage`
  - `calculateStageType`
  - `calculateStageTypeRepentance`
  - `getRoomsInGrid`
  - `getRoomDisplayFlags`
  - `setRoomDisplayFlags`
  - `getFloorDisplayFlags`
  - `setFloorDisplayFlags`
  - `setDisplayFlags`
  - `setStage`
  - `isVanillaConsoleCommand`
  - `registerHotkey`
  - `unregisterHotkey`
  - `getGotoCommandPrefix`
  - `convertBinaryToDecimal`
  - `convertDecimalToBinary`
  - `doorSlotToDoorSlotFlag`
  - `swapArrayElements`
  - `arrayToBitFlags`
  - `setToBitFlags`
  - `getDoorSlotFlags`
  - `getArrayCombinations`
  - `getSetCombinations`
  - `swapArrayElements`
  - `arrayToBitFlags`
  - `setToBitFlags`
  - `setIntervalGameFrames`
  - `setIntervalRenderFrames`
- Renamed the following helper functions:
  - `isPonyActive` --> `isPlayerUsingPony`
  - `inCrawlspace` --> `inCrawlSpace`
  - `pickingUpItemIsNull` --> `isPickingUpItemNull`
  - `pickingUpItemIsCollectible` --> `isPickingUpItemCollectible`
  - `pickingUpItemIsTrinket` --> `isPickingUpItemTrinket`
- Added the following custom commands:
  - `mana`
- Removed the following helper functions:
  - `getCollectibleTypeRange` (use `getCollectibleArray` instead)

## June 28th, 2022

- The change log is now located on [the official website](https://isaacscript.github.io/main/change-log).
- IsaacScript now requires a dependency of "@types/node", "typescript", and "ts-node" in your "package.json" file. (This is so that TSTL can properly use plugins.) If any dependencies are missing when you run the tool, it will helpfully tell you the appropriate command to run to fix the problem.
- The IsaacScript watcher icon now turns green when the mod is compiling.
- Breaking changes:
  - Any callback definition with `void` inside of a union has been renamed to `undefined` in order to have more consistent code and satisfy the TypeScript ESLint rules. This means that you may need to add `return undefined;` to some of your callback functions is order to satisfy the compiler. (Doing so explicitly acknowledges that this is the type of callback that expects a return value.)
  - The `removeAllGridExcept` and `removeAllMatchingGridEntities` functions now return an array of the grid entities that are removed.
  - The [`consistent-return`](https://eslint.org/docs/latest/rules/consistent-return) ESLint rule has been turned off in favor of the [`noImplicitReturns`](https://www.typescriptlang.org/tsconfig#noImplicitReturns) compiler flag. (The latter is type-aware, which results in a more comprehensive check.)
  - The [`default-case`](https://eslint.org/docs/latest/rules/default-case) ESLint rule has been turned off in favor of the [`switch-exhaustiveness-check`](https://typescript-eslint.io/rules/switch-exhaustiveness-check/) ESLint rule. Subsequently, the `ensureAllCases` helper function has been removed, since it is no longer needed. You can clean up all of the boilerplate default cases from your switches, as TypeScript + ESLint will now automatically be able to derive if you did not handle a switch case.
  - The `strict` configure from `@typescript-eslint` has been enabled.
- Added the following helper functions:
  - `getBombRadiusFromDamage`
  - `getPlayerFromTear`
  - `isDamageFromPlayer`
  - `playerConvertBlackHeartsToSoulHearts`
  - `playerConvertSoulHeartsToBlackHearts`
  - `doesEntityExist`
  - `spawnPersistentEntity` (for creating pickup-like entities)
  - `removePersistentEntity` (for removing entities spawned with `spawnPersistentEntity`)
  - `getPHDPillEffect`
  - `getFalsePHDPillEffect`
  - `doesPlayerHaveAllSoulHearts`
  - `doesPlayerHaveAllBlackHearts`
  - `getEntityFields`
  - `logTableDifferences`
  - `isCloseEnoughToTriggerDiceFloor`
  - `setCollectibleGlitched`
  - `startAmbush`
  - `isTable`
  - `isUserdata`
  - `isBoolean`
  - `isNumber`
  - `isString`
  - `isFunction`
  - `newPlayerHealth`
  - `getCollectibleArray`
  - `getVanillaCollectibleArray`
  - `getModdedCollectibleArray`
- Renamed the following helper functions:
  - `getCurrentRoomDescriptorReadOnly` --> `getRoomDescriptorReadOnly`
  - `getCurrentDimension` --> `getDimension`
  - `iterateTableDeterministically` --> `iterateTableInOrder`
- Removed the following helper functions:
  - `ensureAllCases` - This is no longer needed with the new linting rules. See the above explanation.
- Added the following constants:
  - `NUM_PILLS_IN_POOL`
  - `MIN_PLAYER_SPEED_STAT`
  - `MIN_PLAYER_SHOT_SPEED_STAT`
- Added the following enums:
  - `DiceFloorSubType`
- Added the following custom callbacks:
  - `POST_PICKUP_INIT_FIRST`
  - `POST_PLAYER_COLLECTIBLE_ADDED`
  - `POST_PLAYER_COLLECTIBLE_REMOVED`
  - `POST_AMBUSH_STARTED`
  - `POST_AMBUSH_FINISHED`
  - `POST_BOMB_EXPLODED`
- The inventory feature now uses the `POST_PLAYER_COLLECTIBLE_ADDED` callback, so it will now properly account for items given via the console and via code.
- The inventory feature now uses the `POST_PLAYER_COLLECTIBLE_REMOVED` callback, so it will now properly account for items that are removed.

## June 21st, 2022

- Breaking changes:
  - `DefaultMap` now takes the default value/function as the first argument and the initializer array as the second argument.
  - The `removeEntities` and `removeAllX` functions now return an array of the entities that are removed.
- Added the following helper functions:
  - `isPrimitive`
  - `getTSTLClassName`
  - `isTSTLMap`
  - `isTSTLSet`
  - `isDefaultMap`
  - `twoDimensionalSort`
  - `iterateTableDeterministically`
  - `getOppositeDoorSlot`
  - `angleToDirection`
- Renamed the following helper functions:
  - `getIsaacAPIClassType` --> `getIsaacAPIClassName`
- Added the following lint rules:
  - `no-invalid-default-map`
- `isaacscript init` no longer creates a `bundleEntry.ts` file. If you use the `noImplicitGlobalVariables` compiler flag, then this is unnecessary. For more information, see the new `tsconfig.json` [template file](https://github.com/IsaacScript/isaacscript/blob/main/packages/isaacscript-cli/file-templates/static/tsconfig.json).

## June 4th, 2022

- IsaacScript now supports [pnpm](https://pnpm.io/). (Thanks KatTheFox)
- `Color.Default` is now deprecated and will cause compiler errors. Use the `ColorDefault` constant from the standard library instead, which is guaranteed to be safe. (Alternatively, you can create your own constant that is local to your mod.)

## May 28th, 2022

### `package.json`

IsaacScript mods now require that "typescript-to-lua" is listed as a dependency in your "package.json" file. In other words, type one of the following commands:

```sh
# If you use npm:
npm install --save typescript-to-lua

# If you use Yarn:
yarn add typescript-to-lua

# If you use pnpm:
pnpm add typescript-to-lua
```

### Other

- All of the IsaacScript packages are now contained in a monorepo. The other various repositories have been deleted.
- The linting meta-package now uses `eslint-plugin-isaacscript`, which contains a [bunch of new rules](https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript) that will make your code safer.
- IsaacScript now supports the [Yarn](https://yarnpkg.com/) package manager. It will use Yarn by default if it detects that you have it installed.
- IsaacScript now shows how many seconds it took to compile the mod.
- Added the following helper functions:
  - `saveDataManagerReset` (to force the save data manager to reset a specific set of variables)
  - `isHiddenCollectible`
  - `getEdenPassives`
  - `getRandomEdenPassive`
  - `mapHasPlayer`
- Renamed the following helper functions:
  - `preventCollectibleRotate` --> `preventCollectibleRotation`
- Added the following custom console commands:
  - `gridEntities` - Spawns every kind of grid entity. Useful for debugging.
- Added the following enums:
  - `PitState`
- Fixed the Encyclopedia definitions. (Thanks 4Grabs)

## May 21st, 2022

- All functions that take a specific kind of type (e.g. `EntityType`, `PlayerVariant`, etc.) are now no longer in a union with `int`. This makes the API much more type-safe than before. The flip side of this is that you must change any self-defined enums like `CollectibleTypeCustom` to an object instead. See [the docs](https://isaacscript.github.io/main/gotchas#extending-enums----custom-enums) for more details.
- `Vector.Zero` and `Vector.One` are now deprecated and will cause compiler errors. Use the `VectorZero` and `VectorOne` constants from the standard library instead, which are guaranteed to be safe. (Alternatively, you can create your own constants that are local to your mod.)
- `DefaultMap` no longer passes the key to the factory function. This means you can clean up the unused `_key` argument in all of your default maps. In the rare case that you are actually using the key in the factory, you can pass it explicitly as a normal argument.
- Added the following helper functions:
  - `fillLevelWithRedRooms`
  - `getAllDimensions`
  - `getAllCards`
  - `getModdedCards`
  - `getVanillaCards`
  - `getAllPillEffects`
  - `getModdedPillEffects`
  - `getVanillaPillEffects`
  - `getAllPillColors`
  - `getNormalPillColors`
  - `getHorsePillColors`
  - `getCollectibleTypeRange`
  - `getVanillaCollectibleTypeRange`
  - `getModdedCollectibleTypes`
  - `getTrinketTypes`
  - `getVanillaTrinketTypes`
  - `getModdedTrinketTypes`
  - `getDoorEnterPosition`
  - `getDoorEnterPositionOffset`
  - `getNormalPillColorFromHorse`
  - `getPits`
  - `getPlayersWithTrinket`
  - `getPoops`
  - `getPressurePlates`
  - `getRandomEnumValue`
  - `getRocks`
  - `getRoomNeighbors`
  - `getRoomShapeNeighborGridIndexDeltas`
  - `getSpikes`
  - `getTNT`
  - `inMineShaft`
  - `isHeart`
  - `isCoin`
  - `isKey`
  - `isBomb`
  - `isPoop`
  - `isSack`
  - `isPill`
  - `isBattery`
  - `isCollectible`
  - `isCardPickup`
  - `isTrinket`
  - `isValidCollectibleType`
  - `pickingUpItemIsCollectible`
  - `pickingUpItemIsTrinket`
  - `roomGridIndexToXY`
- Added a `Zero` constant for every flag enum. (e.g. `EntityFlagZero`, `TearFlagZero`, and so on.)
- The "max" constants are changed, with many new ones added:
  - Collectibles:
    - `FIRST_COLLECTIBLE_TYPE`
    - `LAST_COLLECTIBLE_TYPE`
    - `LAST_VANILLA_COLLECTIBLE_TYPE`
    - `FIRST_MODDED_COLLECTIBLE_TYPE`
    - `NUM_VANILLA_COLLECTIBLE_TYPES`
    - `NUM_MODDED_COLLECTIBLE_TYPES`
    - `NUM_COLLECTIBLE_TYPES`
  - Trinkets:
    - `NUM_TRINKET_TYPES`
    - `NUM_VANILLA_TRINKET_TYPES`
    - `NUM_MODDED_TRINKET_TYPES`
    - `FIRST_TRINKET_TYPE`
    - `LAST_TRINKET_TYPE`
    - `LAST_VANILLA_TRINKET_TYPE`
    - `FIRST_MODDED_TRINKET_TYPE`
  - Cards:
    - `NUM_CARDS`
    - `NUM_VANILLA_CARDS`
    - `NUM_MODDED_CARDS`
    - `FIRST_CARD`
    - `LAST_CARD`
    - `LAST_VANILLA_CARD`
    - `FIRST_MODDED_CARD`
  - Pill effects:
    - `NUM_PILL_EFFECTS`
    - `NUM_VANILLA_PILL_EFFECTS`
    - `NUM_MODDED_PILL_EFFECTS`
    - `FIRST_PILL_EFFECT`
    - `LAST_PILL_EFFECT`
    - `LAST_VANILLA_PILL_EFFECT`
    - `FIRST_MODDED_PILL_EFFECT`
  - Pill colors:
    - `FIRST_PILL_COLOR`
    - `LAST_NORMAL_PILL_COLOR`
    - `FIRST_HORSE_PILL_COLOR`
    - `LAST_HORSE_PILL_COLOR`
    - `NUM_NORMAL_PILL_COLORS`
  - Players:
    - `FIRST_CHARACTER`
    - `LAST_VANILLA_CHARACTER`
    - `FIRST_MODDED_CHARACTER`
  - Other:
    - `FIRST_STAGE`
    - `LAST_STAGE`
    - `FIRST_ROOM_TYPE`
    - `LAST_ROOM_TYPE`
- Added the appropriate `HORSE_` enum values to the `PillColor` enum.
- Added the following custom callbacks:
  - `POST_GRID_ENTITY_RENDER`
  - `POST_DOOR_RENDER`
  - `POST_DOOR_UPDATE`
  - `POST_PIT_RENDER`
  - `POST_PIT_UPDATE`
  - `POST_POOP_RENDER`
  - `POST_POOP_UPDATE`
  - `POST_PRESSURE_PLATE_RENDER`
  - `POST_PRESSURE_PLATE_UPDATE`
  - `POST_ROCK_RENDER`
  - `POST_ROCK_UPDATE`
  - `POST_SPIKES_RENDER`
  - `POST_SPIKES_UPDATE`
  - `POST_TNT_RENDER`
  - `POST_TNT_UPDATE`
- You can now register several player-based custom callbacks using `PlayerVariant` and `PlayerType` as optional 2nd and 3rd arguments, respectively (e.g. `PRE_BERSERK_DEATH`).
- You can now register all custom grid entity callbacks using an optional 3rd argument of grid entity variant.
- Added the following custom console commands:
  - `map` - Reveals the entire map, including Ultra Secret Rooms.
  - `doorDisplay` - Show debugging information next to every door.
  - `pitDisplay` - Show debugging information next to every pit.
  - `poopDisplay` - Show debugging information next to every poop.
  - `pressurePlateDisplay` - Show debugging information next to every pressure plate.
  - `rockDisplay` - Show debugging information next to every rock.
  - `spikesDisplay` - Show debugging information next to every spikes.
  - `tntDisplay` - Show debugging information next to every TNT.

## May 14th, 2022

IsaacScript has now reached **version 2**! We've come a long way with many features, and there's more yet to come. Version 2 comes with breaking changes, but as always, upgrading your mod is optional.

### Breaking Changes

- All enums are now local instead of global. The global declarations have been removed, which forces you to use the local ones. Doing this has several advantages, at the small cost of having to auto-import more things. See [the docs](https://isaacscript.github.io/main/gotchas#local-enums-and-importing) for more info.
- Bit flags are now represented as a `BitFlags` type. This means that the Isaac API now has real type safety for all bit flags! See [the docs](https://isaacscript.github.io/main/gotchas#bit-flags) for more info.
- Renamed the following helper functions:
  - `range` --> `irange` <!-- cspell:disable-line -->
- Renamed the following enums:
  - `PillEffectClass` --> `ItemConfigPillEffectClass`
  - `PillEffectType` --> `ItemConfigPillEffectType`
- Removed the following enums:
  - `CardType` (since it was almost the same thing as `ItemConfigCardType`)
- When registering the `POST_PEFFECT_UPDATE_REORDERED` callback, the second argument is now a `PlayerVariant` instead of a `PlayerType`. It now takes a `PlayerType` as a third argument.

### Non-Breaking Changes

- `isaac-typescript-definitions` now ships with an official Isaac word dictionary that can be imported into CSpell. See the [new template](https://github.com/IsaacScript/isaacscript/blob/main/packages/isaacscript-cli/file-templates/static-mod/_cspell.jsonc) for more information.
- Added the following helper constants since the corollary enum values were purged:
  - `NUM_CARDS` / `MAX_CARD` / `NUM_VANILLA_CARDS` / `MAX_VANILLA_CARD`
  - `NUM_COLLECTIBLE_TYPES` / `MAX_COLLECTIBLE_TYPE` / `NUM_VANILLA_COLLECTIBLE_TYPES` / `MAX_VANILLA_COLLECTIBLE_TYPE`
  - `NUM_PILL_EFFECTS` / `MAX_PILL_EFFECT` / `NUM_VANILLA_PILL_EFFECTS` / `MAX_VANILLA_PILL_EFFECT`
  - `NUM_TRINKET_TYPES` / `MAX_TRINKET_TYPE` / `NUM_VANILLA_TRINKET_TYPES` / `MAX_VANILLA_TRINKET_TYPE`
- Added the following helper functions:
  - `doorSlotFlagToDoorSlot`
  - `erange` (for exclusive ranges) <!-- cspell:disable-line -->
  - `getArrayIndexes`
  - `getEnumEntries`
  - `getGridEntityID`
  - `getRoomTypeName`
  - `isModdedPlayer`
  - `isVanillaPlayer`
  - `logLevelStateFlags`
  - `removeAllCharacters`
  - `removeSubstring`
- Added the following enums:
  - `DoorSlotFlag`
- Added the following custom callbacks:
  - `POST_GREED_MODE_WAVE`
  - `POST_HOLY_MANTLE_REMOVED`

## April 28th, 2022

- Added many new custom console commands, including `playerDisplay`, `npcDisplay`, and so on for rendering custom text on top of an entity for debugging purposes. See the `isaacscript-common` documentation for the full list.
- Added the following helper functions:
  - `defaultMapSetPlayer`
  - `todo`
  - `printEnabled`
- Renamed the following helper functions:
  - `getPlayerNumTransformationCollectibles` --> `getPlayerNumCollectiblesForTransformation`
- Added custom callbacks:
  - `POST_FAMILIAR_STATE_CHANGED`
  - `POST_PICKUP_STATE_CHANGED`
  - `POST_EFFECT_STATE_CHANGED`
  - `POST_NPC_STATE_CHANGED`
  - `POST_ITEM_DISCHARGE`

## April 21st, 2022

- Added the following helper functions:
  - `getBossSet` (for getting the set of vanilla bosses)
  - `getCombinedBossSet` (for getting the set of vanilla bosses)
  - `getAllBossesSet`
  - `spawnBoss`
  - `spawnBossWithSeed`
  - `getUnusedDoorSlots`
  - `getRoomsOfDimension`
  - `registerCharacterHealthConversion` (for making custom characters like Blue Baby or Tainted Judas)
  - `getCollectibleTags`
  - `getPlayerCollectibleCount`
  - `getCollectibleTypesWithTag`
  - `getPlayerNumCollectiblesWithTag`
- `ItemConfigTag` is no longer a constant enum and must be imported. You can now iterate over this enum in your code.

## April 14th, 2022

- Added the following helper functions:
  - `playerHasCollectible`
  - `playerAddCollectible`
  - `arrayRemoveIndex`
  - `arrayRemoveIndexInPlace`

## April 2nd, 2022

- Added the `--yes` flag to `isaacscript init`.
- Added the following helper functions:
  - `vectorToString`
  - `spawn`
  - `spawnWithSeed`
  - `getCoinValue`
- Added the helper functions of `spawnPickup`, `spawnPickupWithSeed`, and so on for every specific type of entity.
- Added the helper functions of `removeAllPickups`, and so on for every specific type of entity.
- Added every easing function from [easings.net](https://easings.net/).
- Added the `VectorZero` and `VectorOne` constants. (These are safer to use than the vanilla `Vector.Zero` and `Vector.One` constants.)

## March 26th, 2022

- Added the changes for vanilla patch 1.7.8a. Several values missing from the vanilla enums are added a well.
- The API's `Random` function should never be used directly. Use the `getRandomSeed` helper function instead to prevent crashes.
- If you have `gh` installed (i.e. the GitHub CLI), IsaacScript will now prompt you to automatically create a new GitHub repository when initializing a new mod.
- The IsaacScript save data manager will now automatically serialize the `RNG` class. Thus, you can now use `RNG` objects instead of seeds in your data structures. This is more convenient than using seeds because the `getRandom` series of functions will automatically "next" the seed. Also, it is slightly safer because you avoid initializing a seed to 0.
- The IsaacScript save data manager will now automatically serialize the `Color` class and the `KColor` class.
- Added the following helper functions:
  - `enableFastReset` (useful for debugging)
  - `disableFastReset` (useful for debugging)
  - `removeFadeIn` (useful for debugging)
  - `restoreFadeIn` (useful for debugging)
  - `getDefaultPlayerStat`
  - `registerCharacterStats` (for the new character stats management feature)
  - `getEnumKeys`
  - `getActiveItemSlot`
  - `isFirstSlotPocketActiveItem`
  - `getPlayerHearts`
  - `getRedHearts`
  - `isRedHeart`
  - `getCoins`
  - `getKeys`
  - `characterStartsWithActiveItem`
  - `getDirectionName`
  - `validateCustomEnum`
  - `addStat`
  - `logError`
  - `getRandomSeed`
  - `isUserdataObject`
  - `isRNG`
  - `copyRNG`
  - `isColor`
  - `getDoorSlotsForRoomShape`
  - `isDoorSlotInRoomShape`
  - `getRoomAllowedDoors`
  - `copyValuesToTable`
  - `getNumbersFromTable`
  - `getStringsFromTable`
  - `getBooleansFromTable`
  - `setSeed`
  - `setAllRNGToSeed`
  - `setAllRNGToStartSeed`
  - `isSin`
  - `getGridIndexDelta`
  - `logUserdata`
  - `isCharacter`
  - `texelEquals`
  - `spriteEquals`
  - `collectibleSpriteEquals`
  - `copySerializableIsaacAPIClass`
  - `isSerializedIsaacAPIClass`
  - `colorEquals`
  - `kColorEquals`
  - `rngEquals`
  - `vectorEquals`
  - `roomExists`
  - `getRoomShape`
  - `isDoorSlotValidAtGridIndex`
  - `isDoorSlotValidAtGridIndexForRedRoom`
  - `directionToDegrees`
  - `getRoomShapeBottomRightPosition`
  - `getRoomShapeTopLeftPosition`
  - `getRoomShapeBounds`
  - `getRoomShapeLayoutSize`
  - `getRoomShapeVolume`
  - `newChargeBarSprites`
  - `renderChargeBar`
  - `isLRoom`
  - `gridIndexToGridPosition`
  - `isValidGridPosition`
  - `getRoomShapeWidth`
  - `benchmark`
- Renamed the following helper functions:
  - `getLastHeart` --> `getPlayerLastHeart`
  - `getSoulHearts` --> `getPlayerSoulHearts`
  - `getBlackHearts` --> `getPlayerBlackHearts`
  - `initRNG` --> `newRNG`
  - `gridToPos` --> `gridCoordinatesToWorldPosition`
- Added the `getRandomFromSeed` series of functions. You can use these if you don't want to convert your data structures to use `RNG` objects.
- Deleted the `getRandomFromRNG` series of functions. The `getRandom` series of functions now take `RNG` objects.
- Added the following constants:
  - `TAINTED_SAMSON_BERSERK_CHARGE_FROM_TAKING_DAMAGE`
  - `MAX_TAINTED_SAMSON_BERSERK_CHARGE`
  - `LEVEL_GRID_ROW_LENGTH`
  - `LEVEL_GRID_COLUMN_HEIGHT`
- Added the following enums:
  - `BloodExplosionSubType`
  - `CurseRoomSubType`
- Added `PICKUP_MISSING_SHOVEL` to the `PickupVariant` enum. (It is missing in the vanilla enum.)
- Added the following custom callbacks:
  - `POST_COLLECTIBLE_INIT_FIRST`

## March 19th, 2022

- The standard library now comes with many helpful console commands. Activate them by calling `enableExtraConsoleCommands`. You can also use `addConsoleCommand` to add your own commands and `removeConsoleCommand` to remove ones that overlap with your own commands. See the documentation for the specific list of commands.
- Added the following helper functions:
  - `getMapPartialMatch`
  - `restart`
  - `logSounds`
  - `logEntities`
  - `logGridEntities`
  - `addPlayerHealthType`
  - `getPlayerHealthType`
  - `getCharacterName`
  - `getPlayerInventory` (to get a list of all of the player's collectibles)
  - `addCollectible`
  - `isActiveSlotDoubleCharged`
  - `isActiveSlotEmpty`
  - `doorSlotToDirection`
  - `initCustomDoor`
  - `spawnCustomDoor`
  - `getTaintedLazarusSubPlayer`
  - `setTrinketSprite`
  - `capitalizeFirstLetter`
  - `isActiveCollectible`
  - `getCollectibleIndex`
- Added the following constants:
  - `CARD_MAP`
  - `CHARACTER_MAP`
  - `PILL_EFFECT_MAP`
  - `MAX_SPEED_STAT`
  - `ROOM_TYPE_MAP`
  - `ROOM_TYPE_NAME_MAP`
  - `CHARACTER_NAME_MAP`
  - `DIRECTION_NAMES`
- Added the following custom callbacks:
  - `POST_SLOT_ANIMATION_CHANGED`
  - `POST_CUSTOM_DOOR_ENTER`
  - `ROOM_CLEAR_CHANGED`

## March 12th, 2022

- Added `game`, `itemConfig`, `musicManager`, and `sfxManager` cached classes to the standard library. You can use these instead of invoking the constructor yourself for a miniscule performance increase.
- Added the following helper functions:
  - `isEden`
  - `logPlayerHealth`
  - `enableAllSound`
  - `disableAllSound`
  - `getTaintedMagdaleneNonTemporaryMaxHearts`
  - `defaultMapGetPlayer` (to make it easier to work with maps that use `PlayerIndex` as an index)
  - `mapGetPlayer` (to make it easier to work with maps that use `PlayerIndex` as an index)
  - `mapSetPlayer` (to make it easier to work with maps that use `PlayerIndex` as an index)
  - `setAddPlayer` (to make it easier to work with sets that use `PlayerIndex` as an index)
  - `setDeletePlayer` (to make it easier to work with sets that use `PlayerIndex` as an index)
  - `setHasPlayer` (to make it easier to work with sets that use `PlayerIndex` as an index)
  - `mapGetNextSeed` (to make it easier to work with maps that have `Seed` values)
  - `defaultMapGetNextSeed` (to make it easier to work with maps that have `Seed` values)
  - `canPlayerCrushRocks`
- Removed `TRINKET_GOLDEN_FLAG` and `TRINKET_ID_MASK` from the `TrinketType` enum. They are now exposed as constants.
- Removed `PILL_GIANT_FLAG` and `PILL_COLOR_MASK` from the `PillColor` enum. These are now exposed as constants.
- Added `USE_ECHO_CHAMBER` to the `UseFlag` enum. (This is missing in the vanilla enum.)

## March 5th, 2022

- Added the following helper functions:
  - `willReviveFromHeartbreak`
  - `isPonyActive`
  - `inSecretShop`
  - `logRoom`
  - `countSetBits`
  - `getSoulHearts` (this is different from the vanilla function)
  - `getBlackHearts` (this is different from the vanilla function)
  - `getHearts`
  - `inMegaSatanRoom`
  - `countEntities`
  - `getSortedSetValues`
  - `getRandomSetElement`
  - `getCardType`
  - `getMaxCards`
  - `getMaxPillEffects`
  - `isCardType`
  - `isTarotCard`
  - `isSuitCard`
  - `isSpecialCard`
  - `isTarotReverseCard`
  - `isModdedCard`
  - `getRandomCardType`
  - `getEntityID`
  - `clearCollectibleSprite`
  - `getCollectiblePedestalType`
- Renamed the following helper functions:
  - `combineArray` --> `combineArrays`
- Removed the following helper functions:
  - `getRandomHeartSubType`
- Added the following constants:
  - `CARD_TYPE_MAP`
- Added the following enums:
  - `ShopSubType`
  - `TreasureRoomSubType`
  - `ChallengeRoomSubType`
  - `LibrarySubType`
  - `DungeonSubType`
  - `IsaacsRoomSubType`
  - `SecretExitSubType`
  - `DownpourRoomSubType`
  - `MinesRoomSubType`
  - `CollectiblePedestalType`
- Renamed the following enums:
  - `BackwardsPathRoomSubType` --> `BackwardsRoomSubType`
- The signature for the `POST_PURCHASE` custom callback has changed to the following:

```ts
function postPurchase(player: EntityPlayer, pickup: EntityPickup): void {}
```

## February 26th, 2022

- The `Isaac.GetPlayer` method will no longer return undefined. (You can now delete any undefined-related checks.)
- Added the `EntitySubPlayer` class to prevent bugs with `RNG`. (`EntityPlayer.GetSubPlayer` is defined as returning this.)
- Added the `DefaultMap` class. Use this instead of a `Map` if you need a data structure that will automatically instantiate default values. See [the documentation](https://isaacscript.github.io/isaacscript-common/other/classes/DefaultMap/) for more information.
- Added the following helper functions:
  - `checkFamiliar`
  - `checkFamiliarFromCollectibles`
  - `isShootAction`
  - `isMoveAction`
  - `removeDoor`
  - `removeDoors`
  - `removeAllDoors`
  - `getDoorsToRoomIndex`
  - `repeat`
  - `getEffectsList`
  - `isGridEntityBreakableByExplosion`
  - `isGridEntityBroken`
  - `getAllPlayers`
  - `getGridEntitiesMap`
  - `removeAllSlots`
- Renamed the following helper functions:
  - `tableClear` --> `clearTable`
  - Various array functions to be more consistent with map/set functions.
- The disable inputs feature now supports multiple mod features at once. The functions now require a key that matches the name of the calling mod feature.
- The `getPlayerIndex` function now takes a `differentiateForgottenAndSoul` argument, which is false by default.
- Added the following constants:
  - `NUM_DIMENSIONS`
  - `CHEST_PICKUP_VARIANTS`
- Added the following enums:
  - `LostSoulState`
  - `PoopState`
  - `SpiderWebState`
  - `SpikesOnOffState`
  - `LockState`
  - `TNTState`
  - `PoopState`
  - `StairsState`
- Added the following custom callbacks:
  - `POST_BONE_SWING`
  - `POST_GRID_ENTITY_CHANGE_STATE`
  - `POST_GRID_ENTITY_BROKEN`
- The signature of the `POST_PLAYER_CHANGE_TYPE` custom callback has changed to:

```ts
function postPlayerChangeType(
  player: EntityPlayer,
  oldCharacter: PlayerType | int,
  newCharacter: PlayerType | int,
) {}
```

## February 19th, 2022

- `isaacscript` now requires a Git version of at least 2.30.
- `isaacscript` now supports a `--verbose` flag for additional output.
- Added the following helper functions:
  - `setCollectiblesRerolledForItemTracker` (Thanks Gamonymous)
  - `getRandomArrayElementAndRemove`
  - `range`
  - `saveDataManagerLoad`
  - `isTainted`
  - `trimPrefix`
  - `getPlayerName`
  - `stringContains`
  - `isVanillaCharacter`
  - `isModdedCharacter`
  - `getPillEffectClass`
  - `getPillEffectType`
  - `collectibleHasCacheFlag`
  - `getCollectiblesForCacheFlag`
  - `getPlayerCollectiblesForCacheFlag`
  - `isCircleIntersectingRectangle`
  - `inRectangle`
  - `getCollidingEntitiesWithGridEntity`
  - `deleteSetsFromSet`
  - `getFlyingCollectibles`
  - `isTransformationFlying`
  - `hasFlyingTransformation`
  - `trinketHasCacheFlag`
  - `getTrinketsForCacheFlag`
  - `getFlyingTrinkets`
  - `getPlayerTrinketsForCacheFlag`
  - `isFlyingCharacter`
  - `runNextRenderFrame`
  - `runInNRenderFrames`
  - `stopAllSoundEffects`
- Renamed the following helper functions:
  - `runNextFrame` --> `runNextGameFrame`
  - `runInNFrames` --> `runInNGameFrames`
- Refactored transformation related helper functions to be more private, to be lazy initialized, and to use sets instead of arrays.
- Added the following constants:
  - `SECOND_IN_MILLISECONDS`
  - `MINUTE_IN_MILLISECONDS`
  - `PILL_EFFECT_CLASS_MAP`
  - `PILL_EFFECT_TYPE_MAP`
  - `DEFAULT_PILL_EFFECT_CLASS`
  - `DEFAULT_PILL_EFFECT_TYPE`
- Added the following enums:
  - `PillEffectType`
  - `PillEffectClass`
  - `MotherSubType`
  - `PickupNullSubType`
- Added the following custom callbacks:
  - `POST_GRID_ENTITY_COLLISION`

## February 12th, 2022

- TSTL has been upgraded such that the lualib does not create any global variables.
- Added the following helper functions:
  - `getCollectibleQuality`
  - `getCharacters`
  - `combineSets`
  - `getDefaultGlobals`
  - `getNewGlobals`
  - `logNewGlobals`
  - `addSetsToSet`
  - `useActiveItemTemp`
- Renamed the following helper functions:
  - `getPlayerNumAllHearts` --> `getPlayerNumHitsRemaining`

## February 5th, 2022

- Added the `canTakeFreeDevilDeals` helper function.
- Added the `CHARACTERS_WITH_FREE_DEVIL_DEALS` constant.
- Added the `BloodClotSubType` enum. (Thanks KatTheFox)

## January 29th, 2022

- Added the `STORY_BOSSES` constant.
- Added the `isStoryBoss` helper function.

## January 22nd, 2022

- Added the `isRepentanceStage` helper function.

## January 14th, 2022

- Added the following helper functions:
  - `isDamageToPlayerFatal`
  - `getHeartRowLength`
- Added the following custom callbacks:
  - `PRE_BERSERK_DEATH`

## January 7th, 2022

- Added the `MAX_VANILLA_CHARACTER` constant.

## December 31st, 2021

- Updated the `TrapdoorVariant` enum.
- Added the `spawnVoidPortal` helper function.

## December 26th, 2021

- Updated TSTL to version 1.3.0.
- The `Level.ChangeRoom` method will now throw a compiler error, since it does not update the `fxlayers` correctly. (`Game.ChangeRoom` should be used instead.)
- Added the following helper functions:
  - `openDoorFast`
  - `closeDoorFast`
- The `changeRoom` and `teleport` helper functions now check to see if the room exists first to prevent crashes.
- Added the following enums:
  - `BrokenWatchState`

## December 19th, 2021

- New projects created with `isaacscript init` will now automatically include XML linting in the `lint.sh` script + CI. (This linter found bugs in the production versions of Babies Mod & Forgotten Fables, so it seems useful.)
- New projects created with `isaacscript init` will now automatically include `pull.rebase=true` in the ".gitattributes" file. (This prevents merge commits by default.)
- `isaacscript publish` will now use the Nicalis mod uploader tool when it detects that `steamcmd` is not available. (Previously, it would error and do nothing.)
- Added the following helper functions:
  - `logAllSeedEffects`
  - `logTemporaryEffects`
  - `getFilteredEntities` (Thanks KatTheFox)
  - `fireProjectiles` (Thanks KatTheFox)
  - `rerollEnemy` (Thanks KatTheFox)
  - `characterGetsBlackHeartFromEternalHeart`
- Added the following constants:
  - `CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART`
- Added the `AnyEntity` type, which is the composition of `Entity,` `EntityBomb`, `EntityPickup`, and so on.

## December 12th, 2021

### Prettier

`eslint-plugin-prettier` is no longer used in favor of using Prettier directly. Doing this has pros and cons, but has more pros than cons.
As a result of the change, you will no longer see linting errors in VSCode for formatting-related issues. (Of course, all of the formatting-related issues will still be fixed automatically upon saving the file, same as it was before.)

If you decide to upgrade `isaacscript-lint` in your existing projects, you should also perform the following steps to keep Prettier working:

<!-- markdownlint-disable MD029 -->

1. Install the Prettier VSCode extension.

2. Add the Prettier VSCode extension to `extensions.json`:

```json
"esbenp.prettier-vscode", // The TypeScript formatter
```

3. Add the following lines to the `"[javascript]"` and `"[typescript]"` sections of the `settings.json` file:

```json
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
```

4. Add the following to the `lint.sh` file:

```bash
# Use Prettier to check formatting
npx prettier --log-level=warn --check .
```

<!-- markdownlint-enable MD029 -->

### Other

- The `isaacscript` tool now uses a different prompt library, which fixes the bug where prompts would be repeated in a Git Bash shell.
- The `isaacscript` tool will now automatically initialize a Git repository for new projects. Having the GitHub CLI installed is recommended, since it helps the tool guess what your GitHub username is.
- Rewrote & simplified the "Getting Started" page.
- Added the following helper functions:
  - `temporarilyRemoveTrinket` (which removes all trinkets)
  - `smeltTrinket`
  - `getTransformationName`
  - `getCurrentRoomDescReadOnly`
  - `isRedKeyRoom`
  - `arrayCombine`
  - `arrayCopy`
  - `getChallengeName`
- Renamed the following helper functions:
  - `temporarilyRemoveTrinkets` --> `temporarilyRemoveTrinket` (because it only removes a single trinket)
- The `getEntities` and related helper functions now return a boolean, indicating if they removed one or more entities.
- The `clearSprite` helper function now clears all layers by default.
- The `getDoors` helper function is now variadic.
- Added the following constants:
  - `TRANSFORMATION_NAME_MAP`
  - `CHALLENGE_NAME_MAP`
- Added the following custom callbacks:
  - `POST_TRINKET_BREAK`
  - `POST_PEFFECT_UPDATE_REORDERED`

## December 5th, 2021

- Updated the TypeScript definitions for vanilla patch 1.7.7.
- Fixed the bug where the monkey patch was not working on TSTL v1.2.0.
- The `upgradeMod` function will now monkey-patch the `error` function to provide tracebacks if the `--luadebug` flag is turned on.
- The `upgradeMod` function will now monkey-patch the `print` function to work like it normally does if the `--luadebug` flag is turned on.
- Added the following helper functions:
  - `isSingleUseCollectible`
  - `setCollectibleEmpty`
  - `clearSprite`
  - `getRoomListIndex`
  - `getTopLeftWall`
  - `getTopLeftWallGridIndex`
  - `isRoomInsideMap`
  - `lockDoor`
  - `inMinibossRoomOf`
  - `getAllRoomGridIndexes`
  - `isAllRoomsClear`
  - `isLuaDebugEnabled`
  - `goToStage`
  - `stageTypeToLetter`
  - `getRooms`
  - `copyMap`
  - `getStartSeedString`
  - `getStage`
  - `getStageType`
  - `getPlayerAvailableHeartSlots`
  - `getCharacterMaxHeartContainers`
  - `getPlayerMaxHeartContainers`
  - `isFamiliarThatShootsPlayerTears`
  - `isEntityMoving`
- Renamed the `getRoomIndex` helper function to `getRoomSafeGridIndex`. This should no longer be used as an index for data structures that store data per room because it does not work properly between dimensions; `getRoomListIndex` should be used instead.
- Added optional `variant`, `subType`, and `cap` arguments to all of the remove entity helper functions.
- The `pngPath` to the `setCollectibleSprite` helper function is now optional; if not specified, it will remove the item graphic from the pedestal.
- The `anyPlayerIs` helper function is now variadic.
- Added the following constants:
  - `COLORS`
  - `FINAL_STAGE`
  - `BLIND_ITEM_PNG_PATH`
  - `EMPTY_PNG_PATH`
  - `FAMILIARS_THAT_SHOOT_PLAYER_TEARS`
- Added the following enums:
  - `MinibossID`
  - `SkinColor` (from vanilla patch 1.7.7)
  - `CrawlspaceVariant` (alias for `StairsVariant`)
- Added the following custom callbacks:
  - `POST_NEW_ROOM_EARLY`
  - `PRE_NEW_LEVEL`
  - `POST_TEAR_INIT_VERY_LATE`
- The save data manager now uses the `POST_NEW_ROOM_EARLY` callback instead of the `POST_NEW_ROOM` callback, which means that you can use it in situations where you previously would not be able to.

## November 28th, 2021

- `isaacscript publish` now accepts a `--dry-run` flag that will skip committing to GitHub and invoking `steamcmd`.
- `isaacscript publish` will now print out the standard output of the pre-publish script and the post-publish script, if any.
- `isaacscript publish` now accepts an `--only-upload` flag that will only upload the mod to the Steam Workshop without doing anything else.
- Added the following helper functions:
  - `isGoldenTrinket`
  - `printConsole`
  - `findFreePosition`
  - `isPassiveCollectible`
  - `isTaintedLazarus`
  - `logVector`
  - `getRoomItemPoolType`
  - `inBossRoomOf`
  - `getCollectibleItemPoolType`
  - `closeAllDoors`
  - `spawnCollectible`
  - `setGridEntityInvisible`
  - `preventCollectibleRotate`
  - `removeCollectiblePickupDelay`
  - `isDevilsCrownTreasureRoom`
  - `getCollectibleDescription`
  - `getTrinketDescription`
  - `getCardDescription`
  - `getEntityPositions`
  - `setEntityPositions`
  - `getEntityVelocities`
  - `setEntityVelocities`
  - `roomUpdateSafe`
  - `setActiveItem`
  - `getFirstCardOrPill`
  - `getCollectibleGfxFilename`
  - `characterCanHaveRedHearts`
  - `characterCanHaveSoulHearts`
- Added the following helper functions related to the new JSON rooms feature:
  - `deployJSONRoom`
  - `deployRandomJSONRoom`
  - `emptyRoom`
  - `setRoomCleared`
  - `setRoomUncleared`
  - `convertXMLGridEntityType`
  - `getJSONRoomOfVariant`
  - `getJSONRoomsOfSubType`
  - `getRandomJSONRoom`
- Renamed the following helper functions:
  - `changeCollectibleSubType` --> `setCollectibleSubType`
  - `isNotCardOrRune` --> `isPocketItemObject`
- The following helper functions are now variadic:
  - `arrayRemove`
  - `arrayRemoveInPlace`
- The following helper functions now accept an optional `exceptions` argument:
  - `getRandomArrayElement`
  - `getRandomHeartSubType`
  - `getRandomCard`
  - `getRandomRune`
- Removed the following helper functions:
  - `inBlueBabyRoom`
  - `inLambRoom`
  - `inItLivesRoom`
- Added the following constants:
  - `CHARACTERS_WITH_AN_ACTIVE_ITEM`
  - `DEFAULT_ITEM_POOL_TYPE`
  - `ROOM_TYPE_TO_ITEM_POOL_TYPE_MAP`
  - `GENESIS_ROOM_SUB_TYPE`
  - `COLLECTIBLE_DESCRIPTION_MAP`
  - `TRINKET_DESCRIPTION_MAP`
  - `CARD_DESCRIPTION_MAP`
  - `LOST_STYLE_PLAYER_TYPES`
  - `CARDS`
  - `CARD_SET`
  - `RUNES`
  - `RUNE_SET`
  - `POCKET_ITEM_OBJECTS`
  - `POCKET_ITEM_OBJECT_SET`
- Added the following enums:
  - `PoofSubType`
- Renamed the following enums:
  - `BossIDs` --> `BossID`
- Added the `slot` field to the `PocketItemDescription` enum.

## November 21st, 2021

- The TypeScript definitions show now reflect the API for vanilla patch v1.7.6. (Thanks KatTheFox)
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
  - `AZAZEL_DEFAULT_BRIMSTONE_DISTANCE`
  - `EGGY_STATE_FRAME_OF_FINAL_SPIDER`
- Added the following enums:
  - `RenderMode`
  - `RoomDescriptorDisplayType` (to match the vanilla counterpart)
  - `RoomDescriptorFlag` (to match the vanilla counterpart)
  - `LanguageAbbreviation` (which corresponds to the string returned in `Options.Language`)
- Added `POOL_ULTRA_SECRET` to the `ItemPoolType` enum.
- Added the following custom callbacks:
  - `POST_SLOT_DESTROYED`
- `POST_GRID_ENTITY_INIT` and `POST_GRID_ENTITY_REMOVE` now will fire on either the `POST_UPDATE` frame or the `POST_RENDER` frame, whichever happens first (instead of just the `POST_UPDATE` frame). (This allows grid entities to be removed before any sprite shows up on the screen.)

## November 14th, 2021

- Added the updates from vanilla patch v1.7.5.
- The `TemporaryEffects.RemoveCollectibleEffect`, `TemporaryEffects.RemoveNullEffect`, and `TemporaryEffects.RemoveTrinketEffect` methods will now throw compiler errors since they are broken in patch v1.7.5.
- `ItemConfigItem.Name`, `ItemConfigCard.Name`, and `ItemConfigPillEffect.Name` will only work for modded items, so it is recommended to use the helper functions of `getCollectibleName`, `getTrinketName`, `getCardName`, and `getPillEffectName` until the next patch.
- `Isaac.CountEntities` is now a legal method.
- Added the following helper functions:
  - `getPlayerHealth`
  - `setPlayerHealth`
  - `setFamiliarNoSirenSteal` (Thanks KatTheFox)
  - `hasSirenStolenFamiliar` (Thanks KatTheFox)
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
  - `POST_BOMB_INIT_LATE`
  - `POST_EFFECT_INIT_LATE`
  - `POST_FAMILIAR_INIT_LATE`
  - `POST_KNIFE_INIT_LATE`
  - `POST_NPC_INIT_LATE`
  - `POST_PROJECTILE_INIT_LATE`
  - `POST_TEAR_INIT_LATE`

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

- IsaacScript will now correctly handle symlinks and alternate versions of VSCode. (Thanks KatTheFox)
- Added the following helper functions:
  - `getRandomArrayIndex`
  - `arrayRemoveInPlace`
  - `getMaxTrinketID`
  - `getTrinketSet`
  - `spawnGiantPoop`
  - `spawnGridEntity`
  - `spawnGridEntityWithVariant`
  - `getAliveNPCs`
  - `directionToVector` (Thanks KatTheFox)
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
- The StageAPI definitions and the MinimapAPI definitions are now more complete. (Thanks KatTheFox)
- `CardConfigList.Get` will now cause a compiler error, since it returns useless userdata.
- Added the following helper functions:
  - `getLastHeart` (Thanks KatTheFox)
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
- Create `./src/bundleEntry.ts` and paste in the contents of [this file](https://github.com/IsaacScript/isaacscript/blob/27d659ea42144d70c28241c3267f4a4f16c83cf7/packages/isaacscript-cli/file-templates/static/src/bundleEntry.ts).
- Put everything in your `main.ts` file into a `export default function main()` function

### `luaBundle`

I found an issue where if multiple IsaacScript mods are turned on at the same time, and they use maps, an issue with TSTL can cause map-related run-time errors to occur. Eventually, this bug should be fixed upstream, we just have to wait for them to fix it.

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
  - `POST_SLOT_INIT`
  - `POST_SLOT_UPDATE`
  - `POST_SLOT_RENDER`
- Added MinimapAPI definitions.

## August 31st, 2021

- Added the following helper functions:
  - `hasLostCurse`
  - `getPlayerCollectibleMap`
  - `getCollectibleList`
  - `temporarilyRemoveTrinkets`
  - `giveTrinketsBack`
  - `vectorToDirection` (Thanks KatTheFox)
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
  - `PurgatorySubType` (Thanks KatTheFox)
  - `DisplayFlag`
  - `HeavenLightDoorSubType`
  - `IsaacVariant` (Thanks KatTheFox)
- Added the following custom callbacks:
  - `PRE_CUSTOM_REVIVE`
  - `POST_CUSTOM_REVIVE`
  - `POST_PLAYER_RENDER_REORDERED`
  - `POST_PURCHASE`
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
  - `POST_PICKUP_INIT_LATE`
  - `POST_PICKUP_COLLECT`
  - `POST_PLAYER_CHANGE_HEALTH`
  - `POST_PLAYER_FATAL_DAMAGE`
  - `POST_LASER_INIT_LATE`
  - `POST_PLAYER_INIT_LATE`
- `GridEntity.Desc` is added back to the definitions, but only for the purposes of throwing a compiler error. (It is assigned a `never` type.) As per the developers, modders should always use `GridEntity.GetSaveState` instead of accessing `GridEntity.Desc` directly.
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
  - `BEAST_ROOM_SUB_TYPE`
  - `FIRST_TMTRAINER_COLLECTIBLE_TYPE`
  - `MAX_NUM_DOORS`
  - `MAX_NUM_INPUTS`
  - `MAX_VANILLA_COLLECTIBLE_TYPE`
- Renamed the following constants:
  - `FIRST_TMTRAINER_COLLECTIBLE_TYPE` --> `FIRST_GLITCHED_COLLECTIBLE_TYPE`
- Added the following custom callbacks:
  - `POST_PLAYER_INIT_REORDERED`
  - `POST_PLAYER_UPDATE_REORDERED`
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
- All of the functions are automatically [documented online](https://isaacscript.github.io/isaacscript-common) using the TypeDoc generator.
- Added a Save Data Manager system that you can automatically use in your IsaacScript mods.
  - The manager does two things:
    - Resets variables at appropriate times.
    - Automatically saves/loads from the "save#.dat" file to make everything persistent.
  - Using the manager is great because it keeps all your variables locally & properly scoped and abstracts away all the complexity of having to use JSON.
  - You can force the save data manager to write to disk with the `saveDataManagerSave` function.
  - You can use the `saveDataManagerSetGlobal` function to put all of the save data variables on a global variable "g" for debugging purposes.
- Added `REPENTANCE` definition. (Thanks Siramok)
- Added some more Mod Config Menu definitions. (Thanks Siramok)
- Added new custom callbacks that you can use in your mods:
  - `POST_GAME_STARTED_REORDERED`
  - `POST_NEW_LEVEL_REORDERED`
  - `POST_NEW_ROOM_REORDERED`
  - `PRE_ITEM_PICKUP`
  - `POST_ITEM_PICKUP`
  - `POST_PLAYER_CHANGE_TYPE`
  - `POST_FLIP`
  - `POST_FIRST_FLIP`
  - `POST_ESAU_JR`
  - `POST_FIRST_ESAU_JR`
  - `POST_TRANSFORMATION`
  - `POST_GRID_ENTITY_INIT`
  - `POST_GRID_ENTITY_UPDATE`
  - `POST_GRID_ENTITY_REMOVE`
  - `POST_SACRIFICE`
  - `POST_CURSED_TELEPORT`
- The custom callbacks are documented [here](https://isaacscript.github.io/isaacscript-common/other/enums/ModCallbackCustom).
- Added the `GridPath` enums.

## August 3rd, 2021

- Released the `isaacscript-common` package, which includes helper functions that you can use in your IsaacScript mods. Right now there are not that many functions, but I plan to increase this in the future. They are documented [here](https://isaacscript.github.io/isaacscript-common).
- Breaking changes:
  - The `isaacscript` package is no longer a meta-package that provides everything else. (It was getting too big and hard to handle.)
  - This means that instead of having 1 dependency of just `isaacscript`, new IsaacScript mods created with `init` are initialized with 4 dependencies:
    - `isaacscript` - The monitoring program.
    - `isaacscript-lint` - The linting config.
    - `isaacscript-common` - Optional helper functions that you can use in your mods.
    - `isaac-typescript-definitions` - Provides the types for all the Isaac API classes, like `EntityPlayer` and so forth.
  - If you are upgrading your existing mod to the latest version of IsaacScript, simply add the 3 extra dependencies to your "package.json" file, and everything should work the way it did before.
  - Remember that you can use `npx isaacscript update` to update all of your dependencies at once.
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

- Fixed the wrong type in the `INPUT_ACTION` callback. (Thanks to KatTheFox)
- Fixed some bugs in the `RoomConfig` class. (Thanks Somdudewillson)
- Added definitions for External Item Descriptions. (Thanks Somdudewillson)
- Added definitions for Music Mod Callback. (Thanks KatTheFox)
- Added definitions for StageAPI. (Thanks Somdudewillson)
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
- The `isaacscript.json` file no longer contains a `projectName` field. Instead, IsaacScript will always read the project name from the current working directory.
  - (You should remove the `projectName` field from the `isaacscript.json` file in your current projects when you upgrade your dependencies.)
- The `isaacscript.json` file now contains only per-user settings. Thus, it should not be committed to a repository. If no `isaacscript.json` file exists, IsaacScript will create one upon the first invocation in a new directory. (Previously, it would throw an error and exit.)
- The `isaacscript.json` file is now automatically added to the `.gitignore` file for new projects.
  - (You should add it to the `.gitignore` in your current projects when you upgrade your dependencies.)
- The `monitor` command will now output the mod target directory upon first invocation.
- Changed the type of EntityPtr.Ref from `Readonly<Entity>` to `Entity | null`.
- The linter meta-package now includes `cspell` so that you can spell check from command-line and/or CI.
- `isaacscript init` will now create the following additional files:
  - `ci.yml` - for GitHub Actions
  - `prettier.config.mjs` - to ensure trailing commas and LF line endings
  - `build.sh` - helper script to compile the project (used in CI)
  - `lint.sh` - helper script to lint and spell check the project (used in CI)
  - `publish.sh` - helper script to run `npx isaacscript publish`
  - `run.sh` - helper script to run `npx isaacscript`
  - `update.sh` - helper script to automatically update project dependencies
  - `nuke.sh` - helper script to automatically reinstall project dependencies

## July 20th, 2021

- Added JSDoc lint rules from the [recommended config](https://github.com/gajus/eslint-plugin-jsdoc).

## July 3rd, 2021

- Added a linting rule that catches the following bug: `myArray.push()`
- Added a new linting plugin that changes all ESLint rules to warnings, so that you can more-easily disambiguate them from TypeScript compiler errors.
- For vectors, the methods of `__add`, `__sub`, and so forth have been deprecated in favor of `add`, `sub`, and so on. The former can cause the game to crash in Repentance.

## June 26th, 2021

- The `Isaac.GetPlayer` method now returns `EntityPlayer` instead of `EntityPlayer | null`. This means that you can remove type narrowing and/or non-null assertions from your code.
- Added `KnifeVariant` enum.
- The `USE_ITEM` and `PRE_USE_ITEM` callbacks can now return void.
- Changed several callbacks to use `void` instead of `null` in order to simplify the signatures and have less friction for new users. This might be a breaking change for some users if you are using these callbacks in exported functions, but the fix is simple: just change `null` to `void`.

## May 15th, 2021

- The framework was updated to work properly with Repentance.

## October 20th, 2020

- The first version of IsaacScript is released (for Afterbirth+).
