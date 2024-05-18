<img  src="/Ddukddak/README_assets/뚝딱뚝딱.png" alt="" width="500px">

> **2024.04.08 ~ 2024.05.20**

## ✅ 프로젝트 소개

▪️ **기획의도 및 배경**

- 구내식당 / 카페 이용내역(사원증 Tag) 확인용 모바일 App 개발 (기업연계)

[문제제기]

- 당사 임직원은 사내에서 사원증 Tag를 통해 사내 카페테리아에서 음료/식사 비용 등을 결제하고 있음

- 각 사업자가 한 달 치 임직원 사용실적을 취합해 엑셀 형태로 당사 총무 부서에 전달 -> 담당자 내용 검토 -> 급여시스템 일괄등록 -> 사용 금액에 대해 차월 월급에서 차감하는 형태로 월급 명세서에는 사용금액 총계만 표기되는 상태이다.

- 임직원은 실시간 사용 내역을 확인하기 어려운 문제가 발생

[솔루션 도출]

- 결제를 할 때 마다 실시간으로 알림도 오고 사용한 내역을 기록 해주는 앱을 개발해보자 !

▪️ **서비스 목적**

- 사내 임직원들의 편의 향상

▪️ **기대효과**

- 편의성 향상
- 나의 지원금 파악 가능

## ✅ 개발 환경

### ⚙ Management Tool

- 형상 관리 : Gitlab
- 이슈 관리 : Jira
- 커뮤니케이션 : Mattermost, Webex, Notion, Discord
- 디자인 : Figma, PowerPoint

### 💻 IDE

- Visual Studio Code `1.18.5`
- IntelliJ IDEA community `2023.3.2`

### 📱 Frontend

- React `18.2.0`
- Typescript `5.2.2`
- Zustand `4.5.2`
- Axios `1.6.7`
- Websocket `1.0.34`
- firebase `10.11.1`
- stompjs `7.0.0`
- sockjs-client `1.5.4`

### 💾 Backend

- Springboot `3.22`
- Spring Data JPA
- MySql 8.0.34

### Infra

- AWS S3
- AWS EC2
- Nginx 1.18.0
- Docker: 25.0.3
  - mysql: 8.3.0
- Ubuntu 20.04.6 LTS

## ✅ 기능 소개

### 앱 로그인, 관리자 로그인

<table>    
    <tr align="center" > 
        <td><strong>로그인</strong></td>
        <td><strong>회원가입</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src="![앱로그인](/ReadME_asset/AppLogin.png)" alt="" width="500px"> </td>
        <td> <img src="/Ddukddak/README_assets/회원가입.jpg" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 앱 로그인
        </td>
        <td>
            1. 관리자 로그인
        </td>
</table>

### 인트로

<table>    
    <tr align="center" > 
        <td><strong>인트로</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src="/Ddukddak/README_assets/인트로.gif" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 아이 친화적인 UI<br>
            2. 책 추천을 통해 동화 추천 받음<br>
            3. 애니메이션과 배경음을 사용하여 흥미를 유도<br>
            4. 간단한 이용 방법을 설명
        </td>
</table>

### 메인 화면

<table>    
    <tr align="center" > 
        <td><strong>메인</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src="/Ddukddak/README_assets/메인.gif" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 아이를 위한 직관적이고 귀여운 UI<br>
        </td>
</table>

### 사진 저장

<table>    
    <tr align="center" > 
        <td><strong>사진 뚝딱</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src="/Ddukddak/README_assets/사진뚝딱.gif" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 얼굴이 한명만 나오게 저장해야함 <br>
            2. 갤러리에서 불러오기 <br>
            3. 카메라로 촬영
        </td>
</table>

### 목소리 저장

<table>    
    <tr align="center" > 
        <td><strong>소리 뚝딱</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src="/Ddukddak/README_assets/목소리추가.gif" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 간단한 동화를 30초 이상 읽기 <br>
            2. 목소리를 저장시키며 AI 학습
        </td>
</table>

### 색칠하기

<table>    
    <tr align="center" > 
        <td><strong>색칠 뚝딱</strong></td>
    </tr>
    <tr align="center"> 
        <td> <img src="/Ddukddak/README_assets/색칠하기.gif" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 원하는 그림을 선택<br>
            2. 색을 고르며 색칠할수있음            
        </td>
</table>

### 동화생성

<table>    
    <tr align="center" > 
        <td><strong>동화 뚝딱</strong></td>
    </tr>
    <tr align="center">
        <td> <img src="/Ddukddak/README_assets/동화뚝딱.gif" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 주인공의 얼굴과 소리 추가 <br>
            2. 서브역할의 얼굴과 소리 추가<br>
            3. 내래이션 소리 추가<br>
            4. 동화책의 이름 정하기 <br>
            5. 동화생성이 완료되면 푸쉬알람
        </td>
