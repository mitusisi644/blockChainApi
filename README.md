# qkl

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

npm install element ui

# Json Schema
``` bash
##### 用schema封装vue表单自动化组件。
##### 1、预先定义所有需要的字段（类型、默认值、描述。。。）
##### 2、vue要添加依懒 
npm install --save vue-json-schema
##### 3、页面中引用
import FormSchema from 'vue-json-schema'
##### 4、引入自定义字段文件
import commintSchema from '@/schema/filedsSchema'
我封装的是对应不同接口，所以字段后处理的方法：initSchemaJson1（）
##### 5、 和父组件 用$emit和props进行通信
```