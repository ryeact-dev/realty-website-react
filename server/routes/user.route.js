import express from 'express';

// Controllers
import {
  deleteUser,
  updateUserInfo,
  getuserListings,
  getUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/listings/:id', verifyToken, getuserListings);
router.get('/:id', verifyToken, getUser);
router.patch('/update/:id', verifyToken, updateUserInfo);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
