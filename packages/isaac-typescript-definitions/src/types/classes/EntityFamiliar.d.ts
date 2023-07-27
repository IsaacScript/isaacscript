import type { FamiliarVariant } from "../../enums/collections/variants";
import type { Direction } from "../../enums/Direction";
import type { TargetFlag } from "../../enums/flags/TargetFlag";

declare global {
  interface EntityFamiliar extends Entity {
    AddCoins: (value: int) => void;
    AddHearts: (hearts: int) => void;
    AddKeys: (keys: int) => void;
    AddToDelayed: () => void;
    AddToFollowers: () => void;
    AddToOrbit: (layer: int) => void;
    FireProjectile: (direction: Vector) => EntityTear;
    FollowParent: () => void;
    FollowPosition: (position: Vector) => void;
    GetOrbitPosition: (position: Vector) => Vector;
    IsDelayed: () => boolean;
    IsFollower: () => boolean;
    MoveDelayed: (numFrames: int) => void;
    MoveDiagonally: (speed: float) => void;

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
    PickEnemyTarget: (
      maxDistance: float,
      frameInterval?: int,
      flags?: TargetFlag | BitFlags<TargetFlag>,
      coneDir?: Vector,
      coneAngle?: float,
    ) => void;

    PlayChargeAnim: (direction: Direction) => void;
    PlayFloatAnim: (direction: Direction) => void;
    PlayShootAnim: (direction: Direction) => void;
    RecalculateOrbitOffset: (layer: int, add: boolean) => int;
    RemoveFromDelayed: () => void;
    RemoveFromFollowers: () => void;
    RemoveFromOrbit: () => void;
    Shoot: () => void;

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
