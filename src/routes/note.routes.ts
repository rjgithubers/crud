import { Router } from "express";
import { NoteController } from "@/controllers/note.controller";

const router = Router();
const noteController = new NoteController();

router.post("/v1/create-note", noteController.create);
router.get("/v1/get-note", noteController.get);
router.put("/v1/update-note", noteController.update);
router.delete("/v1/delete-note", noteController.delete);
export default router;