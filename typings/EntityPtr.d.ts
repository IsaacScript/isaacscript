declare function EntityPtr(this: void, entity: Entity): EntityPtr;

declare class EntityPtr {
  SetReference(ref: Entity): void;

  readonly Ref: Entity | null;
}
