document.addEventListener("DOMContentLoaded", () => {
    // 메뉴 버튼 기능
    const menuButton = document.getElementById("menuButton");
    const menuBox = document.getElementById("menuBox");

    menuButton.addEventListener("click", () => {
        menuBox.style.display =
            menuBox.style.display === "none" || menuBox.style.display === ""
                ? "block"
                : "none";
    });

    // 각 메뉴 버튼에 이벤트 추가
    document.getElementById("profileButton").addEventListener("click", () => {
        window.location.href = "../4_My/mypage.html";
    });
    document
        .getElementById("challengeMapButton")
        .addEventListener("click", () => {
            window.location.href = "../2_Hub/completion-rate.html";
        });
    document.getElementById("memoButton").addEventListener("click", () => {
        window.location.href = "../6_Memo/memo.html";
    });

    // 로고 버튼 클릭 시 이동
    const logoButton = document.getElementById("logoButton");
    logoButton.addEventListener("click", () => {
        window.location.href = "../2_Hub/calendar.html";
    });

    // 비밀번호 보이기/숨기기 기능
    const pwInput = document.getElementById("user-pw");
    const togglePwBtn = document.getElementById("toggle-pw-btn");
    const passwordConditionMessage = document.querySelector(
        ".checkPassword-message"
    );

    togglePwBtn.addEventListener("click", () => {
        if (pwInput.type === "password") {
            pwInput.type = "text";
            togglePwBtn.textContent = "🙈"; // 눈 감은 이모티콘
        } else {
            pwInput.type = "password";
            togglePwBtn.textContent = "👁️"; // 눈 이모티콘
        }
    });

    // 로컬 스토리지에서 사용자 정보 가져오기
    const Users = JSON.parse(localStorage.getItem("Users")) || [];
    const loggedInUserID = sessionStorage.getItem("loggedInUserID");

    if (!loggedInUserID) {
        alert("로그인이 필요합니다.");
        window.location.href = "../1_Main/login.html";
        return;
    }

    let currentUser = Users.find((user) => user.userID === loggedInUserID);

    const fields = {
        userName: "user-name",
        userID: "user-id",
        userPW: "user-pw",
        userPN: "user-pn",
        userEM: "user-em",
    };

    // 사용자 정보를 입력창에 표시
    Object.keys(fields).forEach((key) => {
        document.getElementById(fields[key]).value = currentUser[key];
    });

    // 비밀번호 조건 확인 함수
    function checkPassword(str) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            str
        );
    }

    let isEditing = false; // 현재 수정 중인지 여부를 나타내는 상태 변수
    let currentEditingField = null; // 수정 중인 필드

    // 수정 버튼 기능
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const field = e.target.dataset.field;
            const inputElement = document.getElementById(fields[field]);
            const saveButton = e.target;

            // 수정 중인 다른 필드가 있으면 알림
            if (isEditing && currentEditingField !== field) {
                alert("기존의 수정을 마치고 다른 정보를 수정하세요.");
                return;
            }

            isEditing = true;
            currentEditingField = field;

            // 입력창 활성화
            inputElement.disabled = false;
            inputElement.focus();

            const saveChanges = (event) => {
                if (
                    (event.type === "click" && event.target === saveButton) ||
                    (event.type === "keydown" && event.key === "Enter")
                ) {
                    if (
                        field === "userPW" &&
                        !checkPassword(inputElement.value)
                    ) {
                        passwordConditionMessage.classList.remove("hide");
                        alert(
                            "비밀번호는 8글자 이상이며, 영문, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다."
                        );
                        inputElement.value = currentUser[field]; // 이전 값으로 복원
                        inputElement.disabled = true;
                        passwordConditionMessage.classList.add("hide");
                        return;
                    }

                    passwordConditionMessage.classList.add("hide");
                    inputElement.disabled = true;
                    currentUser[field] = inputElement.value;

                    // 로컬 스토리지에 업데이트
                    const updatedUsers = Users.map((user) =>
                        user.userID === loggedInUserID ? currentUser : user
                    );
                    localStorage.setItem("Users", JSON.stringify(updatedUsers));

                    alert("정보가 업데이트되었습니다.");

                    // 수정 상태 초기화
                    isEditing = false;
                    currentEditingField = null;

                    // 이벤트 제거
                    inputElement.removeEventListener("keydown", saveChanges);
                    saveButton.removeEventListener("click", saveChanges);
                }
            };

            // 기존 이벤트 리스너 제거
            inputElement.removeEventListener("keydown", saveChanges);
            saveButton.removeEventListener("click", saveChanges);

            // Enter 키와 버튼 클릭 이벤트 추가
            inputElement.addEventListener("keydown", saveChanges);
            saveButton.addEventListener("click", saveChanges);
        });
    });
});
