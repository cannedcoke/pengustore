// models/Session.js
const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } 
    }
});

module.exports = mongoose.model("Session", sessionSchema)