const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const config = require("../config");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connecting to mongoDB
const mongoURI = config.mongodb.uri;

mongoose.connect(mongoURI)
.then(() => console.log("Successfully connected to MongoDB"))
.catch((err) => console.error("Error connecting to mongoDB: ", err));

// Database schema and model
const itemSchema = new mongoose.Schema({
    name: String
});

const Item = new mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todo list"
});
const item2 = new Item({
    name: "Click the + button to add a new task"
});
const item3 = new Item({
    name: "<--- Click on this to delete a task"
});

const defaultItems = [item1, item2, item3];


const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = new mongoose.model("List", listSchema);

app.get("/", (req, res) => {

    Item.find({}).then((items) => {
        if (items.length === 0){
            Item.insertMany(defaultItems);
            res.redirect("/");
        }else{
            res.render("list", {listTitle: "Today", newListItems: items});
        }
    });
 
})

app.get("/:customList", (req, res) => {
    const customListName = _.capitalize(req.params.customList);

    List.findOne({name: customListName})
    .then((foundList) => {
        if (!foundList){
            // Create a new list
            const list = new List({
                name: customListName,
                items: defaultItems
            });
            list.save();
            res.redirect(`/${customListName}`);
        }else{
            // Show existing list
            res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
        }
    });
})

app.post("/", (req, res) => {
    const itemName = req.body.listItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName})
        .then((foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect(`/${listName}`);
        });
    };
    
})

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndDelete(checkedItemId)
        .then(() => console.log("Successfully deleted item"))
        .catch((err) => console.error("Could not delete item: ", err));

        res.redirect("/");

    }else{
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
        .then(() => { 
            res.redirect(`/${listName}`);
        })
        .catch((err) => console.error("Could not delete item: ", err));
    }
    
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})