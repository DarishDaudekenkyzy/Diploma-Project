import axios from "axios";

export async function api_getProfessorReviewsOfUser(userId) {
    const promise = axios.get(`https://localhost:7040/ProfessorReviews/User/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getReviewsOfProfessor(professorId) {
    const promise = axios.get(`https://localhost:7040/ProfessorReviews/Professor/${professorId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_getProfessorReviewsOfCourse(courseId) {
    const promise = axios.get(`https://localhost:7040/ProfessorReviews/Course/${courseId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateProfessorReview(data) {
    const promise = axios.post(`https://localhost:7040/ProfessorReviews/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_LikeProfessorReview(reviewId, userId) {
    const promise = axios.put(`https://localhost:7040/ProfessorReviews/Like/${reviewId}/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DislikeProfessorReview(reviewId, userId) {
    const promise = axios.put(`https://localhost:7040/ProfessorReviews/Dislike/${reviewId}/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DeleteProfessorReview(reviewId) {
    const promise = axios.delete(`https://localhost:7040/ProfessorReviews/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DidUserSavedReview(userId, reviewId) {
    const promise = axios.get(`https://localhost:7040/ProfessorReviews/IsSaved/${userId}/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DidUserLikedReview(userId, reviewId) {
    const promise = axios.get(`https://localhost:7040/ProfessorReviews/IsLiked/${userId}/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DidUserDislikedReview(userId, reviewId) {
    const promise = axios.get(`https://localhost:7040/ProfessorReviews/IsDisliked/${userId}/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetSavedReviewsOfUser(userId) {
    const promise = axios.get(`https://localhost:7040/ProfessorReviews/${userId}/Saved`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_SaveReview(userId, reviewId) {
    const promise = axios.put(`https://localhost:7040/ProfessorReviews/Save/${userId}/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UnsaveReview(userId, reviewId) {
    const promise = axios.put(`https://localhost:7040/ProfessorReviews/Unsave/${userId}/${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
