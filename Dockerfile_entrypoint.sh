#!/bin/sh

npm install
npx sequelize-cli db:create --config=./src/config/config.json --migrations-path=./src/migrations --seeders-path=./src/seeders --models-path=./src/models
npx sequelize-cli db:migrate --config=./src/config/config.json --migrations-path=./src/migrations --seeders-path=./src/seeders --models-path=./src/models

echo $NODE_ENV
echo "start"

if [ $NODE_ENV = "development" ]; then
  npx nodemon --watch 'src/' --exec '(npm run test || true) && npm run start-dev'
else
  npm run start
fi
