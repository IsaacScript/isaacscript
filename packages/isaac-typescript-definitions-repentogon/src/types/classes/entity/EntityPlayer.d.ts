import type { CollectibleType, TrinketType } from "isaac-typescript-definitions";
import type { WeaponSlot } from "../../../enums/WeaponSlot";

declare global {
    interface EntityPlayer extends Entity {
        SetWeapon: (weapon: Weapon, slot: WeaponSlot) => void;
        
        /** Shoots a blue flame from the Candle collectible. */
        ShootBlueCandle: (direction: Vector) => void;

        /**
         * Randomizes the player's current costumes.
         * 
         * @param seed Optional. Default is a call to `Random()`.
         */
        ShuffleCostumes: (seed?: Seed) => void;

        /**
         * Spawns an Aquarius creep effect.
         *
         * @param tearParams Optional. Determines the `TearParams` the creep inherits from. Passing
         *                   undefined will have the creep inherit the player's current tear params
         *                   instead. Default is undefined.
         */
        SpawnAquariusCreep: (tearParams: TearParams) => EntityEffect;

        /**
         * Removes half a heart and spawns a Blood Clot based on the type of heart removed.
         *
         * @param pos
         * @param allowOnDeath Optional. If true, the player can use the Sumptorium with half a
         *                     heart or less, killing them as a result. Otherwise, no clots will
         *                     spawn if the player has half a heart or less. Default is false.
         */
        SpawnClot: (pos: Vector, allowOnDeath?: boolean) => void;
        

        /** Spawns a ring of tears that orbit around the player akin to the Saturnus collectible. */
        SpawnSaturnusTears: () => void;

        /**
         * If the player is The Forgotten/The Soul, the two will swap forms. Otherwise, this method
         * does nothing.
         *
         * @param force Optional. If true, the two will swap even if the sub-player doesn't have any
         *              health or while a room/stage transition is active. Default is false.
         * @param noEffects Optional. If true, the dust and fade effect will not play. Default is
         *                  false.
         */
        SwapForgottenForm: (force?: boolean, noEffects?: boolean) => void;

        SyncConsumableCounts: (player: EntityPlayer, collectibleFlags: int) => void;

        /**
         * Teleports the player.
         *
         * @param position
         * @param doEffects Optional. Determines whether the teleport animation and sound plays.
         *                  Default is true.
         * @param teleportTwins Optional. Determines whether twin players (Esau, Tainted Lazarus
         *                      with Birthright, etc) are teleported alongside the player. Default
         *                      is false.
         */
        Teleport: (position: Vector, doEffects?: boolean, teleportTwins?: boolean) => void;

        /** Triggers the room clear events. */
        TriggerRoomClear: () => void;

        /** Attempts to add the specified pickup to the player's Bag of Crafting. */
        TryAddToBagOfCrafting: (pickup: EntityPickup) => void;
        
        /**
         * Attempts to decrease the uses left for the Glowing Hourglass collectible, if the player
         * has it.
         *
         * @param uses This parameter is currently bugged as one use is always decreased no matter
         *             what.
         * @param forceHourglass Optional. If true, all charges are instantly removed and the
         *                       Glowing Hourglass is turned into its regular form. Default is
         *                       false.
         */
        TryDecreaseGlowingHourglassUses: (uses: int, forceHourglass?: boolean) => void;

        /**
         * Adds a heart container to the player if there are none to prevent death, depending on the
         * player's `HealthType`.
         *
         * Returns whether the death was prevented successfully.
         */
        TryPreventDeath: () => boolean;

        /** Attempts to remove a smelted trinket from the player. */
        TryRemoveSmeltedTrinket: (trinket: TrinketType) => void;

        UpdateIsaacPregnancy: (updateCambion: boolean) => void;

        /** Returns whether the player has consumed the specified collectible with Void. */
        VoidHasCollectible: (collectible: CollectibleType) => boolean;
    }
}