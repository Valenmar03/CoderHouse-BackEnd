import { Router } from 'express'
import ticketController from '../controllers/ticket.controller.js'

const router = Router()

router.post('/:cid', ticketController.createTicket)
router.get('/', ticketController.getTicketById)

export default router