export interface PickupDescription {
  variant: PickupVariant | int;
  subType: int;
  position: Vector;
  velocity: Vector;
  price: int;
  initSeed: int;
}
