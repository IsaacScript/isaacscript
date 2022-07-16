export enum DecorationVariant {
  VANILLA_DECORATION = 0,

  /**
   * The vanilla game does not support any custom grid entities. Under the hood, IsaacScript allows
   * for custom grid entities by using decorations with this variant to represent custom grid
   * entities.
   */
  CUSTOM_GRID_ENTITY = 1,
}
