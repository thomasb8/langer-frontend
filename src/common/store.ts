import { reactive } from 'vue'
import type User from "@/user/User";
import type { WordSessionEntry } from "@/word/WordSession";
import type WordSession from "@/word/WordSession";

export const store = reactive({
  user: null as User | null,
  setUser(user: User | null) {
    this.user = user;
  },
  isUserLoggedIn() {
    return !!this.user;
  },
  wordSessions: [] as WordSession[],
  latestSession() {
    return this.wordSessions[0];
  },
  updateLatestSession(session: WordSession) {
    this.wordSessions[0] = session;
  },
  latestSessionHasWord(wordId: string): boolean {
    return this.latestSession()?.entries?.some((it: WordSessionEntry) => it.wordId === wordId) || false
  }
})
