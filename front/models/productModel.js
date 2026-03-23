const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number

    },
    stock: { 
        type: Number,
        required: true
    },
    active: { type: Boolean, default: true }
    
});

module.exports = mongoose.model("Product",productSchema)