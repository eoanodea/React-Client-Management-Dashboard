const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    name: String,
    desc: String,
    parentId: String,
    parentName: String,
    hours: String,
    dueDate: String,
    type: String,
    isComplete: Boolean
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);