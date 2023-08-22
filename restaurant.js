const express=require("express");
const path = require("path");
const fs = require("fs"); 


const app=express();
app.use(express.json());
const dataPath = path.join(__dirname, "restaurant.json");


app.get('/',(req,res)=>{
    const jsonData = require(dataPath);
    res.json(jsonData);
});

app.post("/", (req, res) => {
    const jsonData = require(dataPath);
    jsonData.push(req.body);
    const fs = require("fs");
    fs.writeFileSync(dataPath, JSON.stringify(jsonData,null, 2));
    res.status(201).json({ message: "Restaurant added successfully" });
  });


  app.put("/:name", (req, res) => {
    const jsonData = require(dataPath);
    const restaurantNameToUpdate = req.params.name;
    const updatedData = req.body;

    const restaurantToUpdate = jsonData.find(restaurant => restaurant.name === restaurantNameToUpdate);

    if (!restaurantToUpdate) {
        return res.status(404).json({ message: "Restaurant not found" });
    }

    Object.assign(restaurantToUpdate, updatedData);

    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
    res.json({ message: "Restaurant updated successfully" });
});

app.delete("/:name", (req, res) => {
    const jsonData = require(dataPath);
    const restaurantNameToDelete = req.params.name;

    const updatedJsonData = jsonData.filter(restaurant => restaurant.name !== restaurantNameToDelete);

    if (jsonData.length === updatedJsonData.length) {
        return res.status(404).json({ message: "Restaurant not found" });
    }

    fs.writeFileSync(dataPath, JSON.stringify(updatedJsonData, null, 2));
    res.json({ message: "Restaurant deleted successfully" });
});

  
app.listen(3001,console.log("server starts"));