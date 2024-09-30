const express = require('express');
const https = require('https');
const app = express();

app.get('/', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=a8c6563bfffc73d95f37aea08dc5d167&units=metric';
    https.get(url, (response) =>{
        console.log(response.statusCode);

        response.on('data', (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write('<h1> The weather in London is ' + temp + 'degree Celcius.</h1>');
            res.write('<p>The weather is currently ' + description + '</p>');
            res.write('<img src=' + iconURL + '>');
            res.send();
        })
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
