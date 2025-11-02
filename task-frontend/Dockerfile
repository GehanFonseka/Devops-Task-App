# Step 1: Build React app
# Step 2: Serve built files using NGINX
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# Create React App outputs to /app/build, not /app/dist
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
