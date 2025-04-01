const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config(); // Load environment variables
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Cosmos DB connection setup
const COSMOS_CONNECTION_STRING = process.env.COSMOS_CONNECTION_STRING;
const client = new CosmosClient(COSMOS_CONNECTION_STRING);

const databaseId = 'atulnginxdb'; // Replace with your database name
const containerId = 'atullticontainer'; // Replace with your container name

async function setupDatabase() {
  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    console.log(`Connected to Cosmos DB: ${container.id}`);
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}
setupDatabase();

// API endpoint to test
app.get('/api', (req, res) => {
  res.send('Hello from the API!');
});

// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const database = client.database(databaseId);
    const container = database.container(containerId);
    const { resources } = await container.items.readAll().fetchAll(); // Fetch all items
    res.json(resources); // Send the fetched data as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
