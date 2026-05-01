import { NoteRepository, NoteData } from "@/repositories/note.repository";

export async function getNoteService() {
    const noteRepository = new NoteRepository();

    try {
        const newNote = await noteRepository.get();
        return {code: 200, status: "success", message: "Note retrieved successfully.", data: newNote};
    }
        catch (error) {
            console.error("Error getting note:", error);
            return {code: 500, status: "error", message: "An error occurred."};
        }
}
