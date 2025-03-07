const express = require('express');
const { register, login, getUsers, deleteUsers } = require('../controllers/authControllers');

const router = express.Router();

//register user
router.post('/register', register);
module.exports = router;