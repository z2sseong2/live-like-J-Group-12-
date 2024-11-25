document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('current-month');
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    const inputScheduleButton = document.getElementById('go-to-inputschedule-btn');
    const weeklyPlansButton = document.getElementById('go-to-weekly-btn');

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    // 로컬 스토리지에서 계획 불러오기
    const savedPlans = JSON.parse(localStorage.getItem('plans')) || {};

    function updateHeader() {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        currentMonthElement.textContent = `${year} ${monthNames[month]}`;
    }

    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        let calendarHTML = '<table>';
        calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

        let date = 1;

        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    calendarHTML += '<td></td>';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const currentDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    const plans = savedPlans[currentDate] || [];
                    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                    calendarHTML += `<td class="${isToday ? 'current-day' : ''}" data-date="${currentDate}">
                                        <div>${date}</div>
                                        <ul>
                                            ${plans
                                                .map((plan, index) =>
                                                    `<li>
                                                        ${plan}
                                                        <button class="delete-plan-btn" data-date="${currentDate}" data-index="${index}">x</button>
                                                     </li>`)
                                                .join('')}
                                        </ul>
                                     </td>`;
                    date++;
                }
            }
            calendarHTML += '</tr>';
        }

        calendarHTML += '</table>';
        calendarElement.innerHTML = calendarHTML;

        // 삭제 버튼 이벤트 추가
        document.querySelectorAll('.delete-plan-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const date = e.target.getAttribute('data-date');
                const index = e.target.getAttribute('data-index');
                deletePlan(date, index);
            });
        });
    }

    function deletePlan(date, index) {
        if (!savedPlans[date]) return;

        // 계획 삭제
        savedPlans[date].splice(index, 1);

        // 계획이 비어 있다면 해당 날짜를 로컬 스토리지에서 제거
        if (savedPlans[date].length === 0) {
            delete savedPlans[date];
        }

        // 업데이트된 계획 저장
        localStorage.setItem('plans', JSON.stringify(savedPlans));

        // 달력 업데이트
        updateCalendar();
    }

    function updateCalendar() {
        updateHeader();
        generateCalendar(month, year);
    }

    prevButton.addEventListener('click', () => {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        updateCalendar();
    });

    nextButton.addEventListener('click', () => {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        updateCalendar();
    });

    // Input Schedule 페이지로 이동
    inputScheduleButton.addEventListener('click', () => {
        window.location.href = './inputschedule.html';
    });

    // Weekly Plans 페이지로 이동
    weeklyPlansButton.addEventListener('click', () => {
        window.location.href = './weekly.html';
    });

    updateCalendar();
});
