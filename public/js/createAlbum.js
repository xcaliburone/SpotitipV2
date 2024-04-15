// Mendapatkan elemen tombol create playlist dan modal
const createAlbumButton = document.getElementById('createAlbumButton');
const createAlbumModal = document.getElementById('createAlbumModal');
const closeCreateAlbumModal = document.getElementsByClassName('close')[0];

// Ketika tombol create playlist ditekan, tampilkan modal dan sembunyikan modal tambah playlist jika sedang ditampilkan
createPlaylistButton.onclick = function() {
    createPlaylistModal.style.display = "block";
    // Sembunyikan modal tambah playlist jika sedang ditampilkan
    addPlaylistModal.style.display = "none"; // Ganti addPlaylistModal dengan id modal tambah playlist Anda
}
// Ketika tombol close di dalam modal ditekan, sembunyikan modal
closeCreatePlaylistModal.onclick = function() {
    createPlaylistModal.style.display = "none";
}

// Ketika pengguna mengklik di luar modal, sembunyikan modal
window.onclick = function(event) {
    if (event.target == createPlaylistModal) {
        createPlaylistModal.style.display = "none";
    }
}