import { WordService } from "@/common/WordService";
import api from "@/common/api";
import { AuthService } from "@/common/AuthService";
import Storage from "@/common/Storage";

export default function createContext(): AppContext {
  const storage = new Storage()
  return {
    wordService: new WordService(api),
    authService: new AuthService(api, storage),
    storage: storage
  }
}

export interface AppContext {
  wordService: WordService,
  authService: AuthService,
  storage: Storage
}
