# 💉중간이들 BackEnd Repository
"중앙대학교 간호학과 동문들을 위한 커뮤니티" 
<br>

> 📌 <b>중간이들 사이트 URL</b> : https://www.caugannies.com [예정] <br>

> 📌 <b>중간이들 소개 ReadMe</b> : https://github.com/Gannies <br>

> 📌 <b>중간이들 BackEnd Github</b> : https://github.com/Gannies/Gannies_BackEnd <br>

---

## 바로가기

#### 1. [프로젝트 개요](#1-프로젝트-개요)
#### 2. [프로젝트 아키텍쳐](#2-프로젝트-아키텍쳐)
#### 3. [구현 내용](#3-구현-내용)
#### 4. [이슈 해결](#4-이슈-해결)
#### 5. [배포](#5-배포)
#### 6. [느낀점](#6-느낀점)

---

# 1. 프로젝트 개요

## 1) 기간

| **단계**                          | **기간**               | **소요 주수** |
|----------------------------------|-----------------------|---------------|
| <b>기획 / 디자인 / 팀 결성</b>                    | 24.07.04 - 24.08.11   | 4주           |
| <b> 개발</b>                             | 24.08.12 - 24.09.20   | 5주           |
| <b>마무리 (배포/문서화/리팩토링 등)</b> | 24.09.21 - 24.10.19   | 4주           |

## 2) 인원 및 역할

- 1인 <i>(초기 2인에서 24.09.15 이후 1인으로 변경됨.)</i>

| **담당자** | **역할**                                                                                              |
|----------|----------------------------------------------------------------------------------------------------------|
| <b>이가린</b> <br> <i>(devellybutton)</i>     | • 프로젝트 테이블 Entity 1차 설계 <br> • Auth, Users, Email, Files, Admin, Reports 모듈 기능 구현 <br> • Posts, Comments, Replies, Scraps, Likes 모듈: 오류 수정 및 비즈니스 로직 고도화 <br> • 모든 모듈에 DAO 추가: DB와 서비스 계층 사이의 데이터 CRUD 전담 계층 구축 <br> • AWS PM2 및 Docker를 활용한 서버 배포 자동화 <br> • Mock data 테스트 코드 작성 및 테스트 자동화 <br>  |
| <b>김재연</b> <br> <i>(APD-Kim)</i>     | • 1차 설계된 테이블 엔티티에 관계 설정 <br> • Posts, Comments, Replies, Scraps, Likes 모듈: 초기 CRUD 구현 <br> • Files 모듈: S3 presigned URL 생성 기능 구현 <br> • 24.09.13 이후로 연락 두절 <br> → 지속적인 팀 규칙 미이행 및 건강 문제(만성폐쇄성폐질환, 2주간 입원)로 중도 하차 <br>  |


<details>
<summary>모듈 기능 구현 세부 사항</summary>

- **Auth**: Redis를 활용한 세션 인증, 외부 API를 통한 SMS 인증
- **Users**: 마이페이지 기능 구현 <i>(본인 정보 조회 및 수정, 작성한/스크랩한 게시물 혹은 댓글 조회)</i>
- **Email**: Nodemailer를 활용한 이메일 발송 및 SSR 렌더링을 위한 템플릿 제작
- **Files**: S3 presigned URL을 통해 프론트엔드와 서버 간의 데이터 전송 로직 개선
- **Admin, Reports**: 관리자 페이지 및 신고 관련 기능 구현 <i>(회원 관리, 전체 게시물 관리, 신고된 게시물 및 댓글 관리)</i>

</details>

## 3) 기술스택




## 4) 개발환경

- <b>Node.js</b> : v20.9.0
- <b>NestJS</b> : @nestjs/core@10.4.1 
- <b>TypeORM</b> : typeorm@0.3.20
- <b>TypeScript</b> : typescript@5.6.2
- <b>MySQL</b> :
- <b>Redis</b> :
- <b>PM2</b> :
- <b>Docke</b>r :
- <b>npm</b> : 10.1.0

## 5) 라이브러리

| **분류**                | **라이브러리**                                                             |
|-----------------------|-------------------------------------------------------------------------|
| **주요 라이브러리**        | `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/typeorm`, `@nestjs/config`, `@nestjs/swagger`, `@nestjs/schedule`, `@nestjs/serve-static`, `@nestjs-modules/mailer` |
| **데이터베이스 및 ORM**  | `mysql2`, `typeorm`, `@nestjs/typeorm`, `connect-redis`, `redis`, `ioredis` |
| **인증 및 보안**         | `bcrypt`, `passport`, `passport-local`, `express-session`, `@nestjs/passport` |
| **API 및 네트워킹**      | `axios`, `twilio`, `@google-cloud/vision`                             |
| **파일 및 데이터 전송**   | `@aws-sdk/client-s3`, `@aws-sdk/s3-presigned-post`, `nodemailer`     |
| **유틸리티**             | `dayjs`, `moment-timezone`, `lodash.camelcase`, `uuidv4`, `phone`    |
| **개발 관련 라이브러리**   | `jest`, `supertest`, `class-validator`, `class-transformer`, `@nestjs/testing` |
| **타입스크립트 관련**     | `typescript`, `ts-jest`, `ts-loader`, `ts-node`, `tsconfig-paths`    |
| **코드 품질 및 스타일**    | `eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` |

---

# 2. 프로젝트 아키텍쳐

---

# 3. 구현 내용

---

# 4. 이슈 해결

## 1) 세션 관리 이슈

## 2) 데이터 쿼리 최적화

## 3) 배포 프로세스 개선

## 4) 테스트 자동화 및 품질 보증

## 5) 기타

---

# 5. 배포

---

# 6. 느낀점

