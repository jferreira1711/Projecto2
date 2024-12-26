import express from 'express'
import { createUsuario, deleteUsuario, getallUsuarios, getUsuario, updateUsuario , loginUser} from '../controllers/UsuariosController.js'

const router = express.Router()


router.get('/', getallUsuarios)
router.get('/:id', getUsuario)
router.post('/', createUsuario)
router.put('/:id', updateUsuario)
router.delete('/:id', deleteUsuario)
router.post('/login', loginUser)

export default router