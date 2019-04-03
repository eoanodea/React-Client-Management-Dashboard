const Data = require("../Schema/Data");
var express = require("express");
var router = express.Router();

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });
  
  // this is our update method
  // this method overwrites existing data in our database
  router.post("/updateData", (req, res) => {
    const { id, field, current, update } = req.body;
    console.log(id, field, current, update);
    var newUpdate = {}
    newUpdate[field] = update;
    var query = {};
    // query[field] = current;
    query["id"] = id;
    
    Data.findOneAndUpdate(
        query, 
        {
            $set: newUpdate
        },
    (err, data) => {
        if (err) return res.json({ success: false, error: err })
            return res.json({ success: true, data: data });
    });
   
  });
  
  
  // this is our delete method
  // this method removes existing data in our database
  router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  
  // this is our create method
  // this method adds new data in our database
  router.post("/putData", (req, res) => {
    let data = new Data();
  
    const { 
      id, 
      name, 
      desc, 
      parentId, 
      parentName,
      hours, 
      dueDate,
      type
    } = req.body;
  
    if ((!id && id !== 0) || !name) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    data.name = name;
    data.desc = desc;
    data.parentId = parentId;
    data.parentName = parentName;
    data.hours = hours;
    data.dueDate = dueDate;
    data.type = type;
    data.id = id;
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

  module.exports = router;
  