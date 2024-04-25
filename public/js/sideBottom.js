document.addEventListener('DOMContentLoaded', () => {
    const playlistButton = document.getElementById('aside-playlists-button')
    const albumButton = document.getElementById('aside-albums-button')
    const albumItems = document.querySelectorAll('.item-album')
    const playlistItems = document.querySelectorAll('.item-playlist')

    function showAllItems() {
        albumItems.forEach( item => { item.style.display = 'flex'; })
        playlistItems.forEach( item => { item.style.display = 'flex'; })
    }

    function hideAllItems() {
        albumItems.forEach( item => { item.style.display = 'none'; })
        playlistItems.forEach(item => { item.style.display = 'none'; })
    }

    function showPlaylists() {
        hideAllItems()
        playlistItems.forEach( item => { item.style.display = 'flex'; })
    }

    function showAlbums() {
        hideAllItems()
        albumItems.forEach( item => { item.style.display = 'flex'; })
    }

    playlistButton.addEventListener('click', () => {
        if (!playlistButton.classList.contains('active')) {
            showPlaylists()
            playlistButton.classList.add('active')
            albumButton.classList.remove('active')
        } else {
            showAllItems()
            playlistButton.classList.remove('active')
        }
    })

    albumButton.addEventListener('click', () => {
        if (!albumButton.classList.contains('active')) {
            showAlbums()
            albumButton.classList.add('active')
            playlistButton.classList.remove('active')
        } else {
            showAllItems();
            albumButton.classList.remove('active')
        }
    })
    if (!playlistButton.classList.contains('active') && !albumButton.classList.contains('active')) { showAllItems() }
});