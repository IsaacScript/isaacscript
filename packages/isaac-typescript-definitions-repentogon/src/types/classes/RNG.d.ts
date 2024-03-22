declare interface RNG extends IsaacAPIClass {
  /**
   * Returns a random float between 0 and 1. It is inclusive on the lower end and exclusive on the
   * higher end.
   *
   * This does not call the `RNG.Next` method before retrieving the random number. If this is not
   * desired, use the `RNG.RandomFloat` method instead.
   */
  PhantomFloat: () => float;

  /**
   * Returns a random integer between 0 and max. It is inclusive on the lower end and exclusive on
   * the higher end.
   *
   * This does not call the `RNG.Next` method before retrieving the random number. If this is not
   * desired, use the `RNG.RandomInt` method instead.
   */
  PhantomInt: (max: int) => int;

  /**
   * Returns a random vector with a length of 1.
   *
   * This does not call the `RNG.Next` method before retrieving the random vector. If this is not
   * desired, use the `RNG.RandomVector` method instead.
   */
  PhantomVector: () => Vector;

  /**
   * Returns a random vector with a length of 1.
   *
   * Note that this will automatically call the `RNG.Next` method before retrieving the random
   * number. Since this mutates the RNG object, you should use this method with care. If this
   * behavior is not desired, use the `RNG.PhantomVector` method instead.
   */
  RandomFloat: () => float;
}
