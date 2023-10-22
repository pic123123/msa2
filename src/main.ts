import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // nestjs logger
  const logger = new Logger('Bootstrap main.ts');
  const portNumber = 7002;

  const allowlist = [
    `http://localhost:3000`,
    `http://localhost:3001`,
    `https://test-wakeup.plto.com`,
    `http://test-wakeup.plto.com`,
    `http://stag-wakeup.plto.com`,
    `http://stag-wakeup.plto.com`,
    `http://wakeup.plto.com`,
    `http://wakeup.plto.com`,
  ];

  app.enableCors({
    origin: allowlist, // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.이거없으면 cors걸림
  });

  //모든 RESTAPI는 api로 시작한다. ex: http://localhost:7070/api/*
  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(portNumber);
  process.env.NODE_ENV === 'dev' &&
    logger.debug(`app listen port : ${portNumber}`);
}
bootstrap();
