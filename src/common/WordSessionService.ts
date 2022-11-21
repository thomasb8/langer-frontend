import type { AxiosInstance } from "axios";

export class WordSessionService {
  constructor(private readonly axios: AxiosInstance) {}

  async list() {
    const res = await this.axios.get('/word-session');
    return res.data;
  }

  async create() {
    const res = await this.axios.post('/word-session/create');
    return res.data;
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