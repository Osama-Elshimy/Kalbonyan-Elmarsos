import express from 'express';

import {
	createJob,
	deleteJob,
	getAllJobs,
	updateJob,
	showStats,
} from '../controllers/jobsController.js';

import testUser from '../middleware/testUser.js';

const router = express.Router();

router.route('/').post(testUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
