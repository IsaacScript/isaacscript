import {
  ButtonAction,
  CollectibleType,
  InputHook,
  ModCallback,
  SoundEffect,
} from "isaac-typescript-definitions";
import { sfxManager } from "../../../core/cachedClasses";
import { VectorZero } from "../../../core/constants";
import { Exported } from "../../../decorators";
import {
  getProjectiles,
  getTears,
  removeAllProjectiles,
  removeAllTears,
} from "../../../functions/entitiesSpecific";
import { isTear } from "../../../functions/isaacAPIClass";
import { logError } from "../../../functions/log";
import { useActiveItemTemp } from "../../../functions/playerCollectibles";
import { getAllPlayers } from "../../../functions/playerIndex";
import { getTSTLClassName } from "../../../functions/tstlClass";
import { assertDefined, isRepentancePlus } from "../../../functions/utils";
import { ReadonlySet } from "../../../types/ReadonlySet";
import { Feature } from "../../private/Feature";
import type { DisableInputs } from "./DisableInputs";

interface InitialDescription {
  position: Vector;
  positionOffset: Vector;
  velocity: Vector;
  height: float;
  fallingSpeed: float;
  fallingAcceleration: float;
}

const v = {
  run: {
    isPseudoPaused: false,
    shouldUnpause: false,
    initialDescriptions: new Map<PtrHash, InitialDescription>(),
  },
};

export class Pause extends Feature {
  /** @internal */
  public override v = v;

  private readonly disableInputs: DisableInputs;

  /** @internal */
  constructor(disableInputs: DisableInputs) {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],

