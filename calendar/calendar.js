document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');                //캘린더
    const menuButton = document.getElementById('menuButton');                 //메뉴 버튼
    const todayButton = document.getElementById('today-btn');                   //오늘 날짜로 달력 이동
    const currentMonthElement = document.getElementById('current-month');       //몇월인지 나타냄
    const prevButton = document.getElementById('prev-month-btn');               //전 달 이동
    const nextButton = document.getElementById('next-month-btn');               //다음 달 이동
    const monthPlansButton = document.getElementById('month-btn');              //월간 planner 이동
    const weeklyPlansButton = document.getElementById('weekly-btn');            //주간 planner 이동
    const inputScheduleButton = document.getElementById('inputschedule-btn');   //plan 입력
    const menuBox = document.getElementById('menuBox');

    let today = new Date();         //오늘 날짜
    let month = today.getMonth();   //이번 달
    let year = today.getFullYear(); //올해 년도
    let viewMode = "month";

    // 로컬 스토리지에서 계획 불러오기
    const savedPlans = JSON.parse(localStorage.getItem('plans')) || {};

    // 달력 헤더 업데이트 함수
    function updateHeader() {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        currentMonthElement.textContent = `${year} ${monthNames[month]}`;
    }

    // 달력 생성 함수
    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();     // 이번 달 마지막 날짜
        const firstDay = new Date(year, month, 1).getDay();             // 이번 달 1일 요일
        const prevMonthDays = new Date(year, month, 0).getDate();       // 전 달 마지막 날짜

        const savedPlans = JSON.parse(localStorage.getItem('plans')) || {};

        // 달력 구조 생성(테이블)
        let calendarHTML = '<table>';
        calendarHTML += '<tr class="tb-head"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

        let date = 1;
        let nextMonthDate = 1;

        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr class="tb-body">';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {      // 전 달(흐리게)
                    const prevDate = prevMonthDays - firstDay + j + 1;
                    calendarHTML += `<td class="blurred">${prevDate}</td>`;
                } else if (date > daysInMonth) {    // 다음 달(흐리게)
                    calendarHTML += `<td class="blurred">${nextMonthDate}</td>`;
                    nextMonthDate++;
                } else {                            // 이번 달
                    //오늘 날짜 찾기
                    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const currentDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    const plans = savedPlans[currentDate] || [];

                    calendarHTML += `<td class="tb-day ${isToday ? 'current-day' : ''}" data-date="${currentDate}">
                                        <div>${date}</div>
                                        ${plans.map((plan, index) => `<div class="plan">${plan}</div>`).join('')}
                                     </td>`;
                    date++;
                }
            }
            calendarHTML += '</tr>';
        }
        calendarHTML += '</table>';
        calendarElement.innerHTML = calendarHTML;
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
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
            weeklyHTML += `<th>${day}</th>`;
        });
        weeklyHTML += '</tr></thead><tbody><tr>';
    
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            const dateString = currentDate.toISOString().split('T')[0];
            const plans = savedPlans[dateString] || []; // 저장된 계획 가져오기
    
            weeklyHTML += `<td>
                ${plans.length > 0 
                    ? `<ul>${plans.map(plan => `<li>${plan}</li>`).join('')}</ul>` 
                    : '<div></div>'} <!-- 계획이 없으면 공백 -->
            </td>`;
        }
        weeklyHTML += '</tr></tbody></table>';
    
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
    todayButton.addEventListener('click', () => {
        month = today.getMonth();   //이번 달
        year = today.getFullYear(); //올해 년도

        updateView();
    });

    // 전 달로 이동
    prevButton.addEventListener('click', () => {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        updateView();
    });

    // 다음 달로 이동
    nextButton.addEventListener('click', () => {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        updateView();
    });

    // Input Schedule 페이지로 이동
    inputScheduleButton.addEventListener('click', () => {
        window.location.href = './inputschedule.html';
    });
    updateView();

    
    weeklyPlansButton.addEventListener('click', () => {
        viewMode = "weekly";
        updateView();
    });

    monthPlansButton.addEventListener('click', () => {
        viewMode = "month";
        updateView();
    });



    menuButton.addEventListener('click', () => {
        // 메뉴 박스의 표시 여부를 토글
        if (menuBox.style.display === 'none' || menuBox.style.display === '') {
            menuBox.style.display = 'block'; // 메뉴 보이기
        } else {
            menuBox.style.display = 'none'; // 메뉴 숨기기
        }
        updateView();
    });

     // 각각의 버튼에 이벤트 추가 (필요에 따라 수정 가능)
    document.getElementById('schedulesButton').addEventListener('click', () => {
        alert('Schedules clicked');
    });
    document.getElementById('todoListButton').addEventListener('click', () => {
        alert('ToDoList clicked');
    });
    document.getElementById('challengeMapButton').addEventListener('click', () => {
        alert('ChallengeMap clicked');
    });
    document.getElementById('memoButton').addEventListener('click', () => {
        alert('Memo clicked');
    });
    document.getElementById('guidelineButton').addEventListener('click', () => {
        alert('Guideline clicked');
    });
    document.getElementById('settingsButton').addEventListener('click', () => {
        alert('Settings clicked');
    });
});

