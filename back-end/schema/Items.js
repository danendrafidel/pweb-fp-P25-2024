const { default: mongoose } = require("mongoose")

const ItemSchema = new mongoose.Schema({    
    name: String,
    amount: String,
    condition: String,
    created_at: { type:Date, default: Date.now},
})

module.exports = mongoose.model("Items",ItemSchema, "items");