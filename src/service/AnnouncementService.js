const API_BASE = "http://localhost:8080";

class AnnouncementService {
    create(value) {
        let url = API_BASE + '/auth/announcement';

        return fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getAnnouncement(id) {
        let url = API_BASE + '/member/announcement/' + id;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }

    update(id, value) {
        let url = API_BASE + '/auth/announcement/' + id;

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default new AnnouncementService();