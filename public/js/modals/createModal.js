document.addEventListener('DOMContentLoaded', function() {
    const createModalButtonCreate = document.getElementById('createModalButtonCreate');
    const createModal = document.getElementById('createModal');
    const closecreateModal = document.getElementsByClassName('close')[0];

    if (createModalButtonCreate) {
        createModalButtonCreate.onclick = function() { createModal.style.display = "block"; }
    } else {
        console.error("Element with ID 'createModalButtonCreate' not found.");
    }

    if (closecreateModal) {
        closecreateModal.onclick = function() { createModal.style.display = "none"; }
    } else {
        console.error("Element with class 'close' not found.");
    }
});

window.onclick = function(event) {
    if (event.target == createModal) { createModal.style.display = "none"; }
}