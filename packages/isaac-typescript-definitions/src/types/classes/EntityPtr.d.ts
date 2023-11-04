declare function EntityPtr(this: void, entity: Entity): EntityPtr;

declare interface EntityPtr extends IsaacAPIClass {
  SetReference: (ref: Entity) => void;

  readonly Ref?: Entity;
}
