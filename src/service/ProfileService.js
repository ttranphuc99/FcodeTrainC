import LoginService from './LoginService';

import API_BASE from './ApiBase';

class ProfileService {
    loadProfile() {
        let url = API_BASE + '/member/account/' + LoginService.getUsername();

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }

    loadProfiles(username) {
        let url = API_BASE + '/member/account/' + username;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }

    updateProfile(data) {
        let url = API_BASE + '/member/account';
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