-- Includes
local json = require("json")

-- Register the mod
local IsaacScriptWatcher = RegisterMod("IsaacScript Watcher", 1)

-- Mod variables
local saveData = {}
local loadOnNextFrame = false

-- ModCallbacks.MC_POST_RENDER (2)
function IsaacScriptWatcher:PostRender()
  -- Local variables
  local isaacFrameCount = Isaac.GetFrameCount()

  -- Read the "save.dat" file every third second, since file reads are expensive
  if isaacFrameCount % 20 ~= 0 and not loadOnNextFrame then
    return
  end

  -- Check to see if there a "save.dat" file for this save slot
  if not Isaac.HasModData(IsaacScriptWatcher) then
    IsaacScriptWatcher:Save()
    return
  end

  -- The server will write JSON data for us to the "save#.dat" file in the mod subdirectory
  if not pcall(IsaacScriptWatcher.Load) then
    -- Sometimes loading can fail if the file is currently being being written to,
    -- so give up for now and try again on the next frame
    Isaac.DebugString(
      "Failed to load the TypeScript Watcher \"save.dat\" on frame: " .. tostring(isaacFrameCount)
    )
    loadOnNextFrame = true
    return
  end

  IsaacScriptWatcher:LoadSuccessful()
end

function IsaacScriptWatcher:LoadSuccessful()
  for key, value in pairs(saveData) do
    if key == "command" then
      Isaac.ExecuteCommand(value)
    elseif key == "msg" then
      Isaac.ConsoleOutput(value)
    end
  end

  saveData = {}
  IsaacScriptWatcher:Save()
end

function IsaacScriptWatcher:Save()
  local saveDataJSON = json.encode(IsaacScriptWatcher.saveData)
  Isaac.SaveModData(IsaacScriptWatcher, saveDataJSON)
end

function IsaacScriptWatcher:Load()
  local saveDataJSON = Isaac.LoadModData(IsaacScriptWatcher)
  saveData = json.decode(saveDataJSON)
end

IsaacScriptWatcher:AddCallback(ModCallbacks.MC_POST_RENDER, IsaacScriptWatcher.PostRender)
