const express = require('express');
const app = express();
const port = 3000

app.use(express.static('1_Main'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/1_Main/login.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/1_Main/sign_up.html');
});

app.use(express.static('2_Hub'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/2_Hub/calendar.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/2_Hub/inputschedule.html');
});

app.use(express.static('3_Yearly-Calendar'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/3_Yearly-Calendar/imsi.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/3_Yearly-Calendar/yearlycalendar.html');
});

app.use(express.static('4_My'));
app.use(express.static('5_Monthly-CM'));
app.use(express.static('6_Memo'));
app.use(express.static('7_Settings'));
app.use(express.static('8_Schedule-Collection'));
app.use(express.static('9_Yearly-TDL'));
app.use(express.static('10_Monthly-TDL'));
app.use(express.static('11_Weekly-TDL'));
app.use(express.static('12_Daily-TDL'));
app.use(express.static('13_Yearly-CM'));
app.use(express.static('14_Weekly-CM'));
app.use(express.static('15_Daily-CM'));
app.use(express.static('16_Guideline'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});