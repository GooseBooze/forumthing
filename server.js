function registerUser() {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');

    var username = usernameInput.value.trim();
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    // Simple client-side validation
    if (!username || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Send the registration data to the server (server-side validation and storage should be implemented here)
    alert('Registration successful!'); // Placeholder for server interaction
    resetForm();
}

function resetForm() {
    var registrationForm = document.getElementById('registrationForm');
    registrationForm.reset();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve HTML, CSS, and JS files
app.use(express.static('public'));

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password });

    // Save the user to the database
    newUser.save((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Registration failed' });
        }
        return res.json({ success: true, message: 'Registration successful' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});