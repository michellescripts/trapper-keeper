export interface Note {
    id: string,
    title: string;
    data: string,
    type: NoteType,
    pinned: Boolean,
    deleted: Boolean,
}

export enum NoteType {
    BLOB,
}
