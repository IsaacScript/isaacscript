import type { RenderPoint } from "./RenderPoint";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface RenderBeam extends IsaacAPIClass {
  /**
   * Adds a point to the beam. Points are stored in order of adding.
   *
   * @param height How many pixels the sprite will render vertically. A larger value will upscale
   *               the sprite. This is interpolated between points.
   * @param width How many pixels the sprite will render horizontally. A larger value will upscale
   *              the sprite. This is interpolated between points.
   */
  Add: ((position: Vector) => void) &
    ((position: Vector, height: number, width?: number, color?: Color) => void);

  GetLayer: () => int;

  GetPoints: () => RenderPoint[];

  GetUseOverlay: () => boolean;

  /** @param clearPoints Default is true. */
  Render: (clearPoints?: boolean) => void;

  SetLayer: (layerIdOrName: int | string) => void;

  SetPoints: (points: readonly RenderPoint[]) => void;

  SetUseOverlay: (useOverlay: boolean) => void;
}

/**
 * Constructs a new Beam class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @param this
 * @param sprite
 * @param layerOrLayerName
 * @param useOverlay
 * @param unknownBool
 * @param pointsPreallocateSize Default is 8.
 */
export function Beam(
  this: void,
  sprite: Sprite,
  layerOrLayerName: int | string,
  useOverlay: boolean,
  unknownBool: boolean,
  pointsPreallocateSize?: number,
): RenderBeam;
