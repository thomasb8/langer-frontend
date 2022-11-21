import type { AxiosInstance } from "axios";
import { Word } from "@/word/Word";

export class WordService {
  constructor(private readonly axios: AxiosInstance) {}

  async getWords(part: string): Promise<Word[]> {
    const res = await this.axios.get(`word/find/${part}`);
    return res.data.map((data: any) => Word.fromDto(data));
  }

  async getDetailedWord(id: string): Promise<Word> {
    const res = await this.axios.get(`word/${id}`);
    return Word.fromDto(res.data);
  }
}
