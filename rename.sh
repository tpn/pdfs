#!/bin/bash


for file in "PDFs"/*; do
  # Check if the filename contains spaces
  if [[ "$file" =~ " " ]]; then
    # Separate filename and extension
    filename_no_spaces="${file// /_}"

    # Rename the file only if the names are different
    if [[ "$file" != "$filename_no_spaces" ]]; then
      mv "$file" "$filename_no_spaces"
    fi
  fi
done

echo "Finished renaming files."
