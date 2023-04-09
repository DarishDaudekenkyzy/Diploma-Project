import axios from "axios";

export async function api_getReviewsOfUser(userId) {
    const promise = axios.get(`https://localhost:7040/Reviews/User/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getReviewsOfProfessor(professorId) {
    const promise = axios.get(`https://localhost:7040/Reviews/Professor/${professorId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getReviewsOfCourse(courseId) {
    const promise = axios.get(`https://localhost:7040/Reviews/Course/${courseId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateReview(data) {
    const promise = axios.post(`https://localhost:7040/Reviews/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_LikeReview(reviewId, userId) {
    const promise = axios.put(`https://localhost:7040/Reviews/Like/${reviewId}/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DislikeReview(reviewId, userId) {
    const promise = axios.put(`https://localhost:7040/Reviews/Dislike/${reviewId}/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DeleteReview(reviewId) {
    const promise = axios.delete(`https://localhost:7040/Reviews/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}