import express from 'express';
import {
  createListing,
  deleteListing,
  getListings,
  getSingleListing,
  getUserFavorites,
  updateFavorites,
  updateListing,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/single/:listingId', getSingleListing);
router.get('/get-listings', getListings);
router.get('/get-favorites', verifyToken, getUserFavorites);
router.post('/create', verifyToken, createListing);
router.patch('/update/:id', verifyToken, updateListing);
router.patch('/favorites/:id', verifyToken, updateFavorites);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;