      // 13
      [
        ModCallback.INPUT_ACTION,
        this.inputActionGetActionValue,
        [InputHook.GET_ACTION_VALUE],
      ],
    ];

    this.disableInputs = disableInputs;
  }

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = () => {
    if (!v.run.isPseudoPaused) {
      return;
    }

    const firstPlayer = Isaac.GetPlayer();
    useActiveItemTemp(firstPlayer, CollectibleType.PAUSE);

    if (isRepentancePlus()) {
      sfxManager.Stop(SoundEffect.PAUSE_FREEZE);
    }

    this.stopTearsAndProjectilesFromMoving();
  };

  private stopTearsAndProjectilesFromMoving() {
    const tearsAndProjectiles = [...getTears(), ...getProjectiles()];

    for (const tearOrProjectile of tearsAndProjectiles) {
      const ptrHash = GetPtrHash(tearOrProjectile);
      const initialDescription = v.run.initialDescriptions.get(ptrHash);
      if (initialDescription === undefined) {
        continue;
      }

      tearOrProjectile.Position = initialDescription.position;
      tearOrProjectile.PositionOffset = initialDescription.positionOffset;
      tearOrProjectile.Velocity = VectorZero;
      tearOrProjectile.Height = initialDescription.height;
      tearOrProjectile.FallingSpeed = 0;
      if (isTear(tearOrProjectile)) {
        tearOrProjectile.FallingAcceleration =
          initialDescription.fallingAcceleration;
      } else {
        tearOrProjectile.FallingAccel = initialDescription.fallingAcceleration;
      }
    }
  }

  // ModCallback.INPUT_ACTION (13)
  // InputHook.GET_ACTION_VALUE (2)
  private readonly inputActionGetActionValue = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ): boolean | float | undefined => {
    if (buttonAction !== ButtonAction.SHOOT_RIGHT) {
      return undefined;
    }

    if (!v.run.shouldUnpause) {
      return undefined;
    }
    v.run.shouldUnpause = false;

    // Returning a value of 1 for a single sub-frame will be enough for the game to register an
    // unpause but not enough for a tear to actually be fired.
    return 1;
  };

  /**
   * Helper function to check if the pause feature from `isaacscript-common` is currently
   * pseudo-pausing the game.
   *
   * @public
   */
  @Exported
  public isPaused(): boolean {
    return v.run.isPseudoPaused;
  }

  /**
   * Helper function to emulate what happens when the player pauses the game. Use the `unpause`
   * function to return things back to normal.
   *
   * Under the hood, this function:
   * - uses the Pause collectible on every game frame
   * - disables any player inputs (except for `ButtonAction.MENU_CONFIRM` and
   *   `ButtonAction.CONSOLE`)
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PAUSE`.
   *
   * @public
   */
  @Exported
  public pause(): void {
    if (v.run.isPseudoPaused) {
      logError(
        "Failed to pseudo-pause the game, since it was already pseudo-paused.",
      );
      return;
    }
    v.run.isPseudoPaused = true;

    // Tears/projectiles in the room will move slightly on every frame, even when the Pause
    // collectible is active. Thus, we manually reset the initial positions and heights on every
    // frame.
    v.run.initialDescriptions.clear();
    const tearsAndProjectiles = [...getTears(), ...getProjectiles()];
    for (const tearOrProjectile of tearsAndProjectiles) {
      const ptrHash = GetPtrHash(tearOrProjectile);
      const initialDescription: InitialDescription = {
        position: tearOrProjectile.Position,
        positionOffset: tearOrProjectile.PositionOffset,
        velocity: tearOrProjectile.Velocity,
        height: tearOrProjectile.Height,
        fallingSpeed: tearOrProjectile.FallingSpeed,
        fallingAcceleration: isTear(tearOrProjectile)
          ? tearOrProjectile.FallingAcceleration
          : tearOrProjectile.FallingAccel,
      };
      v.run.initialDescriptions.set(ptrHash, initialDescription);
    }

    const firstPlayer = Isaac.GetPlayer();
    useActiveItemTemp(firstPlayer, CollectibleType.PAUSE);

    if (isRepentancePlus()) {
      sfxManager.Stop(SoundEffect.PAUSE_FREEZE);
    }

    const tstlClassName = getTSTLClassName(this);
    assertDefined(
      tstlClassName,
      "Failed to get the class name for the pause feature.",
    );

    const buttonActionConsole = isRepentancePlus()
      ? ButtonAction.CONSOLE_REPENTANCE_PLUS
      : ButtonAction.CONSOLE_REPENTANCE;
    const whitelist = new ReadonlySet([
      ButtonAction.MENU_CONFIRM,
      buttonActionConsole,
    ]);
    this.disableInputs.disableAllInputsExceptFor(tstlClassName, whitelist);

    for (const player of getAllPlayers()) {
      // Disable the controls to prevent the players from moving, shooting, and so on. (We also
      // disable the inputs in the `INPUT_ACTION` callback, but that does not prevent mouse inputs.)
      player.ControlsEnabled = false;

      // Prevent the players from leaving the room. (If we don't reset the velocity, they can
      // continue to move towards a door.)
      player.Velocity = VectorZero;
    }

    this.stopTearsAndProjectilesFromMoving();
  }

  /**
   * Helper function to put things back to normal after the `pause` function was used.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PAUSE`.
   *
   * @public
   */
  @Exported
  public unpause(): void {
    if (!v.run.isPseudoPaused) {
      logError(
        "Failed to pseudo-unpause the game, since it was not already pseudo-paused.",
      );
      return;
    }
    v.run.isPseudoPaused = false;
    v.run.shouldUnpause = true;

    const tstlClassName = getTSTLClassName(this);
    assertDefined(
      tstlClassName,
      "Failed to find get the class name for the pause feature.",
    );

    this.disableInputs.enableAllInputs(tstlClassName);
    for (const player of getAllPlayers()) {
      player.ControlsEnabled = true;
    }

    // After a vanilla pause, the tears will not resume their normal velocity and will "stick" to
    // the air. Even if we try to help the tears along by explicitly resetting all of the
    // velocity-related variables to their initial values, this will not make a difference. Thus,
    // revert to removing all of the tears and projectiles in the room. (If a Ludovico tear is
    // removed, it will automatically be respawned on the next frame.)
    removeAllTears();
    removeAllProjectiles();
  }
}
