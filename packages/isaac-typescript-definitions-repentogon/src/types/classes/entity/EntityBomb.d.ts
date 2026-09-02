import type { BombCostumeLayer } from "../../../enums/BombCostumeLayer";

declare global {
  interface EntityBomb extends Entity {
    /** Returns the sprite from the specified layer ID. */
    readonly GetCostumeLayerSprite: (layerID: BombCostumeLayer) => Sprite;

    /** Returns how many frames until the bomb explodes. */
    readonly GetExplosionCountdown: () => int;

    // `GetFallingSpeed` is omitted due to being mislabeled as `GetFallAcceleration`.

    readonly GetFallAcceleration: () => number;

    readonly GetFallSpeed: () => number;

    // `GetHeight` is omitted due to being mislabeled as `GetFallSpeed`.

    /** Returns an array containing all of the entity indexes the bomb hit with its explosion. */
    readonly GetHitList: () => int[];

    /**
     * Returns the bomb's target angle. This is only used by rocket bombs, with the angle
     * influencing their movement and sprite orientation.
     */
    readonly GetRocketAngle: () => number;

    /**
     * Returns the bomb's speed. This is only used by rocket bombs. The game will increase the speed
     * by 1 every frame.
     */
    readonly GetRocketSpeed: () => number;

    /**
     * Returns the bomb's scale. This is used to apply a certain animation to the bomb's costume.
     */
    readonly GetScale: () => number;

    /** Returns whether the bomb is currently loading its costumes. */
    readonly IsLoadingCostumes: () => boolean;

    /** Returns whether the bomb was created through the Angelic Prism effect. */
    readonly IsPrismTouched: () => boolean;

    // `SetFallingSpeed` is omitted due to being mislabeled as `SetFallAcceleration`.

    readonly SetFallAcceleration: (acceleration: number) => void;

    // `SetHeight` is omitted due to being mislabeled as `SetFallSpeed`.
    readonly SetFallSpeed: (speed: number) => void;

    /** Sets whether the bomb should load the costumes. */
    readonly SetLoadCostumes: (load: boolean) => void;

    /** Sets whether the bomb was created through the Angelic Prism effect. */
    readonly SetPrismTouched: (touched: boolean) => void;

    /**
     * Sets the bomb's target angle. This is only used by rocket bombs, with the angle influencing
     * their movement and sprite orientation.
     */
    readonly SetRocketAngle: (angle: number) => void;

    /**
     * Sets the bomb's speed. This is only used by rocket bombs. The game will increase the speed by
     * 1 every frame.
     */
    readonly SetRocketSpeed: (speed: number) => void;

    /**
     * Sets the bomb's scale. This should be used with the `EntityBomb.SetLoadCostumes` method so
     * the costumes can update properly.
     */
    readonly SetScale: (scale: number) => void;

    /** Updates the color of the dirt particles the bomb, if it exists. */
    readonly UpdateDirtColor: () => void;
  }
}
