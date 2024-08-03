const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a Schema and Model
const formSchema = new mongoose.Schema({
    image: String,
    name: String,
    role: String,
    age: Number,
    spot: String,
    institute: String,
    recall_text: String,
    recall_link: [String],
    recall_title: String,
    deathDate: Date,
});

const Form = mongoose.model('bio', formSchema);

// Routes
app.post('/', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();
        res.status(200).json({ message: 'Success! Data submitted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error! There was an issue submitting your data.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
