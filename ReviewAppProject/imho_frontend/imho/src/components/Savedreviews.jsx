import React, { useContext, useEffect, useState } from 'react';
import styles from '../style';
import star from '../assets/star.svg';
import savedreviews from '../assets/savedreviews.png';
import { UserContext } from '../App';
import { api_GetSavedReviewsOfUser, api_UnsaveReview } from '../api/ProfessorReviewsApi';
import thumb_up from '../assets/thumb_up.svg'
import thumb_down from '../assets/thumb_down.svg'
import { BookmarkIcon } from '@heroicons/react/24/solid'

const Savedreviews = () => {
  const {user} = useContext(UserContext)
  const [savedReviews, setSavedReviews] = useState([])

  useEffect(() => {
    console.log('useEffect int savedreviews')
    if(user)
      loadSavedReviews(user.id);
  }, [user])

  async function loadSavedReviews(userId) {
    await api_GetSavedReviewsOfUser(userId)
    .then((dataResponse) => {
      console.log(dataResponse)
      setSavedReviews(dataResponse)
    })
    .catch(err => console.log(err))
  }

  async function handleUnsave(userId, reviewId) {
    await api_UnsaveReview(userId, reviewId)
    .then(() => {
      loadSavedReviews(userId);
    })
    .catch(err => console.log(err));
  }
  

  return (
      <div className="w-full py-8">
          {savedReviews.length > 0 ?
          <>
          <p className='mb-8 text-xl font-semibold'>Saved Reviews of {user.firstName} {user.lastName}</p>
          <div className='w-full flex flex-col gap-8'>
            {savedReviews.map((review, index) => {
              return <ReviewListItem review={review} handleUnsave={() => handleUnsave(user.id, review.id)}/>
            })}
          </div>
          </>
          :
          <div className='flex flex-col justify-center items-center'>
            <img className="h-32 w-32" src={savedreviews} />
            <p className="text-[16px] sm:text-[20px]">You don’t have any saved reviews yet</p>
          </div>
          }
      </div>
  )
}

export default Savedreviews;

function ReviewListItem({review, handleUnsave}) {
  return (
    <div className={`w-full p-4 border-black border-[1px] bg-[#F9F9F9]`}>
      <div className='flex justify-between pb-2 border-b-[1px] border-b-black'>
        <div className='flex gap-2'>
          <span className='font-semibold'>
            {review.professor.firstName} {review.professor.lastName}</span>
          •
          <span>{review.professor.university.name}</span>
        </div>
        <BookmarkIcon onClick={handleUnsave}
        title='Unsave'
        className='w-6 h-6 text-yellow-500 hover:text-yellow-600 cursor-pointer'/>
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

            <div className="flex justify-between items-end w-full gap-4">
              <div className="flex justify-start gap-1 flex-wrap">
                {review.tags !== null && review.tags.length > 0 && review.tags.map((tag, tagIndex) => {
                  return (
                    <div key={tagIndex} className="text-xs flex items-center
                    bg-black px-4 py-1 rounded-full text-white">{tag.tag}</div>
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