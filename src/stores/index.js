import { createPinia } from "pinia";
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

export * from "@/stores/modules/useUserStore.js"
export * from "@/stores/modules/useCategoryStore.js"
