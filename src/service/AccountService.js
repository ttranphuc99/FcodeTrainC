const API_BASE = "http://localhost:8080";

class AccountService {
    getListAccountByRole(roleId) {
        let url = API_BASE + "/auth/account/" + roleId;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }

    async isUsernameExisted(username) {
        let url = API_BASE + "/member/account/" + username;

        let result = await fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        }).then(response => {
            if (response.status === 404) {
                return false;
            }
            return true;
        })
        return result;
    }

    newAccount(data, roleId) {
        let url = API_BASE + "/auth/account/" + roleId;

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    changeStatus(username, status) {
        let url = API_BASE + "/auth/account/" +username+ "/" +status;

        return fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include'
        })
    }

    resetPass(username) {
        let url = API_BASE + '/admin/resetPassword';

        var form = new FormData();
        form.append('username', username);

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: form
        })
    }
}

export default new AccountService()