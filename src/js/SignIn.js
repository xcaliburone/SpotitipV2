const createAccountLink = document.getElementById('create-account-link')
const loginButton = document.getElementById('signInButton')

function showSignUpForm( event ) {
    event.preventDefault()
    window.location.href = 'SignUp.html'
} createAccountLink.addEventListener( 'click', showSignUpForm )

function handleLogin( event ) {
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if ( email && password ) {
        document.getElementById( 'loginForm' ).submit();
        window.location.href = '../html/Main.html';
    } else {
        alert('Please fill in both email and password fields.');
    }
} loginButton.addEventListener( 'click', handleLogin );