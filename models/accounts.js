const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    quantity:{
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Negative calories aren't real.");
        }
    },
    date: {
        type: Date,

    },
    amount:{
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Negative calories aren't real.");
        }
    }

});
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
