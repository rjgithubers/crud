import { NoteRepository, NoteData } from "@/repositories/note.repository";

export async function createNoteService( data: NoteData) {
    const noteRepository = new NoteRepository();

    try {
        const newNote = await noteRepository.create(data);
        return {code: 201, status: "success", message: "Note created successfully.", data: newNote};
    }
        catch (error) {
            console.error("Error creating note:", error);
            return {code: 500, status: "error", message: "An error occurred."};
        }
}
