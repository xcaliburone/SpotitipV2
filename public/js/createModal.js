document.addEventListener('DOMContentLoaded', function() {
    const createModalButton = document.getElementById('createModalButton');
    const createModal = document.getElementById('createModal');
    const closecreateModal = document.getElementsByClassName('close')[0];

    if (createModalButton) {
        createModalButton.onclick = function() {
            createModal.style.display = "block";
        }
    } else {
        console.error("Element with ID 'createModalButton' not found.");
    }

    if (closecreateModal) {
        closecreateModal.onclick = function() {
            createModal.style.display = "none";
        }
    } else {
        console.error("Element with class 'close' not found.");
    }
});


// Ketika pengguna mengklik di luar modal, sembunyikan modal
window.onclick = function(event) {
    if (event.target == createModal) {
        createModal.style.display = "none";
    }
}