import html.parser
import os
import re
import sys


def main():
    # Get the path of the current script's directory
    # https://stackoverflow.com/questions/5137497/find-current-directory-and-files-directory
    dir_path = os.path.dirname(os.path.realpath(__file__))

    # Get all files in the "IsaacDocs" directory (in alphabetical order)
    isaac_docs_path = os.path.join(dir_path, "IsaacDocs")
    for file_or_dir in os.listdir(isaac_docs_path):
        # Ignore directories
        file_path = os.path.join(isaac_docs_path, file_or_dir)
        if not os.path.isfile(file_path):
            continue

        # Ignore non-HTML files
        if not file_or_dir.endswith(".html"):
            continue

        # Ignore the enums file
        # (enums are parsed directly from the "enums.lua" file)
        if file_or_dir == "group__enums.html":
            continue

        parse_file(file_path)


def parse_file(file_path):
    print("Parsing:", file_path)

    with open(file_path, "r") as file_io:
        file_contents = file_io.read()

    parser = MyHTMLParser()
    parser.feed(file_contents)


# https://docs.python.org/3/library/html.parser.html
class MyHTMLParser(html.parser.HTMLParser):
    parsing_tr = False
    read_data = False
    read_data_for = ""
    entry_type = ""
    entry_data = ""

    """
    Main methods
    """

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            class_name = self.get_class_name(attrs)
            if class_name.startswith("memitem:"):
                self.parsing_tr = True
                self.entry_type = ""
                self.entry_data = ""
        elif tag == "td" and self.parsing_tr:
            class_name = self.get_class_name(attrs)
            if class_name == "memItemLeft" or class_name == "memItemRight":
                self.read_data = True
                self.read_data_for = class_name

    def handle_endtag(self, tag):
        if tag == "tr" and self.parsing_tr:
            self.parsing_tr = False
            typescript = self.format_data(self.entry_type, self.entry_data)
            print(typescript)
        elif tag == "td" and self.parsing_tr:
            self.read_data = False
            self.read_data_for = ""

    def handle_data(self, data):
        if self.parsing_tr and self.read_data:
            if self.read_data_for == "memItemLeft":
                self.entry_type = data.split(" ")[0]  # The first word
            elif self.read_data_for == "memItemRight":
                self.entry_data += data

    """
    Subroutines
    """

    def get_class_name(self, attrs):
        for (name, value) in attrs:
            if name == "class":
                return value

        return ""

    def format_data(self, entry_type, entry_data):
        entry_name = entry_data.split(" ")[0]  # The first word
        subentries = []
        for line in entry_data.split("\n"):
            # If there is a "{", remove everything to the left of it
            line = line.strip()
            line2 = line.split("{")
            if len(line2) > 1:
                line = line2[1]

            line = line.strip()
            match = re.match(r"(\w+)\s*=\s*(.+)\b", line)
            if match:
                subentry_name = match[1].strip()
                subentry_data = match[2].strip()
                match2 = re.match(r"(\d+)<<(\d+)", subentry_data)
                if match2:
                    # All operators should be spaced
                    subentry_data = match2[1] + " << " + match2[2]
                subentries.append((subentry_name, subentry_data))

        typescript = "declare " + entry_type + " " + entry_name + " {\n"
        for subentry in subentries:
            typescript += "  " + subentry[0] + " = " + subentry[1] + ",\n"
        typescript += "}\n"

        return typescript


if __name__ == "__main__":
    main()
