import API_BASE from './ApiBase';

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
            crossDomain: true,
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
        return this.getUsername() !== '';
    }

    getUsername() {
        return this.getCookie('username');
    }

    getFullname() {
        let fullname = this.getCookie('fullname');
        
        do {
            fullname = fullname.replace('+', ' ');
        } while (fullname.indexOf('+') > -1)

        return fullname;
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