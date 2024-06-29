const mongoose = require("mongoose")



const FurnitureSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  category: { type: String, required: true },
  
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  imageUrl: { type: String, required: false }
});

const Furniture = mongoose.model("Furniture", FurnitureSchema )
module.exports = Furniture
