# 실행 방법

git clone을 받은 후,

wanted-backend 폴더에서 아래 명령어를 실행합니다.

```shell
$ npm install
$ npm run start
```

그러면 콘솔에 이런 문구가 뜨면서, http://localhost:5000에 서버가 열리게 됩니다.

```
app listening on port 5000
```

이후에, api명세에 작성된 내용을 바탕으로 API요청을 보내 test할 수 있습니다. 



## 주의사항

JWT를 발급해서 cookie에 넣어주는 `POST` /token API실행 후, 

다음 요청을 보낼 때, cookie에 값이 자동으로 들어가지 않을 수 있습니다. 

 따라서 `POST` /token API 응답 헤더에 있는 `Set-Cookie`의 값을 다른 요청을 보낼시에 

요청 헤더에 `Cookie`에 그대로 복사해서 넣어주시면 됩니다. 



# 사용 기술

- Node.js

- Nedb 

  > js  in-memory database 라이브러리



# 구현에 관한 내용

### 1) express 이용

Node.js에서 웹 서버를 열기위해 express 라이브러리를 이용하였습니다.

### 2) MVC 패턴 적용

CSR로 가정하여 V는 따로 제작하지 않았습니다. 하지만 Model과 Controller를 나눠서, 로직을 분리했습니다. 

### 3) JWT 이용

사용자 인증에 JWT를 이용하였습니다.

jwtMiddleware를 작성하여 이용했습니다.

로그인시에 JWT를 발급해주고, 

모든 요청이 controller로 넘어가기 전에 jwtMiddleware를 거치게 됩니다. 

이 때,  jwt를 해독한 user정보를 넣어주고, jwt 재발급이 필요할경우 재발급하여 `Set-Cookie`헤더에 넣어주었습니다. 

### 4) Promise 이용

비동기처리를 위해 promise를 이용했습니다. 

### 5) Error handler 적용

Error handle용 middleware를 작성하여 이용하였습니다. 

error가 발생했을 때, 각 컨트롤러에서 일일이 처리하지 않고 next로 넘겨 middleware에서 처리할 수 있도록 했습니다.

Error handle용 middleware 코드는 `app.js`에 있습니다. 



# API 명세서

[API 명세서](./documents/API명세.md)

