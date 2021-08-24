import express from 'express';

import lookup from './controller.js';

const router = express.Router();

router.get('/lookup/', lookup);

export default router;
