import express from 'express'
import {postController}  from '../controllers';

const router = express.Router();

router.post("/", postController);

export default router;