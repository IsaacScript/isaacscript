/**
 * In a file where any import occurs, the "declare global" directive must be used:
 * https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
 *
 * In a file without imports, "declare global" cannot be used.
 */

// -------
// Classes
// -------

/// <reference path="./classes/boss-pools/BossPool.d.ts"/>
/// <reference path="./classes/boss-pools/BossPoolManager.d.ts"/>
/// <reference path="./classes/entity/Entity.d.ts"/>
/// <reference path="./classes/entity/EntityBomb.d.ts"/>
/// <reference path="./classes/entity/EntityDelirium.d.ts"/>
/// <reference path="./classes/entity/EntityEffect.d.ts"/>
/// <reference path="./classes/entity/EntityFamiliar.d.ts"/>
/// <reference path="./classes/entity/EntityKnife.d.ts"/>
/// <reference path="./classes/entity/EntityLaser.d.ts"/>
/// <reference path="./classes/entity/EntityNPC.d.ts"/>
/// <reference path="./classes/entity/EntityPickup.d.ts"/>
/// <reference path="./classes/entity/EntityPlayer.d.ts"/>
/// <reference path="./classes/entity/EntityProjectile.d.ts"/>
/// <reference path="./classes/entity/EntitySlot.d.ts"/>
/// <reference path="./classes/entity/EntityTear.d.ts"/>
/// <reference path="./classes/entity-config/EntityConfig.d.ts"/>
/// <reference path="./classes/entity-config/EntityConfigBaby.d.ts"/>
/// <reference path="./classes/entity-config/EntityConfigEntity.d.ts"/>
/// <reference path="./classes/entity-config/EntityConfigPlayer.d.ts"/>
/// <reference path="./classes/grid-entity/GridEntity.d.ts"/>
/// <reference path="./classes/grid-entity/GridEntityDoor.d.ts"/>
/// <reference path="./classes/grid-entity/GridEntityRock.d.ts"/>
/// <reference path="./classes/history/History.d.ts"/>
/// <reference path="./classes/history/HistoryItem.d.ts"/>
/// <reference path="./classes/hud/DebugRenderer.d.ts"/>
/// <reference path="./classes/hud/HUD.d.ts"/>
/// <reference path="./classes/hud/Minimap.d.ts"/>
/// <reference path="./classes/hud/PlayerHUD.d.ts"/>
/// <reference path="./classes/hud/PlayerHUDHeart.d.ts"/>
/// <reference path="./classes/hud/ScoreSheet.d.ts"/>
/// <reference path="./classes/item-config/ItemConfig.d.ts"/>
/// <reference path="./classes/item-config/ItemConfigCard.d.ts"/>
/// <reference path="./classes/item-config/ItemConfigItem.d.ts"/>
/// <reference path="./classes/item-config/ItemConfigPillEffect.d.ts"/>
/// <reference path="./classes/level-generator/LevelGeneratorRoom.d.ts"/>
/// <reference path="./classes/level-generator/LevelGeneratorEntry.d.ts"/>
/// <reference path="./classes/level-generator/LevelGenerator.d.ts"/>
/// <reference path="./classes/menus/BestiaryMenu.d.ts"/>
/// <reference path="./classes/menus/ChallengeMenu.d.ts"/>
/// <reference path="./classes/menus/CharacterMenu.d.ts"/>
/// <reference path="./classes/menus/CollectionMenu.d.ts"/>
/// <reference path="./classes/menus/ControllerSelectMenu.d.ts"/>
/// <reference path="./classes/menus/CustomChallengeMenu.d.ts"/>
/// <reference path="./classes/menus/CutscenesMenu.d.ts"/>
/// <reference path="./classes/menus/DailyChallengeMenu.d.ts"/>
/// <reference path="./classes/menus/KeyConfigMenu.d.ts"/>
/// <reference path="./classes/menus/MenuManager.d.ts"/>
/// <reference path="./classes/menus/ModsMenu.d.ts"/>
/// <reference path="./classes/menus/OptionsMenu.d.ts"/>
/// <reference path="./classes/menus/PauseMenu.d.ts"/>
/// <reference path="./classes/menus/SaveMenu.d.ts"/>
/// <reference path="./classes/menus/SpecialSeedsMenu.d.ts"/>
/// <reference path="./classes/menus/StatsMenu.d.ts"/>
/// <reference path="./classes/menus/TitleMenu.d.ts"/>
/// <reference path="./classes/procedural-items/ProceduralEffect.d.ts"/>
/// <reference path="./classes/procedural-items/ProceduralItem.d.ts"/>
/// <reference path="./classes/procedural-items/ProceduralItemManager.d.ts"/>
/// <reference path="./classes/rendering/Beam.d.ts"/>
/// <reference path="./classes/rendering/BlendMode.d.ts"/>
/// <reference path="./classes/rendering/DestinationQuad.d.ts"/>
/// <reference path="./classes/rendering/Point.d.ts"/>
/// <reference path="./classes/rendering/Shape.d.ts"/>
/// <reference path="./classes/rendering/SourceQuad.d.ts"/>
/// <reference path="./classes/room-config/EntitiesSaveState.d.ts"/>
/// <reference path="./classes/room-config/EntitiesSaveStateVector.d.ts"/>
/// <reference path="./classes/room-config/GridEntitiesSaveStateVector.d.ts"/>
/// <reference path="./classes/room-config/RoomConfig.d.ts"/>
/// <reference path="./classes/room-config/RoomConfigHolder.d.ts"/>
/// <reference path="./classes/room-config/RoomDescriptor.d.ts"/>
/// <reference path="./classes/room-config/RoomConfigSet.d.ts"/>
/// <reference path="./classes/room-config/RoomConfigStage.d.ts"/>
/// <reference path="./classes/sprite/AnimationData.d.ts"/>
/// <reference path="./classes/sprite/AnimationFrame.d.ts"/>
/// <reference path="./classes/sprite/AnimationLayer.d.ts"/>
/// <reference path="./classes/sprite/LayerState.d.ts"/>
/// <reference path="./classes/sprite/NullLayer.d.ts"/>
/// <reference path="./classes/sprite/Sprite.d.ts"/>
/// <reference path="./classes/ActiveItemDesc.d.ts"/>
/// <reference path="./classes/Ambush.d.ts"/>
/// <reference path="./classes/Backdrop.d.ts"/>
/// <reference path="./classes/Camera.d.ts"/>
/// <reference path="./classes/Capsule.d.ts"/>
/// <reference path="./classes/ChallengeParams.d.ts"/>
/// <reference path="./classes/ColorParams.d.ts"/>
/// <reference path="./classes/Console.d.ts"/>
/// <reference path="./classes/CostumeSpriteDesc.d.ts"/>
/// <reference path="./classes/Color.d.ts"/>
/// <reference path="./classes/ColorModifier.d.ts"/>
/// <reference path="./classes/DailyChallenge.d.ts"/>
/// <reference path="./classes/Debug.d.ts"/>
/// <reference path="./classes/Font.d.ts"/>
/// <reference path="./classes/FXParams.d.ts"/>
/// <reference path="./classes/Game.d.ts"/>
/// <reference path="./classes/GenericPrompt.d.ts"/>
/// <reference path="./classes/ImGui.d.ts"/>
/// <reference path="./classes/Input.d.ts"/>
/// <reference path="./classes/Isaac.d.ts"/>
/// <reference path="./classes/ItemOverlay.d.ts"/>
/// <reference path="./classes/ItemPool.d.ts"/>
/// <reference path="./classes/Level.d.ts"/>
/// <reference path="./classes/LootList.d.ts"/>
/// <reference path="./classes/LootListEntry.d.ts"/>
/// <reference path="./classes/LRoomAreaDesc.d.ts"/>
/// <reference path="./classes/LRoomTileDesc.d.ts"/>
/// <reference path="./classes/Mod.d.ts"/>
/// <reference path="./classes/ModUpgraded.d.ts"/>
/// <reference path="./classes/MultiShotParams.d.ts"/>
/// <reference path="./classes/MusicManager.d.ts"/>
/// <reference path="./classes/NightmareScene.d.ts"/>
/// <reference path="./classes/Options.d.ts"/>
/// <reference path="./classes/PersistentGameData.d.ts"/>
/// <reference path="./classes/PlayerManager.d.ts"/>
/// <reference path="./classes/PocketItem.d.ts"/>
/// <reference path="./classes/ProjectileParams.d.ts"/>
/// <reference path="./classes/PosVel.d.ts"/>
/// <reference path="./classes/Room.d.ts"/>
/// <reference path="./classes/RailManager.d.ts"/>
/// <reference path="./classes/RNG.d.ts"/>
/// <reference path="./classes/RoomTransition.d.ts"/>
/// <reference path="./classes/StageTransition.d.ts"/>
/// <reference path="./classes/Weapon.d.ts"/>
/// <reference path="./classes/WeightedOutcomePicker.d.ts"/>
/// <reference path="./classes/XMLData.d.ts"/>

// ----------
// Unofficial
// ----------

/// <reference path = "./unofficial/AddUpdateParametersImGui.d.ts"/>
/// <reference path = "./unofficial/AddCallbackParametersRepentogon.d.ts"/>
/// <reference path = "./unofficial/BossPoolEntry.d.ts"/>
/// <reference path = "./unofficial/RGBValue.d.ts"/>
