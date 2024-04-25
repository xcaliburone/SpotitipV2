document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.header button')
    const sections = document.querySelectorAll('.main > div')

    function showAllSections() { sections.forEach( section => { section.style.display = 'flex'; } ); }

    function showSection( sectionToShow ) {
        sections.forEach( section => {
            if ( section === sectionToShow ) { section.style.display = 'flex';
            } else { section.style.display = 'none'; }
        });
    }

    buttons.forEach( button => {
        button.addEventListener('click', () => {
            const targetSectionClass = button.dataset.target;
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
    }); showAllSections()
});