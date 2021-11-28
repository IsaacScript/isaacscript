export const ROOM_TYPE_TO_ITEM_POOL_TYPE_MAP = new Map<RoomType, ItemPoolType>([
  [RoomType.ROOM_SHOP, ItemPoolType.POOL_SHOP], // 2
  [RoomType.ROOM_TREASURE, ItemPoolType.POOL_TREASURE], // 4
  [RoomType.ROOM_BOSS, ItemPoolType.POOL_BOSS], // 5
  [RoomType.ROOM_SECRET, ItemPoolType.POOL_SECRET], // 7
  [RoomType.ROOM_CURSE, ItemPoolType.POOL_CURSE], // 10
  [RoomType.ROOM_CHALLENGE, ItemPoolType.POOL_BOSS], // 11
  [RoomType.ROOM_LIBRARY, ItemPoolType.POOL_LIBRARY], // 12
  [RoomType.ROOM_DEVIL, ItemPoolType.POOL_DEVIL], // 14
  [RoomType.ROOM_ANGEL, ItemPoolType.POOL_ANGEL], // 15
  [RoomType.ROOM_CHEST, ItemPoolType.POOL_GOLDEN_CHEST], // 20
  [RoomType.ROOM_BLACK_MARKET, ItemPoolType.POOL_SHOP], // 22
  [RoomType.ROOM_PLANETARIUM, ItemPoolType.POOL_PLANETARIUM], // 24
  [RoomType.ROOM_ULTRASECRET, ItemPoolType.POOL_ULTRA_SECRET], // 29
]);
