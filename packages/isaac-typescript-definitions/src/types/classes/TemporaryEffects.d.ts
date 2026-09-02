import type {
  CollectibleType,
  TrinketType,
} from "../../enums/collections/subTypes";
import type { NullItemID } from "../../enums/NullItemID";

declare global {
  interface TemporaryEffects extends IsaacAPIClass {
    /**
     * This will only work properly with specific collectibles.
     *
     * @param collectibleType
     * @param addCostume Default is true.
     * @param count Default is 1.
     */
    readonly AddCollectibleEffect: (
      collectibleType: TemporaryCollectibleType,
      addCostume?: boolean,
      count?: int,
    ) => void;

    /**
     * @param nullItemID
     * @param addCostume
     * @param count Default is 1.
     */
    readonly AddNullEffect: (
      nullItemID: NullItemID,
      addCostume: boolean,
      count?: int,
    ) => void;

    /**
     * @param trinketType
     * @param addCostume
     * @param count Default is 1.
     */
    readonly AddTrinketEffect: (
      trinketType: TrinketType,
      addCostume: boolean,
      count?: int,
    ) => void;

    readonly ClearEffects: () => void;

    readonly GetCollectibleEffect: (
      collectibleType: CollectibleType,
    ) => Readonly<TemporaryEffect> | undefined;

    readonly GetCollectibleEffectNum: (collectibleType: CollectibleType) => int;
    readonly GetEffectsList: () => Readonly<EffectList>;

    readonly GetNullEffect: (
      nullItemID: NullItemID,
    ) => Readonly<TemporaryEffect> | undefined;

    readonly GetNullEffectNum: (nullItemID: NullItemID) => int;

    readonly GetTrinketEffect: (
      trinketType: TrinketType,
    ) => Readonly<TemporaryEffect> | undefined;

    readonly GetTrinketEffectNum: (trinketType: TrinketType) => int;
    readonly HasCollectibleEffect: (
      collectibleType: CollectibleType,
    ) => boolean;
    readonly HasNullEffect: (nullItemID: NullItemID) => boolean;
    readonly HasTrinketEffect: (trinketType: TrinketType) => boolean;

    /**
     * @param collectibleType
     * @param count Use -1 to remove all instances. Default is 1.
     */
    readonly RemoveCollectibleEffect: (
      collectibleType: CollectibleType,
      count?: int,
    ) => void;

    /**
     * @param nullItemID
     * @param count Use -1 to remove all instances. Default is 1.
     */
    readonly RemoveNullEffect: (nullItemID: NullItemID, count?: int) => void;

    /**
     * @param trinketType
     * @param count Use -1 to remove all instances. Default is 1.
     */
    readonly RemoveTrinketEffect: (
      trinketType: TrinketType,
      count?: int,
    ) => void;
  }
}
