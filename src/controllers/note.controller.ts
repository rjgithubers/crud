import { createNoteService } from "@/services/note";
import { getNoteService } from "@/services/note/get-note-service";
import { Request, Response } from "express";
import { updateNoteService} from "@/services/note/update-note-service";
import { deleteNoteService } from "@/services/note/delete-note-service";

export class NoteController {
    async create(req: Request, res: Response) {
        const { title, content, tags, category } = req.body;
        const result = await createNoteService({ title, content, tags, category });
        return res.status(result.code).json(result);
    }

    async get(req: Request, res: Response){
        const result = await getNoteService();
        return res.status(result.code).json(result);
    }
    async update(req: Request, res: Response){
        const {id, title, content, tags, category } = req.body;
        const result = await updateNoteService({ title, content, tags, category }, id);
        return res.status(result.code).json(result);
    }
    async delete(req: Request, res: Response){
        const { id } = req.body;
        const result = await deleteNoteService(id);
        return res.status(result.code).json(result);
    }
}