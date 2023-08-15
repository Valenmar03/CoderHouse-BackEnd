import { Router } from 'express'
import mailingController from "../controllers/mailing.controller.js";

const router = new Router();

router.get('/sendChangePass', mailingController.sendMailToChange)
router.post('/changePass', mailingController.changePass)
router.post('/sendMailToRestore', mailingController.sendMailToRestore)
router.post('/restorePass', mailingController.restorePass)


export default router