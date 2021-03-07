#!/usr/bin/env python

import argparse
import os
import re
import subprocess
import sys

if sys.version_info < (3, 0):
    print("Error: This script requires Python 3.")
    sys.exit(1)

# Constants
DIR = os.path.dirname(os.path.realpath(__file__))
PROJECT_NAME = os.path.basename(DIR)
PACKAGE_JSON_PATH = os.path.join(DIR, "package.json")
VERSION_PREFIX = "1.0."

# Variables
version = ""

# Subroutines
def error(message, exception=None):
    message = "Error: {}".format(message)
    if exception is None:
        print(message)
    else:
        print(message, exception)
    sys.exit(1)


# Parse command-line arguments
parser = argparse.ArgumentParser(
    description="Publish a new version of this package to NPM."
)
parser.add_argument(
    "-s",
    "--skip-increment",
    action="store_true",
    help='do not increment the version number in the "package.json" file',
)
args = parser.parse_args()

# Check to make sure that the project compiles
os.chdir(DIR)
completed_process = subprocess.run(["npx", "tsc"], shell=True)
if completed_process.returncode != 0:
    error("Failed to build the project.")

if not args.skip_increment:
    # Increment the version in the "package.json" file
    # http://stackoverflow.com/questions/17140886/how-to-search-and-replace-text-in-a-file-using-python
    with open(PACKAGE_JSON_PATH, "r") as file_handle:
        file_data = file_handle.read()
    new_file = ""
    for line in iter(file_data.splitlines()):
        match = re.search(r'"version": "' + VERSION_PREFIX + r'(.+)",', line)
        if match:
            final_digit = str(int(match.group(1)) + 1)
            version = VERSION_PREFIX + final_digit
            new_file += '  "version": "' + version + '",\n'
        else:
            new_file += line + "\n"
    if version == "":
        print("Failed to parse the version.")
        sys.exit(1)
    with open(PACKAGE_JSON_PATH, "w", newline="\n") as file:
        file.write(new_file)

    # Commit to the repository
    completed_process = subprocess.run(["git", "add", "-A"])
    if completed_process.returncode != 0:
        error("Failed to git add.")
    completed_process = subprocess.run(["git", "commit", "-m", version])
    if completed_process.returncode != 0:
        error("Failed to git commit.")
    completed_process = subprocess.run(["git", "push"])
    if completed_process.returncode != 0:
        error("Failed to git push.")

# Publish
completed_process = subprocess.run(
    [
        "npm",
        "publish",
        "--access",
        "public",
    ],
    shell=True,
)
if completed_process.returncode != 0:
    error("Failed to npm publish.")

# Done
print("Published {} version {} successfully.".format(PROJECT_NAME, version))
