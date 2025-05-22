#!/bin/bash

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Copy dist contents to temporary directory
cp -r dist/* $TEMP_DIR/
echo "Copied dist contents to temporary directory"

# Initialize git in the temporary directory
cd $TEMP_DIR
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Add the remote repository
git remote add origin git@github.com:rskmrt/rakuraku-furima.git

# Force push to gh-pages branch
git push -f origin master:gh-pages

# Clean up
cd ..
rm -rf $TEMP_DIR
echo "Deployment complete" 