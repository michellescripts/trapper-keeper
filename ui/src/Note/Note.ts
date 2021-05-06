export interface Note {
    id: string,
    title: string;
    data: string,
    type: NoteType,
    pinned: Boolean,
}

export enum NoteType {
    BLOB,
}
