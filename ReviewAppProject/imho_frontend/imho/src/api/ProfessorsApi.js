import axios from "axios";

export async function api_searchProfessors(searchInput) {
    const promise = axios.get(`https://localhost:7040/Professor/Search/${searchInput}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getProfessorById(id) {
    const promise = axios.get(`https://localhost:7040/Professor/${id}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_searchProfessorsInUniversity(uniId, searchInput) {
    const promise = axios.get(`https://localhost:7040/Professor/Search/University/${uniId}/${searchInput}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_searchProfessorsInFaculty(facultyId, searchInput) {
    const promise = axios.get(`https://localhost:7040/Professor/Search/Faculty/${facultyId}/${searchInput}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getProfessorsInCourse(courseId) {
    const promise = axios.get(`https://localhost:7040/Professor/Course/${courseId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getProfessorsInFaculty(facultyId) {
    const promise = axios.get(`https://localhost:7040/Professor/Faculty/${facultyId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_createNewProfessor(data) {
    const promise = axios.post(`https://localhost:7040/Professor/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_updateProfessor(professorId, data) {
    const promise = axios.put(`https://localhost:7040/Professor/${professorId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_deleteProfessor(professorId) {
    const promise = axios.delete(`https://localhost:7040/Professor/${professorId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
