import { defineStore } from 'pinia';
export const userThemeStore = defineStore({
  id: 'theme',
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