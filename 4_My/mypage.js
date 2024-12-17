// script.js

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

// 프로필 섹션의 버튼 클릭 이벤트
const progressButtons = document.querySelectorAll(".progress-buttons button");
progressButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        alert(`평균 일일 완주율 버튼 ${index + 1} 클릭됨!`);
    });
});

// 정보 섹션 폼 제출 이벤트
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const email = document.getElementById("email").value;

    alert(`입력된 정보:\n이름: ${name}\nID: ${id}\nE-mail: ${email}`);
});
