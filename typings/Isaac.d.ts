import Mod from "./Mod";

declare global {
  /** @noSelf */
  namespace Isaac {
    function DebugString(msg: string): Mod;
    function GetPlayer(playerID: int): EntityPlayer;
    function GetFrameCount(): int;
    function Spawn(
      entityType: EntityType,
      entityVariant: EntityVariantForAC,
      entitySubType: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity | null,
    ): Entity;
    function GridSpawn(
      gridEntityType: GridEntityType,
      variant: GridEntityVariantForAC,
      position: Vector,
      forced: boolean,
    ): GridEntity;
    function RenderText(
      str: string,
      x: float,
      y: float,
      r: float,
      g: float,
      b: float,
      a: float,
    ): void;
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
    function GetTextWidth(str: string): int;
    function GetRandomPosition(): Vector;
    function GetFreeNearPosition(position: Vector, step: float): Vector;
    function Explode(position: Vector, source: Entity, damage: float): void;
    function AddPillEffectToPool(pillEffect: PillEffect): PillColor;
    function GetRoomEntities(): Entity[];
    function GetChallenge(): Challenge;
    function GetEntityVariantByName(entityName: string): EntityVariantForAC;
    function GetItemIdByName(entityName: string): CollectibleType;
    function GetPlayerTypeByName(playerName: string): PlayerVariant;
    function GetCardIdByName(cardName: string): Card;
    function GetPillEffectByName(pillName: string): PillEffect;
    function GetTrinketIdByName(trinketName: string): TrinketType;
    function GetChallengeIdByName(challengeName: string): Challenge;
    function GetCostumeIdByPath(path: string): int;
    function GetCurseIdByName(curseName: string): LevelCurse;
    function GetSoundIdByName(soundName: string): SoundEffect;
    function GetMusicIdByName(musicName: string): Music;
    function GetTime(): int;
    function ExecuteCommand(command: string): string;
    function ConsoleOutput(text: string): void;
    function GetItemConfig(): ItemConfig;
    function FindInRadius(
      position: Vector,
      radius: float,
      partitions: int,
    ): Entity[];
    function FindByType(
      entityType: EntityType,
      variant: EntityVariantForAC,
      subType: int,
      cache: boolean,
      ignoreFriendly: boolean,
    ): Entity[];
    function CountEntities(
      spawner: Entity | null,
      entityType: EntityType,
      variant: EntityVariantForAC,
      subType: int,
    ): int;
    function CountBosses(): int;
    function CountEnemies(): int;
    function RegisterMod(mod: Mod, modName: string, APIVersion: int): void;
    function AddCallback(
      mod: Mod,
      callbackID: ModCallbacks,
      callbackFn: () => void,
      entityID?: int,
    ): void;
    function RemoveCallback(
      mod: Mod,
      callbackID: ModCallbacks,
      callbackFn: () => void,
    ): void;
    function SaveModData(mod: Mod, data: string): void;
    function LoadModData(mod: Mod): string;
    function HasModData(mod: Mod): boolean;
    function RemoveModData(mod: Mod): void;
    function ScreenToWorld(position: Vector): Vector;
    function WorldToScreen(position: Vector): Vector;
    function WorldToScreenDistance(position: Vector): Vector;
    function WorldToRenderPosition(position: Vector): Vector;
    function ScreenToWorldDistance(position: Vector): Vector;
  }
}
