#!/bin/sh

npm install
npm run db:create
npm run migrate:up

echo $NODE_ENV
echo "start"

if [ $NODE_ENV = "development" ]; then
  npm run test & npx nodemon --watch 'src/' --exec 'npm run start-dev'
else
  npm run start
fi
