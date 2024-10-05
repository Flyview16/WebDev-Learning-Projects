const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = ["Buy food", "Go home", "Eat food"];

app.get("/", (req, res) => {
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", (req, res) => {
    console.log(req.body);
    let item = req.body.listItem;
    items.push(item);
    res.redirect("/");
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})