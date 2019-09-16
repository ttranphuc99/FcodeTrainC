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

    addNewAss(courseId, values) {
        let url = API_BASE + "/auth/course/" +courseId+ "/assignment";

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getAssDetail(id) {
        let url = API_BASE + "/member/assignment/" + id;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }
}

export default new AssignmentService();