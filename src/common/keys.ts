import type { InjectionKey } from "vue";
import type { AppContext } from "@/common/Context";

export const CONTEXT = Symbol() as InjectionKey<AppContext>;
