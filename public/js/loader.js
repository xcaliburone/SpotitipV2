document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loader').style.display = 'none';
});

function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}