# Notice-Reminder-Discord-Bot
세종대학교 공지 알리미 디스코드 봇 제작

### 세종대학교 중앙동아리 인터페이스 인커톤
#### 팀원
- 세종대학교 컴퓨터공학과 20학번 박규태
- 세종대학교 전자정보통신공학과 18학번 박상욱


#### 참고 자료
- [discord.js의 Documentation][1]
- [Node.js로 디스코드 봇 만들기][2]
- [디스코드 채널 아이디 알아내기][3]
- [디스코드 봇 하이퍼링크 보내기][4]
- [비동기 함수로 명령어 입력과는 상관없이 실행][5]
- [json 배열 정렬하기(KEY 값으로 정렬하여 태그 붙이기 가능][6]
- [Node.js Docker Image 파일로 변환][7]

[1]:https://discord.js.org/#/
[2]:https://koras02.tistory.com/231
[3]:https://neony.tistory.com/3
[4]:https://www.codegrepper.com/code-examples/javascript/+discord.js+hyperlink+in+embed+title
[5]:https://devjhs.tistory.com/115
[6]:https://emessell.tistory.com/157
[7]:https://minjoon950425.tistory.com/131

#### 개발 언어
Node.js <br>
![Node.js](https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white)

Discord.js <br>
![Discord.js](https://images.opencollective.com/discordjs/529dcce/logo/256.png)

## 개발 기능
- [X] 세종대학교 공지 크롤링
- [X] 공지 종류별로 구분
- [X] 타이머로 일정 시간마다 홈페이지 크롤링
- [X] 사용자가 명령어 입력할 시 해당 시간의 최신 공지사항 종류별로 구분하여 출력
- [X] 디스코드에 공지 출력 시 커스터마이징
- [X] 특정 채팅방에만 공지 나오게 입력
- [X] 수강편람
- [X] 학과 전화번호 및 홈페이지
- [X] tag.json 정렬 및 업데이트 된 새 공지사항에 태그 붙여주기

#### 추후 개발 기능
- RSS로 코드 리팩토링
- 공지사항 통합 검색 기능
- 교내 전화번호 안내 기능 세분화 ex)!컴퓨터공학과 or !컴공 -> 조교실 전화번호, 위치, 사이트 주소 안내
