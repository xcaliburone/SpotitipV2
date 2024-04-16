document.querySelector('.search').addEventListener('click', function() { window.location.href = 'BrowseAll.html' })

document.addEventListener('DOMContentLoaded', () => {
    const playlistButton = document.getElementById('aside-playlists-button')
    const albumButton = document.getElementById('aside-albums-button')
    const albumItems = document.querySelectorAll('.item-album')
    const playlistItems = document.querySelectorAll('.item-playlist')

    function showAllItems() {       // Fungsi untuk menampilkan semua item
        albumItems.forEach( item => { item.style.display = 'flex'; })
        playlistItems.forEach( item => { item.style.display = 'flex'; })
    }

    function hideAllItems() {       // Fungsi untuk menyembunyikan semua item
        albumItems.forEach( item => { item.style.display = 'none'; })
        playlistItems.forEach(item => { item.style.display = 'none'; })
    }

    function showPlaylists() {      // Fungsi untuk menampilkan item playlist dan menyembunyikan item album
        hideAllItems()
        playlistItems.forEach( item => { item.style.display = 'flex'; })
    }

    function showAlbums() {         // Fungsi untuk menampilkan item album dan menyembunyikan item playlist
        hideAllItems()
        albumItems.forEach( item => { item.style.display = 'flex'; })
    }

    playlistButton.addEventListener('click', () => {             // Atur event listener untuk tombol Playlists
        if (!playlistButton.classList.contains('active')) {
            showPlaylists()
            playlistButton.classList.add('active')
            albumButton.classList.remove('active')
        } else {
            showAllItems()
            playlistButton.classList.remove('active')
        }
    })

    albumButton.addEventListener('click', () => {               // Atur event listener untuk tombol Albums
        if (!albumButton.classList.contains('active')) {
            showAlbums()
            albumButton.classList.add('active')
            playlistButton.classList.remove('active')
        } else {
            showAllItems();
            albumButton.classList.remove('active')
        }
    })
    // Tampilkan semua item saat tidak ada tombol yang aktif
    if (!playlistButton.classList.contains('active') && !albumButton.classList.contains('active')) { showAllItems() }
});