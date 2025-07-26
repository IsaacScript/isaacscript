import type { FamiliarVariant } from "isaac-typescript-definitions";
import { EntityType, ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    familiarBlacklist: [] as Array<
      [variant: FamiliarVariant, subType: int | undefined]
    >,
  },
};

export class NoSirenSteal extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 27
      [
        ModCallback.POST_NPC_INIT,
        this.postNPCInitSirenHelper,
        [EntityType.SIREN_HELPER],
      ],
    ];
  }

  // ModCallback.POST_NPC_INIT (27)
  // EntityType.SIREN_HELPER (966)
  private readonly postNPCInitSirenHelper = (npc: EntityNPC) => {
    this.checkReturnFamiliarToPlayer(npc);
  };

  private checkReturnFamiliarToPlayer(npc: EntityNPC) {
    if (npc.Target === undefined) {
      return;
    }

    const familiar = npc.Target.ToFamiliar();
    if (familiar === undefined) {
      return;
    }

    if (this.blacklistEntryExists(familiar.Variant, familiar.SubType)) {
      npc.Remove();
      familiar.AddToFollowers();
    }
  }

  private blacklistEntryExists(
    incomingFamiliarVariant: FamiliarVariant,
    incomingFamiliarSubType: int | undefined,
  ): boolean {
    for (const familiarTuple of v.run.familiarBlacklist) {
      const [familiarVariant, familiarSubType] = familiarTuple;

      if (
        familiarVariant === incomingFamiliarVariant
        && familiarSubType === incomingFamiliarSubType
      ) {
        // There is an entry that matches the variant and sub-type exactly.
        return true;
      }

      if (
        familiarVariant === incomingFamiliarVariant
        && familiarSubType === undefined
      ) {
        // There is an entry that matches all sub-types for this variant.
        return true;
      }
    }

    return false;
  }

  /**
   * Blacklists a familiar from being stolen by The Siren boss. This should be called once at the
   * beginning of every run.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.NO_SIREN_STEAL`.
   *
   * @param familiarVariant The familiar variant to blacklist.
   * @param familiarSubType The sub-type to blacklist. Optional. The default is to blacklist all
   *                        sub-types of the given variant.
   * @public
   */
  @Exported
  public setFamiliarNoSirenSteal(
    familiarVariant: FamiliarVariant,
    familiarSubType?: int,
  ): void {
    if (this.blacklistEntryExists(familiarVariant, familiarSubType)) {
      return;
    }

    v.run.familiarBlacklist.push([familiarVariant, familiarSubType]);
  }
}
