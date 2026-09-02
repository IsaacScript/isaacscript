/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface RenderBeam extends IsaacAPIClass {
  /**
   * Adds a point to the beam.
   *
   * `Beam.Add` has two method overloads: One which allows you to add an already created point to
   * the beam, and one that creates a new beam from the provided arguments.
   *
   * @param point
   * @param position
   * @param spritesheetCoordinate Optional. Default is 0.
   * @param width Optional. Default is 1.
   * @param color Optional. Default is `ColorDefault`.
   * @param worldSpace Optional. Default is false.
   */
  readonly Add: ((point: Point) => void)
    & ((
      position: Vector,
      spritesheetCoordinate?: number,
      width?: number,
      color?: Color,
      worldSpace?: boolean,
    ) => void);

  /** Returns the layer of the beam. */
  readonly GetLayer: () => int;

  /** Returns an array of all of the points the beam has. */
  readonly GetPoints: () => Point[];

  /** Returns the beam's sprite. */
  readonly GetSprite: () => Sprite;

  /**
   * Returns the unknown boolean set from the beam's constructor. The exact behavior of this boolean
   * is unknown.
   */
  readonly GetUnkBool: () => boolean;

  /** Returns whether the beam is an overlay. */
  readonly GetUseOverlay: () => boolean;

  /**
   * Renders the beam.
   *
   * @param clearPoints Optional. Default is true.
   */
  readonly Render: (clearPoints: boolean) => void;

  /** Sets the beam's layer. */
  readonly SetLayer: (layerIdOrName: int | string) => void;

  /** Sets the beam's points to the specified array of points. */
  readonly SetPoints: (points: readonly Point[]) => void;

  /** Sets the sprite of the beam. */
  readonly SetSprite: ((sprite: Sprite) => void)
    & ((
      sprite: Sprite,
      layerNameOrId: string | int,
      useOverlay: boolean,
    ) => void);

  /**
   * Sets the unknown boolean used in the beam's constructor. The exact behavior of this boolean is
   * unknown.
   */
  readonly SetUnkBool: (bool: boolean) => void;

  /** Sets whether the beam is an overlay. */
  readonly SetUseOverlay: (useOverlay: boolean) => void;
}

/**
 * Constructs a new beam object.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @param this
 * @param sprite The sprite used must share the same scope as the beam you are creating, otherwise
 *               the beam won't work.
 * @param layerOrLayerName
 * @param useOverlay
 * @param unknownBool The behavior of this argument is currently unknown.
 * @see https://repentogon.com/
 */
declare function Beam(
  this: void,
  sprite: Sprite,
  layerOrLayerName: int | string,
  useOverlay: boolean,
  unknownBool: boolean,
): RenderBeam;
