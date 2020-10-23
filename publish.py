#!/c/Python38/python.exe

# Standard imports
import sys
import subprocess
import os
import re

if sys.version_info < (3, 0):
    print("This script requires Python 3.")
    sys.exit(1)

# Constants
DIR = os.path.dirname(os.path.realpath(__file__))
PROJECT_NAME = os.path.basename(DIR)

# Subroutines
def error(message, exception=None):
    if exception is None:
        print(message)
    else:
        print(message, exception)
    sys.exit(1)


# Check to make sure that the project compiles
'''
os.chdir(DIR)
RETURN_CODE = subprocess.call(["build.sh"])
if RETURN_CODE != 0:
    error("Failed to build the project.")
'''

# Increment the version in the "package.json" file
# http://stackoverflow.com/questions/17140886/how-to-search-and-replace-text-in-a-file-using-python
PACKAGE_JSON_PATH = os.path.join(DIR, "package.json")
with open(PACKAGE_JSON_PATH, "r") as file_handle:
    FILE_DATA = file_handle.read()
NEW_FILE = ""
VERSION_PREFIX = "1.0."
VERSION = ""
for line in iter(FILE_DATA.splitlines()):
    match = re.search(r'"version": "' + VERSION_PREFIX + r'(.+)",', line)
    if match:
        FINAL_DIGIT = str(int(match.group(1)) + 1)
        VERSION = VERSION_PREFIX + FINAL_DIGIT
        NEW_FILE += '  "version": "' + VERSION + '",\n'
    else:
        NEW_FILE += line + "\n"
if VERSION == "":
    print("Failed to parse the version.")
    sys.exit(1)
with open(PACKAGE_JSON_PATH, "w", newline="\n") as file:
    file.write(NEW_FILE)

# Commit to the repository
RETURN_CODE = subprocess.call(["git", "add", "-A"])
if RETURN_CODE != 0:
    error("Failed to git add.")
RETURN_CODE = subprocess.call(["git", "commit", "-m", VERSION])
if RETURN_CODE != 0:
    error("Failed to git commit.")
RETURN_CODE = subprocess.call(["git", "push"])
if RETURN_CODE != 0:
    error("Failed to git push.")

# Publish
RETURN_CODE = subprocess.call(
    [
        "C:\\Program Files\\nodejs\\npm.cmd",
        "publish",
        "--access",
        "public",
    ]
)
if RETURN_CODE != 0:
    error("Failed to npm publish.")

# Done
print("Released", PROJECT_NAME, "version", VERSION, "successfully.")
