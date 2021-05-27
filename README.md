# API接口

### 获取标题和图标

#### Request
- Method: **POST**
- URL:  ```/api/info```
- Headers：```Content-Type: application/json```
- Body:
```
{
  "url":"https://bilibili.com"
}
```

#### Response
- Body
```
{
  "code": 200,
  "title": "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
  "icons": "https://static.hdslb.com/mobile/img/512.png"
}
```

### 添加图标

#### Request
- Method: **POST**
- URL:  ```/api/add```
- Headers：```Content-Type: application/json```
- Body:
```
{
  "url":"https://bilibili.com",
  "icons": "https://bilibili.com/favicon.ico"
}
```

#### Response
- Body
```
{
  "code": 200,
  "title": "添加成功",
}
```

## License

Copyright (c) ZoftTy. All rights reserved.

Licensed under the [MIT](LICENSE) license.
