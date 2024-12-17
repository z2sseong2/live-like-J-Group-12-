// script.js

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton"); // Î©îÎâ¥Î≤ÑÌäº
    const menuBox = document.getElementById("menuBox");

    function updateView() {
        if (viewMode === "month") {
            updateHeader();
            generateCalendar(month, year);
        } else if (viewMode === "weekly") {
            generateWeeklyView();
        }
    }

    menuButton.addEventListener("click", () => {
        // Î©îÎâ¥ Î∞ïÏä§?ùò ?ëú?ãú ?ó¨Î∂?Î•? ?Ü†Í∏?
        if (menuBox.style.display === "none" || menuBox.style.display === "") {
            menuBox.style.display = "block"; // Î©îÎâ¥ Î≥¥Ïù¥Í∏?
        } else {
            menuBox.style.display = "none"; // Î©îÎâ¥ ?à®Í∏∞Í∏∞
        }
        updateView();
    });

    // Í∞ÅÍ∞Å?ùò Î≤ÑÌäº?óê ?ù¥Î≤§Ìä∏ Ï∂îÍ?? (?ïÑ?öî?óê ?î∞?ùº ?àò?†ï Í∞??ä•)
    document.getElementById("profileButton").addEventListener("click", () => {
        alert("Profile clicked");
        window.location.href = "../Page 4_My Page/mypage.html"; // mypageÎ°? ?ù¥?èô
    });
    document.getElementById("schedulesButton").addEventListener("click", () => {
        alert("Schedules clicked");
    });
    document.getElementById("todoListButton").addEventListener("click", () => {
        alert("ToDoList clicked");
    });
    document
        .getElementById("challengeMapButton")
        .addEventListener("click", () => {
            alert("ChallengeMap clicked");
        });
    document.getElementById("memoButton").addEventListener("click", () => {
        alert("Memo clicked");
    });
    document.getElementById("guidelineButton").addEventListener("click", () => {
        alert("Guideline clicked");
    });
    document.getElementById("settingsButton").addEventListener("click", () => {
        alert("Settings clicked");
    });
    // Î°úÍ≥† Î≤ÑÌäº ?Å¥Î¶? ?ãú, Page2Î°? ?ù¥?èô
    document.getElementById("logoButton").addEventListener("click", () => {
        window.location.href = "calendar.html";
    });
});

// ?îÑÎ°úÌïÑ ?Ñπ?Öò?ùò Î≤ÑÌäº ?Å¥Î¶? ?ù¥Î≤§Ìä∏
const progressButtons = document.querySelectorAll(".progress-buttons button");
progressButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        alert(`?èâÍ∑? ?ùº?ùº ?ôÑÏ£ºÏú® Î≤ÑÌäº ${index + 1} ?Å¥Î¶??ê®!`);
    });
});

// ?†ïÎ≥? ?Ñπ?Öò ?èº ?†úÏ∂? ?ù¥Î≤§Ìä∏
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Í∏∞Î≥∏ ?èº ?†úÏ∂? Î∞©Ï??
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const email = document.getElementById("email").value;

    alert(`?ûÖ?†•?êú ?†ïÎ≥?:\n?ù¥Î¶?: ${name}\nID: ${id}\nE-mail: ${email}`);
});
