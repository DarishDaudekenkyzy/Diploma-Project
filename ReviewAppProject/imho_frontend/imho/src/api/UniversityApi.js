import axios from "axios";

//GET ONE BY ID
export async function api_getUniversityById(uniId) {
    const promise = axios.get(`https://localhost:7040/University/${uniId}`);
    const dataPromse = promise.then((response) => response.data);
    return dataPromse
}

// GET ALL
export async function api_getAllUniversities() {
    const promise = axios.get(`https://localhost:7040/University/All`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

// GET SEARCH
export async function api_searchUniversities(searchInput) {
    const promise = axios.get(`https://localhost:7040/University/Search/${searchInput}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_deleteUniversity(id) {
    const promise = axios.delete(`https://localhost:7040/University/${id}`)
    const dataPromise = await promise.then((response => response.data));
    return dataPromise;
}

export async function api_addUniversity(data) { 
    const promise = axios.post(`https://localhost:7040/University/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return data.promise;
}

export async function api_updateUniversity(uniId, data) {
    const promise = axios.put(`https://localhost:7040/University/${uniId}`, data);
    const dataPromise = await promise
    .then((response) => response.data)
    return dataPromise
}