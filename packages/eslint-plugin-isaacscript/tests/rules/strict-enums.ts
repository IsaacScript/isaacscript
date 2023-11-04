/** A number enum. */
export const fruitEnumDefinition = `
enum Fruit {
  Apple,
  Banana,
  Pear,
}
`;

/** A different number enum. */
export const fruit2EnumDefinition = `
enum Fruit2 {
  Apple2,
  Banana2,
  Pear2,
}
`;

/**
 * A string enum.
 *
 * String enums are almost exclusively used for comparison tests, since the TypeScript compiler does
 * a good job of ensuring safety for string enum variable assignment and usage in functions.
 */
export const vegetableEnumDefinition = `
 enum Vegetable {
   Lettuce = 'lettuce',
   Carrot = 'carrot',
   Celery = 'celery',
 }
 `;
