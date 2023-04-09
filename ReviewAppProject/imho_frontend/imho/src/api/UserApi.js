import axios from "axios";

export async function api_getAllUsers() {
    const promise = axios.get(`https://localhost:7040/User/All`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_searchUser(searchInput) {
    const promise = axios.get(`https://localhost:7040/User/Search/${searchInput}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_deleteUser(userId) {
    const promise = axios.delete(`https://localhost:7040/User/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}