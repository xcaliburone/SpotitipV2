document.querySelector('.search').addEventListener('click', function() {
    window.location.href = 'BrowseAll.html'; // Ganti dengan URL halaman Browse All Anda
});

document.addEventListener('DOMContentLoaded', function() {
    const playlistButton = document.getElementById('aside-playlists-button');
    const albumButton = document.getElementById('aside-albums-button');
    const albumItems = document.querySelectorAll('.item-album');
    const playlistItems = document.querySelectorAll('.item-playlist');

    // Fungsi untuk menampilkan semua item
    function showAllItems() {
        albumItems.forEach(item => {
            item.style.display = 'flex';
        });
        playlistItems.forEach(item => {
            item.style.display = 'flex';
        });
    }

    // Fungsi untuk menyembunyikan semua item
    function hideAllItems() {
        albumItems.forEach(item => {
            item.style.display = 'none';
        });
        playlistItems.forEach(item => {
            item.style.display = 'none';
        });
    }

    // Fungsi untuk menampilkan item playlist dan menyembunyikan item album
    function showPlaylists() {
        hideAllItems();
        playlistItems.forEach(item => {
            item.style.display = 'flex';
        });
    }

    // Fungsi untuk menampilkan item album dan menyembunyikan item playlist
    function showAlbums() {
        hideAllItems();
        albumItems.forEach(item => {
            item.style.display = 'flex';
        });
    }

    // Atur event listener untuk tombol Playlists
    playlistButton.addEventListener('click', function() {
        if (!playlistButton.classList.contains('active')) {
            showPlaylists();
            playlistButton.classList.add('active');
            albumButton.classList.remove('active');
        } else {
            showAllItems();
            playlistButton.classList.remove('active');
        }
    });

    // Atur event listener untuk tombol Albums
    albumButton.addEventListener('click', function() {
        if (!albumButton.classList.contains('active')) {
            showAlbums();
            albumButton.classList.add('active');
            playlistButton.classList.remove('active');
        } else {
            showAllItems();
            albumButton.classList.remove('active');
        }
    });

    // Tampilkan semua item saat tidak ada tombol yang aktif
    if (!playlistButton.classList.contains('active') && !albumButton.classList.contains('active')) {
        showAllItems();
    }
});