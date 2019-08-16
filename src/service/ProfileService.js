const API_BASE = "http://localhost:8080";

class ProfileService {
    loadProfile() {
        let url = API_BASE + '/profile';

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }
}

export default new ProfileService();