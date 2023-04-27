import { Router } from 'express'

const router = Router()

router.get('/home', (req, res) => {
    res.render('home', {
        css: 'home'
    })
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        css:'realTimeProducts'
    })
})


export default router