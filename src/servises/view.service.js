import http from "../http-common";

class TutorialDataService {
    getAll() {
        return http.get("/views");
    }

    get(id) {
        return http.get(`/views/${id}`);
    }

    create(data) {
        return http.post("/views", data);
    }

    update(id, data) {
        return http.put(`/views/${id}`, data);
    }

    delete(id) {
        return http.delete(`/views/${id}`);
    }

    deleteAll() {
        return http.delete(`/views`);
    }

    findByTitle(title) {
        return http.get(`/views?title=${title}`);
    }
}

export default new TutorialDataService();