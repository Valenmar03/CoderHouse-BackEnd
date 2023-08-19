const logoutBtn = document.getElementById('logout-btn')
const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const profileBtn = document.getElementById('profile-btn')
const addToCartbtn = document.getElementsByClassName('add-to-cart')

console.log(addToCartbtn)

for (let i = 0; i < addToCartbtn.length; i++) {
    addToCartbtn[i].addEventListener('click', (evt) => {
        evt.preventDefault();
        console.log(addToCartbtn[i].value)
    })   
}


if(logoutBtn){
    logoutBtn.addEventListener('click', async (evt) => {
        window.location.replace('/logout')
    })
    profileBtn.addEventListener('click', async (evt) => {
        window.location.replace('/profile')
    })
}else {
    loginBtn.addEventListener('click', async (evt) => {
        window.location.replace('/login')
    })
    registerBtn.addEventListener('click', async (evt) => {
        window.location.replace('/register')
    })

}
