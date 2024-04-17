FROM node:20.4-alpine3.17

COPY bot-admin bot-admin
COPY dev-full.crt ./bot-admin/dev-full.crt
COPY dev-key.key ./bot-admin/dev-key.key

RUN npm install -g serve http-server
RUN cd bot-admin && npm install --save --legacy-peer-deps && npm run build

WORKDIR /bot-admin/build
CMD ["http-server", "--proxy", "https://bot-dev-domain.com/index.html?", "--cors", "-S", "-C", "../dev-full.crt", "-K", "../dev-key.key", "-p", "443"]