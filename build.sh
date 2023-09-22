#!/bin/bash

YELLOW="\e[33m"
ENDCOLOR="\e[0m"

mkdir -p dist

# Get the path to the dist directory.
dist_dir=$(pwd)/dist/
MANIFEST_FILE=manifest.json

# build project
echo -e "\n$YELLOW"
read -p 'Do you really want to build project?
> ' build_project
echo -e "\n$ENDCOLOR"

if [[ "$build_project" == "yes" ]]; then
  npm run build
  # copy all static files
  cp -R static/. $dist_dir

  # copy all rulesets files
  cp -R rulesets/. $dist_dir
fi

# browserType: chrome | firefox
echo -e "\n$YELLOW"
read -p 'Enter browser type: 
> ' browserType
echo -e "\n$ENDCOLOR"

# generating manifest file
touch $dist_dir/$MANIFEST_FILE

if [[ "$browserType" == "firefox" ]]; then
  find $dist_dir -type f -name "*.js" -exec sh -c '
    for file do
      # Replace "chrome." with "browser."
      echo $file
      sed -i "s/chrome\.action/browser\.browserAction/g" "$file"
      sed -i "s/chrome\./browser\./g" "$file"
    done
  ' sh {} +
fi

# create zip file for dist
echo -e "\n$YELLOW"
read -p 'Do you really want to create zip file? 
> ' create_zip
echo -e "\n$ENDCOLOR"

if [[ "$create_zip" == "yes" ]]; then
  (cd $dist_dir; zip -r ../"$browserType".zip .)
fi

# Push changes
echo -e "\n$YELLOW"
read -p "Do you really want to push changes to Github? 
> " push_changes
echo -e "\n$ENDCOLOR"
if [[ "$push_changes" == "yes" ]]; then
  # extract version
  line_number=$(grep -n "\"version\"" $dist_dir/$MANIFEST_FILE)
  # using sed: version=$(echo "$line" | sed 's/"version": "\(.*\)"/\1/')
  version=$(echo "$line_number" | grep -oP '(?<=version": ")[^"]*')

  git add .
  git commit -m "$version"
  git push
fi