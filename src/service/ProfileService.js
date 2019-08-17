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

    updateProfile(data) {
        let url = API_BASE + '/profile';
        let body = {
            fullname: data.fullname,
            description: data.description
        };

        return fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default new ProfileService();