// The Binding of Isaac: Rebirth Lua API expects certain values as either integers or floats

// TypeScript does not support integers
// https://spin.atomicobject.com/2018/11/05/using-an-int-type-in-typescript/
// To avoid verbose casting everywhere, just make it an alias for number
type int = number; // eslint-disable-line @typescript-eslint/naming-convention

// Float is just an alias for number
type float = number; // eslint-disable-line @typescript-eslint/naming-convention
