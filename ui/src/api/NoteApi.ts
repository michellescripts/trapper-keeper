import {AxiosInstance, AxiosStatic} from 'axios'
import {NoteResponse} from './NoteResponse'

export interface NoteApi {
    getNotes: () => Promise<NoteResponse>,
}

export class NoteApiClient implements NoteApi {
    private http: AxiosInstance

    constructor(
        baseUrl: string,
        axios: AxiosStatic,
    ) {
        this.http = axios.create({
            baseURL: `${baseUrl}/api/v1`,
        })
    }

    public async getNotes(): Promise<NoteResponse> {
        return this.http.get('/note').then(res => res.data)
    }
}
