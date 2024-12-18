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
        window.location.href = "../4_My/mypage.html"; // mypage로 이동
    });
    document
        .getElementById("challengeMapButton")
        .addEventListener("click", () => {
            window.location.href = "../2_Hub/completion-rate.html"; // 노력지도 페이지로 이동
        });
    document.getElementById("memoButton").addEventListener("click", () => {
        window.location.href = "../6_Memo/memo.html";
    });

    // 로고 버튼 클릭 시, Page 2로 이동
    document.getElementById("logoButton").addEventListener("click", () => {
        window.location.href = "../2_Hub/calendar.html";
    });

    /* === 년도 선택 및 월 선택 관련 코드 === */

    const currentYearButton = document.getElementById("currentYearButton");
    const overlay = document.getElementById("overlay");
    const monthOverlay = document.getElementById("month-selection-overlay");
    const yearOptionsDiv = document.querySelector(".year-options");
    const currentDecadeSpan = document.getElementById("current-decade");
    const prevDecadeButton = document.getElementById("prev-decade");
    const nextDecadeButton = document.getElementById("next-decade");
    const backToYearSelectionButton = document.getElementById(
        "back-to-year-selection"
    );

    let currentStartYear = 2020; // 현재 표시 중인 10년 범위의 시작 년도
    let selectedYear = new Date().getFullYear(); // 선택된 년도 (초기값: 현재 년도)

    // 드롭다운 메뉴에 년도 버튼들 업데이트
    function updateYearOptions(startYear) {
        yearOptionsDiv.innerHTML = ""; // 기존 버튼 초기화
        for (let year = startYear; year < startYear + 10; year++) {
            const yearButton = document.createElement("button");
            yearButton.textContent = year;

            // 년도 버튼 클릭 이벤트
            yearButton.addEventListener("click", () => {
                selectedYear = year; // 선택된 년도 저장
                console.log(`Selected Year: ${selectedYear}`); // 디버그: 선택된 년도 확인
                overlay.style.display = "none"; // 년도 선택 드롭다운 숨기기

                // 현재 년도 버튼 텍스트 업데이트
                currentYearButton.textContent = year;

                // 월 선택 화면 표시
                monthOverlay.style.display = "flex";
            });

            yearOptionsDiv.appendChild(yearButton);
        }

        // 현재 10년 범위 업데이트
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

    const monthContainer = document.querySelector(".month-buttons");

    months.forEach((month, index) => {
        const monthButton = document.createElement("button");
        monthButton.textContent = month;
        monthButton.dataset.month = index; // 0부터 시작하는 월 인덱스 저장

        // 월 선택 버튼 클릭 이벤트
        monthButton.addEventListener("click", () => {
            console.log(
                `Navigating to year: ${selectedYear}, month: ${index + 1}`
            );

            // 월별 캘린더 페이지로 이동
            window.location.href = `../2_Hub/calendar.html?year=${selectedYear}&month=${
                index + 1
            }`;
        });

        monthContainer.appendChild(monthButton);
    });

    // Back 버튼 클릭 시 년도 선택 화면으로 돌아가기
    backToYearSelectionButton.addEventListener("click", () => {
        monthOverlay.style.display = "none"; // 월 선택 화면 숨기기
        overlay.style.display = "flex"; // 년도 선택 화면 다시 표시
    });

    /* === 년도 및 월 선택 관련 코드 끝 === */
});
