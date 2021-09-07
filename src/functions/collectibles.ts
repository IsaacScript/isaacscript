const COLLECTIBLE_SPRITE_LAYER = 1;
const BLIND_ITEM_PNG_PATH = "gfx/items/collectibles/questionmark.png";

export function collectibleHasTag(
  collectibleType: CollectibleType | int,
  tag: ItemConfigTag,
): boolean {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return itemConfigItem.HasTags(tag);
}

export function getCollectibleInitCharges(
  collectibleType: CollectibleType | int,
): int {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return 0;
  }

  return itemConfigItem.InitCharge;
}

export function getCollectibleMaxCharges(
  collectibleType: CollectibleType | int,
): int {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return 0;
  }

  return itemConfigItem.MaxCharges;
}

export function getMaxCollectibleID(): int {
  const itemConfig = Isaac.GetItemConfig();

  return itemConfig.GetCollectibles().Size - 1;
}

export function isQuestCollectible(
  collectibleType: CollectibleType | int,
): boolean {
  return collectibleHasTag(collectibleType, ItemConfigTag.QUEST);
}

export function setCollectibleBlind(pickup: EntityPickup): void {
  setCollectibleSprite(pickup, BLIND_ITEM_PNG_PATH);
}

export function setCollectibleSprite(
  pickup: EntityPickup,
  pngPath: string,
): void {
  if (pickup.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot set a collectible sprite for pickups of variant: ${pickup.Variant}`,
    );
  }

  const sprite = pickup.GetSprite();
  sprite.ReplaceSpritesheet(COLLECTIBLE_SPRITE_LAYER, pngPath);
  sprite.LoadGraphics();
}
