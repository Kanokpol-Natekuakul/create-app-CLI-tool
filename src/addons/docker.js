export function getConfig({ stackName }) {
  let dockerfile = '';
  let compose = '';

  if (stackName === 'node') {
    dockerfile = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
`;
    compose = `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
`;
  } else {
    dockerfile = `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`;
    compose = `version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
`;
  }

  return {
    configFiles: {
      'Dockerfile': dockerfile,
      'docker-compose.yml': compose
    }
  };
}
