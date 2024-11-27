const express = require('express'); // using common js to import express
const fs = require('fs').promises; // using common js to import fs module
const path = require('path'); // using common js to import path
const app = express();
const port = 8000;   // setting the port to 8000

app.use(express.json()); // this is a middleware used to parse incoming  json data in the request body
const dataFilePath = path.join(__dirname, 'user.json'); // show the server where to find the user.json file

function readDataFromFile() {
  const rawData = fs.readFileSync('dataFilePath'); //this reads the file as a string
  return JSON.parse(rawData);  // converts raw json string into javascript object

}

// READ: Get all items
app.get('/items', (req, res) => {
    const user = readDataFromFile(); // this will retrieve all the data from user.json file 
    res.status(200).json(user); // then send the data with the status code of 200 meaning sucessful
  });
  
  // READ: Get an item by ID
  app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const user = readDataFromFile(); // this helps to get data from the user.json
    const item = user.find((i) => i.id === parseInt(id));     // this will extract the id from the route parameters and convert it to an integer 
  
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });   // if item is not found it will return 404
    }
  });
  
// // UPDATE A PRODUCT
// app.put('/api/product/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//        const product = await product.findByIdAndUpdate(id, req.body)

//        if(!product) {
//         return res.status(404)({message: error.message});
//        }
//     } catch(error) {
//         res.status(500).json({message: error.message});
//     }

// })
app.listen (8000, () => (
    console.log(`server running on port ${port}`)
));