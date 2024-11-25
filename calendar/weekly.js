document.addEventListener('DOMContentLoaded', () => {
    const savedPlans = JSON.parse(localStorage.getItem('plans')) || {};

    // 오늘 날짜와 이번 주의 시작, 끝 날짜 계산
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // 이번 주 일요일
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 이번 주 토요일

    const weeklyRow = document.getElementById('weekly-data');

    // 각 요일에 해당하는 셀 생성
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);

        const dateString = currentDate.toISOString().split('T')[0]; // yyyy-MM-dd 형식
        const plans = savedPlans[dateString] || []; // 해당 날짜의 계획

        // 새로운 셀 생성
        const cell = document.createElement('td');
        if (plans.length > 0) {
            // 계획이 있는 경우
            cell.innerHTML = `<ul>${plans.map(plan => `<li>${plan}</li>`).join('')}</ul>`;
        } else {
            // 계획이 없는 경우 빈 셀 유지
            cell.innerHTML = '';
        }
        weeklyRow.appendChild(cell);
    }
});
