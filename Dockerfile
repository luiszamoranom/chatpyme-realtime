# etapa de construcción
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# etapa de producción con Nginx
FROM nginx:alpine as production
COPY --from=build /app/build/static /usr/share/nginx/html
EXPOSE 80