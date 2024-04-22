
// Hide loader initially
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loader').style.display = 'none';
});

// Function to show loader
function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

// Function to hide loader
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}