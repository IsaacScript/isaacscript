declare interface EntityPtr extends IsaacAPIClass {
  SetReference: (ref: Entity | undefined) => void;

  readonly Ref?: Entity;
}

declare function EntityPtr(this: void, entity: Entity | undefined): EntityPtr;
