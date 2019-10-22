const API_BASE = 'http://localhost:8080';

class CourseService {
    async isCourseNameExisted(name, id = -1) {
        let url = API_BASE + "/member/course/name/" + name;
        let response = await fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        });
        if (id === -1) {
            if (response.status === 404) {
                return false;
            }
            return true;
        } else {
            if (response.status === 200) {
                let result = await response.json()
                .then(data => {
                    if (data.id === parseInt(id)) {
                        return false;
                    }
                    return true;
                })

                return result;
            } else {
                return false;
            }
        }
    }

    updateCourse(data, id) {
        let url = API_BASE + '/auth/course/' + id;
        return fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

    getCourseDetail(id) {
        let url = API_BASE + "/auth/course/" + id;

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }
}

export default new CourseService();