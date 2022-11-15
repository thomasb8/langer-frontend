import type { AxiosInstance } from "axios";
import { Word } from "@/word/Word";

export class ApiService {
  constructor(private readonly axios: AxiosInstance) {}

  async getWords(part: string): Promise<Word[]> {
    const res = await this.axios.get(`word/find/${part}`, { headers: { 'Content-Type': 'application/json' }});
    return res.data.map((data: any) => Word.fromDto(data));
  }

  async getDetailedWord(id: string): Promise<Word> {
    const res = await this.axios.get(`word/${id}`, { headers: { 'Content-Type': 'application/json' }});
    return Word.fromDto(res.data);
  }
}
