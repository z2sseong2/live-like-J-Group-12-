const express = require('express');
const app = express();
const port = 3000

app.use(express.static('login'));
app.use(express.static('images'));
app.use(express.static('calendar'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});