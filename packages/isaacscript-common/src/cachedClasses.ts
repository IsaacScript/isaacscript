/**
 * A cached version of the class returned from the `Game()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const game = Game();

/**
 * A cached version of the class returned from the `Isaac.GetItemConfig()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const itemConfig = Isaac.GetItemConfig();

/**
 * A cached version of the class returned from the `MusicManager()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const musicManager = MusicManager();

/**
 * A cached version of the class returned from the `SFXManager()` constructor.
 *
 * Use this instead of invoking the constructor again for a miniscule performance increase.
 *
 * Caching the results of this constructor is safe, but caching other classes (like `Level` or
 * `Room`) is not safe and can lead to the game crashing in certain situations.
 */
export const sfxManager = SFXManager();

/**
 * An object containing all 7 vanilla fonts that are pre-loaded and ready to use.
 *
 * For more information on the vanilla fonts and to see what they look like, see:
 * https://wofsauge.github.io/IsaacDocs/rep/tutorials/Tutorial-Rendertext.html
 */
export const fonts = {
  droid: Font(),
  pfTempestaSevenCondensed: Font(),
  teamMeatFont10: Font(),
  teamMeatFont12: Font(),
  teamMeatFont16Bold: Font(),
  terminus: Font(),
  upheaval: Font(),
} as const;

fonts.droid.Load("font/droid.fnt");
fonts.pfTempestaSevenCondensed.Load("font/pftempestasevencondensed.fnt");
fonts.teamMeatFont10.Load("font/teammeatfont10.fnt");
fonts.teamMeatFont12.Load("font/teammeatfont12.fnt");
fonts.teamMeatFont16Bold.Load("font/teammeatfont16bold.fnt");
fonts.terminus.Load("font/terminus.fnt");
fonts.upheaval.Load("font/upheaval.fnt");
