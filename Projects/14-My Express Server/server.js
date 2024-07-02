const express = require("express");

const app = express()

app.get("/", function(request, response){
    response.send("Hello World!");
});

app.get("/contact", (req, res) => {
    res.send("Contact me at herbert@gmail.com");
});

app.get("/about", (req, res) => {
    res.send("Full-stack developer");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
 