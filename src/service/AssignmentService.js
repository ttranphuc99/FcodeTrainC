const API_BASE = "http://localhost:8080"

class AssignmentService {
    getListAssByCourse(courseId) {
        let url = API_BASE + "/member/course/" +courseId+ "/assignment";

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }
}

export default new AssignmentService();