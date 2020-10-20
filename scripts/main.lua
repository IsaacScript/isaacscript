function RegisterMod(modname, apiversion)
  local mod = {
    Name = modname,
    AddCallback = function(self, callbackId, fn, entityId)
      if entityId == nil then entityId = -1; end

      Isaac.AddCallback(self, callbackId, fn, entityId)
    end,
	RemoveCallback = function(self, callbackId, fn)
	  Isaac.RemoveCallback(self, callbackId, fn)
	end,
    SaveData = function(self, data)
      Isaac.SaveModData(self, data)
    end,
    LoadData = function(self)
      return Isaac.LoadModData(self)
    end,
    HasData = function(self)
      return Isaac.HasModData(self)
    end,
    RemoveData = function(self)
      Isaac.RemoveModData(self)
    end
  }
  Isaac.RegisterMod(mod, modname, apiversion)
  return mod
end

function StartDebug()
  local ok, m = pcall(require, 'mobdebug')
  if ok and m then
    m.start()
  else
    Isaac.DebugString("Failed to start debugging.")
    -- m is now the error
    -- Isaac.DebugString(m)
  end
end
