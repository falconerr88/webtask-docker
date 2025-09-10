FROM node:20-alpine AS builder  

WORKDIR /app

COPY package*.json  ./

RUN npm install 

COPY . . 

FROM node:20-alpine 

WORKDIR /app

COPY --from=builder /app ./node_modules 
COPY --from=builder /app ./

RUN rm -rf /tmp/*

EXPOSE 3000

CMD ["node", "server.js"]    
