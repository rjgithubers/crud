import { NoteRepository, NoteData } from "@/repositories/note.repository";

export async function updateNoteService(data: NoteData, id: string) {
    const noteRepository = new NoteRepository();

    try {
        const newNote = await noteRepository.update(data, id);
        return {code: 200, status: "success", message: "Note updated successfully.", data: newNote};
    }
        catch (error) {
            console.error("Error updating note:", error);
            return {code: 500, status: "error", message: "An error occurred."};
        }
}
