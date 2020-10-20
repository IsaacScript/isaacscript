do
    local js = require("js")

    local function pushToPrintStream(method, ...)
        js.global.printStream:push({
            method = method,
            data = { ____tstlArrayLength = select("#", ...), ... },
        })
    end

    console = {
        assert = function(_, ...) pushToPrintStream("assert", ...) end,
        clear = function(_, ...) pushToPrintStream("clear", ...) end,
        count = function(_, ...) pushToPrintStream("count", ...) end,
        debug = function(_, ...) pushToPrintStream("debug", ...) end,
        error = function(_, ...) pushToPrintStream("error", ...) end,
        info = function(_, ...) pushToPrintStream("info", ...) end,
        log = function(_, ...) pushToPrintStream("log", ...) end,
        table = function(_, ...) pushToPrintStream("table", ...) end,
        time = function(_, ...) pushToPrintStream("time", ...) end,
        timeEnd = function(_, ...) pushToPrintStream("timeEnd", ...) end,
        warn = function(_, ...) pushToPrintStream("warn", ...) end,
    }

    print = function(...)
        local elements = {}
        for i = 1, select("#", ...) do
            table.insert(elements, tostring(select(i, ...)))
        end
        pushToPrintStream("log", table.concat(elements, "\t"))
    end

    -- Don't try to resolve required modules
    package.path = ""
    package.jspath = ""
end
