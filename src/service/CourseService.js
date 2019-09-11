const API_BASE = 'http://localhost:8080';

class CourseService {
    async isCourseNameExisted(name) {
        let url = API_BASE + "/member/course/name/" + name;

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

    addNewCourse(data) {
        let url = API_BASE + "/auth/course";

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

    getListCourse() {
        let url = API_BASE + "/auth/course";

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
    }
}

export default new CourseService();