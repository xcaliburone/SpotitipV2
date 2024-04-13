document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.header button');
    const sections = document.querySelectorAll('.main > div');

    // Fungsi untuk menampilkan semua section
    function showAllSections() {
        sections.forEach(section => {
            section.style.display = 'flex';
        });
    }

    // Fungsi untuk menampilkan hanya satu section dan menyembunyikan yang lainnya
    function showSection(sectionToShow) {
        sections.forEach(section => {
            if (section === sectionToShow) {
                section.style.display = 'flex';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Atur event listener untuk setiap tombol
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSectionClass = button.dataset.target; // Ambil target section dari data attribute
            const targetSection = document.querySelector('.' + targetSectionClass);
            if (targetSection) {
                if (targetSectionClass === 'main') {
                    showAllSections(); // Menampilkan semua section saat tombol "All" ditekan
                } else {
                    showSection(targetSection); // Panggil fungsi untuk menampilkan section yang diinginkan
                }
                buttons.forEach(btn => {
                    if (btn === button) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        });
    });

    // Secara default, tampilkan semua section
    showAllSections();


    // const buttonSearch = document.getElementById('button-search');
    // const searchBarContainer = document.getElementById('search-bar-container');

    // buttonSearch.addEventListener('click', function() {
    //     // Tampilkan input search bar ketika tombol "Search" ditekan
    //     searchBarContainer.style.display = 'flex';
    // });

    // const searchBar = document.getElementById('search-bar');
    // const itemsToSearch = document.querySelectorAll('.list-items');

    // searchBar.addEventListener('input', function() {
    //     const searchText = searchBar.value.toLowerCase();

    //     itemsToSearch.forEach(item => {
    //         const title = item.querySelector('.desc h1').textContent.toLowerCase();
    //         const desc = item.querySelector('.desc p').textContent.toLowerCase();

    //         if (title.includes(searchText) || desc.includes(searchText)) {
    //             item.style.display = 'flex';
    //         } else {
    //             item.style.display = 'none';
    //         }
    //     });
    // });
});