import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

import { Header, Footer } from '../components';

import styles from '../style';
import search from '../assets/search.svg'
import yellow_pen from '../assets/yellow_pen.png'
import thumb_up from '../assets/thumb_up.svg'
import thumb_down from '../assets/thumb_down.svg'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';


const ReviewInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const professor = location.state;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      getReviews();
  }, [professor])

  function handleRateClick() {
    navigate('/new-review', {state: professor});
  }

  function getReviews() {
    axios.get(`https://localhost:7040/Reviews/Professor/${professor.professorId}`)
    .then((response) => {
      setReviews(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }
  
    return (
        <>
          <Header/>
          <section id="review_info" className="flex justify-center items-center py-[100px]">
            <div className="flex flex-col justify-start w-[450px] gap-y-2 relative ">
              <p className="text-[33px] font-bold w-[350px]">{professor.firstName} {professor.lastName}</p>
              <img className="h-[100px] absolute top-0 right-10" src={yellow_pen} />
              <p  className="font-bold w-[300px]">Professor of {professor.faculty.facultyName}</p>
              <p>{professor.university.name}</p>
              <div className="flex justify-start items-start">
                    <p className="text-[30px] font-bold">{professor.rating}</p>
                    <p>\5</p>
                  </div>
              <p  className="font-bold">overall quality based on {professor.reviewsCount} ratings</p>
              <div className="flex justify-start gap-x-5">
                <div className="border-black border-r-[1px] pr-[20px]">
                  <p className="text-[30px] font-bold">{professor.wouldTakeAgainPercentage}%</p>
                  <p>would take again</p>
                </div>
                <div>
                  <p className="text-[30px] font-bold">{professor.difficultyPercentage}%</p>
                  <p>level of difficulty</p>
                </div>
              </div>
              <button className="w-[200px] border-black border-[1px] rounded-[10px]
              bg-[#F5E049] px-[20px] py-[7px] mt-5" onClick={handleRateClick}>Rate Professor</button>
            </div>

            <div className="flex flex-col w-[400px] gap-y-4 bg-black p-[20px] h-[270px]">
                <p className="text-white text-[20px]">Rating distribution</p>
              <div className="flex flex-col items-end gap-y-4">
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">awesome 5</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[80%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">9</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">great 4</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[35%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">11</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">good 3</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[20%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">12</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">ok 2</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[36%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">5</p>
                </div>
                <div className="flex justify-between items-center gap-x-[10px]">
                  <p className="text-white">awful 1</p>
                  <div className="w-[200px] h-[20px] rounded-[5px] bg-white">
                    <div className="w-[22%] h-[20px] rounded-[5px] bg-[#F5E049]"></div>
                  </div>
                  <p className="text-white w-[20px]">4</p>
                </div>
              </div>
            </div>
          </section>

          <section id="review_info2" className="flex flex-col items-center 
          gap-y-5 py-[50px] border-b-2 border-black">
            <div className="w-[700px] flex justify-start border-b-2 border-black">
              <p className="border-b-2 border-black pb-[10px]">{reviews.length} students ratings</p>
            </div>
            <div className="w-[700px] flex items-start">
              <select className="w-[200px] border-black border-[1px] px-[10px] py-[5px]">
                <option value="all">All courses</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="flex flex-col mt-[30px] gap-y-[20px]">
              {reviews.length > 0 ? (
                reviews.map((review, index) => {
                  return (
                    <ReviewListItem key={review.id} review={review} index={index}/>
                  );
                })
              ) : <></>}
            </div>
          </section>
          <Footer />
        </>
    )
}

export default ReviewInfo;

function ReviewListItem({review, index}) {
  const {user, setUser} = useContext(UserContext);
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);

  async function handleDislike() {
    await axios.post('https://localhost:7040/Reviews/like_dislike', {
      userId: user.userId,
      reviewId: review.id,
      like: false
    })
    .then((response) => {
      console.log('nay');
      setLikes(response.data.item1);
      setDislikes(response.data.item2);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

  async function handleLike() {
    await axios.post('https://localhost:7040/Reviews/like_dislike', {
      userId: user.userId,
      reviewId: review.id,
      like: true
    })
    .then((response) => {
      console.log('yay');
      setLikes(response.data.item1);
      setDislikes(response.data.item2);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

  return (
    <div className={`flex w-[700px] ${index%2===0 ? 'bg-[#F9F9F9]' : 'bg-[#23A094]'}
              border-black border-[1px] p-[20px]`}>
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
                        {review.tags !== null && review.tags.length > 0 && review.tags.map((tag) => {
                          return (
                            <div className="text-[13px]
                            bg-black px-[20px] rounded-[20px] text-white">{tag.tag}</div>
                          );
                        })}
                      </div>
                      <div className="flex justify-start">
                        <div className='cursor-pointer flex items-center' onClick={handleLike}>
                          <p className="text">{likes}</p>
                          <img className="mr-[5px] h-[20px]" src={thumb_up} />
                        </div>
                        <div className='cursor-pointer flex items-center' onClick={handleDislike}>
                          <p className="text">{dislikes}</p>
                          <img className="mr-[5px] h-[20px]" src={thumb_down} />
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
  );
}