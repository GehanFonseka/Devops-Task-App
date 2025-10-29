# frontend/Dockerfile
FROM node:18-bullseye AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
# optional: copy custom nginx.conf to handle routing
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