</table>

### 동화 속 주인공과 대화하기

<table>    
    <tr align="center" > 
        <td><strong>뚝딱 대화</strong></td>
    </tr>
    <tr align="center">
        <td> <img src="/Ddukddak/README_assets/뚝딱대화.gif" alt="" width="500px"> </td>
    </tr>
    <tr> 
        <td>
            1. 동화에 나오는 캐릭터와 대화하기            
        </td>
</table>

## ✅ 활용기술, 기술 설명

## ✅ 산출물

<table>    
    <tr align="center" > 
        <td><strong>개발 목업</strong></td>
        <td><strong>API 명세서</strong></td>
    </tr>
    <tr align="center">
        <td> <img src="/Ddukddak/README_assets/최종피그마.png" alt="" width="500px"></td>
        <td> <img src="/Ddukddak/README_assets/API.gif" alt="" width="500px"></td>
    </tr>
</table>
<table>
    <tr align="center" > 
      <td><strong>ERD</strong></td>
      <td><strong>아키텍처</strong></td>
    </tr>
    <tr align="center">
        <td> <img title="" src="/Ddukddak/README_assets/ERD_DDUKDDAK.png" alt="" width="500px" /></td>
        <td> <img src="/Ddukddak/README_assets/architecture.png" alt="" width="500px" /></td>
    </tr>

</table>
<br>
<table>
    <tr align="center" > 
        <th>5주차 번다운차트</th>
        <th>4주차 번다운차트</th>
        <th>3주차 번다운차트</th>
        <th>2주차 번다운차트</th>
        <th>1주차 번다운차트</th>
    </tr>
    <tr align="center">
        <td> <img src="/Ddukddak/README_assets/5ndB.PNG" alt="" width="500px"> </td>
        <td> <img  src="/Ddukddak/README_assets/4ndB.PNG" alt="" width="500px"> </td>
        <td><img  src="/Ddukddak/README_assets/3ndB.PNG" alt="" width="500px"></td>
        <td><img  src="/Ddukddak/README_assets/2ndB.PNG" alt="" width="500px"></td>
        <td><img  src="/Ddukddak/README_assets/1ndB.PNG" alt="" width="500px"></td>
    </tr>
</table>

## 🧾컴포넌트

### FE

<details>
<summary>Front-End</summary>
<div markdown="1">

