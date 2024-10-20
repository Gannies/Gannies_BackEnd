import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { SessionConfigService } from './config/session.config';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getAllowedOrigins } from './config/cors.config';
import { ConversionUtil } from './common/utils';
import { winstonLogger } from './config/logger.config';

// NODE_ENV 값에 따라 .env 파일을 다르게 읽음
dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env' // 프로덕션(배포) 환경
      : '.development.env', // 로컬(개발) 환경
  ),
});

async function bootstrap() {
  ConfigModule.forRoot({ isGlobal: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: winstonLogger,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 스웨거 설정
  const config = new DocumentBuilder()
    .setTitle('Gannies API Document')
    .setDescription('중간이들 백엔드 API description')
    .setVersion('1.0')
    .addTag('Gannies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new DatabaseExceptionFilter());

  // 환경변수 설정
  const sessionConfigService = app.get(SessionConfigService);

  app.use(cookieParser());
  app.use((req, res, next) => {
    const autoLogin = req.query.autoLogin === 'true';
    const sessionOptions = sessionConfigService.createSessionOptions(autoLogin);
    session(sessionOptions)(req, res, next);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('ejs');

  const allowedOrigins = getAllowedOrigins(process.env.NODE_ENV);

  app.enableCors({
    origin: (origin, cb) => {
      if (allowedOrigins.includes(origin) || !origin) {
        cb(null, true);
      } else {
        cb(new Error('CORS에 의해 허용되지 않는 요청입니다.'));
      }
    },
    credentials: true,
  });

  const PORT = ConversionUtil.stringToNumber(process.env.PORT);

  winstonLogger.log(`◆◆◆◆◆[ ${PORT}번 포트에서 실행중입니다. ]◆◆◆◆◆`);

  await app.listen(PORT);
}
bootstrap();
