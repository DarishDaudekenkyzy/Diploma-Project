import React from 'react';
import styles from '../style';
import star from '../assets/star.svg';
import myreviews from '../assets/myreviews.png';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import thumb_up from '../assets/thumb_up.svg'
import thumb_down from '../assets/thumb_down.svg'
import trashIcon from '../assets/trash.svg'
import { api_DeleteProfessorReview, api_getProfessorReviewsOfUser } from '../api/ProfessorReviewsApi';

const Myreviews = () => {
  const {user, setUser} = useContext(UserContext);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    loadMyReviews();
  }, [])
  
  async function loadMyReviews() {
    await api_getProfessorReviewsOfUser(user.id)
    .then(setMyReviews)
    .catch(err => console.log(err));
  }

  async function handleDeleteReview(reviewId) {
    await api_DeleteProfessorReview(reviewId)
    .then(loadMyReviews)
    .catch(err => console.log(err))
  }

  return (
      <div className="py-8 m-auto">
        {myReviews.length > 0 ?
        <>
        <p className='mb-8 text-xl font-semibold'>Reviews of {user.firstName} {user.lastName}</p>
        <div className='flex flex-col gap-4'>
          {myReviews.map((review, index) => {
            return (
              <ReviewListItem key={review.id} review={review} index={index} handleDeleteReview={handleDeleteReview}/>
            );
          })}
        </div>
        </>
        :
        <div className="w-full flex flex-col items-center mt-[50px] gap-y-10">
            <img className="max-h-[150px]" src={myreviews} />
            <p className="text-[16px] sm:text-[20px]">You don’t have your own review yet</p>
          </div>
        }
      </div>
  )
}

export default Myreviews;

function ReviewListItem({review, index, handleDeleteReview}) {
  return (
    <div className={`p-[20px] border-black border-[1px] 
    ${index%2===0 ? 'bg-[#F9F9F9]' : 'bg-[#23A094]'}`}>
      <div className='flex justify-between pb-2 border-b-[1px] border-b-black'>
        <div className='flex gap-2'>
          <span className='font-semibold'>
            {review.professor.firstName} {review.professor.lastName}</span>
          •
          <span>{review.professor.university.name}</span>
        </div>
        <div className='cursor-pointer'
        onClick={() => handleDeleteReview(review.id)}>
          <img className='w-6' src={trashIcon} alt=''/>
        </div>
      </div>
      <div className='flex pt-2'>
          <div className="flex flex-col gap-y-2 items-center">
              <p className="text-[15px] font-semibold">RATING</p>
              <div className="flex justify-center items-center
              font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
                  {review.rating}
              </div>
              <p className="text-[15px] font-semibold">DIFFICULTY</p>
              <div className="flex justify-center items-center
              font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#F5E049]">
                  {review.difficulty}
              </div>
          </div>
          <div className="flex flex-col w-full min-h-max ml-[20px] gap-y-[5px]">
            <div>
              <div className="w-full flex justify-between">
                <div className="flex justify-start gap-x-[20px]">
                  <p className="text-[13px] font-semibold">{review.course.courseCode}</p>
                  <div className="text-[13px] border-black 
                  border-[1px] bg-[#F5E049] rounded-[5px] px-[15px]">{review.title}</div>
                </div>
                <p className="text-[13px]">{review.createdOn}</p>
              </div>
              <div>
                <div className="flex justify-start gap-x-[20px]">
                  <p className="text-[13px]">Would Take Again: {review.wouldTakeAgain ? 'Yes' : 'No'}</p>
                  <p className="text-[13px]">
                    Attendance: {review.wasAttendanceMandatory ? <b>Mandatory</b>: <span>Not Mandatory</span> }</p>
                </div>
              </div>
            </div>

            <div className="my-[10px] grow">
              <p className="text-[13px]">
                {review.content}
              </p>
            </div>

            <div className="flex justify-between w-full">
              <div className="flex justify-start gap-x-[10px]">
                {review.tags !== null && review.tags.length > 0 && review.tags.map((tag, tagIndex) => {
                  return (
                    <div key={tagIndex} className="text-[13px]
                    bg-black px-[20px] rounded-[20px] text-white">{tag.tag}</div>
                  );
                })}
              </div>
              <div className="flex justify-start">
                <div className='cursor-pointer flex items-center'>
                  <p className="text">{review.likes}</p>
                  <img className="mr-[5px] h-[20px]" src={thumb_up} />
                </div>
                <div className='cursor-pointer flex items-center'>
                  <p className="text">{review.dislikes}</p>
                  <img className="mr-[5px] h-[20px]" src={thumb_down} />
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}