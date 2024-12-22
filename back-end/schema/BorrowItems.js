const { default: mongoose } = require("mongoose")

const BorrowItemsSchema = new mongoose.Schema({
    item_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Items' },
    amount: String,
    borrow_date: {type:Date, default:Date.now},
    return_date: Date,
    borrower_name: String,
    officer_name: String,
})

module.exports = mongoose.model("BorrowItems", BorrowItemsSchema,"borrowItems");