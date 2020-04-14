import express from 'express';
import ctrl from '../apis/agmip_phis_request.controller';

// routes
const router = express.Router();
router.post('/', ctrl.index);

export default router