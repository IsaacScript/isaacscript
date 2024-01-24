import type { RenderPoint } from "./RenderPoint";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface RenderBeam extends IsaacAPIClass {
    Add: {
      (point: RenderPoint): void;

      (position: Vector, spritesheetCoordinate: number, width?: number): void;
    };

    GetLayer: () => int;

    GetPoints: () => RenderPoint[];

    GetUseOverlay: () => boolean;

    /** @param clearPoints Default is true. */
    Render: (clearPoints?: boolean) => void;

    SetLayer: (layerIdOrName: int | string) => void;

    SetPoints: (points: readonly RenderPoint[]) => void;

    SetSprite: {
      (sprite: Sprite): void;
      (sprite: Sprite, layerNameOrId: string | int, useOverlay: boolean): void;
    };

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
  function Beam(
    this: void,
    sprite: Sprite,
    layerOrLayerName: int | string,
    useOverlay: boolean,
    unknownBool: boolean,
    pointsPreallocateSize?: number,
  ): RenderBeam;
}
