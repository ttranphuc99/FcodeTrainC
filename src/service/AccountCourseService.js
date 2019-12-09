import API_BASE from './ApiBase';

class AccountCourseService {
    getListAccFromCourse(courseId) {
        let url = API_BASE + "/auth/account_course/" + courseId;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }

    getAvaiAcc4Course(username, courseId) {
        let url = API_BASE + "/auth/account_course/availableAccount4Course/" + courseId + "/" + username;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }

    addNew(username, courseId) {
        let url = API_BASE + "/auth/account_course/" +courseId+ "/" +username;

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include'
        })
    }

    getCourseOfAccount() {
        let url = API_BASE + "/member/course";

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }

    getChart(courseId) {
        let url = API_BASE + "/member/chart/" + courseId;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }

    changeStatus(username, courseId, status) {
        let url = API_BASE + '/auth/account_course/change_status';

        var form = new FormData();
        form.append("username", username);
        form.append("courseId", courseId);
        form.append("status", status);

        return fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            body: form
        })
    }

    delete(username, courseId) {
        let url = API_BASE + '/auth/account_course/' +username+ '/' +courseId;

        return fetch(url, {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
        })
    }
}

export default new AccountCourseService();