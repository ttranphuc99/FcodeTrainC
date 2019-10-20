const API_BASE = "http://localhost:8080";

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
}

export default new AccountCourseService();