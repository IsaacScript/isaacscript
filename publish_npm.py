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
VERSION = pkg_resources.get_distribution("publish_npm").version
DIR = os.getcwd()
PROJECT_NAME = os.path.basename(DIR)
PACKAGE_JSON = "package.json"
PACKAGE_JSON_PATH = os.path.join(DIR, PACKAGE_JSON)
UPDATE_SCRIPT_NAME = "update.sh"
UPDATE_SCRIPT_PATH = os.path.join(DIR, UPDATE_SCRIPT_NAME)
BUILD_SCRIPT_NAME = "build.sh"
BUILD_SCRIPT_PATH = os.path.join(DIR, BUILD_SCRIPT_NAME)


def main():
    args = parse_command_line_arguments()
    check_package_json_exists()
    check_logged_in_to_npm()
    update_dependencies(args)

    # Before we increment the version number, make sure that the program compiles
    if is_typescript_project():
        printf("Testing to see if the project compiles...")
        compile_typescript()

    # Increment the version number
    version = get_version_from_package_json()
    if not args.skip_increment:
        version = increment_version(version)
        put_version(version)

    # Build the program again so that the new version number is included in the compiled code
    if is_typescript_project():
        printf("Re-compiling the project...")
        compile_typescript()

    git_commit_if_changes(args, version)

    publish_to_npm()

    # Done
    printf(f"Published {PROJECT_NAME} version {version} successfully.")


def parse_command_line_arguments():
    parser = argparse.ArgumentParser(
        description="Publish a new version of this package to NPM."
    )

    parser.add_argument(
        "-v",
        "--version",
        action="version",
        help="display the version",
        version=VERSION,
    )

    parser.add_argument(
        "-s",
        "--skip-increment",
        action="store_true",
        help=f'do not increment the version number in the "{PACKAGE_JSON}" file',
    )

    parser.add_argument(
        "-u",
        "--skip-update",
        action="store_true",
        help=f'do not update NPM dependencies in the "{PACKAGE_JSON}" file',
    )

    parser.add_argument(
        "-c",
        "--skip-commit",
        action="store_true",
        help="do not make a commit to the git repository",
    )

    return parser.parse_args()


def check_package_json_exists():
    if not os.path.isfile(PACKAGE_JSON_PATH):
        error(
            f'Failed to find the "{PACKAGE_JSON}" file in the current working directory.'
        )


