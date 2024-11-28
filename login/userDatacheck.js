let loginID = document.querySelector('#id');
let loginPW = document.querySelector('#pw');
let loginbtn = document.querySelector('#login-btn');

let Data = [];

Users = JSON.parse(localStorage.getItem("Users")) || [];


loginbtn.addEventListener("click" , (e) => {
    console.log("함수는 들어옴");
    for(let i = 0; i<Users.length; i++)
    {
        if(Users[i].userID === loginID.value && Users[i].userPW === loginPW.value)
        {
            console.log("출력 직전");
            e.preventDefault();
            alert("로그인 성공");
            window.location.href = "calendar\\calendar.html";
            return;
        }
    }
    e.preventDefault();
    alert("로그인 실패");
})
