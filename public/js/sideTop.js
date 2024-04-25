document.addEventListener('DOMContentLoaded', function() {
    const homeButton = document.getElementById('gotoHome');
    const searchButton = document.getElementById('gotoSearch');
    const homeScreen = document.getElementById('homescreen');
    const searchScreen = document.getElementById('searchscreen');
    const playlistSong = document.getElementById('playlistSong');

    homeButton.classList.add('active-top');
    searchScreen.style.display = 'none';
    playlistSong.style.display = 'none';

    homeButton.addEventListener('click', function() {
        homeButton.classList.add('active-top');
        searchButton.classList.remove('active-top');
        homeScreen.style.display = 'block';
        searchScreen.style.display = 'none';
        playlistSong.style.display = 'none';
    });

    searchButton.addEventListener('click', function() {
        searchButton.classList.add('active-top');
        homeButton.classList.remove('active-top');
        homeScreen.style.display = 'none';
        searchScreen.style.display = 'block';
        playlistSong.style.display = 'none';
    });
});
