const mongoose = require('mongoose');

// create a copy of the original 'exec' function.
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
    console.log("I'm about to run a Query...");

    return exec.apply(this, arguments);
}