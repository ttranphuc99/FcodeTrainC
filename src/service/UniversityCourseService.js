const API_BASE = "http://localhost:8080";

class UniversityCourseService {
    getListCourse() {
        let url = API_BASE + '/universityCourse';

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }

    countAccFromCourse(id) {
        let url = API_BASE + '/account_universityCourse_quantity/' + id;
        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }

    deleteCourse(id) {
        let url = API_BASE + '/universityCourse/' + id;

        return fetch(url, {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include'
        })
    }
}

export default new UniversityCourseService();