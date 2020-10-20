/** @noSelf */
declare function EntityPtr(entity: Entity): EntityPtr;

declare class EntityPtr {
  SetReference(ref: Entity): void;

  readonly Ref: Readonly<Entity>;
}
