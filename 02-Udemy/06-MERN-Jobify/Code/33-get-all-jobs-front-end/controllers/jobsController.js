import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createJob = async (req, res) => {
	try {
		const { position, company } = req.body;

		if (!position || !company) {
			throw new BadRequestError('Please provide all values.');
		}

		req.body.createdBy = req.user.userId;

		const job = await Job.create(req.body);
		res.status(StatusCodes.CREATED).json({ job });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
	}
};

const deleteJob = async (req, res) => {
	res.send('delete job');
};

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId });
	res
		.status(StatusCodes.OK)
		.json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
	res.send('update job');
};

const showStats = async (req, res) => {
	res.send('show stats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
