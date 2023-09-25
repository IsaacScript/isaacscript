import {
  ActiveSlot,
  CollectibleType,
  ItemConfigChargeType,
  SoundEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../core/cachedClasses";
import {
  getCollectibleChargeType,
  getCollectibleMaxCharges,
} from "./collectibles";
import { getActiveItemSlots } from "./playerCollectibles";
import { getPlayers } from "./playerIndex";
import { getRoomShapeCharges } from "./roomShape";

/**
 * Helper function to add a charge to the player's active item. Will flash the HUD and play the
 * appropriate sound effect, depending on whether the charge is partially full or completely full.
 *
 * If the player's active item is already fully charged, then this function will return 0 and not
 * flash the HUD or play a sound effect.
 *
 * This function will take the following things into account:
 * - The Battery
 * - AAA Battery
 *
 * @param player The player to grant the charges to.
 * @param activeSlot Optional. The slot to grant the charges to. Default is `ActiveSlot.PRIMARY`.
 * @param numCharges Optional. The amount of charges to grant. Default is 1.
 * @param playSoundEffect Optional. Whether to play a charge-related sound effect. Default is true.
 * @returns The amount of charges that were actually granted. For example, if the active item was
 *          only one away from a full charge, but the `numCharges` provided to this function was 2,
 *          then this function would return 1.
 */
export function addCharge(
  player: EntityPlayer,
  activeSlot = ActiveSlot.PRIMARY,
  numCharges = 1,
  playSoundEffect = true,
): int {
  const hud = game.GetHUD();

  // Ensure that there is enough space on the active item to store these amount of charges. (If we
  // add too many charges, it will grant orange "battery" charges, even if the player does not have
  // The Battery.)
  const chargesAwayFromMax = getChargesAwayFromMax(player, activeSlot);
  const chargesToAdd =
    numCharges > chargesAwayFromMax ? chargesAwayFromMax : numCharges;

  // The AAA Battery trinket might grant an additional charge.
  const modifiedChargesToAdd = getChargesToAddWithAAAModifier(
    player,
    activeSlot,
    chargesToAdd,
  );

  const totalCharge = getTotalCharge(player, activeSlot);
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
 * - Not charging active items with `chargetype="special"`
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
 * - Not charging active items with `chargetype="special"`
 *
 * @param player The player to grant the charges to.
 * @param activeSlot Optional. The active item slot to grant the charges to. Default is
 *                   `ActiveSlot.PRIMARY`.
 * @param bigRoomDoubleCharge Optional. If set to false, it will treat the current room as a 1x1
 *                            room for the purposes of calculating how much charge to grant. Default
 *                            is true.
 * @param playSoundEffect Optional. Whether to play a charge-related sound effect. Default is true.
 */
export function addRoomClearChargeToSlot(
  player: EntityPlayer,
  activeSlot = ActiveSlot.PRIMARY,
  bigRoomDoubleCharge = true,
  playSoundEffect = true,
): void {
  const activeItem = player.GetActiveItem(activeSlot);
  if (activeItem === CollectibleType.NULL) {
    return;
  }

  // Certain collectibles have special charge mechanisms and are not charged upon a room being
  // cleared.
  const chargeType = getCollectibleChargeType(activeItem);
  if (chargeType === ItemConfigChargeType.SPECIAL) {
    return;
  }

  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  // Big rooms grant two charges and normal rooms grant one charge.
  let numCharges = bigRoomDoubleCharge ? getRoomShapeCharges(roomShape) : 1;

  // Handle the special case of a timed item. When clearing a room with a timed item, it should
  // become fully charged.
  if (chargeType === ItemConfigChargeType.TIMED) {
    // The charges will become clamped to the proper amount in the `addCharge` function. (If the
    // item is at 50% charge and the player has The Battery, it should go to 150% charged.)
    numCharges = getCollectibleMaxCharges(activeItem);
  }

  addCharge(player, activeSlot, numCharges, playSoundEffect);
}

/**
 * The AAA Battery should grant an extra charge when the active item is one away from being fully
 * charged.
 */
function getChargesToAddWithAAAModifier(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
  chargesToAdd: int,
) {
  const hasAAABattery = player.HasTrinket(TrinketType.AAA_BATTERY);
  if (!hasAAABattery) {
    return chargesToAdd;
  }

  const chargesAwayFromMax = getChargesAwayFromMax(player, activeSlot);
  const AAABatteryShouldApply = chargesToAdd === chargesAwayFromMax - 1;
  return AAABatteryShouldApply ? chargesToAdd + 1 : chargesToAdd;
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
 * @param bigRoomDoubleCharge Optional. If set to false, it will treat the current room as a 1x1
 *                            room for the purposes of calculating how much charge to grant. Default
 *                            is true.
 */
export function addRoomClearCharges(bigRoomDoubleCharge = true): void {
  for (const player of getPlayers()) {
    addRoomClearCharge(player, bigRoomDoubleCharge);
  }
}

/**
 * Helper function to get the amount of charges away from the maximum charge that a particular
 * player is.
 *
 * This function accounts for The Battery. For example, if the player has 2/6 charges on a D6, this
 * function will return 10 (because there are 4 charges remaining on the base charge and 6 charges
 * remaining on The Battery charge).
 *
 * @param player The player to get the charges from.
 * @param activeSlot Optional. The slot to get the charges from. Default is `ActiveSlot.PRIMARY`.
 */
export function getChargesAwayFromMax(
  player: EntityPlayer,
  activeSlot = ActiveSlot.PRIMARY,
): int {
  const totalCharge = getTotalCharge(player, activeSlot);
  const activeItem = player.GetActiveItem(activeSlot);
  const hasBattery = player.HasCollectible(CollectibleType.BATTERY);
  const maxCharges = getCollectibleMaxCharges(activeItem);
  const effectiveMaxCharges = hasBattery ? maxCharges * 2 : maxCharges;

  return effectiveMaxCharges - totalCharge;
}

/**
 * Helper function to get the combined normal charge and the battery charge for the player's active
 * item. This is useful because you have to add these two values together when setting the active
 * charge.
 *
 * @param player The player to get the charges from.
 * @param activeSlot Optional. The slot to get the charges from. Default is `ActiveSlot.PRIMARY`.
 */
export function getTotalCharge(
  player: EntityPlayer,
  activeSlot = ActiveSlot.PRIMARY,
): int {
  const activeCharge = player.GetActiveCharge(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);

  return activeCharge + batteryCharge;
}

/**
 * Helper function to find the active slots that the player has the corresponding collectible type
 * in and have enough charge to be used. Returns an empty array if the player does not have the
 * collectible in any active slot or does not have enough charges.
 */
export function getUsableActiveItemSlots(
  player: EntityPlayer,
  collectibleType: CollectibleType,
): ActiveSlot[] {
  const maxCharges = getCollectibleMaxCharges(collectibleType);
  const activeSlots = getActiveItemSlots(player, collectibleType);
  return activeSlots.filter((activeSlot) => {
    const totalCharge = getTotalCharge(player, activeSlot);
    return totalCharge >= maxCharges;
  });
}

/**
 * Helper function to check if a player's active item is "double charged", meaning that it has both
 * a full normal charge and a full charge from The Battery.
 *
 * @param player The player to check.
 * @param activeSlot Optional. The slot to check. Default is `ActiveSlot.PRIMARY`.
 */
export function isActiveSlotDoubleCharged(
  player: EntityPlayer,
  activeSlot = ActiveSlot.PRIMARY,
): boolean {
  const collectibleType = player.GetActiveItem(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);
  const maxCharges = getCollectibleMaxCharges(collectibleType);

  return batteryCharge >= maxCharges;
}

/**
 * Helper function to play the appropriate sound effect for a player after getting one or more
 * charges on their active item. (There is a different sound depending on whether the item is fully
 * charged.)
 *
 * @param player The player to play the sound effect for.
 * @param activeSlot Optional. The slot that was just charged. Default is `ActiveSlot.PRIMARY`.
 */
export function playChargeSoundEffect(
  player: EntityPlayer,
  activeSlot = ActiveSlot.PRIMARY,
): void {
  for (const soundEffect of [
    SoundEffect.BATTERY_CHARGE, // 170
    SoundEffect.BEEP, // 171
  ]) {
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

  // If we do not have The Battery, play the full recharge sound if we are now fully charged.
  if (!hasBattery) {
    // We cannot use the `EntityPlayer.NeedsCharge` method because it does not work properly for
    // items with `chargetype="special"`.
    return activeCharge === maxCharges;
  }

  // If we do have The Battery, play the full recharge sound if we are exactly double charged or
  // exactly single charged.
  return (
    batteryCharge === maxCharges ||
    (activeCharge === maxCharges && batteryCharge === 0)
  );
}
