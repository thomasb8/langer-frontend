import type { AxiosInstance } from "axios";
import WordSession from "@/word/WordSession";

export class WordSessionService {
  constructor(private readonly axios: AxiosInstance) {}

  async list(): Promise<WordSession[]> {
    const res = await this.axios.get('/word-session');
    return res.data.map((it: any) => WordSession.fromDto(it));
  }

  async get(sessionId: string): Promise<WordSession> {
    const res = await this.axios.get(`/word-session/${sessionId}`);
    return WordSession.fromDto(res.data);
  }

  async create() {
    const res = await this.axios.post('/word-session/create');
    return WordSession.fromDto(res.data);
  }

  async addWord(sessionId: string, wordId: string) {
    await this.axios.put(`/word-session/${sessionId}/${wordId}`);
  }

  async removeWord(sessionId: string, wordId: string) {
    await this.axios.delete(`/word-session/${sessionId}/${wordId}`);
  }

  async deleteSession(sessionId: string) {
    await this.axios.delete(`/word-session/${sessionId}`);
  }
}
