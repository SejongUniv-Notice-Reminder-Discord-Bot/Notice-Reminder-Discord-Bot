# base image (npm�� ���� �ִ� baseimage �� �ϳ�)
FROM node:10

# Working Directory ����
WOKRDIR /usr/crc/app

# COPY package.json ./
COPY ./ ./

# node�� ���Ӽ� �ٿ�ε�
RUN npm install

CMD ["node","app.js"]