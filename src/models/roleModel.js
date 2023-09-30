const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'The role is mandatory']
    }
});

module.exports = model('Role', roleSchema);