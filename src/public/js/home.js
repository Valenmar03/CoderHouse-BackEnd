const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', async (evt) => {
    window.location.replace('/logout')
})