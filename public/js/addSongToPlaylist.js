document.getElementById('addSongToPlaylistForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const playlistNameDua = document.getElementById('playlistNameDua').value;
    const songName = document.getElementById('songName').value;

    console.log('Playlist Name:', playlistNameDua);
    console.log('Song Name:', songName);

    // Validasi input
    if (!playlistNameDua || !songName) {
        alert('Please enter both playlist and song names.');
        return;
    }

    try {
        const playlistIdResponse = await fetch(`/findPlaylistId?playlistNameDua=${encodeURIComponent(playlistNameDua)}`);
        const songIdResponse = await fetch(`/findSongId?songName=${encodeURIComponent(songName)}`);

        if (!playlistIdResponse.ok) {
            alert('Playlist not found.');
            return;
        }

        if (!songIdResponse.ok) {
            alert('Song not found.');
            return;
        }

        const playlistIdData = await playlistIdResponse.json();
        const songIdData = await songIdResponse.json();
        
        const playlistId = playlistIdData.id;
        const songId = songIdData.id;
        
        const confirmation = confirm('Are you sure you want to add this song to the playlist?');
        if (!confirmation) {
            return;
        }

        const addSongToPlaylistResponse = await fetch('/addSongToPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlistId, songId })
        });

        if (addSongToPlaylistResponse.ok) {
            alert('Song added to playlist successfully!');
        } else {
            alert('Failed to add song to playlist.');
        }
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        alert('Error adding song to playlist. Please try again.');
    }
});
