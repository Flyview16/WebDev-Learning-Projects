const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date();
    var currentDay = today.getDay();
    var day = daysOfWeek[currentDay];

    // if (currentDay === 6 || currentDay === 0){
    //     day = "Weekend";
    // }else{
    //     day = "Weekday";
    // }

    res.render("list", {kindofday: day});
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})