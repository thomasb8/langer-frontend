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
  updateSession(session: WordSession) {
    const i = this.wordSessions.findIndex(it => it.id === session.id);
    if (i >= 0) {
      this.wordSessions[i] = session;
    }
  },
  addSession(session: WordSession) {
    this.wordSessions.unshift(session);
  },
  removeSession(session: WordSession) {
    this.wordSessions = this.wordSessions.filter( it => it.id !== session.id);
  },
  latestSessionHasWord(word: string): boolean {
    return this.latestSession()?.entries?.some((it: WordSessionEntry) => it.word === word) || false
  }
})
