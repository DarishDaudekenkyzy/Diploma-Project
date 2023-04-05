import axios from "axios";

export async function api_searchProfessors(searchInput) {
    const promise = axios.get(`https://localhost:7040/Professor/Search/${searchInput}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_searchProfessorsInUniversity(uniId, searchInput) {
    const promise = axios.get(`https://localhost:7040/Professor/Search/${uniId}/${searchInput}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}