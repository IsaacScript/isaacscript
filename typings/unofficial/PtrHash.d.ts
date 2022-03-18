/** PtrHash is an integer between 0 and 2^32. It is branded for extra type safety. */
declare type PtrHash = number & { __ptrHashBrand: unknown };
