import { getUpgradeErrorMsg } from "../errors";
import { getEntities } from "../functions/entity";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "siren helpers";

let initialized = false;

const v = {
  run: {
    familiarBlacklist: [] as Array<[variant: int, subtype: int | undefined]>,
  },
};

/** @internal */
export function sirenHelpersInit(mod: Mod): void {
  initialized = true;
  saveDataManager("sirenHelpers", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_NPC_INIT,
    postNPCInitSirenHelper,
    EntityType.ENTITY_SIREN_HELPER,
  );
}

// ModCallbacks.MC_POST_NPC_INIT (27)
// EntityType.ENTITY_SIREN_HELPER (966)
function postNPCInitSirenHelper(npc: EntityNPC) {
  checkReturnFamiliarToPlayer(npc);
}

function checkReturnFamiliarToPlayer(npc: EntityNPC) {
  if (npc.Target === undefined) {
    return;
  }

  const familiar = npc.Target.ToFamiliar();
  if (familiar === undefined) {
    return;
  }

  if (blacklistEntryExists(familiar.Variant, familiar.SubType)) {
    npc.Remove();
    familiar.AddToFollowers();
  }
}

function blacklistEntryExists(
  incomingFamiliarVariant: FamiliarVariant | int,
  incomingFamiliarSubType: int | undefined,
): boolean {
  for (const [familiarVariant, familiarSubType] of v.run.familiarBlacklist) {
    if (
      incomingFamiliarVariant === familiarVariant &&
      familiarSubType === incomingFamiliarSubType
    ) {
      // There is an entry that matches the variant and subtype exactly
      return true;
    }

    if (
      incomingFamiliarVariant === familiarVariant &&
      familiarSubType === undefined
    ) {
      // There is an entry that matches all subtypes for this variant
      return true;
    }
  }

  return false;
}

/**
 * Blacklists a familiar from being stolen by The Siren boss. This should be called once at the
 * beginning of every run.
 *
 * @param familiarVariant The familiar variant to blacklist.
 * @param familiarSubType The subtype to blacklist. Optional. The default is to blacklist all
 * subtypes of the given variant.
 */
export function setFamiliarNoSirenSteal(
  familiarVariant: FamiliarVariant | int,
  familiarSubType?: int,
): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  if (blacklistEntryExists(familiarVariant, familiarSubType)) {
    return;
  }

  v.run.familiarBlacklist.push([familiarVariant, familiarSubType]);
}

/**
 * When The Siren boss "steals" your familiars, a hidden "Siren Helper" entity is spawned to control
 * each familiar stolen. (Checking for this entity seems to be the only way to detect when the Siren
 * steals a familiar.)
 *
 * @param familiar The familiar to be checked.
 * @returns Returns the hidden "Siren Helper" entity corresponding to the given familiar, if it
 * exists. Returns undefined otherwise.
 */
function getSirenHelper(familiar: EntityFamiliar): Entity | undefined {
  const familiarHash = GetPtrHash(familiar);

  const sirenHelpers = getEntities(EntityType.ENTITY_SIREN_HELPER);
  for (const sirenHelper of sirenHelpers) {
    if (
      sirenHelper.Target !== undefined &&
      GetPtrHash(sirenHelper.Target) === familiarHash
    ) {
      return sirenHelper;
    }
  }

  return undefined;
}

/**
 * Helper function to check if the Siren boss has stolen a familiar. Some familiars may need to
 * behave differently when under The Siren's control (e.g. if they auto-target enemies).
 *
 * @param familiar The familiar to be checked.
 * @returns Returns whether the familiar has been stolen by The Siren.
 */
export function hasSirenStolenFamiliar(familiar: EntityFamiliar): boolean {
  return getSirenHelper(familiar) !== undefined;
}
