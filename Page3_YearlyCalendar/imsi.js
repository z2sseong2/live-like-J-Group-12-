document.addEventListener("DOMContentLoaded", () => {
    const yearlyYearsDiv = document.querySelector(".yearly-years");
    const yearlyMonthsDiv = document.querySelector(".yearly-months");
    const currentDecadeDiv = document.getElementById("current-decade");
    const selectedYearDiv = document.getElementById("selected-year");
    const backToYearsBtn = document.getElementById("back-to-years-btn");
    const prevDecadeBtn = document.getElementById("prev-decade-btn");
    const nextDecadeBtn = document.getElementById("next-decade-btn");

    let currentDecadeStart = 2020;

    // Update Decade Header
    function updateDecade() {
        currentDecadeDiv.textContent = `${currentDecadeStart} - ${
            currentDecadeStart + 9
        }`;
        renderYears();
    }

    // Render Years
    function renderYears() {
        yearlyYearsDiv.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            const year = currentDecadeStart + i;
            const yearDiv = document.createElement("div");
            yearDiv.textContent = year;
            yearDiv.addEventListener("click", () => {
                showMonths(year);
            });
            if (year === new Date().getFullYear()) {
                yearDiv.classList.add("current-highlight");
            }
            yearlyYearsDiv.appendChild(yearDiv);
        }
    }

    // Show Months
    function showMonths(year) {
        selectedYearDiv.textContent = year;
        yearlyYearsDiv.style.display = "none";
        yearlyMonthsDiv.style.display = "block";
        renderMonths();
    }

    // Render Months
    function renderMonths() {
        const monthsGrid = document.querySelector(".months-grid");
        monthsGrid.innerHTML = "";
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        monthNames.forEach((month, index) => {
            const monthDiv = document.createElement("div");
            monthDiv.textContent = month;
            monthDiv.addEventListener("click", () => {
                alert(`Loading plans for ${month}`);
            });
            if (index === new Date().getMonth()) {
                monthDiv.classList.add("current-highlight");
            }
            monthsGrid.appendChild(monthDiv);
        });
    }

    // Event Listeners
    backToYearsBtn.addEventListener("click", () => {
        yearlyYearsDiv.style.display = "grid";
        yearlyMonthsDiv.style.display = "none";
    });

    prevDecadeBtn.addEventListener("click", () => {
        currentDecadeStart -= 10;
        updateDecade();
    });

    nextDecadeBtn.addEventListener("click", () => {
        currentDecadeStart += 10;
        updateDecade();
    });

    // Initialize
    updateDecade();
});
