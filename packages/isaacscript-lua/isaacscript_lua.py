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
LIBRARY_NAMES = ["isaacscript-common"]


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
    check_namespace_directory()


def check_namespace_directory():
    namespace_directory_path = os.path.join(DIR, PROJECT_NAME)
    if not os.path.isdir(namespace_directory_path):
        printf(
            f"Failed to locate your namespaced directory for your Lua source files at: {namespace_directory_path}"
        )
        printf(
            "This directory is mandatory to avoid namespacing conflicts with other mods in the Lua ecosystem. See the docs for more information: https://wofsauge.github.io/IsaacDocs/rep/tutorials/Using-Additional-Lua-Files.html"
        )
        error(
            "If you don't have your Lua code in a namespaced directory already, this is probably a bug in your mod. Create the aforementioned directory and then re-run the installer."
        )

    lib_directory_path = os.path.join(namespace_directory_path, "lib")
    if not os.path.isdir(lib_directory_path):
        os.mkdir(lib_directory_path)

    for library_name in LIBRARY_NAMES:
        library_file_name = library_name + ".lua"

        url = get_url_for_library(library_name)
        printf(f'Getting "{library_name}" from: {url}')
        destination_path = os.path.join(lib_directory_path, library_file_name)
        urllib.request.urlretrieve(url, destination_path)
        printf(f"Installed: {destination_path}")


def command_update():
    for library_name in LIBRARY_NAMES:
        library_file_name = library_name + ".lua"

        foundAtLeastOne = False
        for file_path in pathlib.Path(DIR).rglob(library_file_name):
            foundAtLeastOne = True
            check_if_library_needs_update(file_path)

        if not foundAtLeastOne:
            printf(f'Did not find any files called "{library_file_name}". Skipping.')


def check_if_library_needs_update(old_file_path: pathlib.Path):
    library_name = old_file_path.stem

    with open(old_file_path, encoding="utf-8") as file_handle:
        old_file_contents = file_handle.read()

    current_version = get_version_from_lua_contents(
        library_name, old_file_contents, old_file_path
    )

    url = get_url_for_library(library_name)
    printf(f'Checking for the latest version of "{library_name}" from: {url}')
    with urllib.request.urlopen(url) as response:
        with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
            shutil.copyfileobj(response, tmp_file)

    with open(tmp_file.name) as file_handle:
        new_file_contents = file_handle.read()

    latest_version = get_version_from_lua_contents(library_name, new_file_contents, url)

    if current_version == latest_version:
        printf(f"Version {current_version} is the latest version for: {library_name}")
        os.remove(tmp_file.name)
        return

    printf(f"Old version detected for: {library_name}")
    printf(f"Upgrading from {current_version} --> {latest_version}")
    shutil.move(tmp_file.name, old_file_path)
    printf("Complete.")


def get_version_from_lua_contents(
    library_name: str, file_contents: str, file_path: str
):
    match = re.search(
        r"^" + library_name + r" (\d+\.\d+\.\d+)$", file_contents, re.MULTILINE
    )
    if not match:
        error(f'Failed to parse the version from the "{file_path}" file.')

    return match.group(1)


def get_url_for_library(library_name):
    return f"https://unpkg.com/{library_name}@latest/dist/{library_name}.lua"


def error(msg: str):
    printf("Error:", msg)
    sys.exit(1)


def printf(*args):
    print(*args, flush=True)


if __name__ == "__main__":
    main()
