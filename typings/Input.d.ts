declare namespace Input {
  function IsButtonTriggered(button: int, controllerID: int): boolean;
  function IsButtonPressed(button: int, controllerID: int): boolean;
  function GetButtonValue(button: int, controllerID: int): float;
  function IsActionTriggered(action: int, controllerID: int): boolean;
  function IsActionPressed(action: int, controllerID: int): boolean;
  function GetActionValue(action: int, controllerID: int): float;
  function IsMouseBtnPressed(button: int): boolean;
  function GetMousePosition(gameCoords: boolean): Vector;
}
