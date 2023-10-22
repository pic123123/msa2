#도커는 기본적으로 이미지가 있어야 컨테이너를 생성하고 동작 시킬 수 있습니다.
#DockerFile은 필요한 최소한의 package를 설치하고 동작하기 위한 자신만의 설정을 담은 파일이며, 이 파일로 이미지를 생성(빌드)하게 됩니다.

FROM node:18.17.0-alpine

# app 환경 설정
ENV TZ 'Asia/Seoul'
# Language
ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
COPY . /

# 작업 디렉토리 설정, 해당 디렉토리를 지정한후 CMD(실행)을 진행
WORKDIR /

# 도커파일에 npm 설치 및 빌드
RUN npm install
RUN npm run build

# 포트번호
EXPOSE 7002

# CMD -> 컨테이너 실행 명령어
CMD npm start