```
┗📦src
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜 AlertModal.tsx
 ┃ ┃ ┣ 📜 Button.tsx
 ┃ ┃ ┣ 📜 Design.tsx
 ┃ ┃ ┣ 📜 Error.tsx
 ┃ ┃ ┣ 📜 Footer.tsx
 ┃ ┃ ┣ 📜 Icons.tsx
 ┃ ┃ ┣ 📜 LoadingOrError.tsx
 ┃ ┃ ┣ 📜 NavBar.tsx
 ┃ ┃ ┣ 📜 Pagination.tsx
 ┃ ┃ ┣ 📜 TextSearch.tsx
 ┃ ┃ ┣ 📜 Title.tsx
 ┃ ┣ 📂users
 ┃ ┃ ┣ 📜 Card.tsx
 ┃ ┃ ┣ 📜 ContentBox.tsx
 ┃ ┃ ┣ 📜 KakaoMap.tsx
 ┃ ┃ ┣ 📜 Line.tsx
 ┃ ┃ ┣ 📜 ProfileBox.tsx
 ┃ ┃ ┣ 📜 ProfileEditModal.tsx
 ┃ ┃ ┣ 📜 Title.tsx
 ┃ ┣ 📂animalinfo
 ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┣ 📜LikeButton.tsx
 ┃ ┃ ┣ 📜search.css
 ┃ ┃ ┣ 📜style.tsx
 ┃ ┃ ┣ 📂lostanimals
 ┃ ┃ ┃ ┣ 📜LostAnimalCard.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalSearch.tsx
 ┃ ┃ ┣ 📂mungbti
 ┃ ┃ ┃ ┣ 📜 AnimalMatching.tsx
 ┃ ┃ ┣ 📂savedanimals
 ┃ ┃ ┃ ┣ 📜SaveAnimalCard.tsx
 ┃ ┃ ┃ ┣ 📜SaveAnimalSearch.tsx
 ┃ ┃ ┃ ┣ 📜SavedAnimalList.tsx
 ┃ ┣ 📂	articles
 ┃ ┃ ┣ 📜ArticleCard.tsx
 ┃ ┃ ┣ 📜 ArticleContent.tsx
 ┃ ┃ ┣ 📜 ArticleEditor.tsx
 ┃ ┃ ┣ 📜 ArticleInterface.ts
 ┃ ┃ ┣ 📜 ArticleList.tsx
 ┃ ┃ ┣ 📜 Likes.tsx
 ┃ ┃ ┣ 📜 PreviewModal.tsx
 ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┣  📜Comment.tsx
 ┃ ┃ ┃ ┣  📜CommentForm.tsx
 ┃ ┃ ┃ ┣  📜CommentList.tsx
 ┃ ┣ 📂Broadcast
 ┃ ┃ ┣ 📜 AnimalList.tsx
 ┃ ┃ ┣ 📜 AnimalSearchForBroadcast.tsx
 ┃ ┃ ┣ 📜 BroadcastDetail.tsx
 ┃ ┃ ┣ 📜 BroadcastForm.tsx
 ┃ ┃ ┣ 📜 Chat.tsx
 ┃ ┃ ┣ 📜 MyVideo.tsx
 ┃ ┃ ┣ 📜 SessionComponent.tsx
 ┃ ┃ ┣ 📜 simpleEncrypt.ts
 ┃ ┣ 📂notificationss
 ┃ ┃ ┣ 📜NotiModal.tsx
 ┃ ┣ 📂visits
 ┃ ┃ ┣ 📜 AdoptionInfoModal.tsx
 ┃ ┃ ┣ 📜 ReservationInfo.tsx
 ┃ ┃ ┣ 📜 ReservationList.tsx
 ┃ ┃ ┣ 📜ScheduleCard.tsx
 ┣ 📂pages
 ┃ ┣ 📂	users
 ┃ ┃ ┣ 📜SignUpPage.tsx
 ┃ ┃ ┣ 📜SignUpPage.tsx
 ┃ ┃ ┣ 📜ProfilePage.tsx
 ┃ ┃ ┣ 📜VisitManagementPage.tsx
 ┃ ┣ 📂	home
 ┃ ┃ ┣ 📜HomePage.tsx
 ┃ ┃ ┣ 📜LandingPage.tsx
 ┃ ┣ 📂animals
 ┃ ┃ ┣ 📜SavedAnimalManagementPage.tsx
 ┃ ┃ ┣ 📜StyleDetail.tsx
 ┃ ┃ ┣ 📂lostanimals
 ┃ ┃ ┃ ┣ 📜LostAnimalDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalFormPage.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalListPage.tsx
 ┃ ┃ ┃ ┣ 📜LostAnimalUpdatePage.tsx
 ┃ ┃ ┣ 📂mungbti
 ┃ ┃ ┃ ┣ 📜MungBTIPage.tsx
 ┃ ┃ ┣ 📂savedanimals
 ┃ ┃ ┃ ┣ 📜AnimalDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜AnimalFormPage.tsx
 ┃ ┃ ┃ ┣ 📜AnimalListPage.tsx
 ┃ ┃ ┃ ┣ 📜AnimalUpdatePage.tsx
 ┃ ┣ 📂	visits
 ┃ ┃ ┣ 📜VisitManagementPage.tsx
 ┃ ┃ ┣ 📜VisitReservationListPage.tsx
 ┃ ┃ ┣ 📜VisitReservationPage.tsx
 ┃ ┣ 📂articles
 ┃ ┃ ┣ 📜ArticleDetailPage.tsx
 ┃ ┃ ┣ 📜ArticleListPage.tsx
 ┃ ┃ ┣ 📜articleLoader.ts
 ┃ ┃ ┣ 📜ArticleWritePage.tsx
 ┃ ┣ 📂broadcast
 ┃ ┃ ┣ 📜BoradcastListPage.tsx
 ┃ ┃ ┣ 📜BroadCastPage.tsx
 ┃ ┣ 📂notice
 ┃ ┃ ┣ 📜NoticeListPage.tsx
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜AdminPage.tsx
 ┃ ┣ 📂message
 ┃ ┃ ┣ 📜MessageListPage.tsx
 ┣ 📂store
 ┃ ┣ 📜 broadcastSlice.ts
 ┃ ┣ 📜 store.ts
 ┣ 📂utils
 ┃ ┣ 📜articleAPI.ts
 ┃ ┣ 📜axios.ts
 ┃ ┣ 📜broadcastAPI.ts
 ┃ ┣ 📜LostAPI.ts
 ┃ ┣ 📜notificationsAPI.ts
 ┃ ┣ 📜S3.ts
 ┃ ┣ 📜SaveAPI.ts
 ┃ ┣ 📜tanstackQuery.ts
 ┃ ┣ 📜uitl.ts
 ┃ ┣ 📜UserAPI.ts
 ┃ ┣ 📜VisitAPI.ts
 ┣ 📜App.tsx
 ┗ 📜main.tsx
```

</div>
</details>

## ✅ 팀원소개

<img  src="/Ddukddak/README_assets/팀원.PNG" alt="" width="500px">
