declare interface EntityPtr extends IsaacAPIClass {
  readonly SetReference: (ref: Entity | undefined) => void;

  readonly Ref?: Entity;
}

declare function EntityPtr(this: void, entity: Entity | undefined): EntityPtr;
