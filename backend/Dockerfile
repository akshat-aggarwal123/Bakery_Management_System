FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install bcryptjs jsonwebtoken cookie-parser
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "src/index.js"]