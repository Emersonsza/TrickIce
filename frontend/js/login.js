const container = document.querySelector('.container');
const registerBtn = document.querySelector('.registrar-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('ativo');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('ativo');
});