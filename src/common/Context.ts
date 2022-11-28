import { WordService } from "@/common/WordService";
import api from "@/common/api";
import { AuthService } from "@/common/AuthService";
import { WordSessionService } from "@/common/WordSessionService";
import Storage from "@/common/Storage";

export default function createContext(): AppContext {
  const storage = new Storage()
  return {
    wordService: new WordService(api),
    authService: new AuthService(api, storage),
    wordSessionService: new WordSessionService(api),
    storage: storage
  }
}

export interface AppContext {
  wordService: WordService,
  authService: AuthService,
  wordSessionService: WordSessionService,
  storage: Storage
}
