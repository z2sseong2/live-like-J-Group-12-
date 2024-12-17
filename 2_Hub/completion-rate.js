const savedPlans = JSON.parse(localStorage.getItem("plans")) || {};

// DOM Elements
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const completionRateEl = document.getElementById("completion-rate");
const progressBar = document.getElementById("progress-bar");

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
            totalPlans += plans.length;
            completedPlans += plans.filter(plan => plan.includes("(Completed)")).length;
        }
    });

    updateUI(totalPlans, completedPlans);
}

// Update UI
function updateUI(totalPlans, completedPlans) {
    const completionRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

    totalTasksEl.textContent = `Total Tasks: ${totalPlans}`;
    completedTasksEl.textContent = `Completed Tasks: ${completedPlans}`;
    completionRateEl.textContent = `Completion Rate: ${completionRate}%`;
    progressBar.style.width = `${completionRate}%`;

}

// Event Listeners
document.getElementById("today-btn").addEventListener("click", () => calculateRate("today"));
document.getElementById("month-btn").addEventListener("click", () => calculateRate("month"));
document.getElementById("year-btn").addEventListener("click", () => calculateRate("year"));

// Default View: Monthly Completion Rate
calculateRate("month");