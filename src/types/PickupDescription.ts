export interface PickupDescription {
  variant: PickupVariant | int;
  subType: int;
  position: Vector;
  velocity: Vector;
  price: int;
  initSeed: int;
}

export function getPickupDescription(pickup: EntityPickup): PickupDescription {
  return {
    variant: pickup.Variant,
    subType: pickup.SubType,
    position: pickup.Position,
    velocity: pickup.Velocity,
    price: pickup.Price,
    initSeed: pickup.InitSeed,
  };
}
