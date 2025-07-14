# 💉중간이들 BackEnd Repository

> ### **"중앙대 간호학과 동문 커뮤니티"**
>
> 📌 <b><a href="https://www.caugannies.com">배포 링크</a></b><br> 📌 <b><a href="https://github.com/Gannies">서비스 소개</a></b><br> 📌 <b><a href="https://api.caugannies.com/api">스웨거</a></b><br> 📌 <b><a href="https://github.com/Gannies/Gannies_BackEnd/wiki/%EC%A4%91%EA%B0%84%EC%9D%B4%EB%93%A4-erd">프로젝트 ERD</a></b>

---

### 테스트 계정
- 이메일 : `admin2@example.com`
- 비밀번호 : `Password!1125`

### 회원가입 시 '학과인증' 단계에서 업로드할 인증서류
- 아래 이미지 중 한 개를 다운받아 업로드하시면 인증 후 회원가입이 가능합니다.
- [[재학증명서]](https://caugannies.s3.ap-northeast-2.amazonaws.com/forTest/%EC%9E%AC%ED%95%99%EC%A6%9D%EB%AA%85%EC%84%9C-%EB%A9%B4%EC%A0%91%EA%B4%80%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%9A%A9.png) [[졸업증명서]](https://caugannies.s3.ap-northeast-2.amazonaws.com/forTest/%EC%9E%AC%ED%95%99%EC%A6%9D%EB%AA%85%EC%84%9C-%EB%A9%B4%EC%A0%91%EA%B4%80%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%9A%A9.png)

---

## 바로가기

### 1. [프로젝트 개요](https://github.com/Gannies/Gannies_BackEnd?tab=readme-ov-file#1-프로젝트-개요-1)
### 2. [프로젝트 아키텍쳐](https://github.com/Gannies/Gannies_BackEnd?tab=readme-ov-file#2-프로젝트-아키텍쳐-1)
### 3. [이슈 해결](https://github.com/Gannies/Gannies_BackEnd?tab=readme-ov-file#4-이슈-해결-1)
### 4. [배포](https://github.com/Gannies/Gannies_BackEnd?tab=readme-ov-file#5-배포-1)
### 5. [느낀점](https://github.com/Gannies/Gannies_BackEnd?tab=readme-ov-file#6-느낀점-1)

---

# 1. 프로젝트 개요

## 1) 기간

| **단계**                          | **기간**               | **소요 주수** |
|----------------------------------|-----------------------|---------------|
| <b>기획 / 디자인 / 팀 결성</b>                    | 24.07.04 - 24.08.11   | 4주           |
| <b> 개발</b>                             | 24.08.12 - 24.09.20   | 5주           |
| <b>마무리 (배포/문서화 등)</b> | 24.09.21 - 24.10.19   | 4주           |

## 2) 인원 및 역할

- [1인](https://github.com/Gannies/Gannies_BackEnd/wiki/%EA%B9%80%EC%9E%AC%EC%97%B0%EB%8B%98%EA%B3%BC%EC%9D%98-%ED%98%91%EC%97%85-%EC%A4%91%EB%8B%A8-%EA%B2%BD%EC%9C%84%EC%84%9C)

    | **담당자** | **역할**                                                                                              |
    |----------|----------------------------------------------------------------------------------------------------------|
    | <b>이가린</b> <br> [<i>(devellybutton)</i>](https://github.com/devellybutton)     | • 데이터베이스 설계 <br> • API 설계 및 구현 <br> • 서버 구축 및 배포 |

## 3) 기술스택

<div align="center">
  <!-- Node.js -->
  <img src="https://img.shields.io/badge/nodedotjs-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <!-- NestJS -->
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <!-- TypeORM -->
  <img src="https://img.shields.io/badge/typeorm-FE0803?style=for-the-badge&logo=typeorm&logoColor=white">
  <!-- TypeScript -->
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <br>
  <!-- MySQL -->
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <!-- Redis Cloud -->
  <img src="https://img.shields.io/badge/redis%20cloud-D93B4A?style=for-the-badge&logo=redis&logoColor=white">
  <!-- AWS RDB (Amazon RDS) -->
  <img src="https://img.shields.io/badge/aws%20rds-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <br>
  <!-- EC2 -->
  <img src="https://img.shields.io/badge/aws%20ec2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
  <!-- S3 -->
  <img src="https://img.shields.io/badge/aws%20s3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white">
  <!-- PM2 -->
  <img src="https://img.shields.io/badge/pm2-2B547E?style=for-the-badge&logo=pm2&logoColor=white">
</div>

- 기술 및 선택 이유
<br>

  | 기술         | 선택 이유                                                                                           |
  |--------------|----------------------------------------------------------------------------------------------------|
  | **NestJS**   | - 서비스 확장성을 고려한 구조화된 아키텍처와 객체 지향 설계 필요 <br> - 구조화된 프로젝트로 유지보수 및 확장성 용이 <br> - 의존성 주입(DI)로 테스트 용이 |
  | **TypeORM**  | - 타입 안정성 제공, Active Record/Data Mapper 패턴을 지원하여 유연한 DB 작업 가능 <br> - 마이그레이션 및 버전 관리 용이 <br> -  복잡한 쿼리도 타입 안정성 보장하며 구현 가능 |
  | **MySQL**    | - 관계형 모델이므로 데이터 일관성 보장 <br> - NoSQL에 비해 ACID 특성으로 트랜잭션 안정성 확보 <br> - 데이터 정합성 관리가 용이하고 강력한 인덱싱 기능으로 복잡한 쿼리 최적화 가능 |
  | **Redis**    | - 메모리 DB를 활용한 빠른 인증 기능<i>(가입 시 이메일 인증 링크, 세션 정보 저장)</i> <br> - 세션 클러스터링 지원 <br> - 임시 데이터 처리에 최적화되어 서버 부하 감소 |
  | **PM2**      | - 무중단 배포, 자동 프로세스 관리, 실시간 모니터링 기능 제공 |

## 4) 개발환경

- <b>Node.js</b> : v20.9.0
- <b>NestJS</b> : @nestjs/core@10.4.1 
- <b>TypeORM</b> : typeorm@0.3.20
- <b>TypeScript</b> : typescript@5.6.2
- <b>MySQL</b> : 8.0.39
- <b>Redis</b> : (Cloud)
- <b>PM2</b> : 5.4.2
- <b>npm</b> : 10.1.0
- <b>socket.io</b> : 10.4.4

---

# 2. 프로젝트 아키텍쳐
> - <b>[전체 프로젝트 구조](#1-전체-프로젝트-구조)</b>
> - <b>[인증 시퀀스 다이어그램](#2-인증-시퀀스-다이어그램)</b>
> - <b>[게시판 에디터 시퀀스 다이어그램](#3-게시판-에디터-시퀀스-다이어그램)</b>

## 1) 전체 프로젝트 구조

## 2) 인증 시퀀스 다이어그램
### 일반 로그인
![일반](https://github.com/user-attachments/assets/09cefe60-1554-44c3-91ad-5b2b64d6f421)
### 자동 로그인
- 사용자가 별도의 조작 없이, 페이지 로딩과 동시에 자동으로 로그인 되어 있는 상태를 의미

![자동](https://github.com/user-attachments/assets/ac0646ee-05d2-4582-8c88-46dd49b75622)
### 세션 연장
![세션연장](https://github.com/user-attachments/assets/d0b9f30f-f4d3-41d3-b5d5-207327199591)
### 로그아웃 
![로그아웃](https://github.com/user-attachments/assets/8378dd9e-8904-4cd6-a498-4d1dadb81788)

## 3) 게시판 에디터 시퀀스 다이어그램

---

# 3. 이슈 해결

## 1) Redis를 통한 실시간 좋아요 수 관리 및 성능 최적화

## 2) 세션 쿠키 동적 설정을 위한 자동 로그인 구현

| 항목   | 내용                                                                                                                                                                                                                                                                                                      |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 상황   | • 자동 로그인 기능 구현 시 약 2주 정도의 세션 만료 기한 필요 <br> • 로그인 요청 시 이메일, 비밀번호와 함께 autoLogin 여부를 request body로 전송       |
| 문제   | • <b>컨트롤러에서 @Query로 autoLogin을 받을 경우의 단점</b> <br> - 세션 옵션을 동적으로 설정하기 어려움 (환경변수와 쿼리에 따른 유연한 대응 제한) <br> - 세션 미들웨어가 이미 적용된 후에 쿼리를 처리하므로 타이밍 이슈 발생 가능 <br> • <b>Request body로 받을 때의 잠재적 문제점</b> <br> - REST API 설계 관점에서 URL 파라미터로 표현하는 것이 더 명확할 수 있음. <br> - 로그인 요청 시마다 body에 추가 필드를 포함해야 하는 번거로움 <br> - 프론트엔드에서 별도의 데이터 구조 관리 필요 |
| 해결   | • 메인 애플리케이션 설정(main.ts)에서 미들웨어를 통해 request query의 autoLogin 값에 따라 세션 옵션을 동적으로 생성하여 적용하도록 구성함.  |                                        
| 개선된 점 | • 로그인 컨트롤러에서 별도로 쿠키 옵션을 처리하지 않아도 되며, 쿼리 파라미터에 따라 세션 옵션(만료기간 등)을 동적으로 설정할 수 있게 됨. <br> • API 엔드포인트도 더 RESTful한 형태로 유지 가능 |

<details>
<summary><i>개선 후 - 동적 세션 옵션 설정</i></summary>
<div markdown="1">

src/main.ts

```
  app.use(cookieParser());
  app.use((req, res, next) => {
    const autoLogin = req.query.autoLogin === 'true';
    const sessionOptions = sessionConfigService.createSessionOptions(autoLogin);
    session(sessionOptions)(req, res, next);
  });
```

</div>
</details>

<details>
<summary><i>개선 후 - 세션 옵션 및 생성 및 구성 서비스</i></summary>
<div markdown="1">

src/config/session.config.ts

```
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import { sendCookieOptions } from 'src/auth/services';
import { ConversionUtil } from 'src/common/utils/conversion.utils';

export class SessionConfigService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly configService: ConfigService,
  ) {}

  createSessionOptions(autoLogin: boolean) {
    const redisStore = new RedisStore({ client: this.redisClient });

    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      ...sendCookieOptions(),
      maxAge: autoLogin
        ? 14 * 24 * 60 * 60 * 1000 // 자동 로그인 기한: 2주
        : isProduction
          ? 2 * 60 * 60 * 1000 // 배포 환경: 2시간
          : 24 * 60 * 60 * 1000, // 로컬 환경: 24시간
    };

    return {
      store: redisStore,
      secret: this.configService.get<string>('SESSION_SECRET') || 'gannies_session_default',
      resave: ConversionUtil.stringToBoolean(this.configService.get<string>('SESSION_RESAVE')) || false,
      saveUninitialized:
        ConversionUtil.stringToBoolean(this.configService.get<string>('SESSION_SAVE_UNINITIALIZED')) || false,
      cookie: cookieOptions,
    };
  }
}
```
</details>

<br>

---

# 5. 배포

  1. EC2 인스턴스 생성
  2. HTTPS용 로드 밸런서(Elastic Load Balancer, ELB) 설정
  3. EC2에 Node.js 및 PM2 설치
  4. Github Action에 appleboy/ssh-action을 사용하여 EC2 접속
  5. Github에서 소스코드를 가져옴.
  6. npm i 후 NestJS 프로젝트를 빌드
  7. pm2로 서버 코드 실행

---

# 6. 느낀점

- ## 1) 기술 선택의 새로운 기준으로 안전성을 생각하게 됨

    - 혼자 서버를 만들면서 개발 과정에서 발생하는 <b>`인적 오류의 위험성`</b>을 느꼈음. 
    - 성능과 편의성도 중요하지만, 개발 초기 단계부터 <b>`실수를 방지할 수 있는 방법`</b>을 고려하는게 더 중요하다고 생각함. 
    - <b>`인적 실수를 방지`</b>할 수 있는 기술을 선택하며, <b>`체계적인 설계`</b>를 통해 오류를 예방하고, 지속적인 테스트를 수행하여 안정적인 시스템을 구축하는 것이 중요할 것 같음.

- ## 2) 효과적인 의사소통을 위한 도식 활용

    - 효과적인 의사소통을 위해서는 <b>`도식 활용`</b>이 도움이 됨 
    - 데이터 구조와 단일 API의 기능까지 기술적 아이디어를 전달할 때 <b>`시퀀스 다이어그램`</b>과 같은 도식을 활용하면 복잡한 로직을 명확하게 시각화할 수 있음.
    - 이는 <b>`논리적 오류를 줄이고`</b> 팀원들과 <b>`원활한 소통`</b>을 가능하게 하였음.

- ## 3) 프로그래밍은 궁극적인 목표를 달성하기 위한 도구

    - 간호학과 커뮤니티 사이트를 개발하면서, 개발할 때 기술적인 내용도 신경을 써야하지만 실제 사용자에게 제공되는 서비스 콘텐츠가 더 중요하다는 것을 깨달았음.
    - 즉, 프로그래밍은 서비스를 구현하기 위한 도구라는 것을 이해하게 되었고, <b>`비즈니스 로직에 집중`</b>해야 한다는 것을 깨달았음.