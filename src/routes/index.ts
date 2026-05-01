import { Router } from "express";
import noteRoutes from "@/routes/note.routes";
import authRoutes from "@/routes/auth.routes";


const router = Router();

router.use("/note", noteRoutes);
router.use("/auth", authRoutes);

export default router;