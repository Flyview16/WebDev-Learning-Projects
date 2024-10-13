const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const config = require("../config");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Connect to mongoDB
mongoURI = config.mongodb.localUri;

mongoose.connect(mongoURI)
.then(() => console.log("Successfully connected to mongoDB"))
.catch((err) => console.error("Could not connect to mongoDB: ", err));

// Database schema and collection
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = new mongoose.model("Article", articleSchema);


/////////////////////// Requests targeting all articles ////////////////////////
app.route("/articles")

.get((req, res) => {
    Article.find({})
    .then((foundArticles) => res.send(foundArticles))
    .catch((err) => res.send(err));
})

.post((req, res) => {
    console.log();
    console.log();

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save()
    .then(() => res.send("Successfully saved article"))
    .catch((err) => res.send(err));
})

.delete((req, res) => {
    Article.deleteMany({})
    .then(() => res.send("Successfully deleted all articles"))
    .catch((err) => res.send(err));
});


/////////////////////////// Requests targeting a specific article ///////////////////
app.route("/articles/:articleTitle")

.get((req, res) => {
    Article.findOne({title: req.params.articleTitle})
    .then((foundArticle) => res.send(foundArticle))
    .catch((err) => res.send(err));
})

.put((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {runValidators: true}
    )
    .then(() => res.send("Successfully updated document"))
    .catch((err) => res.send(err));
})

.delete((req, res) => {
    Article.deleteOne({title: req.params.articleTitle})
    .then(() => res.send("Successfully deleted document"))
    .catch((err) => res.send(err));
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
})