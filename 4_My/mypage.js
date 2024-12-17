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
        // 메뉴 박스?�� ?��?�� ?���?�? ?���?
        if (menuBox.style.display === "none" || menuBox.style.display === "") {
            menuBox.style.display = "block"; // 메뉴 보이�?
        } else {
            menuBox.style.display = "none"; // 메뉴 ?��기기
        }
        updateView();
    });

    // 각각?�� 버튼?�� ?��벤트 추�?? (?��?��?�� ?��?�� ?��?�� �??��)
    document.getElementById("profileButton").addEventListener("click", () => {
        alert("Profile clicked");
        window.location.href = "../Page 4_My Page/mypage.html"; // mypage�? ?��?��
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
    // 로고 버튼 ?���? ?��, Page2�? ?��?��
    document.getElementById("logoButton").addEventListener("click", () => {
        window.location.href = "calendar.html";
    });
});

// ?��로필 ?��?��?�� 버튼 ?���? ?��벤트
const progressButtons = document.querySelectorAll(".progress-buttons button");
progressButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        alert(`?���? ?��?�� ?��주율 버튼 ${index + 1} ?���??��!`);
    });
});

// ?���? ?��?�� ?�� ?���? ?��벤트
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 ?�� ?���? 방�??
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const email = document.getElementById("email").value;

    alert(`?��?��?�� ?���?:\n?���?: ${name}\nID: ${id}\nE-mail: ${email}`);
});
