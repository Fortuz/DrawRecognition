FROM node:20
WORKDIR /draw-recognition-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "8080"]
