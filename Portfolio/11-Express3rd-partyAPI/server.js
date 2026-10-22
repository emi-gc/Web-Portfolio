// loads express, https, and the environment file loader.
const express = require("express");
const https = require("https");
const { loadEnvFile } = require("node:process");

// reads the api key from the local environment file.
loadEnvFile(__dirname + "/.env");
const apiKey = process.env.OPENWEATHER_API_KEY;
const app = express();

// reads the city name sent by the form.
app.use(express.urlencoded({ extended: false }));

// shows the provided home page.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// requests the weather for the submitted city.
app.post("/", (req, res) => {
    // shows the same simple message for errors from the api call.
    function showError() {
        if (!res.headersSent) {
            res.send('<p>Could not get the weather. Check the city name and API key.</p><a href="/">Go back</a>');
        }
    }

    const cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName + "&appid=" + apiKey + "&units=metric";

    https.get(url, (response) => {
        let body = "";

        // collects the response data before reading the json.
        response.on("data", (data) => {
            body += data;
        });

        // reads the complete response and shows the weather page.
        response.on("end", () => {
            // shows a simple message if the api call fails.
            if (response.statusCode !== 200) {
                showError();
                return;
            }

            // reads the weather and handles an unreadable response.
            try {
                const weather = JSON.parse(body);
                res.send(`
                    <h1>Temperature: ${weather.main.temp} &deg;C</h1>
                    <p>${weather.weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}">
                    <br><a href="/">Go back</a>
                `);
            } catch (error) {
                showError();
            }
        });

        // handles a connection error while receiving the response.
        response.on("error", showError);
    }).on("error", showError);
});

// starts the server.
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
