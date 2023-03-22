import { defineStore, createPinia } from 'pinia';
export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: () => ({
    theme: "lighting-theme",
  }),
  getters: {
    
  },
  actions: {
    changeTheme() {
     this.theme="dark-theme"
    },
  },
})