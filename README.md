# API接口

### 获取标题和图标

#### Request
- Method: **POST**
- URL:  ```/all```
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

### 获取标题

#### Request
- Method: **POST**
- URL:  ```/title```
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
}
```

### 获取图标

#### Request
- Method: **POST**
- URL:  ```/icons```
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
  "icons": "https://static.hdslb.com/mobile/img/512.png"
}
```

## License

Copyright (c) ZoftTy. All rights reserved.

Licensed under the [MIT](LICENSE.txt) license.
