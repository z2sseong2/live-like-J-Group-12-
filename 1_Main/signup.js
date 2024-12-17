let setUsername = document.querySelector("#name"); // 이름
let setUserID = document.querySelector("#id"); // 아이디
let setUserPW = document.querySelector("#pw"); // 비밀번호
let setUserPWConfirm = document.querySelector("#pwConfirm"); // 비밀번호 확인
let setUserPN = document.querySelector("#pn"); // 전화번호
let setUserEM = document.querySelector("#em"); // 이메일
let setjoinbtn = document.querySelector("#join_btn"); // 가입 버튼

let earlyexist = document.querySelector(".early-message"); // 중복 메시지
let successMessage = document.querySelector(".success-message"); // 성공 메시지
let conditionMessage = document.querySelector(".condition-message"); // 조건 메시지
let conditionPW = document.querySelector(".checkPassword-message"); // 비밀번호 조건 메시지
let passwordConfirmcomment = document.querySelector(".mismatch-message"); // 비밀번호 불일치 메시지

let canid = false;
let canpw = false;
let canpwCf = false;
let canPN = false;
let canEM = false;

let Users = [];

// ID 길이 확인 함수
function idlength(value) {
    return value.length >= 4 && value.length <= 12;
}

// 비밀번호 적합성 확인 함수
function checkPassword(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

// 비밀번호와 비밀번호 확인 일치 여부 확인

function pwMatch(password1, password2) {
    return password1 === password2;
}

// 아이디 입력 시 처리
setUserID.onkeyup = function () {
    if (setUserID.value.length !== 0) {
        // ID 입력한 경우
        successMessage.classList.add("hide");
        earlyexist.classList.add("hide");
        conditionMessage.classList.remove("hide");

        if (idlength(setUserID.value) === false) {
            // ID 길이가 조건에 맞지 않을 경우
            successMessage.classList.add("hide");
            conditionMessage.classList.remove("hide");
            earlyexist.classList.add("hide");
            canid = false;
        } else {
            // ID 길이가 조건에 맞는 경우
            let Datas = JSON.parse(localStorage.getItem("Users")) || [];

            if (Datas.length === 0) {
                // 로컬 스토리지에 데이터가 없을 경우
                successMessage.classList.remove("hide");
                conditionMessage.classList.add("hide");
                earlyexist.classList.add("hide");
                canid = true;
            } else {
                // 로컬 스토리지에 데이터가 있는 경우 중복 검사 실행
                let isDuplicate = false;

                for (let i = 0; i < Datas.length; i++) {
                    if (Datas[i].userID === setUserID.value) {
                        isDuplicate = true;
                        break; // 중복 발견 시 루프 종료
                    }
                }

                if (isDuplicate) {
                    earlyexist.classList.remove("hide");
                    conditionMessage.classList.add("hide");
                    successMessage.classList.add("hide");
                    canid = false;
                } else {
                    successMessage.classList.remove("hide");
                    conditionMessage.classList.add("hide");
                    earlyexist.classList.add("hide");
                    canid = true;
                }
            }
        }
    } else {
        // 아무것도 입력되지 않은 상태
        successMessage.classList.add("hide");
        conditionMessage.classList.add("hide");
        earlyexist.classList.add("hide");
        canid = false;
    }
};

// 비밀번호 입력 시 처리
setUserPW.onkeyup = function () {
    if (setUserPW.value.length !== 0) {
        if (checkPassword(setUserPW.value)) {
            conditionPW.classList.add("hide");
            canpw = true;
        } else {
            conditionPW.classList.remove("hide");
            canpw = false;
        }
    } else {
        conditionPW.classList.add("hide");
        canpw = false;
    }
};


// 비밀번호 확인 입력 시 처리

setUserPWConfirm.onkeyup = function () {
    if (setUserPWConfirm.value.length !== 0) {
        if (pwMatch(setUserPW.value, setUserPWConfirm.value)) {
            passwordConfirmcomment.classList.add("hide");
            canpwCf = true;
        } else {
            passwordConfirmcomment.classList.remove("hide");
            canpwCf = false;
        }
    } else {
        passwordConfirmcomment.classList.add("hide");
        canpwCf = false;
    }
};

// 전화번호 입력 시 처리
setUserPN.onkeyup = function () {
    if (setUserPN.value.length !== 0) {
        const phoneRegex = /^\d{10,11}$/;
        if (phoneRegex.test(setUserPN.value)) {
            canPN = true;
        } else {
            canPN = false;
        }
    } else {
        canPN = false;
    }
};

// 이메일 입력 시 처리
setUserEM.onkeyup = function () {
    if (setUserEM.value.length !== 0) {
        // 간단한 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(setUserEM.value)) {
            canEM = true;
        } else {
            canEM = false;
        }
    } else {
        canEM = false;
    }
};

// 가입 버튼 클릭 시 처리
setjoinbtn.addEventListener("click", (e) => {
    if (!canid || !canpw || !canpwCf || !canPN || !canEM) {
        alert("정보를 다시 입력하세요");
        window.location.reload();
        return;
    }
    e.preventDefault();

    let user_info = {
        userName: setUsername.value,
        userID: setUserID.value,
        userPW: setUserPW.value,
        userPN: setUserPN.value,
        userEM: setUserEM.value,
    };

    Users = JSON.parse(localStorage.getItem("Users")) || [];
    Users.push(user_info);
    localStorage.setItem("Users", JSON.stringify(Users));

    alert("회원가입 성공!");
    window.location.href = "/calendar.html";

});
