document.addEventListener("DOMContentLoaded", () => {
    const calendarElement = document.getElementById("calendar"); //캘린?��
    const menuButton = document.getElementById("menuButton"); //메뉴 버튼
    const todayButton = document.getElementById("today-btn"); //?��?�� ?��짜로 ?��?�� ?��?��
    const currentMonthElement = document.getElementById("current-month"); //몇월?���? ?��????��
    const prevButton = document.getElementById("prev-month-btn"); //?�� ?�� ?��?��
    const nextButton = document.getElementById("next-month-btn"); //?��?�� ?�� ?��?��
    const monthPlansButton = document.getElementById("month-btn"); //?���? planner ?��?��
    const weeklyPlansButton = document.getElementById("weekly-btn"); //주간 planner ?��?��
    const inputScheduleButton = document.getElementById("inputschedule-btn"); //plan ?��?��
    const menuBox = document.getElementById("menuBox");

    let today = new Date(); //?��?�� ?���?
    let month = today.getMonth(); //?���? ?��
    let year = today.getFullYear(); //?��?�� ?��?��
    let viewMode = "month";

    // 로컬 ?��?��리�???��?�� 계획 불러?���?
    const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

    // ?��?�� ?��?�� ?��?��?��?�� ?��?��
    function updateHeader() {
        const monthNames = [
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
        currentMonthElement.textContent = `${year} ${monthNames[month]}`;
    }

    // ?��?�� ?��?�� ?��?��
    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // ?���? ?�� 마�??�? ?���?
        const firstDay = new Date(year, month, 1).getDay(); // ?���? ?�� 1?�� ?��?��
        const prevMonthDays = new Date(year, month, 0).getDate(); // ?�� ?�� 마�??�? ?���?

        const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

        // ?��?�� 구조 ?��?��(?��?���?)
        let calendarHTML = "<table>";
        calendarHTML +=
            '<tr class="tb-head"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

        let date = 1;
        let nextMonthDate = 1;

        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr class="tb-body">';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    // ?�� ?��(?��리게)
                    const prevDate = prevMonthDays - firstDay + j + 1;
                    calendarHTML += `<td class="blurred">${prevDate}</td>`;
                } else if (date > daysInMonth) {
                    // ?��?�� ?��(?��리게)
                    calendarHTML += `<td class="blurred">${nextMonthDate}</td>`;
                    nextMonthDate++;
                } else {
                    // ?���? ?��
                    //?��?�� ?���? 찾기
                    const isToday =
                        date === today.getDate() &&
                        month === today.getMonth() &&
                        year === today.getFullYear();
                    const currentDate = `${year}-${String(month + 1).padStart(
                        2,
                        "0"
                    )}-${String(date).padStart(2, "0")}`;
                    const plans = savedPlans[currentDate] || [];

                    calendarHTML += `<td class="tb-day ${
                        isToday ? "current-day" : ""
                    }" data-date="${currentDate}">
                                        <div>${date}</div>
                                        ${plans
                                            .map(
                                                (plan, index) =>
                                                    `<div class="plan">${plan}</div>`
                                            )
                                            .join("")}
                                     </td>`;
                    date++;
                }
            }
            calendarHTML += "</tr>";
        }
        calendarHTML += "</table>";
        calendarElement.innerHTML = calendarHTML;
    }

    /*  updateView로통?��
    function updateCalendar() {
        updateHeader();
        generateCalendar(month, year);
    }*/
    function generateWeeklyView() {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // �? ?��?��?�� 계산

        let weeklyHTML = '<table id="weekly-plans"><thead><tr>';
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
            weeklyHTML += `<th>${day}</th>`;
        });
        weeklyHTML += "</tr></thead><tbody><tr>";

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            const dateString = currentDate.toISOString().split("T")[0];
            const plans = savedPlans[dateString] || []; // ????��?�� 계획 �??��?���?

            weeklyHTML += `<td>
                ${
                    plans.length > 0
                        ? `<ul>${plans
                              .map((plan) => `<li>${plan}</li>`)
                              .join("")}</ul>`
                        : "<div></div>"
                } <!-- 계획?�� ?��?���? 공백 -->
            </td>`;
        }
        weeklyHTML += "</tr></tbody></table>";

        calendarElement.innerHTML = weeklyHTML;
    }
    function updateView() {
        if (viewMode === "month") {
            updateHeader();
            generateCalendar(month, year);
        } else if (viewMode === "weekly") {
            generateWeeklyView();
        }
    }

    // ?��?�� ?��짜로 ?��?��????�� ?��?�� ?��?�� ?��?��
    todayButton.addEventListener("click", () => {
        month = today.getMonth(); //?���? ?��
        year = today.getFullYear(); //?��?�� ?��?��

        updateView();
    });

    // ?�� ?���? ?��?��
    prevButton.addEventListener("click", () => {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        updateView();
    });

    // ?��?�� ?���? ?��?��
    nextButton.addEventListener("click", () => {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        updateView();
    });

    // Input Schedule ?��?���?�? ?��?��
    inputScheduleButton.addEventListener("click", () => {
        window.location.href = "inputschedule.html";
    });
    updateView();

    weeklyPlansButton.addEventListener("click", () => {
        viewMode = "weekly";
        updateView();
    });

    monthPlansButton.addEventListener("click", () => {
        viewMode = "month";
        updateView();
    });

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
        window.location.href = "mypage.html"; // mypage�? ?��?��
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
});
