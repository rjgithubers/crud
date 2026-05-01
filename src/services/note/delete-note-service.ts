import { NoteRepository, NoteData } from "@/repositories/note.repository";

export async function deleteNoteService(id: string) {
    const noteRepository = new NoteRepository();

    try {
        const newNote = await noteRepository.delete(id);
        return {code: 200, status: "success", message: "Note deleted successfully.", data: newNote};
    }
        catch (error) {
            console.error("Error deleting note:", error);
            return {code: 500, status: "error", message: "An error occurred."};
        }
}
