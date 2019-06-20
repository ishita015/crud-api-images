const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const prodSchema = new Schema({
    companyName: String,
    price: String,
    email: String,
    image: String,
});

module.exports =  mongoose.model('Prod', prodSchema);









