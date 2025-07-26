/**
 * In a file where any import occurs, the "declare global" directive must be used:
 * https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
 *
 * In a file without imports, "declare global" cannot be used.
 */

// --------
// External
// --------

// The Isaac definitions automatically bundle the definitions for Lua 5.3 as a convenience.
/// <reference types="lua-types/5.3" />

// -------------
// Miscellaneous
// -------------

/// <reference path="./functions.d.ts" />
/// <reference path="./json.d.ts" />
/// <reference path="./main.d.ts" />
/// <reference path="./socket.d.ts" />

// -------
// Classes
// -------

/// <reference path="./classes/BitSet128.d.ts" />
/// <reference path="./classes/CardConfigList.d.ts" />
/// <reference path="./classes/Color.d.ts" />
/// <reference path="./classes/EffectList.d.ts" />
/// <reference path="./classes/Entity.d.ts" />
/// <reference path="./classes/EntityBomb.d.ts" />
/// <reference path="./classes/EntityEffect.d.ts" />
/// <reference path="./classes/EntityFamiliar.d.ts" />
/// <reference path="./classes/EntityKnife.d.ts" />
/// <reference path="./classes/EntityLaser.d.ts" />
/// <reference path="./classes/EntityList.d.ts" />
/// <reference path="./classes/EntityNPC.d.ts" />
/// <reference path="./classes/EntityPickup.d.ts" />
/// <reference path="./classes/EntityPlayer.d.ts" />
/// <reference path="./classes/EntityProjectile.d.ts" />
/// <reference path="./classes/EntityPtr.d.ts" />
/// <reference path="./classes/EntityRef.d.ts" />
/// <reference path="./classes/EntityTear.d.ts" />
/// <reference path="./classes/EntriesList.d.ts" />
/// <reference path="./classes/Font.d.ts" />
/// <reference path="./classes/FontRenderSettings.d.ts" />
/// <reference path="./classes/Game.d.ts" />
/// <reference path="./classes/GridEntity.d.ts" />
/// <reference path="./classes/GridEntityDesc.d.ts" />
/// <reference path="./classes/GridEntityDoor.d.ts" />
/// <reference path="./classes/GridEntityPit.d.ts" />
/// <reference path="./classes/GridEntityPoop.d.ts" />
/// <reference path="./classes/GridEntityPressurePlate.d.ts" />
/// <reference path="./classes/GridEntityRock.d.ts" />
/// <reference path="./classes/GridEntitySpikes.d.ts" />
/// <reference path="./classes/GridEntityTNT.d.ts" />
/// <reference path="./classes/HUD.d.ts" />
/// <reference path="./classes/Input.d.ts" />
/// <reference path="./classes/Isaac.d.ts" />
/// <reference path="./classes/ItemConfig.d.ts" />
/// <reference path="./classes/ItemConfigCard.d.ts" />
/// <reference path="./classes/ItemConfigCostume.d.ts" />
/// <reference path="./classes/ItemConfigItem.d.ts" />
/// <reference path="./classes/ItemConfigList.d.ts" />
/// <reference path="./classes/ItemConfigPillEffect.d.ts" />
/// <reference path="./classes/ItemPool.d.ts" />
/// <reference path="./classes/KColor.d.ts" />
/// <reference path="./classes/Level.d.ts" />
/// <reference path="./classes/Mod.d.ts" />
/// <reference path="./classes/ModDescription.d.ts" />
/// <reference path="./classes/MusicManager.d.ts" />
/// <reference path="./classes/PathFinder.d.ts" />
/// <reference path="./classes/PillConfigList.d.ts" />
/// <reference path="./classes/ProjectileParams.d.ts" />
/// <reference path="./classes/QueueItemData.d.ts" />
/// <reference path="./classes/Options.d.ts" />
/// <reference path="./classes/RNG.d.ts" />
/// <reference path="./classes/Room.d.ts" />
/// <reference path="./classes/RoomConfig.d.ts" />
/// <reference path="./classes/RoomConfigEntry.d.ts" />
/// <reference path="./classes/RoomConfigSpawn.d.ts" />
/// <reference path="./classes/RoomDescriptor.d.ts" />
/// <reference path="./classes/RoomList.d.ts" />
/// <reference path="./classes/Seeds.d.ts" />
/// <reference path="./classes/SFXManager.d.ts" />
/// <reference path="./classes/SpawnList.d.ts" />
/// <reference path="./classes/Sprite.d.ts" />
/// <reference path="./classes/TearParams.d.ts" />
/// <reference path="./classes/TemporaryEffect.d.ts" />
/// <reference path="./classes/TemporaryEffects.d.ts" />
/// <reference path="./classes/Vector.d.ts" />
/// <reference path="./classes/VectorList.d.ts" />

// ----------------------------
// Unofficial Classes and Types
// ----------------------------

/// <reference path="./unofficial/AddCallbackParameters.d.ts" />
/// <reference path="./unofficial/APIVersion.d.ts" />
/// <reference path="./unofficial/BitFlag.d.ts" />
/// <reference path="./unofficial/BitFlag128.d.ts" />
/// <reference path="./unofficial/BitFlags.d.ts" />
/// <reference path="./unofficial/EntitySubPlayer.d.ts" />
/// <reference path="./unofficial/IsaacAPIClass.d.ts" />
/// <reference path="./unofficial/primitives.d.ts" />
/// <reference path="./unofficial/PtrHash.d.ts" />
/// <reference path="./unofficial/Quality.d.ts" />
/// <reference path="./unofficial/Seed.d.ts" />
/// <reference path="./unofficial/TemporaryCollectibleType.d.ts" />
/// <reference path="./unofficial/ZodiacCollectibleType.d.ts" />

// ----------------------------
// Definitions for Popular Mods
// ----------------------------

/// <reference path="./mods/EID.d.ts" />
/// <reference path="./mods/Encyclopedia.d.ts" />
/// <reference path="./mods/InputHelper.d.ts" />
/// <reference path="./mods/MinimapAPI.d.ts" />
/// <reference path="./mods/ModConfigMenu.d.ts" />
/// <reference path="./mods/MusicModCallback.d.ts" />
/// <reference path="./mods/Sandbox.d.ts" />
/// <reference path="./mods/SandboxGlobals.d.ts" />
/// <reference path="./mods/StageAPI.d.ts" />
/// <reference path="./mods/StageAPIInterfaces.d.ts" />
/// <reference path="./mods/StageAPIUnofficial.d.ts" />
