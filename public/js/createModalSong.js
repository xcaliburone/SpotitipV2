document.addEventListener('DOMContentLoaded', function() {
    const createModalButtonSong = document.getElementById('createModalButtonSong');
    const createModalSong = document.getElementById('createModalSong');
    const closeCreateModalSong = document.getElementsByClassName('close-song')[0];

    if (createModalButtonSong) {
        createModalButtonSong.onclick = function() { createModalSong.style.display = "block"; }
    } else {
        console.error("Element dengan ID 'createModalButtonSong' tidak ditemukan.");
    }

    if (closeCreateModalSong) {
        closeCreateModalSong.onclick = function() { createModalSong.style.display = "none"; }
    } else {
        console.error("Element with class 'close-song' not found.");
    }
});

window.onclick = function(event) {  // klik luar modal untuk sembunyikan modal
    if (event.target == createModalSong) { createModalSong.style.display = "none"; }
}