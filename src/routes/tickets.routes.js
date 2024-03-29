import { Router } from 'express'
import ticketController from '../controllers/ticket.controller.js'

const router = Router()

router.post('/:cid', ticketController.createTicket)
router.get('/', ticketController.getTickets)
router.post('/:cid/purchase', ticketController.purchase)
router.delete('/:tid', ticketController.deleteTicket)

export default router