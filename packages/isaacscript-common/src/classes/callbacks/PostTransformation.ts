import { PlayerForm } from "isaac-typescript-definitions";
import { PLAYER_FORM_VALUES } from "../../arrays/cachedEnumValues";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { defaultMapGetPlayer } from "../../functions/playerDataStructures";
import { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.POST_TRANSFORMATION;

const v = {
  run: {
    // We cannot use a nested `DefaultMap` here.
    playersTransformationsMap: new DefaultMap<
      PlayerIndex,
      Map<PlayerForm, boolean>
    >(() => new Map()),
  },
};

export class PostTransformation extends CustomCallback<T> {
  public override v = v;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_player, playerForm] = fireArgs;
    const [callbackPlayerForm] = optionalArgs;

    return (
      callbackPlayerForm === undefined || callbackPlayerForm === playerForm
    );
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer) => {
    const playerTransformationsMap = defaultMapGetPlayer(
      v.run.playersTransformationsMap,
      player,
    );

    for (const playerForm of PLAYER_FORM_VALUES) {
      const hasForm = player.HasPlayerForm(playerForm);
      let storedForm = playerTransformationsMap.get(playerForm);
      if (storedForm === undefined) {
        storedForm = false;
      }

      if (hasForm !== storedForm) {
        playerTransformationsMap.set(playerForm, hasForm);
        this.fire(player, playerForm, hasForm);
      }
    }
  };
}
