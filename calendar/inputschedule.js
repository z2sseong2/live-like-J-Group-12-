document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schedule-form');

    // 저장된 계획을 로컬 스토리지에서 가져오기
    const savedPlans = JSON.parse(localStorage.getItem('plans')) || {};

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 입력 값 가져오기
        const date = document.getElementById('date').value;
        const schedule = document.getElementById('schedule').value;

        if (!date || !schedule) return alert('Please fill all fields.');

        // 기존 계획 추가/병합
        if (!savedPlans[date]) savedPlans[date] = [];
        savedPlans[date].push(schedule);

        // 로컬 스토리지에 저장
        localStorage.setItem('plans', JSON.stringify(savedPlans));

        alert('플랜이 추가되었습니다!');
        form.reset();
    });
});
