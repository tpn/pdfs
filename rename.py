#!/usr/bin/env python
import os

def rename_files(dir_path):
  for filename in os.listdir(dir_path):
    file_name, extension = os.path.splitext(filename)
    new_name = file_name.replace(" ", "_")
    new_filename = f"{new_name}{extension}"

    old_path = os.path.join(dir_path, filename)
    new_path = os.path.join(dir_path, new_filename)

    if old_path != new_path:
      os.rename(old_path, new_path)

rename_files("PDFs/")

print("Finished renaming files.")
