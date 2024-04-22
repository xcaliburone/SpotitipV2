document.getElementById('addSongToAlbumForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const albumNameDua = document.getElementById('albumNameDua').value;
    const songNameDua = document.getElementById('songNameDua').value;

    console.log('Playlist Name:', albumNameDua);
    console.log('Song Name:', songNameDua);

    // Validasi input
    if (!albumNameDua || !songNameDua) {
        alert('Please enter both playlist and song names.');
        return;
    }

    try {
        const albumIdResponse = await fetch(`/findAlbumId?albumNameDua=${encodeURIComponent(albumNameDua)}`);
        const songIdResponse = await fetch(`/findDuaSongId?songNameDua=${encodeURIComponent(songNameDua)}`);

        if (!albumIdResponse.ok) {
            alert('Playlist not found.');
            return;
        }

        if (!songIdResponse.ok) {
            alert('Song not found.');
            return;
        }

        const albumIdData = await albumIdResponse.json();
        const songIdData = await songIdResponse.json();
        
        const albumId = albumIdData.id;
        const songId = songIdData.id;
        
        const confirmation = confirm('Are you sure you want to add this song to the album?');
        if (!confirmation) {
            return;
        }

        // const urlParams = new URLSearchParams(window.location.search);
        // const artistId = urlParams.get('artistId');
        // const url = window.location.href;
        // const artistId = url.substring(url.lastIndexOf('/') + 1);
        const urlPath = window.location.pathname; // Mendapatkan path dari URL
        const parts = urlPath.split('/'); // Membagi path menjadi bagian-bagian terpisah
        const artistId = parts[2]; // Mengambil ID artist dari bagian yang sesuai dengan posisi


        const addSongToAlbumResponse = await fetch(`/addSongToAlbum`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ albumId, songId, artistId })
        });

        if (addSongToAlbumResponse.ok) {
            alert('Song added to album successfully!');
        } else {
            alert('Failed to add song to album.');
        }
    } catch (error) {
        console.error('Error adding song to album:', error);
        alert('Error adding song to album. Please try again.');
    }
});
