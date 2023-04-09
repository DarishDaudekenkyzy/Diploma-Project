import axios from "axios";

export async function api_getAllTags() {
    const promise = axios.get(`https://localhost:7040/Tag/All`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}