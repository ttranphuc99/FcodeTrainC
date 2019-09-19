import { Form } from "antd";

const API_BASE = "http://localhost:8080";

class LoginService {
    login(data) {
        let url = API_BASE + '/login';
        let formData = new FormData();

        formData.append('username', data.username);
        formData.append('password', data.password);

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: formData
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

    checkPassword(password) {
        let url = API_BASE + '/member/password';

        let formData = new FormData();
        formData.append('oldPassword', password);

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: formData
        });
    }

    changePassword(form) {
        let url = API_BASE + '/member/changePassword';

        let formData = new FormData();
        formData.append('oldPassword', form.oldPassword);
        formData.append('newPassword', form.newPassword);

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: formData
        })
    }

    isLoggedIn() {
        return localStorage.getItem('loggedIn') === 'true' || false;
    }

    getUsername() {
        return this.getCookie('username');
    }

    getFullname() {
        return this.getCookie('fullname');
    }

    getRole() {
        return this.getCookie('role');
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

export default new LoginService();