FROM node:lts-alpine3.18 as build-deps
# Install Python, build tools, pkg-config, and dependencies needed by 'canvas'
RUN apk update \
    && apk add --no-cache python3 make g++ \
    && apk add --no-cache pkgconfig cairo-dev jpeg-dev pango-dev giflib-dev \
    && ln -sf python3 /usr/bin/python

# Set PYTHON environment variable for node-gyp
ENV PYTHON=/usr/bin/python3

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.19.0-alpine
COPY --from=build-deps /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
