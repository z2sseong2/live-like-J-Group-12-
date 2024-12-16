document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton"); // 메뉴 버튼
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

    // 각각의 버튼에 이벤트 추가
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

    // 로고 버튼 클릭 시, Page 2로 이동
    document.getElementById("logoButton").addEventListener("click", () => {
        window.location.href = "../Page 2_Hub Page/calendar.html";
    });

    /* === 년도 선택 및 월 선택 관련 코드 === */

    const currentYearButton = document.getElementById("currentYearButton");
    const overlay = document.getElementById("overlay");
    const monthOverlay = document.getElementById("month-selection-overlay");
    const yearOptionsDiv = document.querySelector(".year-options");
    const monthOptionsDiv = document.querySelector(".month-options");
    const currentDecadeSpan = document.getElementById("current-decade");
    const prevDecadeButton = document.getElementById("prev-decade");
    const nextDecadeButton = document.getElementById("next-decade");
    const backToYearSelectionButton = document.getElementById(
        "back-to-year-selection"
    );

    let currentStartYear = 2020; // 현재 표시 중인 10년 범위의 시작 년도

    // 드롭다운 메뉴에 년도 버튼 업데이트
    function updateYearOptions(startYear) {
        yearOptionsDiv.innerHTML = ""; // 기존 버튼 초기화
        for (let year = startYear; year < startYear + 10; year++) {
            const yearButton = document.createElement("button");
            yearButton.textContent = year;
            yearButton.addEventListener("click", () => {
                overlay.style.display = "none"; // 년도 선택 드롭다운 숨기기
                monthOverlay.style.display = "flex"; // 월 선택 화면 표시
                currentYearButton.textContent = year; // 현재 년도 업데이트
                alert(`Selected Year: ${year}`);
            });
            yearOptionsDiv.appendChild(yearButton);
        }
        currentDecadeSpan.textContent = `${startYear} - ${startYear + 9}`;
    }

    // 초기 드롭다운 내용 설정
    updateYearOptions(currentStartYear);

    // 이전 10년 이동 버튼
    prevDecadeButton.addEventListener("click", () => {
        currentStartYear -= 10;
        updateYearOptions(currentStartYear);
    });

    // 다음 10년 이동 버튼
    nextDecadeButton.addEventListener("click", () => {
        currentStartYear += 10;
        updateYearOptions(currentStartYear);
    });

    // 현재 년도 버튼 클릭 시 드롭다운 표시
    currentYearButton.addEventListener("click", () => {
        overlay.style.display = "flex"; // 드롭다운 표시
    });

    // 배경 클릭 시 드롭다운 숨기기
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none"; // 드롭다운 숨기기
        }
    });

    // 월 선택 화면 초기화
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    months.forEach((month) => {
        const monthButton = document.createElement("button");
        monthButton.textContent = month;
        monthButton.dataset.month = month;
        monthButton.addEventListener("click", () => {
            alert(`Selected Month: ${month}`);
            monthOverlay.style.display = "none"; // 월 선택 화면 숨기기
            // 선택된 년도 및 월을 기반으로 추가 로직을 구현 가능
        });
        monthOptionsDiv.appendChild(monthButton);
    });

    // Back 버튼 클릭 시 년도 선택 화면으로 돌아가기
    backToYearSelectionButton.addEventListener("click", () => {
        monthOverlay.style.display = "none"; // 월 선택 화면 숨기기
        overlay.style.display = "flex"; // 년도 선택 화면 다시 표시
    });

    /* === 년도 및 월 선택 관련 코드 끝 === */
});
