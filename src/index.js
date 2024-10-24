const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true,

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

// Function to show the forum content
function showForum() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('findContent').style.display = 'none';
    document.getElementById('forumContent').style.display = 'block';
}

// Function to update the subcategory based on the main category selection
function updateSubCategory() {
    const mainCategory = document.getElementById('mainCategory').value;
    const subCategory = document.getElementById('subCategory');

    // Clear existing options
    subCategory.innerHTML = '<option value="">Select Sub Category</option>';

    // Populate subcategories based on the main category
    if (mainCategory === 'electronics') {
        subCategory.innerHTML += '<option value="phones">Phones</option>';
        subCategory.innerHTML += '<option value="laptops">Laptops</option>';
    } else if (mainCategory === 'jewelry') {
        subCategory.innerHTML += '<option value="rings">Rings</option>';
        subCategory.innerHTML += '<option value="necklaces">Necklaces</option>';
    } else if (mainCategory === 'clothing') {
        subCategory.innerHTML += '<option value="shirts">Shirts</option>';
        subCategory.innerHTML += '<option value="pants">Pants</option>';
    }
}

// Event listener for the form submission
document.getElementById('lostItemForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Get the form data

    try {
        const response = await fetch('https://<your-function-app-name>.azurewebsites.net/api/<your-function-name>', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)), // Convert form data to JSON
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            }
        });

        if (response.ok) {
            const result = await response.json();
            alert('Success: ' + result); // Display success message
            showHome(); // Optionally return to home after submission
        } else {
            throw new Error('Error: ' + response.statusText); // Handle errors
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
    }
});

// Initialize the default view on page load
document.addEventListener('DOMContentLoaded', showHome);

});
