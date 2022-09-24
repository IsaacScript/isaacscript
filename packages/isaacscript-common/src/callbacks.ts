import { PostAmbushFinished } from "./classes/callbacks/PostAmbushFinished";
import { PostAmbushStarted } from "./classes/callbacks/PostAmbushStarted";
import { PostBombExploded } from "./classes/callbacks/PostBombExploded";
import { PostBombInitLate } from "./classes/callbacks/PostBombInitLate";
import { PostBoneSwing } from "./classes/callbacks/PostBoneSwing";
import { PostCollectibleEmpty } from "./classes/callbacks/PostCollectibleEmpty";
import { PostCollectibleInitFirst } from "./classes/callbacks/PostCollectibleInitFirst";
import { PostCursedTeleport } from "./classes/callbacks/PostCursedTeleport";
import { PostCustomRevive } from "./classes/callbacks/PostCustomRevive";
import { PostDiceRoomActivated } from "./classes/callbacks/PostDiceRoomActivated";
import { PostDoorRender } from "./classes/callbacks/PostDoorRender";
import { PostDoorUpdate } from "./classes/callbacks/PostDoorUpdate";
import { PostEffectInitLate } from "./classes/callbacks/PostEffectInitLate";
import { PostEffectStateChanged } from "./classes/callbacks/PostEffectStateChanged";
import { PostEsauJr } from "./classes/callbacks/PostEsauJr";
import { PostFamiliarInitLate } from "./classes/callbacks/PostFamiliarInitLate";
import { PostFamiliarStateChanged } from "./classes/callbacks/PostFamiliarStateChanged";
import { PostFirstEsauJr } from "./classes/callbacks/PostFirstEsauJr";
import { PostFirstFlip } from "./classes/callbacks/PostFirstFlip";
import { PostFlip } from "./classes/callbacks/PostFlip";
import { PostGameStartedReordered } from "./classes/callbacks/PostGameStartedReordered";
import { PostGameStartedReorderedLast } from "./classes/callbacks/PostGameStartedReorderedLast";
import { PostGreedModeWave } from "./classes/callbacks/PostGreedModeWave";
import { PostGridEntityBroken } from "./classes/callbacks/PostGridEntityBroken";
import { PostGridEntityCollision } from "./classes/callbacks/PostGridEntityCollision";
import { PostGridEntityCustomBroken } from "./classes/callbacks/PostGridEntityCustomBroken";
import { PostGridEntityCustomCollision } from "./classes/callbacks/PostGridEntityCustomCollision";
import { PostGridEntityCustomInit } from "./classes/callbacks/PostGridEntityCustomInit";
import { PostGridEntityCustomRemove } from "./classes/callbacks/PostGridEntityCustomRemove";
import { PostGridEntityCustomStateChanged } from "./classes/callbacks/PostGridEntityCustomStateChanged";
import { PostGridEntityCustomUpdate } from "./classes/callbacks/PostGridEntityCustomUpdate";
import { PostGridEntityInit } from "./classes/callbacks/PostGridEntityInit";
import { PostGridEntityRemove } from "./classes/callbacks/PostGridEntityRemove";
import { PostGridEntityStateChanged } from "./classes/callbacks/PostGridEntityStateChanged";
import { PostGridEntityUpdate } from "./classes/callbacks/PostGridEntityUpdate";
import { PostHolyMantleRemoved } from "./classes/callbacks/PostHolyMantleRemoved";
import { PostKnifeInitLate } from "./classes/callbacks/PostKnifeInitLate";
import { PostNewLevelReordered } from "./classes/callbacks/PostNewLevelReordered";
import { PostNewRoomEarly } from "./classes/callbacks/PostNewRoomEarly";
import { PostNewRoomReordered } from "./classes/callbacks/PostNewRoomReordered";
import { PostPEffectUpdateReordered } from "./classes/callbacks/PostPEffectUpdateReordered";
import { PostPitRender } from "./classes/callbacks/PostPitRender";
import { PostPlayerFatalDamage } from "./classes/callbacks/PostPlayerFatalDamage";
import { PostPlayerRenderReordered } from "./classes/callbacks/PostPlayerRenderReordered";
import { PostPlayerUpdateReordered } from "./classes/callbacks/PostPlayerUpdateReordered";
import { PostRoomClearChanged } from "./classes/callbacks/PostRoomClearChanged";
import { PostSpikesRender } from "./classes/callbacks/PostSpikesRender";
import { PreBerserkDeath } from "./classes/callbacks/PreBerserkDeath";
import { PreCustomRevive } from "./classes/callbacks/PreCustomRevive";
import { CustomCallback } from "./classes/private/CustomCallback";
import { ModCallbackCustom2 } from "./enums/ModCallbackCustom2";

