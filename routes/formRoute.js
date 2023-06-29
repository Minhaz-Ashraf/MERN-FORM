import express from "express";
import { detailController } from "../controllers/formController.js";


const router = express.Router();


router.post("/formlayout", detailController)

export default router;