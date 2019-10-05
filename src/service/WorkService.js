const API_BASE = "http://localhost:8080"

class WorkService {
    countWorkSuccessByAss(assId) {
        let url = API_BASE + "/member/assignment/" +assId+ "/work_success_list_count";

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }

    countWorkUnsuccessByAss(assId) {
        let url = API_BASE + "/member/assignment/" +assId+ "/work_unsuccess_list_count";

        return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include'
        })
    }

    uploadFile(file, assignmentId) {
        let url = API_BASE + '/member/assignment/' +assignmentId+ '/work/';
        let formData = new FormData();

        formData.append('file', file);

        return fetch(url, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            body: formData
        });
    }

    getSubmitQuantity(assignmentId) {
        let url = API_BASE + '/member/assignment/' +assignmentId+ '/work_submit_count';

        return fetch(url, {
            method: 'GET', 
            withCredentials: true,
            credentials: 'include'
        })
    }
}

export default new WorkService();