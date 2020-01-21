import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Issue = new Schema({
  title: {
    type: String,
    required: true
  },
  responsible: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Open"
  }
});
module.exports = mongoose.model("Issue", Issue);
