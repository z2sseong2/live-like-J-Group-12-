document.addEventListener("DOMContentLoaded", () => {
    const calendarElement = document.getElementById("calendar"); //Ï∫òÎ¶∞?çî
    const menuButton = document.getElementById("menuButton"); //Î©îÎâ¥ Î≤ÑÌäº
    const todayButton = document.getElementById("today-btn"); //?ò§?äò ?Ç†ÏßúÎ°ú ?ã¨?†• ?ù¥?èô
    const currentMonthElement = document.getElementById("current-month"); //Î™áÏõî?ù∏Ïß? ?Çò????ÉÑ
    const prevButton = document.getElementById("prev-month-btn"); //?†Ñ ?ã¨ ?ù¥?èô
    const nextButton = document.getElementById("next-month-btn"); //?ã§?ùå ?ã¨ ?ù¥?èô
    const monthPlansButton = document.getElementById("month-btn"); //?õîÍ∞? planner ?ù¥?èô
    const weeklyPlansButton = document.getElementById("weekly-btn"); //Ï£ºÍ∞Ñ planner ?ù¥?èô
    const inputScheduleButton = document.getElementById("inputschedule-btn"); //plan ?ûÖ?†•
    const menuBox = document.getElementById("menuBox");

    let today = new Date(); //?ò§?äò ?Ç†Ïß?
    let month = today.getMonth(); //?ù¥Î≤? ?ã¨
    let year = today.getFullYear(); //?ò¨?ï¥ ?ÖÑ?èÑ
    let viewMode = "month";

    // Î°úÏª¨ ?ä§?Ü†Î¶¨Ï???óê?Ñú Í≥ÑÌöç Î∂àÎü¨?ò§Í∏?
    const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

    // ?ã¨?†• ?ó§?çî ?óÖ?ç∞?ù¥?ä∏ ?ï®?àò
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

    // ?ã¨?†• ?Éù?Ñ± ?ï®?àò
    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // ?ù¥Î≤? ?ã¨ ÎßàÏ??Îß? ?Ç†Ïß?
        const firstDay = new Date(year, month, 1).getDay(); // ?ù¥Î≤? ?ã¨ 1?ùº ?öî?ùº
        const prevMonthDays = new Date(year, month, 0).getDate(); // ?†Ñ ?ã¨ ÎßàÏ??Îß? ?Ç†Ïß?

        const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

        // ?ã¨?†• Íµ¨Ï°∞ ?Éù?Ñ±(?Öå?ù¥Î∏?)
        let calendarHTML = "<table>";
        calendarHTML +=
            '<tr class="tb-head"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

        let date = 1;
        let nextMonthDate = 1;

        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr class="tb-body">';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    // ?†Ñ ?ã¨(?ùêÎ¶¨Í≤å)
                    const prevDate = prevMonthDays - firstDay + j + 1;
                    calendarHTML += `<td class="blurred">${prevDate}</td>`;
                } else if (date > daysInMonth) {
                    // ?ã§?ùå ?ã¨(?ùêÎ¶¨Í≤å)
                    calendarHTML += `<td class="blurred">${nextMonthDate}</td>`;
                    nextMonthDate++;
                } else {
                    // ?ù¥Î≤? ?ã¨
                    //?ò§?äò ?Ç†Ïß? Ï∞æÍ∏∞
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

    /*  updateViewÎ°úÌÜµ?ï©
    function updateCalendar() {
        updateHeader();
        generateCalendar(month, year);
    }*/
    function generateWeeklyView() {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Ï£? ?ãú?ûë?ùº Í≥ÑÏÇ∞

        let weeklyHTML = '<table id="weekly-plans"><thead><tr>';
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
            weeklyHTML += `<th>${day}</th>`;
        });
        weeklyHTML += "</tr></thead><tbody><tr>";

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            const dateString = currentDate.toISOString().split("T")[0];
            const plans = savedPlans[dateString] || []; // ????û•?êú Í≥ÑÌöç Í∞??†∏?ò§Í∏?

            weeklyHTML += `<td>
                ${
                    plans.length > 0
                        ? `<ul>${plans
                              .map((plan) => `<li>${plan}</li>`)
                              .join("")}</ul>`
                        : "<div></div>"
                } <!-- Í≥ÑÌöç?ù¥ ?óÜ?úºÎ©? Í≥µÎ∞± -->
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

    // ?ò§?äò ?Ç†ÏßúÎ°ú ?èå?ïÑ????Ñú ?ã¨?†• ?ã§?ãú ?Éù?Ñ±
    todayButton.addEventListener("click", () => {
        month = today.getMonth(); //?ù¥Î≤? ?ã¨
        year = today.getFullYear(); //?ò¨?ï¥ ?ÖÑ?èÑ

        updateView();
    });

    // ?†Ñ ?ã¨Î°? ?ù¥?èô
    prevButton.addEventListener("click", () => {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        updateView();
    });

    // ?ã§?ùå ?ã¨Î°? ?ù¥?èô
    nextButton.addEventListener("click", () => {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        updateView();
    });

    // Input Schedule ?éò?ù¥Ïß?Î°? ?ù¥?èô
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
        // Î©îÎâ¥ Î∞ïÏä§?ùò ?ëú?ãú ?ó¨Î∂?Î•? ?Ü†Í∏?
        if (menuBox.style.display === "none" || menuBox.style.display === "") {
            menuBox.style.display = "block"; // Î©îÎâ¥ Î≥¥Ïù¥Í∏?
        } else {
            menuBox.style.display = "none"; // Î©îÎâ¥ ?à®Í∏∞Í∏∞
        }
        updateView();
    });

    // Í∞ÅÍ∞Å?ùò Î≤ÑÌäº?óê ?ù¥Î≤§Ìä∏ Ï∂îÍ?? (?ïÑ?öî?óê ?î∞?ùº ?àò?†ï Í∞??ä•)
    document.getElementById("profileButton").addEventListener("click", () => {
        alert("Profile clicked");
        window.location.href = "mypage.html"; // mypageÎ°? ?ù¥?èô
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
