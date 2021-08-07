import { saveDataManager } from "../features/saveDataManager";
import { initArray } from "../functions/array";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import * as postTransformation from "./subscriptions/postTransformation";

const v = {
  run: {
    transformations: new LuaTable<PlayerIndex, boolean[]>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postTransformationCallback", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_PLAYER_INIT,
    postPlayerInitPlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot transform
  ); // 9

  mod.AddCallback(
    ModCallbacks.MC_POST_PLAYER_UPDATE,
    postPlayerUpdatePlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot transform
  ); // 31
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
// PlayerVariant.PLAYER (0)
function postPlayerInitPlayer(player: EntityPlayer) {
  if (!postTransformation.hasSubscriptions()) {
    return;
  }

  const index = getPlayerIndex(player);
  const transformations = initArray(false, PlayerForm.NUM_PLAYER_FORMS - 1);
  v.run.transformations.set(index, transformations);
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
// PlayerVariant.PLAYER (0)
function postPlayerUpdatePlayer(player: EntityPlayer) {
  if (!postTransformation.hasSubscriptions()) {
    return;
  }

  const index = getPlayerIndex(player);
  const transformations = v.run.transformations.get(index);
  if (transformations === undefined) {
    error(`Failed to get the transformation array for player: ${index}`);
  }

  for (
    let playerForm = 0;
    playerForm < PlayerForm.NUM_PLAYER_FORMS;
    playerForm++
  ) {
    const hasForm = player.HasPlayerForm(playerForm);
    const storedForm = transformations[playerForm];
    if (hasForm !== storedForm) {
      transformations[playerForm] = hasForm;
      postTransformation.fire(player, playerForm, hasForm);
    }
  }
}
