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
    AddCollectibleEffect: (
      collectibleType: TemporaryCollectibleType,
      addCostume?: boolean,
      count?: int,
    ) => void;

    /**
     * @param nullItemID
     * @param addCostume
     * @param count Default is 1.
     */
    AddNullEffect: (
      nullItemID: NullItemID,
      addCostume: boolean,
      count?: int,
    ) => void;

    /**
     * @param trinketType
     * @param addCostume
     * @param count Default is 1.
     */
    AddTrinketEffect: (
      trinketType: TrinketType,
      addCostume: boolean,
      count?: int,
    ) => void;

    ClearEffects: () => void;

    GetCollectibleEffect: (
      collectibleType: CollectibleType,
    ) => Readonly<TemporaryEffect> | undefined;

    GetCollectibleEffectNum: (collectibleType: CollectibleType) => int;
    GetEffectsList: () => Readonly<EffectList>;

    GetNullEffect: (
      nullItemID: NullItemID,
    ) => Readonly<TemporaryEffect> | undefined;

    GetNullEffectNum: (nullItemID: NullItemID) => int;

    GetTrinketEffect: (
      trinketType: TrinketType,
    ) => Readonly<TemporaryEffect> | undefined;

    GetTrinketEffectNum: (trinketType: TrinketType) => int;
    HasCollectibleEffect: (collectibleType: CollectibleType) => boolean;
    HasNullEffect: (nullItemID: NullItemID) => boolean;
    HasTrinketEffect: (trinketType: TrinketType) => boolean;

    /**
     * @param collectibleType
     * @param count Use -1 to remove all instances. Default is 1.
     */
    RemoveCollectibleEffect: (
      collectibleType: CollectibleType,
      count?: int,
    ) => void;

    /**
     * @param nullItemID
     * @param count Use -1 to remove all instances. Default is 1.
     */
    RemoveNullEffect: (nullItemID: NullItemID, count?: int) => void;

    /**
     * @param trinketType
     * @param count Use -1 to remove all instances. Default is 1.
     */
    RemoveTrinketEffect: (trinketType: TrinketType, count?: int) => void;
  }
}
