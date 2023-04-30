FROM node:20 as base
    ENV APPDIR /usr/app
    EXPOSE ${SERVER_PORT}

    WORKDIR $APPDIR

    RUN apt-get update && \
        rm -rf /var/cache/apt/* /tmp/* /var/tmp/*

    RUN addgroup --gid 1001 --system app && \
        adduser --uid 1001 --system --gid 1001 app
    USER app


FROM base as development
    ENV NODE_ENV development
    ENV BIN_PATH "node_modules/nodemon/bin/nodemon.js --inspect=0.0.0.0:9229 src/index.js"

    ENTRYPOINT ["./Dockerfile_entrypoint.sh"]

FROM base as production
    ENV NODE_ENV production
    ENV BIN_PATH "src/index.js"

    COPY . $APPDIR

    ENTRYPOINT ["./Dockerfile_entrypoint.sh"]
    #CMD $BIN_PATH