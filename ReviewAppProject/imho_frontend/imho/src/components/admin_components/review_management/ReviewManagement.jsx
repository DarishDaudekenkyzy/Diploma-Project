import { useEffect, useState } from "react";
import eye from '../../../assets/eye.svg';
import pen from '../../../assets/pen.svg';
import trash from '../../../assets/trash.svg';
import AdminSearchInput from "../AdminSearchInput";
import { api_searchProfessors } from "../../../api/ProfessorsApi";
import { api_searchUser } from "../../../api/UserApi";

import Loading from "../../Loading";
import { api_SearchCourses } from "../../../api/CourseApi";
import BackArrow from "../BackArrow";
import AdminReviewView from "./AdminReviewView";
import { api_DeleteProfessorReview, api_getProfessorReviewsOfCourse, api_getProfessorReviewsOfUser, api_getReviewsOfProfessor } from "../../../api/ProfessorReviewsApi";

export default function ReviewManagement() {
    
    const [user, setUser] = useState(null);
    const [professor, setProfessor] = useState(null);
    const [course, setCourse] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [viewReview, setViewReview] = useState(false);
    const [review, setReview] = useState(null);

    useEffect(() => {
        if(user !== null) {
            loadReviewsByUser(user.userId);
        }
    }, [user])

    useEffect(() => {
        if(professor !== null) {
            loadReviewsOfProfessor(professor.professorId);
        }
    }, [professor])

    useEffect(() => {
        if(course !== null) {
            console.log(course)
            loadReviewsOfCourse(course.courseId);
        }
    }, [course])

    async function loadReviewsByUser(userId) {
        await api_getProfessorReviewsOfUser(userId)
        .then(setReviews)
        .catch(err => console.log(err));
    }

    async function loadReviewsOfProfessor(professorId) {
        await api_getReviewsOfProfessor(professorId)
        .then((data) => {
            console.log(data)
            setReviews(data)
        })
        .catch(err => console.log(err));
    }

    async function loadReviewsOfCourse(courseId) {
        await api_getProfessorReviewsOfCourse(courseId)
        .then(setReviews)
        .catch(err => console.log(err));
    }

    async function deleteReview(reviewId) {
        await api_DeleteProfessorReview(reviewId)
        .then(() => {
            if(user !== null) loadReviewsByUser(user.userId)
            else if(professor !== null) loadReviewsOfProfessor(professor.professorId)
            else if(course !== null) loadReviewsOfCourse(course.courseId);
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="flex flex-col px-8">
            <p className={`md:text-[35px] mb-6`}>Review Management</p>

            {!viewReview && !review &&
            <>
            <SearchSection setCourse={setCourse} setProfessor={setProfessor} setUser={setUser} setReviews={setReviews}/>
            <div className='my-6'>
                {reviews.length > 0 ?
                <div className='mt-4'>
                    <p className='text-xl font-semibold mb-4'>
                        {user && `Reviews by ${user.firstName} ${user.lastName}`}
                        {professor && `Reviews for ${professor.firstName} ${professor.lastName}`}
                        {course && `Reviews for course ${course.courseName}`}
                    </p>
                    <table className='table-auto w-full border-spacing-2'>
                        <thead>
                            <tr className=''>
                                <th className='py-2 text-start'>Title</th>
                                <th className='py-2 text-start'>Rating</th>
                                <th className='py-2 text-start'>Course</th>
                                <th className='py-2 text-start'>User</th>
                                <th className='py-2 text-start'>Professor</th>
                                <th className='py-2 text-start'>Created On</th>
                                <th className='py-2 text-start'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => {
                                return <ReviewListItemView key={index} review={review}
                                handleViewReview={() => {setViewReview(true); setReview(review)}}
                                handleDeleteReview={deleteReview}/>
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <div className="my-2 text-xl">
                    {user && <p>No reviews found by {user.firstName} {user.lastName}</p>}
                    {professor && <p>No reviews found for {professor.firstName} {professor.lastName}</p>}
                    {course && <p>No reviews found for {course.courseCode} {course.courseName}</p>}
                </div>
                }
            </div>
            </>
            }

            {viewReview && review && 
            <>
            <BackArrow onBack={() => {setViewReview(false); setReview(null)}} text={'Back'}/>
            <AdminReviewView review={review}/>
            </>
            }
        </div>
    );
}

function ReviewListItemView({review, handleViewReview, handleDeleteReview}) {
    return(
        <tr className=''>
            <td className='py-3 font-semibold border-y border-gray-400'>{review.title}</td>
            <td className='py-3 border-y border-gray-400'>{review.rating}/5</td>
            <td className='py-3 border-y border-gray-400'>{review.course.courseCode}</td>
            <td className='py-3 border-y border-gray-400'>{review.user.firstName} {review.user.lastName}</td>
            <td className='py-3 border-y border-gray-400'>{review.professor.firstName} {review.professor.lastName}</td>
            <td className='py-3 border-y border-gray-400'>{review.createdOn}</td>
            <td className='py-3 border-y border-gray-400'>
                <div className='flex items-center gap-2'>
                    <img className='h-8 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={eye} alt="viewImg" onClick={() => handleViewReview(review)}/>
                    <img className='h-6 cursor-pointer hover:-translate-y-1 transition-transform' 
                    src={trash} alt="trashImg" onClick={() => handleDeleteReview(review.id)}/>
                </div>
            </td>
        </tr>
    );
}

function SearchSection({setUser, setProfessor, setCourse, setReviews}) {
    const [loading, setLoading] = useState(false);
    const [searchOption, setSearchOption] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    function changeSearchOption(e) {
        setUser(null);
        setProfessor(null);
        setCourse(null);
        setReviews([])
        setSearchResults([])
        setSearchOption(parseInt(e.target.value))
        console.log(searchOption);
    }

    async function searchProfessors(searchInput) {
        setLoading(true);
        if(searchInput.trim() !== '') {
            await api_searchProfessors(searchInput)
            .then(setSearchResults)
            .catch(err => console.log(err));
        } else {
            setSearchResults([])
        }
        setLoading(false);
    }

    async function searchUsers(searchInput) {
        setLoading(true);
        if(searchInput.trim() !== '') {
            await api_searchUser(searchInput)
            .then(setSearchResults)
            .catch(err => console.log(err));
        } else {
            setSearchResults([]);
        }
        setLoading(false);
    }

    async function searchCourses(searchInput) {
        setLoading(true);
        if(searchInput.trim() !== '') {
            await api_SearchCourses(searchInput)
            .then(setSearchResults)
            .catch(err => console.log(err));
        } else {
            setSearchResults([]);
        }
        setLoading(false);
    }

    return (
        <>
        <div className="flex gap-2">
            <select className="py-2 px-2 w-36 border border-black bg-white"
            value={searchOption} onChange={changeSearchOption}>
                <option value={1}>User</option>
                <option value={2}>Professor</option>
                <option value={3}>Course</option>
            </select>
            {searchOption === 1 && <AdminSearchInput onChange={searchUsers} placeholder={'Search User'}/>}
            {searchOption === 2 && <AdminSearchInput onChange={searchProfessors} placeholder={'Search Professor'}/>}
            {searchOption === 3 && <AdminSearchInput onChange={searchCourses} placeholder={'Search Course'}/>}
        </div>
        {loading && <Loading/>}

        <div className="">
            {searchResults.length > 0 &&
            <div className="border border-black my-4">
            {searchResults.map((searchResult, index) => {
                return(
                    <div key={index} className={`py-2 px-4 ${index !== 0 && 'border-t'} border-black
                    flex gap-2 items-center hover:bg-gray-200 cursor-pointer`}
                    onClick={() => {
                        if(searchResult.userId !== undefined) setUser(searchResult)
                        else if(searchResult.professorId !== undefined) setProfessor(searchResult)
                        else if(searchResult.courseId !== undefined) setCourse(searchResult)
                        setSearchResults([])
                    }}>
                        {searchResult.userId && `${searchResult.firstName} ${searchResult.lastName}`}
                        {searchResult.professorId && `${searchResult.firstName} ${searchResult.lastName}`}
                        {searchResult.courseId && `${searchResult.courseCode} ${searchResult.courseName}`}
                    </div>
                );
            })}
            </div>
            } 
        </div>
        </>
    );
}