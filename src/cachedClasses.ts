/**
 * A cached version of the class returned from the `Game()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of a this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const game = Game();

/**
 * A cached version of the class returned from the `Isaac.GetItemConfig()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of a this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const itemConfig = Isaac.GetItemConfig();

/**
 * A cached version of the class returned from the `MusicManager()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of a this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const musicManager = MusicManager();

/**
 * A cached version of the class returned from the `SFXManager()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of a this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const sfxManager = SFXManager();
