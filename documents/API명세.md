# API 명세

### 종류

#### 회원

- [회원가입 (POST /user)](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#post-user)
- [로그인 (JWT발급)](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#post-token)
- [인증 (JWT해독)](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#get-token)

#### 게시글

- [게시글 작성](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#post-post)
- [게시글 수정](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#patch-post)
- [게시글 삭제](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#delete-postpost_id_id)
- [게시글 목록 가져오기](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#get-postlistoffset6page_num1)
- [게시글 상세 내용 가져오기](https://github.com/sally0226/wanted-backend/blob/main/documents/API%EB%AA%85%EC%84%B8.md#get-postpost_id_id)

### `POST` /user

회원가입 api입니다. 

- request

  - body example

    ```json
    {
        "user_id": "sally", 
        "user_pw": "1234", 
        "user_name":"홍길동"
    }
    ```

- response

  - parameters

    | name    | type    | example                    | desc           |
    | ------- | ------- | -------------------------- | -------------- |
    | result  | boolean | true                       | 요청 성공 여부 |
    | message | string  | 회원가입이 완료되었습니다. | 응답 메세지    |

  - code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 201  | 회원가입이 완료되었습니다.    |
    | 404  | 중복된 id입니다.              |
    | 500  | 서버에서 문제가 발생했습니다. |

  - body example

    ``` json
    // 성공시
    {
        "result": true,
        "message": "회원가입이 완료되었습니다."
    }
    
    // 실패시
    {"message": "중복된 id입니다."}
    {"message": "서버에서 문제가 발생했습니다."}
    ```

### `POST` /token

로그인 api입니다. req로 넘어온 계정정보가 정확하면, JWT를 발급하고 res의 access_token cookie에 넣어 보냅니다. 

- request

  - body example

    ```json
    {
        "user_id": "sally",
        "user_pw": "1234"
    }
    ```

- response

  - Headers

    | key        | value                                                        |
    | ---------- | ------------------------------------------------------------ |
    | Set-Cookie | access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FsbHkiLCJpYXQiOjE2MzUyNDc0MDUsImV4cCI6MTYzNTI0OTIwNX0.ZkAV2fVvGnchKRg6_dReEseRx9w7V9v_HkBU_51wmSA; Path=/; HttpOnly; Secure; SameSite=None |

  - parameters

    | name    | type    | example                | desc                                     |
    | ------- | ------- | ---------------------- | ---------------------------------------- |
    | result  | boolean | true                   | 요청 성공 여부                           |
    | user_id | string  | sally                  | 로그인 성공시, 로그인된 id (jwt payload) |
    | message | string  | 로그인에 성공했습니다. | 응답 메세지                              |

  - code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 로그인에 성공했습니다.        |
    | 404  | id나 pw를 확인해주세요.       |
    | 500  | 서버에서 문제가 발생했습니다. |

  - body example 

    ```json
    // 성공시
    {
        "result": true,
        "user_id": "sally",
        "message": "로그인에 성공했습니다."
    }
    
    // 실패시
    {"message": "중복된 id입니다."}
    {"message": "서버에서 문제가 발생했습니다."}
    ```

### `GET` /token

req의 cookie에 있는 JWT를 해독 후, payload에 있는 user정보를 돌려주는 api입니다. 

- request

  - Headers

    | key    | value                                                        |
    | ------ | ------------------------------------------------------------ |
    | Cookie | access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FsbHkiLCJpYXQiOjE2MzUyNDc0MDUsImV4cCI6MTYzNTI0OTIwNX0.ZkAV2fVvGnchKRg6_dReEseRx9w7V9v_HkBU_51wmSA; Path=/; HttpOnly; Secure; SameSite=None |

    - 위의 `POST` /token API를 통해 발급받은 JWT

- response

  - parameters

    | name    | type    | example              | desc                     |
    | ------- | ------- | -------------------- | ------------------------ |
    | result  | boolean | true                 | 요청 성공 여부           |
    | user_id | string  | sally                | 인증 성공시, jwt payload |
    | message | string  | 인증에 성공했습니다. | 응답 메세지              |

  - code, message

    | code | message                                                      |
    | ---- | ------------------------------------------------------------ |
    | 200  | 인증에 성공했습니다.                                         |
    | 404  | 인증 정보 확인에 실패하였습니다. / 존재하지 않는 회원정보입니다. |
    | 500  | 서버에서 문제가 발생했습니다.                                |

  - body example

    ```json
    // 성공시
    {
        "result": true,
        "user_id": "sally",
        "message": "인증에 성공했습니다."
    }
    // 실패시
    {"message": "인증 정보 확인에 실패하였습니다."}
    {"message": "존재하지 않는 회원정보입니다."}
    {"message": "서버에서 문제가 발생했습니다."}
    ```

### `POST` /post

req의 cookie속 JWT payload로 게시글 작성자의 id를 넣어줍니다. 

- request

  - body example

    ```json
    {
        "title": "post's title",
        "desc": "This is description"
    }
    ```

- response
  - parameters

    | name    | type    | example              | desc              |
    | ------- | ------- | -------------------- | ----------------- |
    | result  | boolean | true                 | 요청 성공 여부    |
    | post_id | string  | MylrTx6iEvYqiOum     | 등록된 post의 _id |
    | message | string  | 글이 등록되었습니다. | 응답 메세지       |

  - code, message

    | code | message                       |
    | ---- | ----------------------------- |
    | 201  | 글이 등록되었습니다.          |
    | 401  | Unauthorized                  |
    | 500  | 서버에서 문제가 발생했습니다. |

  - body example

    ```json
    // 성공시
    {
        "result": true,
        "post_id": "MylrTx6iEvYqiOum",
        "message": "글이 등록되었습니다."
    }
    // 실패시
    {"message": "Unauthorized"}
    {"message": "서버에서 문제가 발생했습니다."}
    ```

### `PATCH` /post

req의 cookie속 JWT payload와 게시글 작성자를 비교해서 같을 때에만 요청이 허용됩니다. 

- request

  - body example

    ```json
    {
        "title":"New Title",
        "desc":"I want to modify desc",
        "_id":"MylrTx6iEvYqiOum"
    }
    ```

- response

  - parameters

    | name    | type    | example              | desc           |
    | ------- | ------- | -------------------- | -------------- |
    | result  | boolean | true                 | 요청 성공 여부 |
    | message | string  | 글이 수정되었습니다. | 응답 메세지    |

  - code, messages

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | 글이 수정되었습니다.          |
    | 401  | Unauthorized                  |
    | 500  | 서버에서 문제가 발생했습니다. |

  - body example 

    ```json
    // 성공시
    {
        "result": true,
        "message": "글이 수정되었습니다."
    }
    // 실패시
    {"message": "Unauthorized"}
    {"message": "서버에서 문제가 발생했습니다."}
    ```

### `DELETE` /post?post_id=_id

req의 cookie속 JWT payload와 게시글 작성자를 비교해서 같을 때에만 요청이 허용됩니다. 

- request

  - query params

    | key     | example          | desc       |
    | ------- | ---------------- | ---------- |
    | post_id | MylrTx6iEvYqiOum | 게시글 _id |

- response

  - code, messages

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | null                          |
    | 401  | Unauthorized                  |
    | 403  | Forbidden                     |
    | 404  | not found                     |
    | 500  | 서버에서 문제가 발생했습니다. |

  - body examples

    ```json
    // 실패시
    {"message": "Unauthorized"}
    {"message": "Forbidden"}
    {"message": "not found"}
    {"message": "서버에서 문제가 발생했습니다."}
    ```

    

### `GET` /post/list?offset=6&page_num=1

게시글을 '최근순'으로 정렬하여, 한 페이지에 offset만큼 보여줄 때, page_num번째 page에 들어갈 게시물들의 list를 반환합니다.

- request

  - query params

    | key      | example        | defalut | desc                                          |
    | -------- | -------------- | ------- | --------------------------------------------- |
    | page_num | 1~max_page_num | 1       | 페이지 넘버, max_page이상으로 요청이 오면 404 |
    | offset   | 10             | 10      | 한 페이지에 보여줄 게시글 수                  |

- response

  - parameters

    | name     | type    | example                      | desc                             |
    | -------- | ------- | ---------------------------- | -------------------------------- |
    | max_page | integer | 3                            | 해당 offset에 대한 max page 번호 |
    | list     | list    | 아래 body example에서 확인   | 게시글 list                      |
    | message  | string  | 존재하지 않는 페이지 입니다. | 응답 메세지                      |

  - code, messages

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | null                          |
    | 404  | 존재하지 않는 페이지 입니다.  |
    | 500  | 서버에서 문제가 발생했습니다. |

  - body example

    ```json
    // 성공시
    {
        "max_page": 15,
        "list": [
            {
                "_id": "16MX1171TAqH2eYO",
                "title": "first post"
            },
            {
                "_id": "S4bZ4HsqDb5aYzyv",
                "title": "first post"
            }
        ]
    }
    // 실패시 
    {
        "max_page": 15,
        "message": "존재하지 않는 페이지 입니다."
    }
    {"message": "서버에서 문제가 발생했습니다."}
    ```

### `GET` /post?post_id=_id

post_id에 해당하는 게시물의 상세내용을 반환합니다.

- request

  - query params

    | key     | example          | desc       |
    | ------- | ---------------- | ---------- |
    | post_id | MylrTx6iEvYqiOum | 게시글 _id |

- response

  - codes, messages

    | code | message                       |
    | ---- | ----------------------------- |
    | 200  | null                          |
    | 404  | no data                       |
    | 500  | 서버에서 문제가 발생했습니다. |

  - body examples

    ```json
    // 성공시
    {
        "title": "second post",
        "desc": "This is my second post!",
        "createAt": 1635247496284,
        "user_id": "sally",
        "_id": "nmZAUi0SXujLNidx",
        "updateAt": 1635247903112
    }
    // 실패시
    {"message": "no data"}
    {"message": "서버에서 문제가 발생했습니다."}
    ```

    
