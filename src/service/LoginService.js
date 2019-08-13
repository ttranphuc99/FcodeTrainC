const API_BASE = "http://localhost:8080";

class LoginService {
    login(data) {
        let url = API_BASE + '/login?username=' + data.username + '&password=' + data.password;
        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }

    async logout() {
        let url = API_BASE + '/logout';
        let response = await fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
        return await response.status;
    }

    isLoggedIn() {
        return sessionStorage.getItem('loggedIn') || false;
    }
}

export default new LoginService();