def check_logged_in_to_npm():
    completed_process = subprocess.run(
        ["npm", "whoami"],
        shell=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    if completed_process.returncode != 0:
        error(
            'The "npm whoami" command failed, so you are probably not logged in. Try doing "npm login".'
        )


def update_dependencies(args):
    if args.skip_update:
        return

    printf("Updating NPM dependencies...")

    # Get the hash before we potentially modify the "package.json" file
    before_hash = get_hash_of_package_json()

    if os.path.isfile(UPDATE_SCRIPT_PATH):
        run_script(UPDATE_SCRIPT_NAME, UPDATE_SCRIPT_PATH)
    else:
        completed_process = subprocess.run(
            [
                "npx",
                "npm-check-updates",
                "--upgrade",
                "--packageFile",
                PACKAGE_JSON,
                "--loglevel",
                "silent",
            ],
            shell=True,
        )
        if completed_process.returncode != 0:
            error(
                f'Failed to run the "npm-check-updates" program to update the "{PACKAGE_JSON}" dependencies to the latest versions.'
            )

    after_hash = get_hash_of_package_json()
    if before_hash != after_hash:
        # The package.json file was modified, so install the new dependencies
        printf("Installing NPM dependencies...")
        completed_process = subprocess.run(["npm", "install", "--silent"], shell=True)
        if completed_process.returncode != 0:
            error('Failed to run "npm install".')


def get_hash_of_package_json():
    with open(PACKAGE_JSON_PATH, "rb") as file_handle:
        file_hash = hashlib.md5()
        file_contents = file_handle.read()
        file_hash.update(file_contents)

        return file_hash.hexdigest()


def get_version_from_package_json():
    with open(PACKAGE_JSON_PATH, "r", encoding="utf8") as file_handle:
        package_json = json.load(file_handle)

    if "version" not in package_json:
        error(f'Failed to find the version in the "{PACKAGE_JSON_PATH}" file.')

    return package_json["version"]


def increment_version(version: str):
    match = re.search(r"(.+\..+\.)(.+)", version)
    if not match:
        error(f"Failed to parse the version number of: {version}")
    version_prefix = match.group(1)
    patch_version = int(match.group(2))  # i.e. the third number
    incremented_patch_version = patch_version + 1
    incremented_version = version_prefix + str(incremented_patch_version)

    return incremented_version


def put_version(version: str):
    with open(PACKAGE_JSON_PATH, "r", encoding="utf8") as file_handle:
        package_json = json.load(file_handle)

    package_json["version"] = version

    with open(PACKAGE_JSON_PATH, "w", encoding="utf8", newline="\n") as file_handle:
        json.dump(package_json, file_handle, indent=2, separators=(",", ": "))
        file_handle.write("\n")

    completed_process = subprocess.run(["npx", "sort-package-json"], shell=True)
    if completed_process.returncode != 0:
        error(f'Failed to sort the "{PACKAGE_JSON}" file.')


def is_typescript_project():
    with open(
        PACKAGE_JSON_PATH,
        "r",
        encoding="utf8",
    ) as file_handle:
        package_json = json.load(file_handle)

    return (
        "dependencies" in package_json and "typescript" in package_json["dependencies"]
    ) or (
        "devDependencies" in package_json
        and "typescript" in package_json["devDependencies"]
    )


def compile_typescript():
    if os.path.isfile(BUILD_SCRIPT_PATH):
        run_script(BUILD_SCRIPT_NAME, BUILD_SCRIPT_PATH)
    else:
        completed_process = subprocess.run(["rm", "-rf", "dist"], shell=True)
        if completed_process.returncode != 0:
            error('Failed to remove the "dist" directory.')

        completed_process = subprocess.run(["npx", "tsc"], shell=True)
        if completed_process.returncode != 0:
            error('Failed to build the project with "npx tsc".')


def git_commit_if_changes(args, version):
    if args.skip_commit:
        return

    # Check to see if this is a git repository
    completed_process = subprocess.run(
        ["git", "status"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    if completed_process.returncode != 0:
        error("This is not a git repository.")

    # Check to see if there are any changes
    # https://stackoverflow.com/questions/3878624/how-do-i-programmatically-determine-if-there-are-uncommitted-changes
    completed_process = subprocess.run(["git", "diff-index", "--quiet", "HEAD", "--"])
    changes_to_existing_files = completed_process.returncode != 0

    # Check to see if there are any untracked files
    # https://stackoverflow.com/questions/11021287/git-detect-if-there-are-untracked-files-quickly
    completed_process = subprocess.run(
        ["git", "ls-files", "--other", "--directory", "--exclude-standard"],
        stdout=subprocess.PIPE,
    )
    if completed_process.returncode != 0:
        error("Failed to git ls-files.")
    git_output = completed_process.stdout.decode("utf-8")
    untracked_files_exist = git_output is not None and git_output.strip() != ""

    if not changes_to_existing_files and not untracked_files_exist:
        printf("There are no changes to push to git.")
        return

    # Commit to the repository
    printf("Committing to the Git repository...")
    completed_process = subprocess.run(["git", "add", "-A"])
    if completed_process.returncode != 0:
        error("Failed to git add.")
    completed_process = subprocess.run(["git", "commit", "-m", version])
    if completed_process.returncode != 0:
        error("Failed to git commit.")
    completed_process = subprocess.run(["git", "pull", "--rebase"])
    if completed_process.returncode != 0:
        error("Failed to git pull.")
    completed_process = subprocess.run(["git", "push"])
    if completed_process.returncode != 0:
        error("Failed to git push.")

    printf(f"Pushed a commit to git for version: {version}")


def publish_to_npm():
    printf("Publishing to NPM...")
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


def error(msg):
    printf(f"Error: {msg}")
    sys.exit(1)


def run_script(script_name, script_path: str):
    completed_process = subprocess.run(
        ["bash", script_path],
        shell=True,
        capture_output=True,
    )
    if completed_process.returncode != 0:
        error_script(completed_process, script_name)


def error_script(completed_process: subprocess.CompletedProcess, script_path: str):
    msg = f'Failed to run the "{script_path}" script with return code {completed_process.returncode}'
    stdout = completed_process.stdout.decode().strip()
    stderr = completed_process.stderr.decode().strip()
    if stdout != "" or stderr != "":
        msg += ":\n"
        if stdout != "":
            msg += stdout
        if stderr != "":
            msg += stderr
    else:
        msg += "."
    error(msg)


def printf(*args):
    print(*args, flush=True)


if __name__ == "__main__":
    main()
