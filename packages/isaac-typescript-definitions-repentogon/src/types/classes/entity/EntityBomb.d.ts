import type { BombCostumeLayer } from "../../../enums/BombCostumeLayer";

declare global {
  interface EntityBomb extends Entity {
    /** Returns the sprite from the specified layer ID. */
    GetCostumeLayerSprite: (layerID: BombCostumeLayer) => Sprite;

    /** Returns how many frames until the bomb explodes. */
    GetExplosionCountdown: () => int;

    GetFallingSpeed: () => number;
    GetHeight: () => number;
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

    SetFallingSpeed: (speed: number) => void;
    SetHeight: () => void;
    SetLoadCostumes: (load: number) => void;

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

    /** Sets the bomb's scale. This should be used with the `EntityBomb.SetLoadCostumes` method. */
    SetScale: (scale: number) => void;

    UpdateDirtColor: () => void;
  }
}
