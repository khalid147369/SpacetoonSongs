// plucked defineStore from pinia to create our auth store
import { defineStore } from 'pinia'
import { ref } from "vue";
// defineStore takes two arguements (unique name, returned function)
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(null);

    const login = (userData, authToken) => {
        user.value = userData;
        token.value = authToken;
    }
    return { user, token, login };
})