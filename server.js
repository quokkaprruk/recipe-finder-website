/*
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/

// server.js
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

//static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const app_id = "d0be263e";
    const app_key = "f62d38638621da37eb9e191e6fed1f19";
    /* Access Point: https://api.edamam.com/api/recipes/v2?*/
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;

    // Make API request
    const response = await axios.get(url);

    // Send the response from the API to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
