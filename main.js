const express = require('express');
const app = express();
const port = 3000

app.use(express.static('Page1_MainPage'));
app.use(express.static('Page2_HubPage'));
app.use(express.static('Page3_YearlyCalendar'));
app.use(express.static('Page4_MyPage'));
app.use(express.static('Page5_MonthlyCM'));
app.use(express.static('Page6_Memo'));
app.use(express.static('Page7_Settings'));
app.use(express.static('Page8_ScheduleCollection'));
app.use(express.static('Page9_YearlyTDL'));
app.use(express.static('Page10_MonthlyTDL'));
app.use(express.static('Page11_WeeklyTDL'));
app.use(express.static('Page12_DailyTDL'));
app.use(express.static('Page13_YearlyCM'));
app.use(express.static('Page14_WeeklyCM'));
app.use(express.static('Page15_DailyCM'));
app.use(express.static('Page16_Guideline'));
app.use(express.static('images'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});