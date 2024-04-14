// const menuButton = document.getElementById('menu-button')
// const menu = document.querySelector('.absolute')
// const signUpButton = document.querySelector('.signUpButton')

// menuButton.addEventListener('click', (event) => {   // event listener pada tombol untuk menampilkan/menyembunyikan menu dropdown
//     const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
//     menuButton.setAttribute('aria-expanded', !expanded)
//     menu.classList.toggle('hidden')
//     event.preventDefault();       // Mencegah event default (klik tombol)
//     event.stopPropagation();      // Mencegah event propagation agar tidak memicu event click pada body
// });

// document.addEventListener('click', (event) => {     // Menutup dropdown saat mengklik di luar area dropdown
//     const isClickInsideMenu = menu.contains(event.target)
//     const isClickInsideButton = menuButton.contains(event.target)
//     const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
//     if (!isClickInsideMenu && !isClickInsideButton && expanded) {   // Menutup dropdown hanya jika diklik di luar area dropdown
//         menu.classList.add('hidden'); menuButton.setAttribute('aria-expanded', 'false')
//     }
// });

// function handleSignUp( event ) {      // Handle SignUp hanya ketika dropdown tidak sedang terbuka
//     event.preventDefault()
//     const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
//     if ( !expanded ) {
//         const username = document.getElementById('name').value
//         const email = document.getElementById('email').value
//         const password = document.getElementById('password').value
//         if (username && email && password) {        // Kirim formulir ke signUp.php untuk diproses
//             document.querySelector('form').submit();
//             window.location.href = '../html/index.html';
//         } else {
//             alert('Please fill in all fields.')
//         }
//     }
// } signUpButton.addEventListener('click', handleSignUp);

if (errorMessage === 'duplicate') {
        alert("Username atau email sudah terdaftar. Silakan masukkan username atau email yang berbeda.");
}