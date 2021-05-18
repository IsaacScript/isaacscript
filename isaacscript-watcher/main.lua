-- Includes
local json = require("json")

-- Register the mod
local IsaacScriptWatcher = RegisterMod("IsaacScript Watcher", 1)

-- Constants
local MOD_NAME = "isaacscript-watcher"
local FRAMES_BEFORE_DISCONNECTED = 2 * 60 -- 2 seconds
local FRAMES_BEFORE_TEXT_FADE = 3 * 60 -- 3 seconds
local EMOJI_EYES_POS = Vector(10, 190)

-- Mod variables
local saveData = {} -- An array of message objects
local restartFrame = 0
local messageArray = {}
local frameOfLastMsg = 0
local frameOfLastSuccessfulLoad = 0
local game = Game()
local font = Font()
font:Load("font/pftempestasevencondensed.fnt")
local connected = false
local emojiEyesSprite = nil

-- On mod initialization, nuke the "save#.dat" folder to get rid of old messages that might be left
-- there from IsaacScript
IsaacScriptWatcher:SaveData("")

local function pushMessageArray(msg)
  frameOfLastMsg = Isaac.GetFrameCount()

  messageArray[#messageArray + 1] = msg
  if #messageArray > 10 then
    -- We only want to show 10 messages at a time
    -- Remove the first elemenent
    table.remove(messageArray, 1)
  end
end

-- ModCallbacks.MC_POST_RENDER (2)
function IsaacScriptWatcher:PostRender()
  -- Don't do anything while the gade is fading in to prevent crashes
  if game:GetFrameCount() < 1 then
    return
  end

  IsaacScriptWatcher:RenderSprite()
  IsaacScriptWatcher:RenderText()
  IsaacScriptWatcher:LoadSaveDat()
  IsaacScriptWatcher:CheckInput()
  IsaacScriptWatcher:CheckRestart()
end

function IsaacScriptWatcher:RenderSprite()
  -- Determine if IsaacScript is connected or not
  local frameCount = Isaac.GetFrameCount()
  connected = frameCount - frameOfLastSuccessfulLoad <= FRAMES_BEFORE_DISCONNECTED

  -- Set the sprite
  if connected then
    if emojiEyesSprite == nil then
      emojiEyesSprite = Sprite()
      emojiEyesSprite:Load("gfx/emoji-eyes.anm2", true)
      emojiEyesSprite:SetFrame("Default", 0)
    end
  else
    if emojiEyesSprite ~= nil then
      emojiEyesSprite = nil
    end
  end

  -- Render it
  if emojiEyesSprite ~= nil then
    emojiEyesSprite:RenderLayer(0, EMOJI_EYES_POS)
  end
end

function IsaacScriptWatcher:RenderText()
  if frameOfLastMsg == 0 then
    return
  end

  -- Local variables
  local x = 60
  local y = 90
  local scale = 1
  local lineHeight = font:GetLineHeight() * scale

  -- The text will slowly fade out
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

  local white = KColor(1, 1, 1, alpha)
  local red = KColor(1, 0, 0, alpha)
  local green = KColor(0, 1, 0, alpha)

  -- Go through each message
  for i, msg in ipairs(messageArray) do
    local color = white

    local hasSuccess = string.match(msg, "Successfully compiled")
    if hasSuccess ~= nil then
      color = green
    end

    local hasErrors = string.match(msg, "Found [0-9]+ errors.")
    if hasErrors ~= nil then
      color = red
    end

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

function IsaacScriptWatcher:LoadSaveDat()
  -- Local variables
  local isaacFrameCount = Isaac.GetFrameCount()

  -- Read the "save.dat" file every third second, since file reads are expensive
  if isaacFrameCount % 20 ~= 0 then
    return
  end

  -- Check to see if there a "save.dat" file for this save slot
  if not Isaac.HasModData(IsaacScriptWatcher) then
    IsaacScriptWatcher:ClearSaveDat()
    return
  end

  -- The server will write JSON data for us to the "save#.dat" file in the mod subdirectory
  if not pcall(IsaacScriptWatcher.Load) then
    -- Sometimes loading can fail if the file is currently being being written to,
    -- so give up for now and try again on the next interval
    Isaac.DebugString(
      MOD_NAME
      .. " - Failed to load the TypeScript Watcher \"save.dat\" on frame: "
      .. tostring(isaacFrameCount)
    )
    return
  end

  if #saveData > 0 then
    local saveDatContents = saveData
    IsaacScriptWatcher:ClearSaveDat()
    IsaacScriptWatcher:LoadSuccessful(saveDatContents)
  end
end

function IsaacScriptWatcher:LoadSuccessful(saveDatContents)
  frameOfLastSuccessfulLoad = Isaac.GetFrameCount()

  for _, entry in ipairs(saveDatContents) do
    -- Entry is e.g. { type: "command", data: "luamod revelations" }
    if entry.type == "command" then
      if entry.data == "restart" then
        -- If we restart on the first frame that a run is loading, then the game can crash
        restartFrame = Isaac.GetFrameCount() + 1
      else
        Isaac.DebugString(MOD_NAME .. " - Executing command: " .. entry.data)
        Isaac.ExecuteCommand(entry.data)
      end
    elseif entry.type == "msg" then
      Isaac.DebugString(MOD_NAME .. " - " .. entry.data)
      pushMessageArray(entry.data)
    end
  end
end

function IsaacScriptWatcher:ClearSaveDat()
  saveData = {}
  IsaacScriptWatcher:Save()
end

function IsaacScriptWatcher:Save()
  local saveDataJSON = json.encode(saveData)
  IsaacScriptWatcher:SaveData(saveDataJSON)
end

function IsaacScriptWatcher:Load()
  local saveDataJSON = Isaac.LoadModData(IsaacScriptWatcher)
  saveData = json.decode(saveDataJSON)
end

function IsaacScriptWatcher:CheckInput()
  -- Manually show the log when the user presses the "I" key on the keyboard
  if Input.IsButtonPressed(Keyboard.KEY_I, 0) then
    frameOfLastMsg = Isaac.GetFrameCount()
  end
end

function IsaacScriptWatcher:CheckRestart()
  if restartFrame == 0 or restartFrame < Isaac.GetFrameCount() then
    return
  end
  restartFrame = 0

  Isaac.DebugString(MOD_NAME .. " - Restarting the run.")
  Isaac.ExecuteCommand("restart")
end

IsaacScriptWatcher:AddCallback(ModCallbacks.MC_POST_RENDER, IsaacScriptWatcher.PostRender)
