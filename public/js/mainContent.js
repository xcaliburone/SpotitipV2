document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.header button')
    const sections = document.querySelectorAll('.main > div')

    function showAllSections() {       // Fungsi untuk menampilkan semua section
        sections.forEach( section => { section.style.display = 'flex'; } );
    }

    function showSection( sectionToShow ) {   // Fungsi untuk menampilkan hanya satu section dan menyembunyikan yang lainnya
        sections.forEach( section => {
            if ( section === sectionToShow ) { section.style.display = 'flex';
            } else { section.style.display = 'none'; }
        });
    }

    buttons.forEach( button => {             // Atur event listener untuk setiap tombol
        button.addEventListener('click', () => {
            const targetSectionClass = button.dataset.target;   // Ambil target section dari data attribute
            const targetSection = document.querySelector( '.' + targetSectionClass );
            if ( targetSection ) {
                if ( targetSectionClass === 'main' ) { showAllSections();
                } else { showSection( targetSection ) }
                buttons.forEach( btn => {
                    if ( btn === button ) { btn.classList.add('active');
                    } else { btn.classList.remove('active') }
                });
            }
        })
    }); showAllSections()  // Secara default, tampilkan semua section
});