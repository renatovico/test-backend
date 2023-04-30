#!/bin/sh

if [ ! -d node_modules ]; then
    echo "No modules found. Running installation."
    npm install
    test -z "$USER_PERM" || chown -R $USER_PERM node_modules
fi

npx sequelize-cli db:create --config=./src/config/config.json --migrations-path=./src/migrations --seeders-path=./src/seeders --models-path=./src/models
npx sequelize-cli db:migrate --config=./src/config/config.json --migrations-path=./src/migrations --seeders-path=./src/seeders --models-path=./src/models
$BIN_PATH
