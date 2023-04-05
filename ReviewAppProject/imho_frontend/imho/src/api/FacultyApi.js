import axios from "axios";

export async function api_getFacultiesInUniversity(uniId) {
    const promise = axios.get(`https://localhost:7040/Faculty/${uniId}/All`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getFacultyById(facultyID) {
    const promise = axios.get(`https://localhost:7040/Faculty/${facultyID}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_deleteFaculty(facultyId) {
    const promise = axios.delete(`https://localhost:7040/Faculty/${facultyId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_createFaculty(data) {
    const promise = axios.post(`https://localhost:7040/Faculty/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_updateFaculty(facultyId, data) {
    const promise = axios.put(`https://localhost:7040/Faculty/${facultyId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}