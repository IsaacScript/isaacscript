/**
 * GridPath is not an enum, but rather a variable integer that represents the cost it would take for
 * an entity to pass through a grid entity. This enum lists some standard cost values.
 */
declare const enum GridPath {
  NONE = 0,
  FIREPLACE = 950,
  ROCK = 1000,
  PIT = 3000,
}
