import type { AxiosInstance } from "axios";
import { Word } from "@/word/Word";

export class WordService {
  constructor(private readonly axios: AxiosInstance) {}

  async getWords(part: string): Promise<Word[]> {
    const res = await this.axios.get(`word/find/${part}`);
    return res.data.map((data: any) => Word.fromDto(data));
  }

  async getDetailedWords(word: string): Promise<Word[]> {
    const res = await this.axios.get(`word/${word}`);
    return (res.data as any[]).map(it => Word.fromDto(it));
  }
}
