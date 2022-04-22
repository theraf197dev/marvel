import axios from "axios";
import md5 from "md5";
import { API_URL, PRIVATE_API_KEY, PUBLIC_API_KEY } from "./constants";

export class MarvelClient{
    private ts: number;
    private hash: any;

    constructor() {
        this.ts = new Date().getTime();
        this.hash = this.generateHash();
    }

    private generateHash(): any {

        var stringToHash = this.ts.toString() + PRIVATE_API_KEY + PUBLIC_API_KEY;

        return md5(stringToHash);
    }

    public async getHeroes(page: string, limit: string) {
        try{
            const result = await axios.get(`${API_URL}/characters?limit=${limit}&offset=${(Number(page)-1)*Number(limit)}&ts=${this.ts}&apikey=${PUBLIC_API_KEY}&hash=${this.hash}`);
            return result.data;
        } catch(e) {
            return e;
        }
    }

    public async getHeroDetail(id: string) {
        try{
            const result = await axios.get(`${API_URL}/characters/${id}?ts=${this.ts}&apikey=${PUBLIC_API_KEY}&hash=${this.hash}`);
            return result.data;
        } catch(e) {
            return e;
        }
    }
}