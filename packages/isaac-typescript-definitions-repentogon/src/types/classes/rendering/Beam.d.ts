/**
 * Constructs a new beam object.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @param this
 * @param sprite The sprite used must share the same scope as the beam you are creating, otherwise
 *               the beam won't work.
 * @param layerOrLayerName
 * @param useOverlay
 * @param unknownBool The behavior of this argument is currently unknown.
 */
declare function Beam(
  this: void,
  sprite: Sprite,
  layerOrLayerName: int | string,
  useOverlay: boolean,
  unknownBool: boolean,
): RenderBeam;

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
   * @param spritesheetCoordinate
   * @param width Optional. Default is 1.
   */
  Add: ((point: Point) => void) &
    ((position: Vector, spritesheetCoordinate: number, width?: number) => void);

  /** Returns the layer of the beam. */
  GetLayer: () => int;

  /** Returns an array of all of the points the beam has. */
  GetPoints: () => Point[];

  /** Returns the beam's sprite. */
  GetSprite: () => Sprite;

  /** Returns whether the beam is an overlay. */
  GetUseOverlay: () => boolean;

  /**
   * Renders the beam.
   *
   * @param clearPoints Optional. Default is true.
   */
  Render: (clearPoints: boolean) => void;

  /** Sets the beam's layer. */
  SetLayer: (layerIdOrName: int | string) => void;

  /** Sets the beam's points to the specified array of points. */
  SetPoints: (points: readonly Point[]) => void;

  /** Sets the sprite of the beam. */
  SetSprite: ((sprite: Sprite) => void) &
    ((
      sprite: Sprite,
      layerNameOrId: string | int,
      useOverlay: boolean,
    ) => void);

  /** Sets whether the beam is an overlay. */
  SetUseOverlay: (useOverlay: boolean) => void;
}
