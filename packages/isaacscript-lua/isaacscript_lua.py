#!/usr/bin/env python

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import pkg_resources

if sys.version_info < (3, 0):
    printf("Error: This script requires Python 3.")
    sys.exit(1)

# Constants
VERSION = pkg_resources.get_distribution("isaacscript_lua").version
DIR = os.getcwd()
PROJECT_NAME = os.path.basename(DIR)
ISAAC_TYPESCRIPT_DEFINITIONS = "isaac-typescript-definitions"
ISAACSCRIPT_COMMON = "isaacscript-common"


def main():
    args = parse_command_line_arguments()

    printf(args)

    printf(f"Did something successfully.")


def parse_command_line_arguments():
    parser = argparse.ArgumentParser(
        description="Manage the IsaacScript libraries in a Lua project."
    )

    parser.add_argument(
        "command",
        type=str,
        help="the command to run",
    )

    parser.add_argument(
        "-v",
        "--version",
        action="version",
        help="display the version",
        version=VERSION,
    )

    return parser.parse_args()


def error(msg: str):
    printf("Error:", msg)
    sys.exit(1)


def printf(*args):
    print(*args, flush=True)


if __name__ == "__main__":
    main()
