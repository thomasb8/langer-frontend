import { WordService } from "@/common/WordService";
import api from "@/common/api";
import { AuthService } from "@/common/AuthService";

export default function createContext(): AppContext {
  return {
    wordService: new WordService(api),
    authService: new AuthService(api)
  }
}

export interface AppContext {
  wordService: WordService,
  authService: AuthService
}
