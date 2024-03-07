import bcryptjs from 'bcryptjs';
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export async function getUser(req, res, next) {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) return next(errorHandler(404, 'User not found'));

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
}

export async function updateUserInfo(req, res, next) {
  const { email, password, username, avatar } = req.body;
  const userId = req.params.id;
  let hashedPassword;

  if (req.user.id !== req.params.id)
    return next(errorHandler(403, 'You can update only your own account'));

  if (password) hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          password: hashedPassword,
          email,
          avatar,
        },
      },
      { new: true } // Return the latest user data
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  const userId = req.params.id;

  if (req.user.id !== userId)
    return next(errorHandler(401, 'You can only delete your own account'));

  try {
    await User.findByIdAndDelete(userId);
    res.clearCookie('token');
    res.status(200).json({ message: 'User has been deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getuserListings(req, res, next) {
  const userId = req.user.id;
  const paramsId = req.params.id;

  if (userId === paramsId) {
    try {
      const listings = await Listing.find({ userRef: userId });
      res.status(200).json(listings);
    } catch (err) {
      next(err);
    }
  } else return next(errorHandler(401, 'You can only view your own listings'));
}
