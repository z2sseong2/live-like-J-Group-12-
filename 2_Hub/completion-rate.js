const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

// DOM Elements
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const completionRateEl = document.getElementById("completion-rate");
const progressBar = document.getElementById("progress-bar");
const categorySelect = document.getElementById("category-select");

// Default Category
let selectedCategory = "major"; // 디폴트 값: 전공공부

// Filter and calculate completion rates
function calculateRate(filter) {
    let totalPlans = 0;
    let completedPlans = 0;
    const today = new Date();

    Object.keys(savedPlans).forEach(date => {
        const plans = savedPlans[date];
        const planDate = new Date(date);

        if (
            (filter === "today" && planDate.toDateString() === today.toDateString()) ||
            (filter === "month" && planDate.getMonth() === today.getMonth() && planDate.getFullYear() === today.getFullYear()) ||
            (filter === "year" && planDate.getFullYear() === today.getFullYear())
        ) {
            // 선택된 카테고리에 맞는 항목만 필터링
            plans.forEach(plan => {
                if (plan.category === selectedCategory) {
                    totalPlans++;
                    if (plan.completed) {
                        completedPlans++;
                    }
                }
            });
        }
    });

    updateUI(totalPlans, completedPlans);
}

// Update UI
function updateUI(totalPlans, completedPlans) {
    const completionRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

    totalTasksEl.textContent = totalPlans;
    completedTasksEl.textContent = completedPlans;
    completionRateEl.textContent = `${completionRate}%`;
    progressBar.style.width = `${completionRate}%`;
}

// Event Listeners
document.getElementById("today-btn").addEventListener("click", () => calculateRate("today"));
document.getElementById("month-btn").addEventListener("click", () => calculateRate("month"));
document.getElementById("year-btn").addEventListener("click", () => calculateRate("year"));

// Category Select Event
categorySelect.addEventListener("change", (e) => {
    selectedCategory = e.target.value; // 선택된 카테고리 업데이트
    calculateRate("month"); // 기본 Monthly Rate 업데이트
});

// Default View: Monthly Completion Rate for "major" category
calculateRate("month");
// Back 버튼 이벤트
document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "calendar.html"; // calendar.html로 이동
});

