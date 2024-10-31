async function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById('lostItemForm'));
    
    try {
        const response = await fetch('<YOUR_AZURE_FUNCTION_URL>', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Entry saved successfully!');
            document.getElementById('lostItemForm').reset(); // Clear the form
            showHome(); // Optionally, go back to home or refresh the entries displayed
        } else {
            alert('Failed to save entry. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

async function fetchEntries() {
    const response = await fetch('<YOUR_AZURE_FUNCTION_URL_FOR_FETCHING_ENTRIES>');
    const entries = await response.json();

    const tableBody = document.querySelector('#recentItemsTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.itemLost}</td>
            <td>${entry.reportedBy}</td>
            <td>${new Date(entry.timeLogged).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function showHome() {
    document.getElementById('homeContent').style.display = 'block';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('findContent').style.display = 'none';
    document.getElementById('forumContent').style.display = 'none';
    fetchEntries(); // Fetch and display entries
}

function showForm() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('findContent').style.display = 'none';
    document.getElementById('forumContent').style.display = 'none';
}

function showFind() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('findContent').style.display = 'block';
    document.getElementById('forumContent').style.display = 'none';
}

function showForum() {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('findContent').style.display = 'none';
    document.getElementById('forumContent').style.display = 'block';
}

function updateSubCategory() {
    var mainCategory = document.getElementById('mainCategory').value;
    var subCategory = document.getElementById('subCategory');
    subCategory.innerHTML = ''; // Clear previous options

    if (mainCategory === 'electronics') {
        subCategory.innerHTML = `
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Tablet</option>
        `;
    } else if (mainCategory === 'jewelry') {
        subCategory.innerHTML = `
            <option value="ring">Ring</option>
            <option value="necklace">Necklace</option>
        `;
    } else if (mainCategory === 'clothing') {
        subCategory.innerHTML = `
            <option value="shirt">Shirt</option>
            <option value="jacket">Jacket</option>
        `;
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('sidebar').classList.toggle('dark-mode');
    var header = document.getElementById('header');
    header.classList.toggle('dark-mode');
    var buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle('dark-mode');
    }
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].classList.toggle('dark-mode');
    }
    var thElements = document.getElementsByTagName('th');
    for (var i = 0; i < thElements.length; i++) {
        thElements[i].classList.toggle('dark-mode');
    }
    var tdElements = document.getElementsByTagName('td');
    for (var i = 0; i < tdElements.length; i++) {
        tdElements[i].classList.toggle('dark-mode');
    }
}
