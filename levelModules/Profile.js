const mongoose = require("mongoose");

const GUILDprofile = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }, 
    level: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    xp: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    total_xp: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    last_message: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
});

module.exports = mongoose.model("GUILDprofile", GUILDprofile);