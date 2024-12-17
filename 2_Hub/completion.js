document.addEventListener("DOMContentLoaded", () => {
    const scheduleForm = document.getElementById("schedule-form");

    scheduleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // 입력 값 가져오기
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        const schedule = document.getElementById("schedule").value;
        const category = document.getElementById("category").value; // 카테고리 값 가져오기

        // 필드가 비어있으면 알림
        if (!startDate || !endDate || !schedule || !category) {
            alert("Please fill in all fields.");
            return;
        }

        const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

        // 날짜 범위를 생성
        const start = new Date(startDate);
        const end = new Date(endDate);

        // 시작 날짜가 종료 날짜보다 클 경우
        if (start > end) {
            alert("Start date cannot be later than end date.");
            return;
        }

        let current = new Date(start);

        while (current <= end) {
            // 날짜를 `yyyy-mm-dd` 형식으로 포맷
            const formattedDate = `${current.getFullYear()}-${String(
                current.getMonth() + 1
            ).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;

            // 해당 날짜에 스케줄 저장
            if (!savedPlans[formattedDate]) {
                savedPlans[formattedDate] = [];
            }

            // 스케줄과 카테고리 정보를 함께 저장
            savedPlans[formattedDate].push({ text: schedule, category });

            // 다음 날짜로 이동
            current.setDate(current.getDate() + 1);
        }

        // 로컬 스토리지에 저장
        localStorage.setItem("plans", JSON.stringify(savedPlans));

        // 폼 초기화
        scheduleForm.reset();

        alert("Schedule added successfully!");
    });
});
