/** @noSelf */
declare namespace Input {
  function GetActionValue(buttonAction: ButtonAction, controllerID: int): float;
  function GetButtonValue(keyboard: Keyboard, controllerID: int): float;
  function GetMousePosition(gameCoords: boolean): Vector;

  function IsActionPressed(
    buttonAction: ButtonAction,
    controllerID: int,
  ): boolean;

  function IsActionTriggered(
    buttonAction: ButtonAction,
    controllerID: int,
  ): boolean;

  function IsButtonPressed(keyboard: Keyboard, controllerID: int): boolean;
  function IsButtonTriggered(keyboard: Keyboard, controllerID: int): boolean;
  function IsMouseBtnPressed(mouse: Mouse): boolean;
}
