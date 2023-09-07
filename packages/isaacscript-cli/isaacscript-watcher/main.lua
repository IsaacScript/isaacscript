-- Includes
local json = require("json")

-- Constants
local MOD_NAME = "isaacscript-watcher"
local RESTART_GAME_ON_RECOMPILATION = true
local FRAMES_BEFORE_DISCONNECTED = 2 * 60 -- 2 seconds
local FRAMES_BEFORE_TEXT_FADE = 2 * 60 -- 2 seconds
local SPRITE_BOTTOM_RIGHT_OFFSET = Vector(-35, -60)
-- (enough so that it does not overlap with a pocket active + 2 pocket items)

-- Mod variables
local saveData = {} -- An array of message objects.
local restartFrame = 0
local messageArray = {}
local frameOfLastMsg = 0
local frameOfLastSuccessfulLoad = 0
local game = Game()
local font = Font()
font:Load("font/pftempestasevencondensed.fnt") -- A vanilla font good for this kind of text.
local connected = false
local sprite = nil

local mod = RegisterMod("IsaacScript Watcher", 1)

-- On mod initialization, nuke the "save#.dat" folder to get rid of old messages that might be left
-- there from IsaacScript.
mod:SaveData("")

local function pushMessageArray(msg)
  frameOfLastMsg = Isaac.GetFrameCount()

  messageArray[#messageArray + 1] = msg
  if #messageArray > 10 then
    -- We only want to show 10 messages at a time.
    table.remove(messageArray, 1)
  end
end

local function getScreenBottomRightPos()
  local screenWidth = Isaac.GetScreenWidth();
  local screenHeight = Isaac.GetScreenHeight();

  return Vector(screenWidth, screenHeight)
end

-- From: https://programming-idioms.org/idiom/96/check-string-prefix/1882/lua
local function startsWith(string, prefix)
  return string:find(prefix, 1, true) == 1
end

-- ModCallbacks.MC_POST_RENDER (2)
function mod:postRender()
  -- Don't do anything while fading in to a new run to prevent crashes.
  if game:GetFrameCount() < 1 then
    return
  end

  mod:renderSprite()
  mod:renderText()
  mod:loadSaveDat()
  mod:checkInput()
  mod:checkRestart()
end

function mod:renderSprite()
  -- Determine if IsaacScript is connected.
  local frameCount = Isaac.GetFrameCount()
  connected = frameCount - frameOfLastSuccessfulLoad <= FRAMES_BEFORE_DISCONNECTED

  -- Set the sprite
  if connected then
    if sprite == nil then
      sprite = Sprite()
      sprite:Load("gfx/logo.anm2", true)

      local lastMsg = messageArray[#messageArray]
      local compiling = string.match(lastMsg, "Compiling the mod for the first time...")
      local animation = "Default"
      if compiling ~= nil then
        animation = "Green"
      end
      sprite:Play(animation)
    end
  else
    if sprite ~= nil then
      sprite = nil
    end
  end

  -- Render it
  if sprite ~= nil then
    local bottomRightPos = getScreenBottomRightPos()
    local position = bottomRightPos + SPRITE_BOTTOM_RIGHT_OFFSET
    sprite:Render(position)
  end
end

function mod:renderText()
  -- Don't draw IsaacScript text when custom consoles are open.
  if AwaitingTextInput then
    return
  end

  if frameOfLastMsg == 0 then
    return
  end

  if game:IsPaused() then
    return
  end

  if ModConfigMenu ~= nil then
    if ModConfigMenu.IsVisible then
      return
    end
  end

  -- Local variables
  local x = 60
  local y = 90
  local scale = 1
  local lineHeight = font:GetLineHeight() * scale

  -- The text will slowly fade out.
  local elapsedFrames = Isaac.GetFrameCount() - frameOfLastMsg
  local alpha
  if elapsedFrames <= FRAMES_BEFORE_TEXT_FADE then
    alpha = 1
  else
    local fadeFrames = elapsedFrames - FRAMES_BEFORE_TEXT_FADE
    alpha = 1 - (0.02 * fadeFrames)
  end
  if alpha <= 0 then
    frameOfLastMsg = 0
    return
  end

  -- Go through each message.
  for i, msg in ipairs(messageArray) do
    local color = mod:getColorForMsg(msg, alpha)
    font:DrawStringScaledUTF8(
      msg,
      x,
      y + ((i - 1) * lineHeight),
      scale,
      scale,
      color,
      0,
      true
    )
  end
end

function mod:getColorForMsg(msg, alpha)
  local white = KColor(1, 1, 1, alpha)
  local red = KColor(1, 0, 0, alpha)
  local green = KColor(0, 1, 0, alpha)

  local hasSuccess = string.match(msg, "Compilation successful.")
  if hasSuccess ~= nil then
    return green
  end

  local hasErrors = string.match(msg, "Found [0-9]+ errors.")
  if hasErrors ~= nil then
    return red
  end

  return white
end

function mod:loadSaveDat()
  -- Local variables
  local isaacFrameCount = Isaac.GetFrameCount()

  -- Read the "save.dat" file every third second, since file reads are expensive.
  if isaacFrameCount % 20 ~= 0 then
    return
  end

  -- Check to see if there a "save.dat" file for this save slot.
  if not Isaac.HasModData(mod) then
    mod:clearSaveDat()
    return
  end

  -- The server will write JSON data for us to the "save#.dat" file in the mod subdirectory.
  if not pcall(mod.load) then
    -- Sometimes loading can fail if the file is currently being being written to, so give up for
    -- now and try again on the next interval.
    Isaac.DebugString(
      MOD_NAME
      .. " - Failed to load the TypeScript Watcher \"save.dat\" on frame: "
      .. tostring(isaacFrameCount)
    )
    return
  end

  if #saveData > 0 then
    local saveDatContents = saveData
    mod:clearSaveDat()
    mod:loadSuccessful(saveDatContents)
  end
end

function mod:loadSuccessful(saveDatContents)
  frameOfLastSuccessfulLoad = Isaac.GetFrameCount()

  for _, entry in ipairs(saveDatContents) do
    -- Entry is e.g. { type: "command", data: "luamod revelations" }
    if entry.type == "command" then
      if entry.data == "restart" then
        -- If we restart on the first frame that a run is loading, then the game can crash.
        restartFrame = Isaac.GetFrameCount() + 1
      else
        -- Reloading a mod with the extra console commands feature will fail to initialize the
        -- commands because the global variable already exists. Thus, we must manually clean up the
        -- global variable.
        if (
          startsWith(entry.data, "luamod ")
          and __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE ~= nil
        ) then
          __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE:removeAllConsoleCommands()
          __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE = nil
        end

        Isaac.DebugString(MOD_NAME .. " - Executing command: " .. entry.data)
        Isaac.ExecuteCommand(entry.data)
      end
    elseif entry.type == "msg" then
      Isaac.DebugString(MOD_NAME .. " - " .. entry.data)
      pushMessageArray(entry.data)

      if sprite ~= nil then
        local starting1 = string.match(entry.data, "TypeScript change detected")
        local starting2 = string.match(entry.data, "Compiling the mod for the first time...")
        local finished1 = string.match(entry.data, "Compilation successful.")
        -- Found 1 error. Watching for file changes.
        -- Found 2 errors. Watching for file changes.
        local finished2 = string.match(entry.data, "Watching for file changes.")
        if starting1 ~= nil or starting2 ~= nil then
          sprite:Play("Green")
        elseif finished1 ~= nil or finished2 ~= nil then
          sprite:Play("Default")
        end
      end
    end
  end
end

function mod:clearSaveDat()
  saveData = {}
  mod:save()
end

function mod:save()
  local saveDataJSON = json.encode(saveData)
  mod:SaveData(saveDataJSON)
end

function mod:load()
  -- Read the "save#.dat" file into a string.
  local saveDataJSON = Isaac.LoadModData(mod)

  -- Handle the case of a 0 byte file.
  if saveDataJSON == "" then
    saveDataJSON = "{}"
  end

  -- Convert a JSON string to a Lua table.
  saveData = json.decode(saveDataJSON)
end

function mod:checkInput()
  if game:IsPaused() then
    return
  end

  -- Ensure that this feature does not overlap with custom consoles by checking for the
  -- "AwaitingTextInput" global variable.
  if AwaitingTextInput then
    return
  end

  -- Manually show the log when the user presses the "I" key on the keyboard.
  if Input.IsButtonPressed(Keyboard.KEY_I, 0) then
    frameOfLastMsg = Isaac.GetFrameCount()
  end
end

function mod:checkRestart()
  if not RESTART_GAME_ON_RECOMPILATION then
    return
  end

  if restartFrame == 0 or restartFrame < Isaac.GetFrameCount() then
    return
  end
  restartFrame = 0

  Isaac.DebugString(MOD_NAME .. " - Restarting the run.")
  Isaac.ExecuteCommand("restart")
end

mod:AddCallback(ModCallbacks.MC_POST_RENDER, mod.postRender)

local initMessage = "IsaacScript Watcher initialized."
Isaac.DebugString(initMessage)
pushMessageArray(initMessage)
