const haveAccountLink = document.getElementById('have-account-link');
const signUpButton = document.querySelector('.signup button');

function showSignInForm(event) {
    event.preventDefault();
    window.location.href = '/SignIn.html';
}
haveAccountLink.addEventListener('click', showSignInForm);

function handleSignUp(event) {
    event.preventDefault();
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        // Kirim formulir ke signUp.php untuk diproses
        document.querySelector('form').submit();
        // window.location.href = './index.html';

    } else {
        alert('Please fill in all fields.');
    }
}
signUpButton.addEventListener('click', handleSignUp);
