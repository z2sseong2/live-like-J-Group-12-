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
            alert("濡쒓?���씤 �꽦??��");
            window.location.href = "calendar.html";
            return;
        }
    }
    e.preventDefault();
    alert("濡쒓?���씤 �떎�뙣");
});
