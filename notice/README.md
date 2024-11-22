# Git commit 규칙

> `feat`: 새로운 기능 추가<br/>
> `fix`: 버그 수정<br/>
> `refactor`: 코드 리팩토링<br/>
> `style`: 코드 형식, 정렬, 주석, 등의 변경(동작 영향x)<br/>
> `test`: 테스트 코드 변경<br/>
> `docs`: 문서 수정<br/>
> `chore`: 기타 등등<br/>

ex)

```
git commit -m "feat: add login page"
```

# Git branch 규칙

1. 개인 작업은 feature 브랜치 만들어서 하기  ex) feature/lyj
2. Pull Request할 때 카톡방 공지하고, merge 전 approve 받기

## branch 생성 흐름

1. local에 클론 만들기<br/>

```
git clone https://github.com/z2sseong2/live-like-J-Group-12-.git
```

2. branch 생성<br/>

```
git branch <branch_name>
```

3. branch로 이동<br/>

```
git switch <branch_name>
```

> branch 생성과 동시에 이동 `git switch -c <branch_name>`

4. 코드 수정 후, add 및 commit

```
git add .
git commit -m "수정 내용"
```

5. git push

```
git push <branch_name>
```

6. Pull request

&nbsp;&nbsp; github repository에 들어가보면 Pull request를 할 수 있다.

7. merge

&nbsp;&nbsp; 팀원에게 approve 받았으면 merge를 할 수있다.

8. branch 삭제

```
git branch -d <branch_name>
```

9. 다른 팀원들 바뀐 코드 불러오기

```
git pull origin main
```
