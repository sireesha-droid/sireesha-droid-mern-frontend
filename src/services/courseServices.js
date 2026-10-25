import axios from 'axios';

const apiUrl = '';

export function getCourses() {
    return axios.get(`${apiUrl}/courses`);
}

export function addCourse(course) {
    return axios.post(`${apiUrl}/courses`, course);
}

export function updateCourse(id, data) {
    return axios.put(`${apiUrl}/courses/${id}`, data);
}

export function deleteCourse(id) {
    return axios.delete(`${apiUrl}/courses/${id}`);
}
