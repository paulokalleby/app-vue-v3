import http from '@/services/http.js'

export default class AuthService {

    static async login(params) {
        return http.post('/auth/login', params);
    }

    static async register(params) {
        return http.post('/auth/register', params);
    }

    static async forgotPassword(params) {
        return http.post('/auth/forgot-password', params);
    }

    static async resetPassword(params) {
        return http.post('/auth/reset-password', params);
    }

    static async logout() {
        localStorage.removeItem('token');
    }

    static async me() {
        return http.get('/auth/me');
    }

}
