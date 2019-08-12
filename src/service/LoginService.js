const API_BASE = "http://localhost:8080";

class LoginService {
    login(data) {
        let url = API_BASE + '/login?username=' + data.username + '&password=' + data.password;
        return fetch(url);
    }
}

export default new LoginService();