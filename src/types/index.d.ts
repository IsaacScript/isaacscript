/**
 * In a file where any import occurs, the "declare global" directive must be used:
 * https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
 *
 * In a file without imports, "declare global" cannot be used.
 */

// The Isaac definitions automatically bundle the definitions for Lua 5.3 as a convenience.
/// <reference types="lua-types/5.3" />

// -------------
// Miscellaneous
// -------------

/// <reference path="functions.d.ts" />
/// <reference path="json.d.ts" />
/// <reference path="main.d.ts" />
/// <reference path="socket.d.ts" />

// -------
// Classes
// -------

/// <reference path="ActiveItemDesc.d.ts" />
/// <reference path="BitSet128.d.ts" />
/// <reference path="CardConfigList.d.ts" />
/// <reference path="Color.d.ts" />
/// <reference path="EffectList.d.ts" />
/// <reference path="Entity.d.ts" />
/// <reference path="EntityBomb.d.ts" />
/// <reference path="EntityEffect.d.ts" />
/// <reference path="EntityFamiliar.d.ts" />
/// <reference path="EntityKnife.d.ts" />
/// <reference path="EntityLaser.d.ts" />
/// <reference path="EntityList.d.ts" />
/// <reference path="EntityNPC.d.ts" />
/// <reference path="EntityPickup.d.ts" />
/// <reference path="EntityPlayer.d.ts" />
/// <reference path="EntityProjectile.d.ts" />
/// <reference path="EntityPtr.d.ts" />
/// <reference path="EntityRef.d.ts" />
/// <reference path="EntityTear.d.ts" />
/// <reference path="Font.d.ts" />
/// <reference path="Game.d.ts" />
/// <reference path="GridEntity.d.ts" />
/// <reference path="GridEntityDesc.d.ts" />
/// <reference path="GridEntityDoor.d.ts" />
/// <reference path="GridEntityPit.d.ts" />
/// <reference path="GridEntityPoop.d.ts" />
/// <reference path="GridEntityPressurePlate.d.ts" />
/// <reference path="GridEntityRock.d.ts" />
/// <reference path="GridEntitySpikes.d.ts" />
/// <reference path="GridEntityTNT.d.ts" />
/// <reference path="HUD.d.ts" />
/// <reference path="Input.d.ts" />
/// <reference path="Isaac.d.ts" />
/// <reference path="ItemConfig.d.ts" />
/// <reference path="ItemConfigCard.d.ts" />
/// <reference path="ItemConfigCostume.d.ts" />
/// <reference path="ItemConfigItem.d.ts" />
/// <reference path="ItemConfigList.d.ts" />
/// <reference path="ItemConfigPillEffect.d.ts" />
/// <reference path="ItemPool.d.ts" />
/// <reference path="KColor.d.ts" />
/// <reference path="Level.d.ts" />
/// <reference path="Mod.d.ts" />
/// <reference path="MusicManager.d.ts" />
/// <reference path="PathFinder.d.ts" />
/// <reference path="PillConfigList.d.ts" />
/// <reference path="PosVel.d.ts" />
/// <reference path="ProjectileParams.d.ts" />
/// <reference path="QueueItemData.d.ts" />
/// <reference path="MultiShotParams.d.ts" />
/// <reference path="Options.d.ts" />
/// <reference path="RNG.d.ts" />
/// <reference path="Room.d.ts" />
/// <reference path="RoomConfig.d.ts" />
/// <reference path="RoomConfigEntry.d.ts" />
/// <reference path="RoomConfigSpawn.d.ts" />
/// <reference path="RoomDescriptor.d.ts" />
/// <reference path="RoomList.d.ts" />
/// <reference path="Seeds.d.ts" />
/// <reference path="SFXManager.d.ts" />
/// <reference path="ShockwaveParams.d.ts" />
/// <reference path="SpawnList.d.ts" />
/// <reference path="Sprite.d.ts" />
/// <reference path="TearParams.d.ts" />
/// <reference path="TemporaryEffect.d.ts" />
/// <reference path="TemporaryEffects.d.ts" />
/// <reference path="Vector.d.ts" />
/// <reference path="VectorList.d.ts" />

// ----------------------------
// Unofficial Classes and Types
// ----------------------------

/// <reference path="unofficial/primitives.d.ts" />

/// <reference path="unofficial/AddCallbackParameter.d.ts" />
/// <reference path="unofficial/APIVersion.d.ts" />
/// <reference path="unofficial/BitFlag.d.ts" />
/// <reference path="unofficial/BitFlag128.d.ts" />
/// <reference path="unofficial/BitFlags.d.ts" />
/// <reference path="unofficial/EntitySubPlayer.d.ts" />
/// <reference path="unofficial/PtrHash.d.ts" />
/// <reference path="unofficial/ReadonlyRoomDescriptor.d.ts" />
/// <reference path="unofficial/Seed.d.ts" />
/// <reference path="unofficial/ZodiacCollectibles.d.ts" />

// ----------------------------
// Definitions for Popular Mods
// ----------------------------

/// <reference path="mods/EID.d.ts" />
/// <reference path="mods/Encyclopedia.d.ts" />
/// <reference path="mods/MinimapAPI.d.ts" />
/// <reference path="mods/ModConfigMenu.d.ts" />
/// <reference path="mods/MusicModCallback.d.ts" />
/// <reference path="mods/Sandbox.d.ts" />
/// <reference path="mods/SandboxGlobals.d.ts" />
/// <reference path="mods/StageAPI.d.ts" />
/// <reference path="mods/StageAPIInterfaces.d.ts" />
/// <reference path="mods/StageAPIUnofficial.d.ts" />
