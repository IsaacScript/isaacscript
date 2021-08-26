import { disableInputs, enableInputs } from "../features/disableInputs";
import { forgottenSwitch } from "../features/forgottenSwitch";
import {
  getPlayerIndex,
  getPlayers,
  isJacobOrEsau,
  PlayerIndex,
} from "../functions/player";
import { getFinalFrameOfAnimation } from "../functions/sprite";
import { teleport } from "../functions/util";
import ModCallbacksCustom from "../types/ModCallbacksCustom";
import ModUpgraded from "../types/ModUpgraded";
import * as postCustomRevive from "./subscriptions/postCustomRevive";
import * as preCustomRevive from "./subscriptions/preCustomRevive";

enum CustomReviveState {
  DISABLED,
  DEATH_ANIMATION,
  CHANGING_ROOMS,
}

const v = {
  run: {
    state: CustomReviveState.DISABLED,
    reviveFrame: null as int | null,
    revivalType: null as int | null,
    playerPtr: null as EntityPtr | null,

    deferringDeathUntilForgottenSwitch: false,
    playerIndexOfTheSoul: null as PlayerIndex | null,
    forgottenPtr: null as EntityPtr | null,
  },
};

export function init(mod: ModUpgraded): void {
  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1

  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  ); // 11

  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE,
    postPlayerFatalDamage,
  );
}

function hasSubscriptions() {
  return (
    preCustomRevive.hasSubscriptions() || postCustomRevive.hasSubscriptions()
  );
}

function getPlayerFromEntityPtr(entityPtr: EntityPtr | null) {
  if (entityPtr === null) {
    error("Failed to get the player pointer for custom revival.");
  }

  const entity = entityPtr.Ref;
  if (entity === null) {
    error("Failed to reference the player pointer for custom revival.");
  }

  const player = entity.ToPlayer();
  if (player === null) {
    error(
      "Failed to convert the player entity to a player for custom revival.",
    );
  }

  return player;
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  postUpdateWaitForForgottenSwitch();
  postUpdateDeathAnimation();
}

function postUpdateWaitForForgottenSwitch() {
  if (!v.run.deferringDeathUntilForgottenSwitch) {
    return;
  }

  if (hasTheSoulDisappeared()) {
    return;
  }

  const player = getPlayerFromEntityPtr(v.run.forgottenPtr);

  v.run.deferringDeathUntilForgottenSwitch = false;
  v.run.playerIndexOfTheSoul = null;
  v.run.forgottenPtr = null;

  invokeCustomDeath(player);
}

function hasTheSoulDisappeared() {
  for (const player of getPlayers()) {
    const playerIndex = getPlayerIndex(player);
    if (playerIndex === v.run.playerIndexOfTheSoul) {
      return false;
    }
  }

  return true;
}

