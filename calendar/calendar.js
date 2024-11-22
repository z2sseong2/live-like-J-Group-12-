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

        // Table structure
        let calendarHTML = '<table>';
        calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

        // Add blank cells for days before the first day of the month
        let date = 1;
        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    calendarHTML += '<td></td>';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    calendarHTML += `<td class="${isToday ? 'current-day' : ''}">${date}</td>`;
                    date++;
                }
            }
            calendarHTML += '</tr>';
            if (date > daysInMonth) break;
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