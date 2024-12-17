document.addEventListener("DOMContentLoaded", () => {
    const scheduleForm = document.getElementById("schedule-form");

    scheduleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        const schedule = document.getElementById("schedule").value;

        if (!startDate || !endDate || !schedule) {
            alert("Please fill in all fields.");
            return;
        }

        const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

        // 날짜 범위를 생성
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            alert("Start date cannot be later than end date.");
            return;
        }

        let current = new Date(start);

        while (current <= end) {
            const formattedDate = `${current.getFullYear()}-${String(
                current.getMonth() + 1
            ).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;

            if (!savedPlans[formattedDate]) {
                savedPlans[formattedDate] = [];
            }

            savedPlans[formattedDate].push(schedule);

            // 다음 날짜로 이동
            current.setDate(current.getDate() + 1);
        }

        // 로컬 스토리지에 저장
        localStorage.setItem("plans", JSON.stringify(savedPlans));

        scheduleForm.reset(); // 폼 초기화
    });
});
