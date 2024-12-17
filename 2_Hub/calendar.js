document.addEventListener("DOMContentLoaded", () => {

    const calendarElement = document.getElementById("calendar"); //캘린더
    const menuButton = document.getElementById("menuButton"); //메뉴 버튼
    const todayButton = document.getElementById("today-btn"); //오늘 날짜로 달력 이동
    const currentMonthElement = document.getElementById("current-month"); //몇월인지 나타냄
    const prevButton = document.getElementById("prev-month-btn"); //전 달 이동
    const nextButton = document.getElementById("next-month-btn"); //다음 달 이동
    const monthPlansButton = document.getElementById("month-btn"); //월간 planner 이동
    const weeklyPlansButton = document.getElementById("weekly-btn"); //주간 planner 이동
    const inputScheduleButton = document.getElementById("inputschedule-btn"); //plan 입력
    const menuBox = document.getElementById("menuBox");
    const popup = document.getElementById("popup");
    const popupDateElement = document.getElementById("popup-date");
    const popupPlansElement = document.getElementById("popup-plans");
    const closePopupButton = popup.querySelector(".close-btn");
    

    let today = new Date(); //오늘 날짜
    let month = today.getMonth(); //이번 달
    let year = today.getFullYear(); //올해 년도
    let viewMode = "month";

    // 로컬 스토리지에서 계획 불러오기
    const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

    // 달력 헤더 업데이트 함수
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

    // 달력 생성 함수
    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const prevMonthDays = new Date(year, month, 0).getDate();
    
        const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};
    
        let calendarHTML = "<table>";
        calendarHTML += '<tr class="tb-head"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    
        let date = 1;
        let nextMonthDate = 1;
    
        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr class="tb-body">';
            for (let j = 0; j < 7; j++) {
                const currentDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
                const plans = savedPlans[currentDate] || [];
    
                if (i === 0 && j < firstDay) {
                    calendarHTML += `<td class="blurred">${prevMonthDays - firstDay + j + 1}</td>`;
                } else if (date > daysInMonth) {
                    calendarHTML += `<td class="blurred">${nextMonthDate}</td>`;
                    nextMonthDate++;
                } else {
                    const planHTML = plans
                        .map(plan => {
                            const text = plan.text || "No Title"; // 스케줄 텍스트
                            const color = getCategoryColor(plan.category); // 카테고리 색상
                            return `<div style="color: ${color}; font-size: 0.8em;">${text}</div>`;
                        })
                        .join("");
    
                    calendarHTML += `<td data-date="${currentDate}">
                        <div>${date}</div>
                        ${planHTML}
                    </td>`;
                    date++;
                }
            }
            calendarHTML += "</tr>";
        }
        calendarHTML += "</table>";
        document.getElementById("calendar").innerHTML = calendarHTML;
    }
    
    
    // 카테고리별 색상 반환 함수
    function getCategoryColor(category) {
        switch (category) {
            case "major":
                return "red";
            case "self-study":
                return "blue";
            case "assignment":
                return "yellow";
            case "work":
                return "green";
            case "leisure":
                return "purple";
            case "others":
                return "gray";
            default:
                return "black";
        }
    }
    
    
    


    /*  updateView로통합
    function updateCalendar() {
        updateHeader();
        generateCalendar(month, year);
    }*/
        function generateWeeklyView() {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // 주 시작일 계산
        
            let weeklyHTML = '<table id="weekly-plans"><thead><tr>';
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
                weeklyHTML += `<th>${day}</th>`;
            });
            weeklyHTML += "</tr></thead><tbody><tr>";
        
            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + i);
                const dateString = currentDate.toISOString().split("T")[0];
        
                const plans = savedPlans[dateString] || []; // 저장된 계획 가져오기
        
                weeklyHTML += `<td>
                    ${
                        plans.length > 0
                            ? `<ul>${plans
                                  .map(
                                      (plan) => `<li style="color: ${getCategoryColor(plan.category)};">
                                                    ${plan.text || "No Title"}
                                                 </li>`
                                  )
                                  .join("")}</ul>`
                            : "<div> </div>" // 계획이 없으면 "No plans" 표시
                    }
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

    // 오늘 날짜로 돌아와서 달력 다시 생성
    todayButton.addEventListener("click", () => {
        month = today.getMonth(); //이번 달
        year = today.getFullYear(); //올해 년도

        updateView();
    });

    // 전 달로 이동
    prevButton.addEventListener("click", () => {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        updateView();
    });

    // 다음 달로 이동
    nextButton.addEventListener("click", () => {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        updateView();
    });

    // Input Schedule 페이지로 이동
    inputScheduleButton.addEventListener("click", () => {
        window.location.href = "./inputschedule.html";
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
            window.location.href = "./completion-rate.html";    
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
    function openPopup(date) {
        popupDateElement.textContent = date;
        popupPlansElement.innerHTML = "";
    
        const plans = savedPlans[date] || [];
        plans.forEach((plan, index) => {
            const li = document.createElement("li");
            li.textContent = plan.text || "No Title";
    
            // 완료된 항목에 (Completed) 표시
            if (plan.completed) {
                li.textContent += " (Completed)";
                li.style.textDecoration = "line-through"; // 완료된 항목에 줄 긋기
            }
    
            // v 버튼 (완료)
            const completeButton = document.createElement("button");
            completeButton.textContent = "✔";
            completeButton.classList.add("complete-plan-btn");
            completeButton.addEventListener("click", () => markAsComplete(date, index));
    
            // x 버튼 (삭제)
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "✖";
            deleteButton.classList.add("delete-plan-btn");
            deleteButton.addEventListener("click", () => deletePlan(date, index));
    
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            popupPlansElement.appendChild(li);
        });
    
        popup.style.display = "block";
        updateCompletionRate(date);
    }
    
    
    
    // 완료 항목 표시 및 저장
    function markAsComplete(date, planIndex) {
        const plan = savedPlans[date][planIndex];
        if (plan && !plan.completed) {
            plan.completed = true; // 완료 상태 추가
        }
        localStorage.setItem("plans", JSON.stringify(savedPlans));
        openPopup(date); // 팝업 업데이트
        updateCompletionRate(date); // 완료율 업데이트
        updateView(); // 달력 업데이트
    }
    
    
    
    function updateCompletionRate(date) {
        const plans = savedPlans[date] || [];
        const completedCount = plans.filter(plan => plan.completed).length; // 완료된 항목 카운트
        const totalCount = plans.length;
    
        const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
        const progressContainer = document.getElementById("progress-container");
        const progressBar = document.getElementById("progress-bar");
    
        if (totalCount > 0) {
            progressBar.value = completionRate;
            progressContainer.style.display = "block";
        } else {
            progressContainer.style.display = "none";
        }
    
        calculateOverallCompletionRate();
    }
    

    

    // 팝업창 닫기
    function closePopup() {
        popup.style.display = "none";
    }

    // 계획 삭제
    function deletePlan(date, planIndex) {
        if (savedPlans[date]) {
            savedPlans[date].splice(planIndex, 1); // 계획 삭제
            if (savedPlans[date].length === 0) {
                delete savedPlans[date]; // 계획이 없으면 해당 날짜 삭제
            }
            localStorage.setItem("plans", JSON.stringify(savedPlans)); // 로컬스토리지 업데이트
            openPopup(date); // 팝업 업데이트
            updateView(); // 달력 업데이트
        }
    }

    // 날짜 클릭 이벤트 추가
    calendarElement.addEventListener("click", (event) => {
        const target = event.target.closest("td[data-date]");
        if (target) {
            const date = target.getAttribute("data-date");
            openPopup(date);
        }
    });

    // 팝업 닫기 버튼 이벤트
    closePopupButton.addEventListener("click", closePopup);

    function calculateOverallCompletionRate() {
        const allPlans = Object.values(savedPlans).flat(); // 모든 날짜의 계획을 하나의 배열로 합침
        const totalPlans = allPlans.length;
        const completedPlans = allPlans.filter(plan => plan.completed).length;
    
        const overallRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;
        localStorage.setItem("completionRate", overallRate); // 완료율 저장
        return overallRate;
    }
    

});

    



