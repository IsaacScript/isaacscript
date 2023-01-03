import { ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { Feature } from "../../private/Feature";

export class PreventChildEntities extends Feature {
  /** @internal */
  public override v = {
    room: {
      preventingEntities: new Set<PtrHash>(),
    },
  };

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 27
      [ModCallback.POST_NPC_INIT, [this.postNPCInit]],
    ];
  }

  // ModCallback.POST_NPC_INIT (27)
  private postNPCInit = (npc: EntityNPC) => {
    const spawnerEntityMatch =
      npc.SpawnerEntity !== undefined &&
      this.v.room.preventingEntities.has(GetPtrHash(npc.SpawnerEntity));

    const parentMatch =
      npc.Parent !== undefined &&
      this.v.room.preventingEntities.has(GetPtrHash(npc.Parent));

    if (spawnerEntityMatch || parentMatch) {
      npc.Remove();
    }
  };

  /**
   * Helper function to prevent an entity from spawning any other entities. Meant to be used on NPCs
   * like Squirts. This behavior will only last for the current room.
   *
   * Under the hood, this function will remove any new NPCs spawned that have a
   * `Entity.SpawnerEntity` or `Entity.Parent` value that matches the provided entity. (They are
   * removed during the `POST_NPC_INIT` callback specifically.)
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.PREVENT_CHILD_ENTITIES`.
   */
  @Exported
  public preventChildEntities(entity: Entity): void {
    const ptrHash = GetPtrHash(entity);
    this.v.room.preventingEntities.add(ptrHash);
  }
}
