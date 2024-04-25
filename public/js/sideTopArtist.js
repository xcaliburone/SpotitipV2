document.addEventListener('DOMContentLoaded', async () => {
    try {
        const gotoHomeButton = document.getElementById('gotoHome');
        const gotoSearchButton = document.getElementById('gotoSearch');
        const albumsButton = document.getElementById('aside-albums-button');

        const artistScreen = document.getElementById('artistScreen')
        const searchScreen2 = document.getElementById('searchScreen2')
        const albumSong = document.getElementById('albumSong')

        gotoHomeButton.classList.add('active-top');
        
        gotoHomeButton.addEventListener('click', () => {
            searchScreen2.style.display = 'none';
            albumSong.style.display = 'none';
            artistScreen.style.display = 'block';

            gotoHomeButton.classList.add('active-top');
            gotoSearchButton.classList.remove('active-top');
            albumsButton.classList.remove('active');
        });

        gotoSearchButton.addEventListener('click', () => {
            // Lakukan sesuatu saat tombol ditekan
        });

        albumsButton.addEventListener('click', () => {
            artistScreen.style.display = 'none';
            searchScreen2.style.display = 'none';
            albumSong.style.display = 'block';
        
            albumsButton.classList.add('active');
            gotoHomeButton.classList.remove('active-top');
            gotoSearchButton.classList.remove('active-top');
        });
    } catch (error) {
        console.error("Error:", error);
    }
});
