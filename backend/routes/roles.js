import { Router } from 'express';
import { createRole, deleteRole, readRoles, readRole, updateRole } from '../controllers/RoleController.js';
import { verifyToken, verifyTokenAndAuthorization } from '../utils/verifyToken.js';

const router = Router();

// CREATE - über HTTP Methode POST
router.post('/roles', verifyToken, createRole);

// UPADTE
router.put('/roles/:id', verifyToken, updateRole);

// DELETE
router.delete('/roles/:id', verifyToken, deleteRole);

// READ ALL
router.get('/roles', readRoles);

// READ ONE
router.get('/roles/:id', readRole);

export default router;
