let setUsername = document.querySelector("#name"); //name
let setUserID = document.querySelector("#id"); //id
let setUserPW = document.querySelector("#pw"); //password
let setUserPWConfirm = document.querySelector("#pwConfirm");
let setUserPN = document.querySelector("#pn"); //phone-number
let setUserEM = document.querySelector("#em"); //email
let setjoinbtn = document.querySelector("#join_btn");

let earlyexist = document.querySelector(".early-message");
let successMessage = document.querySelector(".success-message");
let conditionMessage = document.querySelector(".condition-message");
let conditionPW = document.querySelector(".checkPassword-message");
let passwordConfirmcomment = document.querySelector(".mismatch-message");

let canid = false;
let canpw = false;
let canpwCf = false;
let canPN = false;
let canEM = false;

let Users = [];

//id 길이 확인 함수
function idlength(value) {
    return value.length >= 4 && value.length <= 12;
}

//pw 적합한지 확인하는 함수
function checkPassword(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        str
    );
}

//pw, pwConfirm 같은지 확인
function pwMatch(password1, password2) {
    return password1 === password2;
}

//id 칸에 입력했을 때
setUserID.onkeyup = function () {
    if (setUserID.value.length !== 0) {
        //ID 입력한 경우
        successMessage.classList.add("hide");
        conditionMessage.classList.remove("hide");

        if (idlength(setUserID.value) === false) {
            successMessage.classList.add("hide");
            conditionMessage.classList.remove("hide");
            canid = false;
        } else if (idlength(setUserID.value)) {
            let Datas = [];
            Datas = JSON.parse(localStorage.getItem("Users")) || [];
            for (let i = 0; i < Datas.length; i++) {
                if (Datas[i].userID == setUserID) {
                    earlyexist.classList.remove("hide");
                    successMessage.classList.add("hide");
                    canid = false;
                }
            }

            successMessage.classList.remove("hide");
            conditionMessage.classList.add("hide");
            canid = true;
        }
    }

    //아무것도 입력되지 않은 상태
    else {
        successMessage.classList.add("hide");
        conditionMessage.classList.add("hide");
        canid = false;
    }
};

//password 칸에 입력했을 때
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

//password confirm 칸에 입력했을 때
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

function saveUsers() {}

setjoinbtn.addEventListener("click", (e) => {
    if (!canid || !canpw || !canpwCf || !canPN || !canEM) {
        alert("정보를 다시 입력하세요");

        return;
    }
    e.preventDefault();

    let user_info = {
        userName: setUsername.value,
        userID: setUserID.value,
        userPW: setUserPW.value,
        UserPN: setUserPN.value,
        UserEM: setUserEM.value,
    };

    Users = JSON.parse(localStorage.getItem("Users")) || [];
    Users.push(user_info);
    localStorage.setItem("Users", JSON.stringify(Users));

    alert("로그인 성공!");
    window.location.href = "../Page 2_Hub Page/calendar.html";
});
