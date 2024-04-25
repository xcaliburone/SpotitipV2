document.addEventListener('DOMContentLoaded', () => {
    const playlistButton = document.getElementById('aside-playlists-button');
    const homeScreen = document.getElementById('homescreen');
    const searchScreen = document.getElementById('searchscreen');
    const playlistSong = document.getElementById('playlistSong');

    function hideScreens() {
        homeScreen.style.display = 'none';
        searchScreen.style.display = 'none';
        playlistSong.style.display = 'block';
    }

    playlistButton.addEventListener('click', () => {
        hideScreens();
    });
});