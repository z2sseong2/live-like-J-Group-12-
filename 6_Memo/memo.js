document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton"); // 메뉴버튼
    const menuBox = document.getElementById("menuBox");

    function updateView() {
        if (viewMode === "month") {
            updateHeader();
            generateCalendar(month, year);
        } else if (viewMode === "weekly") {
            generateWeeklyView();
        }
    }

    menuButton.addEventListener("click", () => {
        // 메뉴 박스의 표시 여부를 토글
        if (menuBox.style.display === "none" || menuBox.style.display === "") {
            menuBox.style.display = "block"; // 메뉴 보이기
        } else {
            menuBox.style.display = "none"; // 메뉴 숨기기
        }
        updateView();
    });

    // 각각의 버튼에 이벤트 추가 (필요에 따라 수정 가능)
    document.getElementById("profileButton").addEventListener("click", () => {
        alert("Profile clicked");
        window.location.href = "../Page 4_My Page/mypage.html"; // mypage로 이동
    });
    document.getElementById("schedulesButton").addEventListener("click", () => {
        alert("Schedules clicked");
    });
    document.getElementById("todoListButton").addEventListener("click", () => {
        alert("ToDoList clicked");
    });
    document
        .getElementById("challengeMapButton")
        .addEventListener("click", () => {
            alert("ChallengeMap clicked");
        });
    document.getElementById("memoButton").addEventListener("click", () => {
        alert("Memo clicked");
    });
    document.getElementById("guidelineButton").addEventListener("click", () => {
        alert("Guideline clicked");
    });
    document.getElementById("settingsButton").addEventListener("click", () => {
        alert("Settings clicked");
    });
    // 로고 버튼 클릭 시, Page2로 이동
    document.getElementById("logoButton").addEventListener("click", () => {
        window.location.href = "../Page 2_Hub Page/calendar.html";
    });
});
// 메모 저장 및 로드 기능
document.addEventListener("DOMContentLoaded", () => {
    const memoInput = document.getElementById("memoInput");
    const saveMemoButton = document.getElementById("saveMemoButton");
    const savedMemoDisplay = document.getElementById("savedMemoDisplay");

    // 저장된 메모 불러오기
    let memoList = JSON.parse(localStorage.getItem("memoList")) || [];
    renderMemoList();

    // 메모 저장
    saveMemoButton.addEventListener("click", () => {
        const memoContent = memoInput.value.trim();

        if (memoContent) {
            memoList.push(memoContent); // 새로운 메모 추가
            localStorage.setItem("memoList", JSON.stringify(memoList)); // localStorage에 저장
            memoInput.value = ""; // 입력 필드 초기화
            renderMemoList(); // 메모 다시 표시
        } else {
            alert("Please write something before saving.");
        }
    });

    // 메모 삭제
    function deleteMemo(index) {
        memoList.splice(index, 1); // 해당 인덱스의 메모 삭제
        localStorage.setItem("memoList", JSON.stringify(memoList)); // localStorage 업데이트
        renderMemoList(); // 화면 다시 표시
    }

    // 메모 목록 화면에 출력
    function renderMemoList() {
        savedMemoDisplay.innerHTML = ""; // 기존 목록 초기화
        memoList.forEach((memo, index) => {
            const memoItem = document.createElement("div");
            memoItem.classList.add("saved-memo"); // 스타일 클래스 추가
            memoItem.textContent = `${memo}`;

            // 삭제 버튼 추가
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "✖";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => deleteMemo(index));

            // 메모 아이템에 삭제 버튼 추가
            memoItem.appendChild(deleteButton);
            savedMemoDisplay.appendChild(memoItem);
        });
    }
});


