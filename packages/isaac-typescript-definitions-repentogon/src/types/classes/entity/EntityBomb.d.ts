import type { BombCostumeLayer } from "../../../enums/BombCostumeLayer";

declare global {
  interface EntityBomb extends Entity {
    /** Returns the sprite from the specified layer ID. */
    GetCostumeLayerSprite: (layerID: BombCostumeLayer) => Sprite;

    /** Returns how many frames until the bomb explodes. */
    GetExplosionCountdown: () => int;

    // `GetFallingSpeed` is omitted due to being mislabeled as `GetFallAcceleration`.

    GetFallAcceleration: () => number;

    GetFallSpeed: () => number;

    // `GetHeight` is omitted due to being mislabeled as `GetFallSpeed`.

    /** Returns an array containing all of the entity indexes the bomb hit with its explosion. */
    GetHitList: () => int[];

    /**
     * Returns the bomb's target angle. This is only used by rocket bombs, with the angle
     * influencing their movement and sprite orientation.
     */
    GetRocketAngle: () => number;

    /**
     * Returns the bomb's speed. This is only used by rocket bombs. The game will increase the speed
     * by 1 every frame.
     */
    GetRocketSpeed: () => number;

    /**
     * Returns the bomb's scale. This is used to apply a certain animation to the bomb's costume.
     */
    GetScale: () => number;

    /** Returns whether the bomb is currently loading its costumes. */
    IsLoadingCostumes: () => boolean;

    /** Returns whether the bomb was created through the Angelic Prism effect. */
    IsPrismTouched: () => boolean;

    // `SetFallingSpeed` is omitted due to being mislabeled as `SetFallAcceleration`.

    SetFallAcceleration: (acceleration: number) => void;

    // `SetHeight` is omitted due to being mislabeled as `SetFallSpeed`.
    SetFallSpeed: (speed: number) => void;

    /** Sets whether the bomb should load the costumes. */
    SetLoadCostumes: (load: boolean) => void;

    /** Sets whether the bomb was created through the Angelic Prism effect. */
    SetPrismTouched: (touched: boolean) => void;

    /**
     * Sets the bomb's target angle. This is only used by rocket bombs, with the angle influencing
     * their movement and sprite orientation.
     */
    SetRocketAngle: (angle: number) => void;

    /**
     * Sets the bomb's speed. This is only used by rocket bombs. The game will increase the speed by
     * 1 every frame.
     */
    SetRocketSpeed: (speed: number) => void;

    /**
     * Sets the bomb's scale. This should be used with the `EntityBomb.SetLoadCostumes` method so
     * the costumes can update properly.
     */
    SetScale: (scale: number) => void;

    /** Updates the color of the dirt particles the bomb, if it exists. */
    UpdateDirtColor: () => void;
  }
}
