export {};

declare global {
  /** @noSelf */
  namespace Isaac {
    function AddCallback(
      mod: Mod,
      callbackID: ModCallbacks,
      callbackFn: () => void,
      entityID?: int,
    ): void;
    function AddPillEffectToPool(pillEffect: PillEffect | int): PillColor | int;
    function ConsoleOutput(text: string): void;
    function CountBosses(): int;
    function CountEnemies(): int;
    /**
     * This function is currently bugged (i.e. in Repentance v820) and should not be used.
     * In the meantime, use "FindByType()" as a workaround.
     * @param spawner
     * @param entityType Default is EntityType.ENTITY_NULL.
     * @param variant Specifying -1 will return all variants. Default is -1.
     * @param subType Specifying -1 will return all subtypes. Default is -1.
     */
    function CountEntities(
      spawner: never, // Entity | null,
      entityType?: EntityType | int,
      variant?: EntityVariantForAC,
      subType?: int,
    ): int;
    function DebugString(msg: string): Mod;
    function ExecuteCommand(command: string): string;
    function Explode(
      position: Vector,
      source: Entity | null,
      damage: float,
    ): void;
    /**
     * @param entityType
     * @param variant Default is -1.
     * @param subType Default is -1.
     * @param cache Default is false.
     * @param ignoreFriendly Default is false.
     */
    function FindByType(
      entityType: EntityType | int,
      variant?: EntityVariantForAC,
      subType?: int,
      cache?: boolean,
      ignoreFriendly?: boolean,
    ): Entity[];
    /**
     * @param position
     * @param radius
     * @param partitions Default is 0xFFFFFFFF.
     */
    function FindInRadius(
      position: Vector,
      radius: float,
      partitions?: int,
    ): Entity[];
    function GetCardIdByName(cardName: string): Card | int;
    function GetChallenge(): Challenge | int;
    /** Returns -1 if the challenge does not exist. */
    function GetChallengeIdByName(challengeName: string): Challenge | int;
    function GetCostumeIdByPath(path: string): int;
    function GetCurseIdByName(curseName: string): LevelCurse | int;
    function GetEntityTypeByName(entityName: string): EntityType | int;
    function GetEntityVariantByName(entityName: string): EntityVariantForAC;
    function GetFrameCount(): int;
    function GetFreeNearPosition(position: Vector, step: float): Vector;
    function GetItemConfig(): ItemConfig;
    function GetItemIdByName(entityName: string): CollectibleType | int;
    function GetMusicIdByName(musicName: string): Music | int;
    function GetPillEffectByName(pillName: string): PillEffect | int;
    function GetPlayer(playerID?: int): EntityPlayer | null;
    /**
     * @param playerName
     * @param tainted Default is false.
     */
    function GetPlayerTypeByName(
      playerName: string,
      tainted?: boolean,
    ): PlayerVariant | int;
    function GetRandomPosition(): Vector;
    function GetRoomEntities(): Entity[];
    function GetSoundIdByName(soundName: string): SoundEffect | int;
    function GetTextWidth(str: string): int;
    /** Returns the current time in milliseconds since the program was launched. (This is simply a mapping to "os.clock()".) */
    function GetTime(): int;
    function GetTrinketIdByName(trinketName: string): TrinketType | int;
    function GridSpawn(
      gridEntityType: GridEntityType | int,
      variant: GridEntityVariantForAC,
      position: Vector,
      forced: boolean,
    ): GridEntity;
    function HasModData(mod: Mod): boolean;
    function LoadModData(mod: Mod): string;
    // function RegisterMod(mod: Mod, modName: string, APIVersion: int): void; // Should use the global RegisterMod() instead
    function RemoveCallback(
      mod: Mod,
      callbackID: ModCallbacks,
      callbackFn: () => void,
    ): void;
    function RemoveModData(mod: Mod): void;
    function RenderScaledText(
      str: string,
      x: float,
      y: float,
      scaleX: float,
      scaleY: float,
      r: float,
      g: float,
      b: float,
      a: float,
    ): void;
    function RenderText(
      str: string,
      x: float,
      y: float,
      r: float,
      g: float,
      b: float,
      a: float,
    ): void;
    function SaveModData(mod: Mod, data: string): void;
    function ScreenToWorld(position: Vector): Vector;
    function ScreenToWorldDistance(position: Vector): Vector;
    function Spawn(
      entityType: EntityType | int,
      entityVariant: EntityVariantForAC,
      entitySubType: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity | null,
    ): Entity;
    function WorldToRenderPosition(position: Vector): Vector;
    function WorldToScreen(position: Vector): Vector;
    function WorldToScreenDistance(position: Vector): Vector;
  }
}
