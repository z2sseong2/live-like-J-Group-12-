let loginID = document.querySelector("#id");
let loginPW = document.querySelector("#pw");
let loginbtn = document.querySelector("#login-btn");

let Data = [];

Users = JSON.parse(localStorage.getItem("Users")) || [];

loginbtn.addEventListener("click", (e) => {
    for (let i = 0; i < Users.length; i++) {
        if (
            Users[i].userID === loginID.value &&
            Users[i].userPW === loginPW.value
        ) {
            e.preventDefault();
            alert("로그인 성공");

            // 로그인된 사용자 ID를 sessionStorage에 저장
            sessionStorage.setItem("loggedInUserID", Users[i].userID);

            window.location.href = "../2_Hub/calendar.html";
            return;
        }
    }
    e.preventDefault();
    alert("로그인 실패");
});
