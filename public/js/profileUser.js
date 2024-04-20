// Ambil semua tombol yang ingin ditambahkan perilaku
const buttons = document.querySelectorAll('button[data-target]');

// Atur keadaan awal
document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen main dengan ID 'myUser'
    const defaultMain = document.getElementById('myUser');
    // Tampilkan elemen main default
    defaultMain.style.display = 'flex';

    // Semua elemen main lainnya disembunyikan
    const mains = document.querySelectorAll('main:not(#myUser)');
    mains.forEach(main => {
        main.style.display = 'none';
    });

    // Tambahkan kelas active ke tombol 'call db.user'
    document.querySelector('button[data-target="myUser"]').classList.add('active');
});

// Loop melalui setiap tombol
buttons.forEach(button => {
    // Tambahkan event listener untuk setiap tombol
    button.addEventListener('click', function() {
        // Ambil ID dari elemen main yang sesuai dengan data-target tombol yang diklik
        const targetId = this.getAttribute('data-target');
        // Ambil semua elemen main
        const mains = document.querySelectorAll('main');
        
        // Loop melalui setiap elemen main
        mains.forEach(main => {
            // Periksa apakah ID elemen main sama dengan targetId
            if (main.id === targetId) {
                // Tampilkan elemen main yang sesuai
                main.style.display = 'flex';
            } else {
                // Sembunyikan elemen main yang tidak sesuai
                main.style.display = 'none';
            }
        });
        
        // Hapus kelas active dari semua tombol
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Tambahkan kelas active ke tombol yang diklik
        this.classList.add('active');
    });
});
