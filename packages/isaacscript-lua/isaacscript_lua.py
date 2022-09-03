#!/usr/bin/env python

import argparse
import os
import pathlib
import re
import shutil
import sys
import tempfile
import urllib.request

import pkg_resources

if sys.version_info < (3, 0):
    printf("Error: This script requires Python 3.")
    sys.exit(1)

# Constants
VERSION = pkg_resources.get_distribution("isaacscript_lua").version
DIR = os.getcwd()
PROJECT_NAME = os.path.basename(DIR)
FILE_NAMES_TO_CHECK = ["main.lua", "metadata.xml"]
LIBRARY_NAMES = ["isaac-typescript-definitions", "isaacscript-common"]


def main():
    args = parse_command_line_arguments()

    check_lua_project()

    match args.command:
        case "install":
            command_install()

        case "update":
            command_update()

        case _:
            error(
                f'The command of "{args.command}" is invalid. Valid commands are: install, update'
            )


def parse_command_line_arguments():
    parser = argparse.ArgumentParser(
        description="Manage the IsaacScript libraries in a Lua project."
    )

    parser.add_argument(
        "command",
        type=str,
        help="the command to run (e.g. install, update)",
    )

    parser.add_argument(
        "-v",
        "--version",
        action="version",
        help="display the version",
        version=VERSION,
    )

    return parser.parse_args()


def check_lua_project():
    for file_name in FILE_NAMES_TO_CHECK:
        file_path = os.path.join(DIR, file_name)
        if not os.path.exists(file_path):
            error(
                f'You must run this script in the working directory corresponding to an Isaac mod written in Lua with a "{file_name}" file in it.'
            )


def command_install():
    pass


def command_update():
    for library_name in LIBRARY_NAMES:
        library_file_name = library_name + ".lua"

        foundAtLeastOne = False
        for file_path in pathlib.Path(DIR).rglob(library_file_name):
            foundAtLeastOne = True
            check_if_library_needs_update(file_path)

        if not foundAtLeastOne:
            printf(f'Did not find any files called "{library_file_name}". Skipping.')


def check_if_library_needs_update(file_path: pathlib.Path):
    library_name = file_path.stem

    with open(file_path, encoding="utf-8") as file_handle:
        file_contents = file_handle.read()

    current_version = get_version_from_lua_contents(
        library_name, file_contents, file_path
    )

    url = f"https://unpkg.com/{library_name}@latest/dist/{library_name}.lua"
    with urllib.request.urlopen(url) as response:
        with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
            shutil.copyfileobj(response, tmp_file)

    with open(tmp_file.name) as file_handle:
        file_contents = file_handle.read()

    latest_version = get_version_from_lua_contents(library_name, file_contents, url)

    print("CURRENT:", current_version)
    print("LATEST:", latest_version)


def get_version_from_lua_contents(
    library_name: str, file_contents: str, file_path: str
):
    match = re.search(
        r"^" + library_name + r" (\d+\.\d+\.\d+)$", file_contents, re.MULTILINE
    )
    if not match:
        error(f'Failed to parse the version from the "{file_path}" file.')

    return match.group(1)


def error(msg: str):
    printf("Error:", msg)
    sys.exit(1)


def printf(*args):
    print(*args, flush=True)


if __name__ == "__main__":
    main()
