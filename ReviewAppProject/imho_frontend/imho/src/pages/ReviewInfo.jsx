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
import { api_getProfessorById } from '../api/ProfessorsApi';
import { api_DislikeReview, api_LikeReview, api_getReviewsOfProfessor } from '../api/ReviewApi';
import BackArrow from '../components/admin_components/BackArrow';

// SAMPLE
// const initProf = {
//   professorId: 1, firstName: "Alikhan", lastName: "Nurlanuly", email: "an@gmail.com", facultyId: 2, reviewsCount: 0, rating: 0.0, wouldTakeAgainPercentage: 0.0, difficultyPercentage: 0.0,
//   courses: [{courseCode: "CSS101", courseName: "Course 101", facultyId: 2}, {courseCode: "CSS102", courseName: "Course 102", facultyId: 2},],
//   university: {name: "SDU"},
//   faculty: {facultyId: 2, facultyName: "Engineering and Natural Sciences"}
// };
// const initReviews = [
//   {id: 1, rating: 9.0, difficulty: 5.5, title: "Great", createdOn: "28th September, 2022", 
//     wouldTakeAgain: true, wasAttendanceMandatory: true,
//     content: "The only grades in the grade book are 4 exams. 1 out of the first three are dropped. Went to every class, watched every lecture a second time to review and completed all the extra worksheets and still got the same grade on exam 2 that I got on exam one when I didnt go to any classes and joined the class a day before the exam I didnt go to any classes and joined the class a day before the exam",
//     likes: 5,
//     dislikes: 3,
//     course: {courseCode: "CSS107"},
//     tags: [
//       {id: 1, tag: "Tough grader"},
//       {id: 2, tag: "Funny"},
//       {id: 3, tag: "Great explanations"},
//       {id: 4, tag: "Get Ready to Read"},
//       {id: 5, tag: "Participation Matters"},
//       {id: 6, tag: "Group Projects"},
//       {id: 7, tag: "Clear Grading Criteria"},
//     ]
//   }
// ];
const ReviewInfo = () => {
  const {user, setUser} = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  // const [reviews, setReviews] = useState(initReviews);
  const [reviews, setReviews] = useState([]);
  // const [professor, setProfessor] = useState(initProf);
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    if(location.state)
      loadProfessor(location.state)
  }, [])

  useEffect(() => {
    if(professor !== null) {
      loadReviews();
    }
  }, [professor])

  async function loadProfessor(id) {
    await api_getProfessorById(id)
    .then((data) => {
      console.log(data)
      setProfessor(data);
    })
  }

  function handleRateClick() {
    if(user !== null)
      navigate('/new-review', {state: professor.professorId});
  }

  async function loadReviews() {
    
    await api_getReviewsOfProfessor(professor.professorId)
    .then((data) => {
      console.log(data);
      setReviews(data);
    })
    .catch(err => console.log(err));
  }
  
    return (
        <>
          <Header/>
          {professor &&
          <section id="review_info" className=" px-[24px] flex flex-col justify-center items-center">
            <div className='flex flex-col sm:flex-row w-full md:w-[850px] justify-between items-center py-16 gap-y-16'>
              <div className="flex flex-col justify-start w-full sm:w-[450px] gap-y-2 relative ">
                <BackArrow onBack={() => navigate(-1)} text={'Back'}/>
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
                  <div className="border-black border-r-[1px] pr-[20px] w-[50%]">
                    <p className="text-[30px] font-bold">{professor.wouldTakeAgainPercentage}%</p>
                    <p>would take again</p>
                  </div>
                  <div>
                    <p className="text-[30px] font-bold">{professor.difficultyPercentage}%</p>
                    <p>level of difficulty</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-[400px] gap-y-4 bg-black p-[20px]  rounded-[16px]">
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
            </div>

            <div className='w-full md:w-[850px] flex justify-center sm:justify-start'>            
              <button className="w-[200px] border-black border-[1px] rounded-[10px] bg-[#F5E049] px-[20px] py-[7px]" onClick={handleRateClick}>Rate Professor</button>
            </div>
          </section>
          }

          <section id="review_info2" className="w-full sm:w-[700px] sm:m-auto flex flex-col items-center gap-y-5 px-[24px] md:px-0 py-[50px] border-b-2 border-black">
            <div className="w-full flex justify-start border-b-2 border-black">
              <p className="border-b-2 border-black pb-[10px]">{reviews.length} students ratings</p>
            </div>
            <div className="w-full flex items-start">
              <select className="w-[200px] border-black border-[1px] px-[10px] py-[5px]">
                <option value="all">All courses</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="w-full flex flex-col mt-[30px] gap-y-[20px]">
              {reviews.length > 0 ? (
                reviews.map((review, index) => {
                  return (
                    <ReviewListItem key={review.id} review={review} index={index} loadReviews={loadReviews}/>
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

function ReviewListItem({review, index, loadReviews}) {
  const {user, setUser} = useContext(UserContext);

  async function handleDislike() {
    if(user !== null) {
      await api_DislikeReview(review.id, user.id)
      .then((data) => {
        loadReviews();
      })
      .catch(err => console.log(err))
    }
  }

  async function handleLike() {
    if(user !== null) {
      await api_LikeReview(review.id, user.id)
      .then((data) => {
        console.log(data);
        loadReviews();
      })
      .catch(err => {
        console.log(err)
        return
      })
    }
  }

  return (
    <div className={`flex w-full ${index%2===0 ? 'bg-[#F9F9F9]' : 'bg-[#23A094]'} border-black border-[1px] p-[20px]`}>
      <div className="flex flex-col gap-y-2 items-center">
          <p className="text-[12px] sm:text-[15px] font-semibold">RATING</p>
          <div className="flex justify-center items-center
          font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#FF90E8]">
              {review.rating}
          </div>
          <p className="text-[12px] sm:text-[15px] font-semibold">DIFFICULTY</p>
          <div className="flex justify-center items-center
          font-bold text-[23px] rounded-md h-[60px] w-[60px] bg-[#F5E049]">
              {review.difficulty}
          </div>
      </div>
      <div className="flex flex-col w-full min-h-max ml-[20px] gap-y-[5px]">
        <div className="flex flex-col gap-y-[8px]">
          <div className="w-full flex flex-col-reverse xs:flex-row items-end  justify-between">
            <div className="flex justify-start gap-x-[20px]">
              <p className="text-[13px] font-semibold">{review.course.courseCode}</p>
              <div className="text-[13px] border-black border-[1px] bg-[#F5E049] rounded-[5px] px-[15px]">{review.title}</div>
            </div>
            <p className="text-[13px]">{review.createdOn}</p>
          </div>
          <div>
            <div className="flex flex-col xs:flex-row justify-start gap-x-[20px]">
              <p className="text-[13px]">Would Take Again: <b>{review.wouldTakeAgain ? 'Yes' : 'No'}</b></p>
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
          <div className="flex justify-start gap-[10px] flex-wrap">
            {review.tags !== null && review.tags.length > 0 && 
            review.tags.map((tag, index) => {
              return (
                <div key={index} className="text-[13px]
                bg-black px-[20px] py-[4px] rounded-[20px] text-white">{tag.tag}</div>
              );
            })}
          </div>
          <div className="flex justify-start w-[100px] gap-[16px]">
            <div className='cursor-pointer flex items-center' onClick={handleLike}>
              <p className="text">{review.likes}</p>
              <img className="mr-[5px] h-[20px]" src={thumb_up} />
            </div>
            <div className='cursor-pointer flex items-center' onClick={handleDislike}>
              <p className="text">{review.dislikes}</p>
              <img className="mr-[5px] h-[20px]" src={thumb_down} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}