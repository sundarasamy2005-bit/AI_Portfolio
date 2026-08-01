const express = require('express');
const router = express.Router();
const { getInternships, createInternship, updateInternship, deleteInternship } = require('../controllers/internshipController');

router.get('/', getInternships);
router.post('/', createInternship);
router.put('/:id', updateInternship);
router.delete('/:id', deleteInternship);

module.exports = router;
