import os
import pathlib
import re
import sys

# We parse the "enums.lua" file directly because the documentation has bugs
def main():
    # Get the path of the current script's directory
    # https://stackoverflow.com/questions/5137497/find-current-directory-and-files-directory
    dir_path = os.path.dirname(os.path.realpath(__file__))

    enum_lua_path = os.path.join(dir_path, "enums.lua")
    with open(enum_lua_path, "r") as enum_lua_io:
        enum_lua = enum_lua_io.read()

    typescript = ""
    for line in enum_lua.split("\n"):
        match1 = re.match(r"(\w+) = {", line)
        if match1:
            # New enum definition
            if typescript != "":
                typescript += "}\n\n"
            typescript += "declare enum " + match1[1] + " {\n"
        else:
            line = line.split("--")[0]  # Remove any Lua comments
            match2 = re.match(r"\s*(\w+) = (.+)", line)
            if match2:
                entry_name = match2[1].strip()
                entry_definition = match2[2].strip().strip(",").strip()
                match3 = re.match(r"(\d+)<<(\d+)", entry_definition)
                if match3:
                    entry_definition = match3[1] + " << " + match3[2]
                typescript += "  " + entry_name + " = " + entry_definition + ",\n"

    typescript += "}\n"

    enums_d_path = os.path.join(dir_path, "..", "typings", "enums.d.ts")
    # pathlib.Path(enums_d_path).touch()  # Create it if it does not already exist
    with open(enums_d_path, "w") as f:
        f.write(typescript)
    print("Success.")


if __name__ == "__main__":
    main()
