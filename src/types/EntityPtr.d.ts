declare function EntityPtr(this: void, entity: Entity): EntityPtr;

declare interface EntityPtr {
  SetReference(ref: Entity): void;

  readonly Ref?: Entity;
}
