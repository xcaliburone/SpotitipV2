const buttons = document.querySelectorAll('button[data-target]');

document.addEventListener('DOMContentLoaded', function() {
    const defaultMain = document.getElementById('myArtist');
    defaultMain.style.display = 'flex';
    const mains = document.querySelectorAll('main:not(#myArtist)');
    mains.forEach(main => { main.style.display = 'none'; });
    document.querySelector('button[data-target="myArtist"]').classList.add('active');
});

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const mains = document.querySelectorAll('main');
        mains.forEach(main => {
            if (main.id === targetId) {
                main.style.display = 'flex';
            } else { main.style.display = 'none'; }
        });
        buttons.forEach(btn => { btn.classList.remove('active'); });
        this.classList.add('active');
    });
});
