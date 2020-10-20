declare namespace Input {
  function IsButtonTriggered(button: Keyboard, controllerID: int): boolean;
  function IsButtonPressed(button: Keyboard, controllerID: int): boolean;
  function GetButtonValue(button: Keyboard, controllerID: int): float;
  function IsActionTriggered(action: ButtonAction, controllerID: int): boolean;
  function IsActionPressed(action: ButtonAction, controllerID: int): boolean;
  function GetActionValue(action: ButtonAction, controllerID: int): float;
  function IsMouseBtnPressed(button: Mouse): boolean;
  function GetMousePosition(gameCoords: boolean): Vector;
}
