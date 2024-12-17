// 로컬 스토리지에서 계획 데이터 불러와 계산
const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};
let totalPlans = 0;
let completedPlans = 0;

// 전체 작업 및 완료된 작업 수 계산
Object.values(savedPlans).forEach(plans => {
    totalPlans += plans.length;
    completedPlans += plans.filter(plan => plan.includes("(Completed)")).length;
});

// Completion Rate 계산
const completionRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

// HTML에 표시
    document.getElementById("total-tasks").textContent = `Total Tasks: ${totalPlans}`;
    document.getElementById("completed-tasks").textContent = `Completed Tasks: ${completedPlans}`;
    document.getElementById("completion-rate").textContent = `Completion Rate: ${completionRate}%`;
    document.getElementById("progress-bar").style.width = `${completionRate}%`;

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