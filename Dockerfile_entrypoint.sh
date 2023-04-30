#!/bin/sh

if [ ! -d node_modules ]; then
    echo "No modules found. Running installation."
    npm install
    test -z "$USER_PERM" || chown -R $USER_PERM node_modules
fi

echo "hello"
$BIN_PATH