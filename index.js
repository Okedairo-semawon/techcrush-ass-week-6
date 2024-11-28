const express = require('express'); // using the common.js method to import express
const fs = require('fs');    // using the common.js method to import the FS module
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json()); // ths is a middleware that parses incoming JSON request in the req.body

// Function to read data from the JSON file
function readData() {
    try {
        const data = fs.readFileSync('data.json'); // reads the data in the data.Json file
        return JSON.parse(data); // parses the JSON data and returns it 
    } catch (error) {
        console.error('Error reading data:', error); // catches any error during the reading process
        return [];
    }
}

// Function to write data to the JSON file
function writeData(data) {   // it takes the JSON object as input
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // stringify the JSON object and writes the stringify data to the data.json file
    } catch (error) {
        console.error('Error writing data:', error); // catches any error during the reading process
    }
}

// reading all records
app.get('/records', (req, res) => {
    const data = readData(); // reads all records from the data.json file
    res.json(data); // sends the data being read as a json response 
});  

// creating a new record
app.post('/records', (req, res) => {
    const data = readData();  // reads the data in the data.json
    data.push(req.body);  // adds the new record to the req.body
    writeData(data);  // it writes the updated data in the data.json file 
    res.json({ message: 'Record created successfully' }); // sends a json successful record creation
});

// readding  a specific record by ID
app.get('/records/:id', (req, res) => {
    const data = readData();     // reads the data in the data.json
    const record = data.find(item => item.id === parseInt(req.params.id)); // this will extract the id from the route parameters and convert it to an integer
    if (record) {
        res.json(record); // returns the record found in the data.json
    } else {
        res.status(404).json({ message: 'Record not found' }); // if it doesn't find it it returns record not found and sets ther status to 404
    }
});

// update a specific record
app.put('/info/:id', (req, res) => {
    const data = readData();       // reads the data in the data.json
    const index = data.findIndex(item => item.id === parseInt(req.params.id));    // finds the index of the record with the matching id
    if (index !== -1) {
        data[index] = req.body; // update the record at the found index with the new data
        writeData(data);   // this writes the updated data back to JSON file
        res.json({ message: 'Record updated successfully' }); // sends a success response that the record has been updated successfully
    } else {
        res.status(404).json({ message: 'Record not found' });   //sends not found if the record isn'y found
    }
});

// delete a specific record
app.delete('/data/:id', (req, res) => {
    const data = readData();   // reads the data in the data.json
    const filteredData = data.filter(item => item.id !== parseInt(req.params.id)); //filters records with a matching id
    writeData(filteredData); // this writes the record without the deleted  record back to the JSON file
    res.json({ message: 'Record deleted successfully' }); // sends a success message that the record as been deleted successfully
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});