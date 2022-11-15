import { ApiService } from "@/common/ApiService";
import api from "@/common/api";

export default function createContext(): AppContext {
  return {
    apiService: new ApiService(api)
  }
}

export interface AppContext {
  apiService: ApiService
}
