import { Router } from "express";
import noteRoutes from "@/routes/note.routes";

const router = Router();

router.use("/note", noteRoutes);


export default router;