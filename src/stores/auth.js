import { defineStore } from "pinia"
import { ref, computed } from "vue"
import http from "@/services/http.js"

export const useAuth = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"))

  const user = ref(JSON.parse(localStorage.getItem("user")))

  function setToken(tokenValue) {
    localStorage.setItem("token", tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue) {
    localStorage.setItem("user", JSON.stringify(userValue))
    user.value = userValue
  }

  async function checkToken() {
    try {

      const { data } = await http.get("/auth/me")
      return data;
    
    } catch (error) {
    
      return false;
    
    }
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    token.value = ""
    user.value = ""
    window.location = "/auth/login"
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value
  });

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    isAuthenticated,
    logout,
  }

})
