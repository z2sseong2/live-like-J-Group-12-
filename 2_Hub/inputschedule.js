document.addEventListener("DOMContentLoaded", () => {
    const scheduleForm = document.getElementById("schedule-form");

    scheduleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // 입력 값 가져오기
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        const schedule = document.getElementById("schedule").value.trim(); // 스케줄 텍스트
        const category = document.getElementById("category").value; // 카테고리 값

        if (!startDate || !endDate || !schedule || !category) {
            alert("Please fill in all fields.");
            return;
        }

        const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            alert("Start date cannot be later than end date.");
            return;
        }

        let current = new Date(start);

        while (current <= end) {
            const formattedDate = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;

            if (!savedPlans[formattedDate]) {
                savedPlans[formattedDate] = [];
            }

            // 스케줄 저장 시 객체 형태로 저장
            savedPlans[formattedDate].push({ text: schedule, category, completed: false });


            current.setDate(current.getDate() + 1);
        }

        // 로컬 스토리지에 저장
        localStorage.setItem("plans", JSON.stringify(savedPlans));

        scheduleForm.reset();
        alert("Schedule added successfully!");
    });
});
