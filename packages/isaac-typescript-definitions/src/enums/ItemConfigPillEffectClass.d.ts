/**
 * This corresponds to the number in the "class" tag in the "pocketitems.xml" file. The "+" or "-"
 * part of the tag is contained within the `ItemConfigPillEffectType` enum.
 */
export declare enum ItemConfigPillEffectClass {
    /** No valid pill will have this type. */
    NULL = -1,
    JOKE = 0,
    MINOR = 1,
    MEDIUM = 2,
    MAJOR = 3,
    /**
     * This is not a real `ItemConfigPillEffectClass`. Due to limitations in the API, getting the real
     * class of modded pill effects is not possible, so this value is returned instead.
     */
    MODDED = 4
}
