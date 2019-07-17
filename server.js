const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/Message-Board');
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');

app.use(express.static( __dirname + '/public/dist/public' ));


app.use(bodyParser.json({
	extended: true
}));

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Your title is not working']
    },
    description: {
        type: String,
        required: [true, 'your description is not working'],
		default: ''
    },
    completed: {
        type: Boolean,
        required: [true, "your completed is not working"],
        default: false
    }
}, {
    timestamps: true
})
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

//===================================================================
// Route to show all
//===================================================================


app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: tasks
            })
        }
    })
})

//===================================================================
// Route to show by id
//===================================================================

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: tasks
            })
        }
    })
})

//===================================================================
// Route to add 
//===================================================================

app.post('/tasks', (req, res) => {
    Task.create(req.body, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: tasks
            })
        }
    })
})

//===================================================================
// Route to edit
//===================================================================

app.put('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    }, (err, tasks) => {
        if (err) {
            console.log("Returned error", err);
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success",
                data: tasks
            })
        }
    })
})

//===================================================================
// Route to delete 
//===================================================================

app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success"
            })
        }
    })
})
// --------------------------------------------------------------------
// Schemas
// --------------------------------------------------------------------

// ------------------------- task Schema -----------------------------



// --------------------------------------------------------------------
// 404 and app.listen 
// --------------------------------------------------------------------

// The 404 Route (ALWAYS Keep this as the last route)
app.all("*", (req,res,next) => {
	res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
	console.log("listening on port 8000");
})



// -----------------------------------------------------------------
