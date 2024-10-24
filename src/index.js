const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true
});

// Function to toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme'); // Change this to your preferred class names
}

// Function to show the home content
function showHome() {
    document.getElementById('homeContent').style.display = 'block';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('findContent').style.display = 'none';
    document.getElementById('forumContent').style.display = 'none';
}

// Function to show the form content
function showForm() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('findContent').style.display = 'none';
    document.getElementById('forumContent').style.display = 'none';
}

// Function to show the find content
function showFind() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('findContent').style.display = 'block';
    document.getElementById('forumContent').style.display = 'none';
}