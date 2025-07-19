const express = require('express');
const router = express.Router();
const {getAllRolesWithPrivileges, getRoleById, createRole, updateRole, deleteRole } = require('../controllers/roleController');

router.get('/', getAllRolesWithPrivileges);
router.get('/:id', getRoleById);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;