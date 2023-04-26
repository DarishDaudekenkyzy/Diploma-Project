import axios from "axios";

export async function api_getUniversityReviewById(reviewId) {
    const promise = axios.get(`https://localhost:7040/UniversityReviews/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getAllUniversityReviews() {
    const promise = axios.get(`https://localhost:7040/UniversityReviews/All`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getUniversityReviewsOfUser(userId) {
    const promise = axios.get(`https://localhost:7040/UniversityReviews/User/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getReviewsOfUniversity(uniId) {
    const promise = axios.get(`https://localhost:7040/UniversityReviews/University/${uniId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateUniversityReview(data) {
    const promise = axios.post(`https://localhost:7040/UniversityReviews`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_LikeUniversityReview(reviewId, userId) {
    const promise = axios.put(`https://localhost:7040/UniversityReviews/Like/${reviewId}/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DislikeUniversityReview(reviewId, userId) {
    const promise = axios.put(`https://localhost:7040/UniversityReviews/Dislike/${reviewId}/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DeleteReview(reviewId) {
    const promise = axios.delete(`https://localhost:7040/UniversityReviews/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}