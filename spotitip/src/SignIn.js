const createAccountLink = document.getElementById('create-account-link');
// const loginButton = document.querySelector('.signin button');
const loginButton = document.getElementById('signInButton');

function showSignUpForm(event) {
    event.preventDefault();
    window.location.href = './SignUp.html';
}
createAccountLink.addEventListener('click', showSignUpForm);

function handleLogin(event) {
    event.preventDefault(); // Mencegah pengiriman formulir
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email && password) {
        // Kirim formulir ke signIn.php untuk diproses
        document.getElementById('loginForm').submit();
        // window.location.href = './index.html';
    } else {
        alert('Please fill in both email and password fields.');
    }
}
loginButton.addEventListener('click', handleLogin);