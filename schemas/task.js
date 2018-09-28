var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: String,
    desc: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Task", taskSchema);