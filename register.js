async function registerUser() {
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

    // Send the registration data to the server
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
        alert('Registration successful!');
        resetForm();
    } else {
        alert(`Registration failed: ${result.message}`);
    }
}

function resetForm() {
    var registrationForm = document.getElementById('registrationForm');
    registrationForm.reset();
}