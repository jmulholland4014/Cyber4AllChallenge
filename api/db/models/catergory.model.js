const mongoose = require('mongoose');

const CatergorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

})

const Catergory = mongoose.model('Catergory', CatergorySchema);

module.exports = { Catergory }