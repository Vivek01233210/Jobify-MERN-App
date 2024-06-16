import Job from '../models/JobModel.js';
import { NotFoundError } from '../utils/customError.js';
import mongoose from 'mongoose';
import day from 'dayjs';

//@desc   get all jobs created a user
//@route  GET /api/v1/jobs
//@access Private
export const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort, page } = req.query;

    const queryObject = {
        // createdBy: req.user.userId,
    }

    if (search) {
        queryObject.$or = [
            { company: { $regex: search, $options: 'i' } },
            { position: { $regex: search, $options: 'i' } },
        ]
    }
    if (jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus;
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }
    // console.log(queryObject)

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position',
    }

    const sortKey = sortOptions[sort] || sortOptions.newest;

    // SETUP PAGINATION
    const currentPage = Number(page) || 1;
    const limit = process.env.LIMIT_PER_PAGE || 10;
    const skip = (currentPage - 1) * limit;

    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit).populate('createdBy');

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(200).json({ results: totalJobs, numOfPages, currentPage, jobs });
};

//@desc   create a job
//@route  POST /api/v1/jobs
//@access public
export const createJob = async (req, res) => {
    const { company, position, jobStatus, jobType, jobLocation } = req.body;

    const job = await Job.create({
        company,
        position,
        jobStatus, jobType, jobLocation,
        createdBy: req.user.userId  // id of logged in user
    });
    res.status(201).json({ job });
};

//@desc get a job
//@route GET /api/v1/jobs/:id
//@access public
export const getJob = async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!job) throw new NotFoundError('Job not found');

    res.status(200).json({ job });
};

//@desc get my jobs
//@route GET /api/v1/jobs/my-jobs
//@access private
export const getMyJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId });
    if (!jobs) throw new NotFoundError('Job not found');

    return res.status(200).json({ jobs });
};

//@desc   update a job
//@route  PATCH /api/v1/jobs/:id
//@access Private
export const updateJob = async (req, res) => {
    const { company, position, jobStatus, jobType, jobLocation } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user.userId },
        { company, position, jobStatus, jobType, jobLocation },
        { new: true }
    );
    if (!updatedJob) throw new NotFoundError('Job not found');

    res.status(200).json({ job: updatedJob });
};

//@desc delete a job
//@route DELETE /api/v1/jobs/:id
//@access private
export const deleteJob = async (req, res) => {
    const removedJob = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!removedJob) throw new NotFoundError('Job not found');

    res.status(200).json({ message: 'Job deleted successfully', job: removedJob });
};

//@desc   get all jobs
//@route  GET /api/v1/jobs/stats
//@access Private
export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: "$jobStatus", count: { $sum: 1 } } }
    ])
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;  // destructuring
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;

            const date = day()
                .month(month - 1)
                .year(year)
                .format('MMM YY');
            return { date, count };
        })
        .reverse();

    res.status(200).json({ defaultStats, monthlyApplications });
}