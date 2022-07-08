import {
  ActiveSlot,
  CollectibleType,
  SoundEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../cachedClasses";
import { getCollectibleMaxCharges } from "./collectibles";
import { getPlayers } from "./playerIndex";
import { getRoomShapeCharges } from "./roomShape";

/**
 * Helper function to add a charge to the player's active item. Will play the appropriate sound
 * effect, depending on whether the charge is partially full or completely full.
 *
 * This function will take the following things into account:
 * - The Battery
 * - AAA Battery
 *
 * @param player The player to grant the charges to.
 * @param activeSlot The slot to grant the charges to.
 * @param numCharges Optional. The amount of charges to grant. Default is 1.
 * @param playSoundEffect Optional. Whether to play a charge-related sound effect. Default is true.
 * @returns The amount of charges that were actually granted. For example, if the active item was
 *          already fully charged, this function would return 0.
 */
export function addCharge(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
  numCharges = 1,
  playSoundEffect = true,
): int {
  const hud = game.GetHUD();

  // Ensure that there is enough space on the active item to store these amount of charges.
  const totalCharge = getTotalCharge(player, activeSlot);
  const chargesToAdd = getClampedChargesToAdd(player, activeSlot, numCharges);

  // The AAA Battery trinket might grant an additional charge.
  const modifiedChargesToAdd = getNumChargesWithAAAModifier(
    player,
    activeSlot,
    chargesToAdd,
  );

  const newCharge = totalCharge + modifiedChargesToAdd;
  if (newCharge === totalCharge) {
    return 0;
  }

  player.SetActiveCharge(newCharge, activeSlot);
  hud.FlashChargeBar(player, activeSlot);

  if (playSoundEffect) {
    playChargeSoundEffect(player, activeSlot);
  }

  return modifiedChargesToAdd;
}

/**
 * Helper function to add a charge to a player's active item(s), emulating what happens when a room
 * is cleared.
 *
 * This function will take the following things into account:
 * - 2x2 rooms and L rooms granting a double charge
 * - The Battery
 * - AAA Battery
 *
 * @param player The player to grant the charges to.
 * @param bigRoomDoubleCharge Optional. If set to false, it will treat the current room as a 1x1
 *                            room for the purposes of calculating how much charge to grant. Default
 *                            is true.
 * @param playSoundEffect Optional. Whether to play a charge-related sound effect. Default is true.
 */
export function addRoomClearCharge(
  player: EntityPlayer,
  bigRoomDoubleCharge = true,
  playSoundEffect = true,
): void {
  for (const activeSlot of [
    ActiveSlot.PRIMARY,
    ActiveSlot.SECONDARY,
    ActiveSlot.POCKET,
  ]) {
    addRoomClearChargeToSlot(
      player,
      activeSlot,
      bigRoomDoubleCharge,
      playSoundEffect,
    );
  }
}

/**
 * Helper function to add a charge to one of a player's active items, emulating what happens when a
 * room is cleared.
 *
 * This function will take the following things into account:
 * - L rooms and 2x2 rooms granting a double charge
 * - The Battery
 * - AAA Battery
 *
 * @param player The player to grant the charges to.
 * @param activeSlot The active item slot to grant the charges to.
 * @param bigRoomDoubleCharge Optional. If set to false, it will treat the current room as a 1x1
 *                            room for the purposes of calculating how much charge to grant. Default
 *                            is true.
 * @param playSoundEffect Optional. Whether to play a charge-related sound effect. Default is true.
 */
export function addRoomClearChargeToSlot(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
  bigRoomDoubleCharge = true,
  playSoundEffect = true,
): void {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  const numCharges = bigRoomDoubleCharge ? getRoomShapeCharges(roomShape) : 1;
  addCharge(player, activeSlot, numCharges, playSoundEffect);
}

/**
 * We don't want to add more charges than is normally possible, so we must check to see if the
 * player can hold the specified amount of charges in the given slot.
 */
function getClampedChargesToAdd(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
  numCharges: int,
) {
  const activeItem = player.GetActiveItem(activeSlot);
  const activeCharge = player.GetActiveCharge(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);
  const hasBattery = player.HasCollectible(CollectibleType.BATTERY);
  const maxCharges = getCollectibleMaxCharges(activeItem);

  if (!hasBattery && activeCharge === maxCharges) {
    return 0;
  }

  if (hasBattery && batteryCharge === maxCharges) {
    return 0;
  }

  if (!hasBattery && activeCharge + 1 === maxCharges) {
    // We are only 1 charge away from a full charge, so only add one charge to avoid an overcharge.
    // (It is possible to set orange charges without the player actually having The Battery.)
    return 1;
  }

  if (hasBattery && batteryCharge + 1 === maxCharges) {
    // We are only 1 charge away from a full double-charge, so only add one charge to avoid an
    // overcharge.
    return 1;
  }

  return numCharges;
}

/**
 * The AAA Battery should grant an extra charge when the active item is one away from being fully
 * charged.
 */
function getNumChargesWithAAAModifier(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
  chargesToAdd: int,
) {
  const activeItem = player.GetActiveItem(activeSlot);
  const activeCharge = player.GetActiveCharge(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);
  const hasBattery = player.HasCollectible(CollectibleType.BATTERY);
  const hasAAABattery = player.HasTrinket(TrinketType.AAA_BATTERY);
  const maxCharges = getCollectibleMaxCharges(activeItem);

  if (!hasAAABattery) {
    return chargesToAdd;
  }

  if (!hasBattery && activeCharge + chargesToAdd === maxCharges - 1) {
    return maxCharges + 1;
  }

  if (hasBattery && batteryCharge + chargesToAdd === maxCharges - 1) {
    return maxCharges + 1;
  }

  return chargesToAdd;
}

/**
 * Helper function to add a charge to every player's active item, emulating what happens when a room
 * is cleared.
 *
 * This function will take the following things into account:
 * - L rooms and 2x2 rooms granting a double charge
 * - The Battery
 * - AAA Battery
 *
 * @param ignoreBigRoomDoubleCharge Optional. If set to true, it will treat the current room as a
 *                                 1x1 room for the purposes of calculating how much charge to
 *                                 grant. Default is false.
 */
export function addRoomClearCharges(ignoreBigRoomDoubleCharge = false): void {
  for (const player of getPlayers()) {
    addRoomClearCharge(player, ignoreBigRoomDoubleCharge);
  }
}

/**
 * Helper function to get the combined normal charge and the battery charge for the player's active
 * item. This is useful because you have to add these two values together when setting the active
 * charge.
 */
export function getTotalCharge(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
): int {
  const activeCharge = player.GetActiveCharge(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);

  return activeCharge + batteryCharge;
}

export function isActiveSlotDoubleCharged(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
): boolean {
  const collectibleType = player.GetActiveItem(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);
  const maxCharges = getCollectibleMaxCharges(collectibleType);

  return batteryCharge >= maxCharges;
}

export function playChargeSoundEffect(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
): void {
  for (const soundEffect of [SoundEffect.BATTERY_CHARGE, SoundEffect.BEEP]) {
    sfxManager.Stop(soundEffect);
  }

  const chargeSoundEffect = shouldPlayFullRechargeSound(player, activeSlot)
    ? SoundEffect.BATTERY_CHARGE
    : SoundEffect.BEEP;
  sfxManager.Play(chargeSoundEffect);
}

function shouldPlayFullRechargeSound(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
) {
  const activeItem = player.GetActiveItem(activeSlot);
  const activeCharge = player.GetActiveCharge(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);
  const hasBattery = player.HasCollectible(CollectibleType.BATTERY);
  const maxCharges = getCollectibleMaxCharges(activeItem);

  if (!hasBattery) {
    // Play the full recharge sound if we are now fully charged.
    return !player.NeedsCharge(activeSlot);
  }

  // Play the full recharge sound if we are now fully charged or we are exactly half-way charged.
  return (
    !player.NeedsCharge(activeSlot) ||
    (activeCharge === maxCharges && batteryCharge === 0)
  );
}
