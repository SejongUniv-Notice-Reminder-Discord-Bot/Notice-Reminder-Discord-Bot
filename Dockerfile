# base image (npm�� ���� �ִ� baseimage �� �ϳ�)
FROM node:10

# COPY package.json ./
COPY ./ ./

# node�� ���Ӽ� �ٿ�ε�
RUN npm install

CMD ["node","app.js"]