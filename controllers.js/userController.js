import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs';

//@desc   Get current user
//@route  GET /api/users/current-user
//@access Private
export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.status(200).json({user});
}

//@desc   Get application stats
//@route  GET /api/users/admin/app-stats
//@access Admin
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(200).json({users, jobs});
}

//@desc   Update user
//@route  PATCH /api/users/update-user
//@access Private
export const updateUser = async (req, res) => {
    const newUser = {...req.body};

    if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const user = await User.findByIdAndUpdate(req.user.userId, newUser);

    // delete the previous image if the user uploaded a new image
    if(req.file && user.avatarPublicId){
        await cloudinary.v2.uploader.destroy(user.avatarPublicId);
    }

    res.status(200).json({user});
}