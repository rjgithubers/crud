import { prisma } from "@/lib/prisma";

export interface NoteData{
    title: string;
    content: string;
    tags: string[];
    category: string;
}
export class NoteRepository {
    async create(data: NoteData) {
        return prisma.note.create({ data });
    }

    async get() {
        return prisma.note.findMany();
    }
async update(data: NoteData, id: string) {
        return prisma.note.update({
            where: { id: id },
            data: data
        });
}
    async delete(id: string) {
        return prisma.note.delete({ where: { id } });
    }

}