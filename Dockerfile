FROM node:6.5.0

#构建时执行
WORKDIR /home

#创建workspace
RUN mkdir webapp
WORKDIR ./webapp

#拷贝代码
ADD ./package.json ./

#安装全局依赖
RUN pwd
RUN ls
RUN npm install

EXPOSE 3000


#运行时执行
CMD cd /home/webapp && ls
