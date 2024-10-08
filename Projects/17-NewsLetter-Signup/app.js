const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { url } = require("inspector");
const config = require("../config");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const listId = config.mailChimp.listId;
    const url = `https://us11.api.mailchimp.com/3.0/lists/${listId}`;

    const options = {
        method: "POST",
        auth: `flyview16:${config.mailChimp.apikey}`
    }

    const request = https.request(url, options, function(response) {

        response.on("data", (data) =>{
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        
        // Handling error from API response
        if (parsedData.error_count === 0){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        })
    });

    request.write(jsonData);
    request.end();
})

// Redirecting user upon failed sign up
app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
})



