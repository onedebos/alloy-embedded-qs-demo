const express = require("express"); // Import Express framework
const axios = require("axios"); // Import Axios for HTTP requests
require("dotenv").config(); // Import dotenv to load environment variables from .env file

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const API_KEY = process.env.ALLOY_API_KEY; // Get API key from environment variables
const BASE_URL = "https://embedded.runalloy.com/2024-03"; // Base URL for Alloy API

// Create a new user in Alloy Embedded
app.post("/create-user", async (req, res) => {
  try {
    console.log("in", req.body);
    const response = await axios.post(
      `${BASE_URL}/users`,
      { username: req.body.username },
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // Send the response data back to the client
  } catch (error) {
    console.error("Error creating user:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Get integrations for a specific user
app.get("/integrations", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    const response = await axios.get(
      `${BASE_URL}/integrations?userId=${userId}`, // Request integrations for the user
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // Send the response data back to the client
  } catch (error) {
    console.error("Error fetching integrations:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Get a token for a specific user
app.get("/token", async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${userId}/token`, // Request token for the user
      { headers: { Authorization: `Bearer ${API_KEY}` } } // Pass API key in the headers
    );
    res.json(response.data); // Send the response data back to the client
  } catch (error) {
    console.error("Error fetching token:", error.message); // Log error message
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
