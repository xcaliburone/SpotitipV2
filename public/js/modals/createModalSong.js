document.addEventListener('DOMContentLoaded', function() {
    const createModalButtonSong = document.getElementById('createModalButtonSong');
    const createModalSong = document.getElementById('createModalSong');
    const closeCreateModalSong = document.getElementsByClassName('close-song')[0];

    if (createModalButtonSong) {
        createModalButtonSong.onclick = function() { createModalSong.style.display = "block"; }
    } else {
        console.error("Element with ID 'createModalButtonSong' not found.");
    }

    if (closeCreateModalSong) {
        closeCreateModalSong.onclick = function() { createModalSong.style.display = "none"; }
    } else {
        console.error("Element with class 'close-song' not found.");
    }
});

window.onclick = function(event) {
    if (event.target == createModalSong) { createModalSong.style.display = "none"; }
}