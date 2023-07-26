const axios = require('axios');
const { MongoClient } = require('mongodb');



// MongoDB connection URI (change this to your MongoDB server URI)
const mongoURI = 'mongodb+srv://sharpviking:l9a53607@cluster0.0maezhz.mongodb.net/test'




// API URL
const apiUrl = 'https://fantasy.premierleague.com/api/bootstrap-static/';

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            // Data will be in response.data
            return response.data;
        } else {
            throw new Error('Failed to fetch data from the API');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

// Function to save data to MongoDB
async function saveDataToMongo(data) {
    try {
        const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
        const db = client.db();
        const collection = db.collection('fantasy_data');
        await collection.insertOne(data);
        console.log('Data saved to MongoDB successfully.');
        client.close();
    } catch (error) {
        console.error('Error saving data to MongoDB:', error.message);
    }
}

// Fetch the data and use it
fetchData()
    .then((data) => {
        if (data) {
            // Use the data object here
            console.log(data);
            // Save data to MongoDB
            saveDataToMongo(data);
        }
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