function postUpdateDeathAnimation() {
  if (v.run.state !== CustomReviveState.DEATH_ANIMATION) {
    return;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const level = game.GetLevel();
  const previousRoomIndex = level.GetPreviousRoomIndex();
  const room = game.GetRoom();

  // Check to see if the (fake) death animation is over
  if (v.run.reviveFrame === null || gameFrameCount < v.run.reviveFrame) {
    return;
  }

  const player = getPlayerFromEntityPtr(v.run.playerPtr);

  v.run.reviveFrame = null;
  v.run.state = CustomReviveState.CHANGING_ROOMS;

  resetCollision(player);
  if (isJacobOrEsau(player)) {
    const twin = player.GetOtherTwin();
    if (twin !== null) {
      resetCollision(player);
    }
  }

  const enterDoor = level.EnterDoor;
  const door = room.GetDoor(enterDoor);
  const direction = (door !== null && door.Direction) || Direction.NO_DIRECTION;
  teleport(previousRoomIndex, direction, RoomTransitionAnim.WALK);
  level.LeaveDoor = enterDoor;
}

function resetCollision(player: EntityPlayer) {
  player.EntityCollisionClass = EntityCollisionClass.ENTCOLL_ALL;
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer(): boolean | void {
  // Make all players invulnerable during the death process
  return v.run.state === CustomReviveState.DISABLED ? undefined : false;
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom(): void {
  postNewRoomDeathAnimation();
  postNewRoomChangingRooms();
}

function postNewRoomDeathAnimation() {
  if (v.run.state !== CustomReviveState.DEATH_ANIMATION) {
    return;
  }

  const player = getPlayerFromEntityPtr(v.run.playerPtr);

  // They entered a loading zone while dying (e.g. running through a Curse Room door)
  // Play the death animation again, since entering a new room canceled it
  startDeathAnimation(player);
}

function postNewRoomChangingRooms() {
  if (v.run.state !== CustomReviveState.CHANGING_ROOMS) {
    return;
  }

  const game = Game();
  const seeds = game.GetSeeds();
  const player = getPlayerFromEntityPtr(v.run.playerPtr);

  enableInputs();
  seeds.RemoveSeedEffect(SeedEffect.SEED_PERMANENT_CURSE_UNKNOWN);

  if (v.run.revivalType !== null) {
    postCustomRevive.fire(player, v.run.revivalType);
  }

  v.run.state = CustomReviveState.DISABLED;
  v.run.revivalType = null;
  v.run.playerPtr = null;
}

// ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE
function postPlayerFatalDamage(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return undefined;
  }

  // Prevent fatal damage if we are already in the process of dying
  if (v.run.state !== CustomReviveState.DISABLED) {
    return false;
  }

  // If we are already switching from The Soul to The Forgotten,
  // prevent fatal damage and continue to wait
  if (v.run.deferringDeathUntilForgottenSwitch) {
    return false;
  }

  const revivalType = preCustomRevive.fire(player);
  if (revivalType === undefined) {
    return undefined;
  }
  v.run.revivalType = revivalType;

  // If the player is The Soul, switch back to The Forgotten and defer invoking the custom death
  // mechanic until the switch is complete
  // By forcing The Forgotten, it helps make revivals more consistent
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_THESOUL) {
    const playerIndex = getPlayerIndex(player);
    const forgotten = player.GetSubPlayer();

    v.run.deferringDeathUntilForgottenSwitch = true;
    v.run.playerIndexOfTheSoul = playerIndex;
    if (forgotten !== null) {
      v.run.forgottenPtr = EntityPtr(forgotten);
    }

    forgottenSwitch();
    return false;
  }

  invokeCustomDeath(player);
  return false;
}

function invokeCustomDeath(player: EntityPlayer) {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const seeds = game.GetSeeds();
  const sfx = SFXManager();
  const sprite = player.GetSprite();
  const deathAnimationFrames = getFinalFrameOfAnimation(sprite, "Death");

  v.run.state = CustomReviveState.DEATH_ANIMATION;
  v.run.reviveFrame = gameFrameCount + deathAnimationFrames;
  v.run.playerPtr = EntityPtr(player);

  disableInputs();
  sfx.Play(SoundEffect.SOUND_ISAACDIES);

  // Hide the player's health to obfuscate the fact that they are still technically alive
  seeds.AddSeedEffect(SeedEffect.SEED_PERMANENT_CURSE_UNKNOWN);

  startDeathAnimation(player);
}

function startDeathAnimation(player: EntityPlayer) {
  modifyPlayerForDeathAnimation(player);
  if (isJacobOrEsau(player)) {
    const twin = player.GetOtherTwin();
    if (twin !== null) {
      modifyPlayerForDeathAnimation(twin);
    }
  }
}

function modifyPlayerForDeathAnimation(player: EntityPlayer) {
  player.PlayExtraAnimation("Death");
  player.EntityCollisionClass = EntityCollisionClass.ENTCOLL_NONE;
}
