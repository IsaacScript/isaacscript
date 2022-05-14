import { CollectibleType } from "isaac-typescript-definitions";

export const SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES_SET: ReadonlySet<CollectibleType> =
  new Set([
    CollectibleType.FORGET_ME_NOW, // 127
    CollectibleType.EDENS_SOUL, // 490
    CollectibleType.ALABASTER_BOX, // 585
    CollectibleType.PLAN_C, // 475
    CollectibleType.MAMA_MEGA, // 483
    CollectibleType.SACRIFICIAL_ALTAR, // 536
    CollectibleType.DEATH_CERTIFICATE, // 628
    CollectibleType.R_KEY, // 636
  ]);
