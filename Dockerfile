FROM node:14-alpine
LABEL author="nvd <dangnv@stdio.asia>"

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn install --frozen-lockfile \
    && yarn cache clean

COPY . .
RUN yarn build

# USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
