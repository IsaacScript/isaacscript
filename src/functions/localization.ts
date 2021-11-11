/**
 * Listed in the order that they appear in the "stringtable.sta" file. (This is different from the
 * order that the languages cycle through in the in-game options menu.)
 */
export enum Language {
  ENGLISH,
  JAPANESE,
  KOREAN,
  CHINESE_SIMPLE,
  RUSSIAN,
  GERMAN,
  SPANISH,
}

const DEFAULT_LANGUAGE = Language.ENGLISH;
const CURSE_TO_CHECK_FOR = LevelCurse.CURSE_OF_DARKNESS;

const CURSE_NAME_TO_LANGUAGE_MAP = new Map([
  ["Curse of Darkness!", Language.ENGLISH],
  ["闇の呪い", Language.JAPANESE],
  ["어둠의 저주", Language.KOREAN],
  ["黑暗诅咒！", Language.CHINESE_SIMPLE],
  ["Проклятие Тьмы!", Language.RUSSIAN],
  ["Fluch der Dunkelheit!", Language.GERMAN],
  ["Maldición de oscuridad", Language.SPANISH],
]);

type LanguageDescriptions = {
  [Value in Language]: [string, string];
};

/** Values are a tuple of language name and resource folder suffix. */
const LANGUAGE_DESCRIPTIONS: LanguageDescriptions = {
  [Language.ENGLISH]: ["English", ""],
  [Language.JAPANESE]: ["Japanese", ".jp"],
  [Language.KOREAN]: ["Korean", ".kr"],
  [Language.CHINESE_SIMPLE]: ["Chinese (Simple)", ".zh"],
  [Language.RUSSIAN]: ["Russian", ".ru"],
  [Language.GERMAN]: ["German", ".de"],
  [Language.SPANISH]: ["Spanish", ".es"],
};

/** Returns a 3-tuple of Language enum value, language name and resource folder suffix. */
export function getLanguage(): [Language, string, string] {
  const language = getCurrentLanguageFromCurse();
  const [languageName, folderSuffix] = LANGUAGE_DESCRIPTIONS[language];
  return [language, languageName, folderSuffix];
}

function getCurrentLanguageFromCurse() {
  const game = Game();
  const level = game.GetLevel();
  const curses = level.GetCurses();

  level.RemoveCurses(curses);
  level.AddCurse(CURSE_TO_CHECK_FOR, false);
  const localizedCurseName = level.GetCurseName();
  level.RemoveCurses(CURSE_TO_CHECK_FOR);
  level.AddCurse(curses, false);

  const language = CURSE_NAME_TO_LANGUAGE_MAP.get(localizedCurseName);
  return language === undefined ? DEFAULT_LANGUAGE : language;
}
