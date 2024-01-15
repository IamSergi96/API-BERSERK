const mongoose = require("mongoose");
const characterSchema = new mongoose.Schema({
    "name":{type: String, required: true, unique: true, trim: true},
    "age":{type: Number, required: true, trim: true},
    "gender":{type: String, required: true, trim: true},
    "kind":{type: String, required: true, trim: true},
    "nationality":{type: String, required: false, trim: true},
    "affiliations":{type: String, required: false, trim: true},
    "weapon":{type: String, required: false, trim: true},
    "image":{type: String, required: false, trim: true}
});
const Character = mongoose.model("Character", characterSchema);
module.exports = Character;