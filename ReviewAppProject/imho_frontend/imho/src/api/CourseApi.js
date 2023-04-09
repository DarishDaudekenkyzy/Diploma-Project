import axios from "axios";

export async function api_getAllCoursesInUniversity(uniId) {
    const promise = axios.get(`https://localhost:7040/Course/University/${uniId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getCoursesInFaculty(facultyId) {
    const promise = axios.get(`https://localhost:7040/Course/Faculty/${facultyId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getCoursesOfProfessor(professorId) {
    const promise = axios.get(`https://localhost:7040/Course/Professor/${professorId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_SearchCourses(input) {
    const promise = axios.get(`https://localhost:7040/Course/Search/${input}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_createCourse(data) {
    const promise = axios.post(`https://localhost:7040/Course`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_addProfessorToTheCourse(courseId, professorId) {
    const promise = axios.put(`https://localhost:7040/Course/Add-Professor/${courseId}/${professorId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UpdateCourse(courseId, data) {
    const promise = axios.put(`https://localhost:7040/Course/${courseId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DeleteCourse(courseId) {
    const promise = axios.delete(`https://localhost:7040/Course/${courseId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
