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
}

export default new AccountService()