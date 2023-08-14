import { Router } from 'express'
import mailingController from "../controllers/mailing.controller.js";

const router = new Router();

router.get('/sendChangePass', mailingController.sendMailLogued)
router.post('/changePass', mailingController.changePass)

export default router

