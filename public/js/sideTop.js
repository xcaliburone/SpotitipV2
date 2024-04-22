document.addEventListener('DOMContentLoaded', function() {
    const homeButton = document.getElementById('gotoHome');
    const searchButton = document.getElementById('gotoSearch');
    const homeScreen = document.getElementById('homescreen');
    const searchScreen = document.getElementById('searchscreen');

    // Tambahkan kelas active-top pada tombol Home sebagai nilai default
    homeButton.classList.add('active-top');

    // Sembunyikan searchScreen saat halaman dimuat
    searchScreen.style.display = 'none';

    // Tambahkan event listener pada tombol Home
    homeButton.addEventListener('click', function() {
        homeButton.classList.add('active-top'); // Tambahkan kelas active-top pada tombol Home
        searchButton.classList.remove('active-top'); // Hapus kelas active-top dari tombol Search
        homeScreen.style.display = 'block';
        searchScreen.style.display = 'none';
    });

    // Tambahkan event listener pada tombol Search
    searchButton.addEventListener('click', function() {
        searchButton.classList.add('active-top'); // Tambahkan kelas active-top pada tombol Search
        homeButton.classList.remove('active-top'); // Hapus kelas active-top dari tombol Home
        homeScreen.style.display = 'none';
        searchScreen.style.display = 'block';
    });
});
