const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    lamba: {
        type: Number,
        required: true,
        trim: true
    }    
}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project