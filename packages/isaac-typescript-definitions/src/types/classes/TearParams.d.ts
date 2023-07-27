import type { TearVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface TearParams extends IsaacAPIClass {
    BombVariant: int;
    TearColor: Color;
    TearDamage: float;
    TearFlags: BitFlags<TearFlag>;
    TearHeight: float;
    TearScale: float;
    TearVariant: TearVariant;
  }
}
