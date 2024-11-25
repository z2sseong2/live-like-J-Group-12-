document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('current-month');
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

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
        const prevMonthDays = new Date(year, month, 0).getDate();
    
        const savedPlans = JSON.parse(localStorage.getItem('plans')) || {};
    
        // Table structure
        let calendarHTML = '<table>';
        calendarHTML += '<tr class="tb-head"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    
        let date = 1;
        let nextMonthDate = 1;
    
        for (let i = 0; i < 7; i++) {
            calendarHTML += '<tr class="tb-body">';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    const prevDate = prevMonthDays - firstDay + j + 1;
                    calendarHTML += `<td class="blurred">${prevDate}</td>`;
                } else if (date > daysInMonth) {
                    calendarHTML += `<td class="blurred">${nextMonthDate}</td>`;
                    nextMonthDate++;
                } else {
                    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const currentDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    const plans = savedPlans[currentDate] || [];
                    calendarHTML += `<td class="${isToday ? 'current-day' : ''}">
                                        <div>${date}</div>
                                        <ul>
                                            ${plans.map(plan => `<li>${plan}</li>`).join('')}
                                        </ul>
                                     </td>`;
                    date++;
                }
            }
            calendarHTML += '</tr>';
            if (date > daysInMonth && nextMonthDate > 7 - (firstDay + daysInMonth) % 7) break;
        }
    
        calendarHTML += '</table>';
        calendarElement.innerHTML = calendarHTML;
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

    updateCalendar();
});