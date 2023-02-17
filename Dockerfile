FROM node:16-alpine
LABEL author="nvd <dangnv@stdio.asia>"

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn config delete proxy \
    && yarn config delete https-proxy \
    && yarn config delete registry \
    && yarn install --frozen-lockfile --network-timeout 100000\
    && yarn cache clean

COPY . .
RUN yarn build

# USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
