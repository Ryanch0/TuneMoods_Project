# TuneMoods_Project
<p align="center">
<img src="https://github.com/Ryanch0/TuneMoods_Project/assets/165358637/01b4d99c-c793-4ec9-b2b4-d084e9506009" width="300px"/>
</p>

## 프로젝트 정보
개발공부도중 AI모델에 관심이 생겨서 모델을 웹 서비스에 접목시키고 여러개의 서버를 통합해서 개발해보고자 개인 프로젝트를 진행했습니다. 리액트와 스프링부트의 RESTful API통신 및 파이썬의 감정분석 AI모델을 이용해 개발했습니다.
<br/>
개발기간 : 2024.06.14 ~ 2024.06.21

<br></br>
## 프로젝트 소개
TuneMoods는 유저의 감정을 분석해 그에 맞는 어울리는 노래를 추천,재생 그리고 저장기능까지 지원해주는 프로젝트입니다. 사용자 로그인 및 회원가입페이지, 그리고 감정 상태에 맞는 노래를 추천해주는 메인 페이지로 구성되어있습니다.
<br></br>

## Stacks
### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
<img src="https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white"/>
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             


### Development
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
<img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white" width=80px/>
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white" width=90px/>


<br></br>
## Usecase Diagram
<p align="center">
<img src="https://github.com/Ryanch0/TuneMoods_Project/assets/165358637/e1c2ae4e-7501-4155-a838-ede934a61b55" width="700px"/>
</p>

<br></br>
## 화면 구성
<table style="width:100%">
  <tr>
    <td align="center">
      <img src="https://github.com/Ryanch0/TuneMoods_Project/assets/165358637/e5b12e4d-15d3-499e-9327-f599b9e4c7cf" width="500px" />
      <br>
      <b>로그인 페이지</b>
    </td>
    <td align="center">
      <img src="https://github.com/Ryanch0/TuneMoods_Project/assets/165358637/5250cc99-6e4b-4007-a352-4a909fdd9486" width="500px" />
      <br>
      <b>회원가입 페이지</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/Ryanch0/TuneMoods_Project/assets/165358637/f25b9110-cc51-4e82-8199-98f582ffc8db" width="500px" />
      <br>
      <b>메인 페이지</b>
    </td>
    <td align="center">
      <img src="https://github.com/Ryanch0/TuneMoods_Project/assets/165358637/31f8cc52-4945-42b4-994a-27003c5209f8" width="500px" />
      <br>
      <b>플레이리스트 재생</b>
    </td>
  </tr>
</table>

<br></br>
## 주요 기능
- JWT를 이용한 사용자 인증
- 감정 분석 및 분류
- 감정 기반 노래 추천 및 YouTube Data API v3로 노래 데이터 제공
- 사용자 및 플레이리스트 관리

<br></br>
## 성능 개선
개발에 사용된 모델은 Python의 transformers 라이브러리를 이용한 “nlptown/bert-base-multilingual-uncased-sentiment” 라는 모델이 사용되었습니다. 해당 모델은 영어 기반으로 0~5단계로(좋은,슬픈,화난,짜증,중립 등) 감정을 분석합니다. 따라서 한글로 번역해주는 모델을 추가로 사용했지만 “ㅎㅎ”, “ㅋㅋㅋ”, “ㅡㅡ”, 등 몇몇 감정을 나타내는 키워드는 알아듣지 못해서 따로 훈련을 시켜서 정확도를 향상시킬 수 있었습니다.
