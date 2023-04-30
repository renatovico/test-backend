FROM node:20 as base
    ENV APPDIR /usr/app
    EXPOSE ${SERVER_PORT}

    WORKDIR $APPDIR

    RUN apt-get update && \
        rm -rf /var/cache/apt/* /tmp/* /var/tmp/*

FROM base as development
    ENV NODE_ENV development

    ENTRYPOINT ["./Dockerfile_entrypoint.sh"]

FROM base as production
    ENV NODE_ENV production
    ENV BIN_PATH ${BIN_PATH}

    RUN addgroup --gid 1001 --system app && \
        adduser --uid 1001 --system --gid 1001 app
    COPY . $APPDIR

    RUN npm install

    USER app

    CMD $BIN_PATH