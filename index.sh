#!/bin/bash

directories=$(find ./data/* -type d)

for d in $directories; do
  dirbasename=$(basename $d)

  files=$(find $d/*.txt  -type f -name '[[:digit:]]*')
  
  mkdir -p ./_data/$dirbasename

  cat $files > ./_data/$dirbasename/merged.txt

  awk '{if (++dup[$0] == 1) print $0;}' ./_data/$dirbasename/merged.txt > ./_data/$dirbasename/output_file

  # split -d -l 10000 ./_data/$dirbasename/output_file
done
