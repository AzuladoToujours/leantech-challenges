const express = require('express');

// Import Our custom middlewares

// Routes
const { UserRoutes } = require('./index.routes');
const ChallengeOneUserRoutes = require('./reto1/users.routes');
const ChallengeTwoUserRoutes = require('./reto2/users.routes');

const router = express.Router();

// Use middlewares
router.use(express.json());

router.use('/challenge1/users', ChallengeOneUserRoutes);
router.use('/challenge2/users', ChallengeTwoUserRoutes);
router.use('/challenge3/users', UserRoutes);

// Use custom middleware
// router.use();

module.exports = router;
