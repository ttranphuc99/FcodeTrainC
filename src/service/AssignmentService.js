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

    update(values, id) {
        let url = API_BASE + "/auth/assignment/" + id;

        return fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    closeAssignment(assignmentId) {
        let url = API_BASE + "/auth/assignment/" +assignmentId+ "/close";

        return fetch(url, {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include'
        })
    }

    activeAssignment(assignmentId) {
        let url = API_BASE + "/auth/assignment/" +assignmentId+ "/active";

        return fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include'
        })
    }

    deleteAssignment(assignmentId) {
        let url = API_BASE + "/auth/assignment/" +assignmentId+ "/delete";

        return fetch(url, {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include'
        })
    }
}

export default new AssignmentService();