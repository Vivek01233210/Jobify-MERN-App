import { Router } from "express";

import { getAllJobs, createJob, updateJob, deleteJob, getJob, showStats } from "../controllers.js/jobController.js";
import { validateIdParam, validateJobInput } from "../middleware/validate.js";

const router = Router();

router.get('/', getAllJobs);

router.post('/', validateJobInput, createJob);

router.get('/stats', showStats)

router.get('/:id',validateIdParam, getJob);

router.patch('/:id',validateIdParam, validateJobInput, updateJob);

router.delete('/:id',validateIdParam, deleteJob);

export default router;