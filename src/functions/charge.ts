import {
  ActiveSlot,
  CollectibleType,
  RoomShape,
  SoundEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../cachedClasses";
import { getCollectibleMaxCharges } from "./collectibles";
import { getPlayers } from "./playerIndex";

/**
 * Helper function to add a charge to a player's active item, emulating what happens when a room is
 * cleared.
 *
 * This function will take the following things into account:
 * - L rooms and 2x2 rooms granting a double charge
 * - The Battery
 * - AAA Battery
 *
 * @param player The player to grant the charges to.
 * @param ignoreBigRoomDoubleCharge Optional. If set to true, it will treat the current room as a
 *                                  1x1 room for the purposes of calculating how much charge to
 *                                  grant. Default is false.
 */
export function addRoomClearCharge(
  player: EntityPlayer,
  ignoreBigRoomDoubleCharge = false,
): void {
  for (const activeSlot of [
    ActiveSlot.PRIMARY,
    ActiveSlot.SECONDARY,
    ActiveSlot.POCKET,
  ]) {
    addRoomClearChargeToSlot(player, activeSlot, ignoreBigRoomDoubleCharge);
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
 * @param ignoreBigRoomDoubleCharge Optional. If set to true, it will treat the current room as a
 *                                  1x1 room for the purposes of calculating how much charge to
 *                                  grant. Default is false.
 */
export function addRoomClearChargeToSlot(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
  ignoreBigRoomDoubleCharge = false,
): void {
  if (!player.NeedsCharge(activeSlot)) {
    return;
  }

  const hud = game.GetHUD();

  // Find out the new charge to set on the item.
  const totalCharge = getTotalCharge(player, activeSlot);
  const chargesToAdd = getNumChargesToAdd(
    player,
    activeSlot,
    ignoreBigRoomDoubleCharge,
  );
  const modifiedChargesToAdd = getNumChargesWithAAAModifier(
    player,
    activeSlot,
    chargesToAdd,
  );
  const newCharge = totalCharge + modifiedChargesToAdd;

  player.SetActiveCharge(newCharge, activeSlot);
  hud.FlashChargeBar(player, activeSlot);

  playChargeSoundEffect(player, activeSlot);
}

function getNumChargesToAdd(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
  ignoreBigRoomDoubleCharge = false,
) {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();
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

  if (roomShape >= RoomShape.SHAPE_2x2 && !ignoreBigRoomDoubleCharge) {
    // 2x2 rooms and L rooms should grant 2 charges.
    return 2;
  }

  // Clearing a room grants 1 charge by default.
  return 1;
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
 *                                  1x1 room for the purposes of calculating how much charge to
 *                                  grant. Default is false.
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
