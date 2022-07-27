# base image (npm을 갖고 있는 baseimage 중 하나)
FROM node:10

# COPY package.json ./
COPY ./ ./

# node의 종속성 다운로드
RUN npm install

CMD ["node","app.js"]