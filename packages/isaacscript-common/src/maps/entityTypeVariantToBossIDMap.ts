import type { BossID } from "isaac-typescript-definitions";
import { BOSS_ID_TO_ENTITY_TYPE_VARIANT } from "../objects/bossIDToEntityTypeVariant";
import { ReadonlyMap } from "../types/ReadonlyMap";

export const ENTITY_TYPE_VARIANT_TO_BOSS_ID_MAP = new ReadonlyMap(
  [...Object.entries(BOSS_ID_TO_ENTITY_TYPE_VARIANT)].map(
    ([bossIDRaw, entityTypeVariant]) => {
      const bossID = bossIDRaw as unknown as BossID;
      const [entityType, variant] = entityTypeVariant;
      const entityTypeVariantString = `${entityType}.${variant}`;
      return [entityTypeVariantString, bossID];
    },
  ),
);
