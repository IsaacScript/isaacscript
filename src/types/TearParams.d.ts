import { TearVariant } from "../enums/collections/variants";
import { TearFlag } from "../enums/flags/TearFlag";

declare global {
  interface TearParams {
    BombVariant: int;
    TearColor: Color;
    TearDamage: float;
    TearFlags: BitFlags<TearFlag>;
    TearHeight: float;
    TearScale: float;
    TearVariant: TearVariant | int;
  }
}
