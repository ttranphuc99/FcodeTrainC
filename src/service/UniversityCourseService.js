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
}

export default new UniversityCourseService();