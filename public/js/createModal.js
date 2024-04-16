document.addEventListener('DOMContentLoaded', function() {
    const createModalButton = document.getElementById('createModalButton');
    const createModal = document.getElementById('createModal');
    const closecreateModal = document.getElementsByClassName('close')[0];

    if (createModalButton) {
        createModalButton.onclick = function() { createModal.style.display = "block"; }
    } else {
        console.error("Element dengan ID 'createModalButton' tidak ditemukan.");
    }

    if (closecreateModal) {
        closecreateModal.onclick = function() { createModal.style.display = "none"; }
    } else {
        console.error("Element with class 'close' not found.");
    }
});

window.onclick = function(event) {  // klik luar modal untuk sembunyikan modal
    if (event.target == createModal) { createModal.style.display = "none"; }
}