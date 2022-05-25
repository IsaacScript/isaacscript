/**
 * Matches the ItemConfig.TAG_ members of the ItemConfig class. In IsaacScript, we re-implement this
 * as an enum instead, since it is cleaner.
 */
declare const ItemConfigTagInternal: {
    /**
     * Dead things (for the Parasite unlock).
     *
     * Equal to "dead" in "items_metadata.xml".
     *
     * 1 << 0
     */
    readonly DEAD: number;
    /**
     * Syringes (for Little Baggy and the Spun transformation).
     *
     * Equal to "syringe" in "items_metadata.xml".
     *
     * 1 << 1
     */
    readonly SYRINGE: number;
    /**
     * Mom's things (for Mom's Contact and the Yes Mother transformation).
     *
     * Equal to "mom" in "items_metadata.xml".
     *
     * 1 << 2
     */
    readonly MOM: number;
    /**
     * Technology items (for the Technology Zero unlock).
     *
     * Equal to "tech" in "items_metadata.xml".
     *
     * 1 << 3
     */
    readonly TECH: number;
    /**
     * Battery items (for the Jumper Cables unlock).
     *
     * Equal to "battery" in "items_metadata.xml".
     *
     * 1 << 4
     */
    readonly BATTERY: number;
    /**
     * Guppy items (Guppy transformation).
     *
     * Equal to "guppy" in "items_metadata.xml".
     *
     * 1 << 5
     */
    readonly GUPPY: number;
    /**
     * Fly items (Beelzebub transformation).
     *
     * Equal to "fly" in "items_metadata.xml".
     *
     * 1 << 6
     */
    readonly FLY: number;
    /**
     * Bob items (Bob transformation).
     *
     * Equal to "bob" in "items_metadata.xml".
     *
     * 1 << 7
     */
    readonly BOB: number;
    /**
     * Mushroom items (Fun Guy transformation).
     *
     * Equal to "mushroom" in "items_metadata.xml".
     *
     * 1 << 8
     */
    readonly MUSHROOM: number;
    /**
     * Baby items (Conjoined transformation).
     *
     * Equal to "mushroom" in "items_metadata.xml".
     *
     * 1 << 9
     */
    readonly BABY: number;
    /**
     * Angel items (Seraphim transformation).
     *
     * Equal to "angel" in "items_metadata.xml".
     *
     * 1 << 10
     */
    readonly ANGEL: number;
    /**
     * Devil items (Leviathan transformation).
     *
     * Equal to "devil" in "items_metadata.xml".
     *
     * 1 << 11
     */
    readonly DEVIL: number;
    /**
     * Poop items (Oh Shit transformation).
     *
     * Equal to "poop" in "items_metadata.xml".
     *
     * 1 << 12
     */
    readonly POOP: number;
    /**
     * Book items (Book Worm transformation).
     *
     * Equal to "book" in "items_metadata.xml".
     *
     * 1 << 13
     */
    readonly BOOK: number;
    /**
     * Spider items (Spider Baby transformation).
     *
     * Equal to "spider" in "items_metadata.xml".
     *
     * 1 << 14
     */
    readonly SPIDER: number;
    /**
     * Quest item (cannot be rerolled or randomly obtained).
     *
     * Equal to "quest" in "items_metadata.xml".
     *
     * 1 << 15
     */
    readonly QUEST: number;
    /**
     * Can be spawned by Monster Manual.
     *
     * Equal to "monstermanual" in "items_metadata.xml".
     *
     * 1 << 16
     */
    readonly MONSTER_MANUAL: number;
    /**
     * Cannot appear in Greed Mode.
     *
     * Equal to "nogreed" in "items_metadata.xml".
     *
     * 1 << 17
     */
    readonly NO_GREED: number;
    /**
     * Food item (for Binge Eater).
     *
     * Equal to "food" in "items_metadata.xml".
     *
     * 1 << 18
     */
    readonly FOOD: number;
    /**
     * Tears up item (for Lachryphagy unlock detection).
     *
     * Equal to "tearsup" in "items_metadata.xml".
     *
     * 1 << 19
     */
    readonly TEARS_UP: number;
    /**
     * Whitelisted item for Tainted Lost.
     *
     * Equal to "offensive" in "items_metadata.xml".
     *
     * 1 << 20
     */
    readonly OFFENSIVE: number;
    /**
     * Blacklisted item for Keeper & Tainted Keeper.
     *
     * Equal to "nokeeper" in "items_metadata.xml".
     *
     * 1 << 21
     */
    readonly NO_KEEPER: number;
    /**
     * Blacklisted item for The Lost's Birthright.
     *
     * Equal to "nolostbr" in "items_metadata.xml".
     *
     * 1 << 22
     */
    readonly NO_LOST_BR: number;
    /**
     * Star themed items (for the Planetarium unlock).
     *
     * Equal to "stars" in "items_metadata.xml".
     *
     * 1 << 23
     */
    readonly STARS: number;
    /**
     * Summonable items (for Tainted Bethany).
     *
     * Equal to "summonable" in "items_metadata.xml".
     *
     * 1 << 24
     */
    readonly SUMMONABLE: number;
    /**
     * Can't be obtained in Cantripped challenge.
     *
     * Equal to "nocantrip" in "items_metadata.xml".
     *
     * 1 << 25
     */
    readonly NO_CANTRIP: number;
    /**
     * Active items that have wisps attached to them (automatically set).
     *
     * Not equal to any particular tag in "items_metadata.xml". Instead, this is set for all of the
     * items in the "wisps.xml" file.
     *
     * 1 << 26
     */
    readonly WISP: number;
    /**
     * Unique familiars that cannot be duplicated.
     *
     * Equal to "uniquefamiliar" in "items_metadata.xml".
     *
     * 1 << 27
     */
    readonly UNIQUE_FAMILIAR: number;
    /**
     * Items that should not be obtainable in challenges.
     *
     * Equal to "nochallenge" in "items_metadata.xml".
     *
     * 1 << 28
     */
    readonly NO_CHALLENGE: number;
    /**
     * Items that should not be obtainable in daily runs.
     *
     * Equal to "nodaily" in "items_metadata.xml".
     *
     * 1 << 29
     */
    readonly NO_DAILY: number;
    /**
     * Items that should be shared between Tainted Lazarus' forms.
     *
     * This is different from `LAZ_SHARED_GLOBAL` in that it does apply stat changes from the item for
     * both characters.
     *
     * Equal to "lazarusshared" in "items_metadata.xml".
     *
     * 1 << 30
     */
    readonly LAZ_SHARED: number;
    /**
     * Items that should be shared between Tainted Lazarus' forms but only through global checks (such
     * as `PlayerManager::HasCollectible`).
     *
     * This is different from `LAZ_SHARED` in that it does not apply stat changes from the item for
     * both characters.
     *
     * Equal to "lazarussharedglobal" in "items_metadata.xml".
     *
     * 1 << 31
     */
    readonly LAZ_SHARED_GLOBAL: number;
    /**
     * Items that will not be a random starting item for Eden and Tainted Eden.
     *
     * Equal to "noeden" in "items_metadata.xml".
     *
     * 1 << 32
     */
    readonly NO_EDEN: number;
};
declare type ItemConfigTagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __itemConfigTagBrand: void;
};
declare type ItemConfigTagType = {
    [K in keyof typeof ItemConfigTagInternal]: ItemConfigTagValue;
};
export declare const ItemConfigTag: ItemConfigTagType;
export declare type ItemConfigTag = ItemConfigTagType[keyof ItemConfigTagType];
export declare const ItemConfigTagZero: BitFlags<ItemConfigTagValue>;
export {};
