const express = require('express');
const app = express();
const port = 3000

app.use(express.static('1_Main'));
app.use(express.static('2_Hub'));
app.use(express.static('3_Yearly-Calendar'));
app.use(express.static('4_My'));
app.use(express.static('5_Memo'));
app.use(express.static('images'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/1_Main/login.html');
});

app.get('/sign_up', (req, res) => {
    res.sendFile(__dirname + '/1_Main/sign_up.html');
});

app.get('/id_pw_check', (req, res) => {
    res.sendFile(__dirname + '/1_Main/id_pw_check.html');
});

app.get('/calendar', (req, res) => {
    res.sendFile(__dirname + '/2_Hub/calendar.html');
});

app.get('/inputschedule', (req, res) => {
    res.sendFile(__dirname + '/2_Hub/inputschedule.html');
});

app.get('/completion', (req, res) => {
    res.sendFile(__dirname + '/2_Hub/completion.html');
});

app.get('/yearlycalendar', (req, res) => {
    res.sendFile(__dirname + '/3_Yearly-Calendar/yearlycalendar.html');
});

app.get('/mypage', (req, res) => {
    res.sendFile(__dirname + '/4_My/mypage.html');
});

app.get('/memo', (req, res) => {
    res.sendFile(__dirname + '/5_Memo/memo.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});