export function getCallbacks(): {
  readonly [key in ModCallbackCustom2]: CustomCallback<key>;
} {
  return {
    [ModCallbackCustom2.POST_AMBUSH_FINISHED]: new PostAmbushFinished(),
    [ModCallbackCustom2.POST_AMBUSH_STARTED]: new PostAmbushStarted(),
    [ModCallbackCustom2.POST_BOMB_EXPLODED]: new PostBombExploded(),
    [ModCallbackCustom2.POST_BOMB_INIT_LATE]: new PostBombInitLate(),
    [ModCallbackCustom2.POST_BONE_SWING]: new PostBoneSwing(),
    [ModCallbackCustom2.POST_COLLECTIBLE_EMPTY]: new PostCollectibleEmpty(),
    [ModCallbackCustom2.POST_COLLECTIBLE_INIT_FIRST]:
      new PostCollectibleInitFirst(),
    [ModCallbackCustom2.POST_CURSED_TELEPORT]: new PostCursedTeleport(),
    [ModCallbackCustom2.POST_CUSTOM_REVIVE]: new PostCustomRevive(),
    [ModCallbackCustom2.POST_DICE_ROOM_ACTIVATED]: new PostDiceRoomActivated(),
    [ModCallbackCustom2.POST_DOOR_RENDER]: new PostDoorRender(),
    [ModCallbackCustom2.POST_DOOR_UPDATE]: new PostDoorUpdate(),
    [ModCallbackCustom2.POST_EFFECT_INIT_LATE]: new PostEffectInitLate(),
    [ModCallbackCustom2.POST_EFFECT_STATE_CHANGED]:
      new PostEffectStateChanged(),
    [ModCallbackCustom2.POST_ESAU_JR]: new PostEsauJr(),
    [ModCallbackCustom2.POST_FAMILIAR_INIT_LATE]: new PostFamiliarInitLate(),
    [ModCallbackCustom2.POST_FAMILIAR_STATE_CHANGED]:
      new PostFamiliarStateChanged(),
    [ModCallbackCustom2.POST_FIRST_FLIP]: new PostFirstFlip(),
    [ModCallbackCustom2.POST_FIRST_ESAU_JR]: new PostFirstEsauJr(),
    [ModCallbackCustom2.POST_FLIP]: new PostFlip(),
    [ModCallbackCustom2.POST_GAME_STARTED_REORDERED]:
      new PostGameStartedReordered(),
    [ModCallbackCustom2.POST_GAME_STARTED_REORDERED_LAST]:
      new PostGameStartedReorderedLast(),
    [ModCallbackCustom2.POST_GREED_MODE_WAVE]: new PostGreedModeWave(),
    [ModCallbackCustom2.POST_GRID_ENTITY_BROKEN]: new PostGridEntityBroken(),
    [ModCallbackCustom2.POST_GRID_ENTITY_COLLISION]:
      new PostGridEntityCollision(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_BROKEN]:
      new PostGridEntityCustomBroken(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_COLLISION]:
      new PostGridEntityCustomCollision(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_INIT]:
      new PostGridEntityCustomInit(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_REMOVE]:
      new PostGridEntityCustomRemove(),
    // [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_RENDER]: new PostGridEntityCustomRender(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]:
      new PostGridEntityCustomStateChanged(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_UPDATE]:
      new PostGridEntityCustomUpdate(),
    [ModCallbackCustom2.POST_GRID_ENTITY_INIT]: new PostGridEntityInit(),
    [ModCallbackCustom2.POST_GRID_ENTITY_REMOVE]: new PostGridEntityRemove(),
    // [ModCallbackCustom2.POST_GRID_ENTITY_RENDER]: new PostGridEntityRender(),
    [ModCallbackCustom2.POST_GRID_ENTITY_STATE_CHANGED]:
      new PostGridEntityStateChanged(),
    [ModCallbackCustom2.POST_GRID_ENTITY_UPDATE]: new PostGridEntityUpdate(),
    [ModCallbackCustom2.POST_HOLY_MANTLE_REMOVED]: new PostHolyMantleRemoved(),

    // ----------------

    [ModCallbackCustom2.POST_KNIFE_INIT_LATE]: new PostKnifeInitLate(),
    [ModCallbackCustom2.POST_NEW_LEVEL_REORDERED]: new PostNewLevelReordered(),
    [ModCallbackCustom2.POST_NEW_ROOM_EARLY]: new PostNewRoomEarly(),
    [ModCallbackCustom2.POST_NEW_ROOM_REORDERED]: new PostNewRoomReordered(),
    [ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED]:
      new PostPEffectUpdateReordered(),
    [ModCallbackCustom2.POST_PIT_RENDER]: new PostPitRender(),
    [ModCallbackCustom2.POST_PLAYER_FATAL_DAMAGE]: new PostPlayerFatalDamage(),
    [ModCallbackCustom2.POST_PLAYER_RENDER_REORDERED]:
      new PostPlayerRenderReordered(),
    [ModCallbackCustom2.POST_PLAYER_UPDATE_REORDERED]:
      new PostPlayerUpdateReordered(),
    [ModCallbackCustom2.POST_ROOM_CLEAR_CHANGED]: new PostRoomClearChanged(),
    [ModCallbackCustom2.POST_SPIKES_RENDER]: new PostSpikesRender(),
    [ModCallbackCustom2.PRE_BERSERK_DEATH]: new PreBerserkDeath(),
    [ModCallbackCustom2.PRE_CUSTOM_REVIVE]: new PreCustomRevive(),
  } as const;
}
