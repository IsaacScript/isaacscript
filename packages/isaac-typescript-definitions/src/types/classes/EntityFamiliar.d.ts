import type { FamiliarVariant } from "../../enums/collections/variants";
import type { Direction } from "../../enums/Direction";
import type { TargetFlag } from "../../enums/flags/TargetFlag";

declare global {
  interface EntityFamiliar extends Entity {
    readonly AddCoins: (value: int) => void;
    readonly AddHearts: (hearts: int) => void;
    readonly AddKeys: (keys: int) => void;
    readonly AddToDelayed: () => void;
    readonly AddToFollowers: () => void;
    readonly AddToOrbit: (layer: int) => void;
    readonly FireProjectile: (direction: Vector) => EntityTear;
    readonly FollowParent: () => void;
    readonly FollowPosition: (position: Vector) => void;
    readonly GetOrbitPosition: (position: Vector) => Vector;
    readonly IsDelayed: () => boolean;
    readonly IsFollower: () => boolean;
    readonly MoveDelayed: (numFrames: int) => void;
    readonly MoveDiagonally: (speed: float) => void;

    /**
     * @param maxDistance
     * @param frameInterval Default is 13.
     * @param flags Default is 0. See the `TargetFlag` enum for more information.
     * @param coneDir Default is `Vector(0, 0)`. If not equal to a zero vector, the function will
     *                search for targets in a cone pointing in this direction.
     * @param coneAngle Default is 15. If `coneDir` is not a zero vector, the function will set the
     *                  half angle of the search cone in degrees. (For example, 45 results in a
     *                  search angle of 90 degrees.)
     */
    readonly PickEnemyTarget: (
      maxDistance: float,
      frameInterval?: int,
      flags?: TargetFlag | BitFlags<TargetFlag>,
      coneDir?: Vector,
      coneAngle?: float,
    ) => void;

    readonly PlayChargeAnim: (direction: Direction) => void;
    readonly PlayFloatAnim: (direction: Direction) => void;
    readonly PlayShootAnim: (direction: Direction) => void;
    readonly RecalculateOrbitOffset: (layer: int, add: boolean) => int;
    readonly RemoveFromDelayed: () => void;
    readonly RemoveFromFollowers: () => void;
    readonly RemoveFromOrbit: () => void;
    readonly Shoot: () => void;

    Coins: int;
    FireCooldown: int;
    HeadFrameDelay: int;
    Hearts: int;
    Keys: int;
    LastDirection: Direction;
    MoveDirection: Direction;
    OrbitAngleOffset: float;
    OrbitDistance: Vector;

    /** -1 by default. Has values >= 0 for familiars that are orbitals. */
    OrbitLayer: int;

    OrbitSpeed: float;

    /**
     * This is the player object that "owns" this familiar. All familiars are associated with an
     * `EntityPlayer`. If the `Player` attribute is set to undefined, the game will crash.
     */
    Player: EntityPlayer;

    RoomClearCount: int;
    ShootDirection: Direction;
    State: int;
    Variant: FamiliarVariant;
  }

  /** @noSelf */
  namespace EntityFamiliar {
    function GetOrbitDistance(layer: int): Vector;
  }
}
