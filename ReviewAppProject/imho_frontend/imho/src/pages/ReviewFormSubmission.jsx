import { useState, useContext } from 'react';

import { Header, Footer} from '../components';

import styles from '../style';
import { UserContext } from '../App';

const TabItem = ({text, isActive, setActive}) => {
  const ifActive = 'font-bold';
  return (
    <button onClick={setActive}>
      <p className={`text-[16px] md:text-[20px] ${isActive ? `${ifActive}` : ""}`}>{text}</p>
    </button> 
  )
};

const ReviewFormSubmission = () => {

  const {user, setUser} = useContext(UserContext);

  return (
    <>
      <Header/>
      <section className={`flex flex-col items-center h-[750px]`}>
        <p className={`md:text-[35px] text-center my-[30px]`}>Review Form Submission</p>
        <div className="flex flex-col w-[750px] bg-[#F4F4F4] gap-y-3 p-[30px]">
            <p>Student: Yerkenaz Yershege</p>
            <p>Teacher: Alikhan Nurlanuly</p>
            <p>Course code: CSS104</p>
            <p>Rating: 4/5</p>
            <p>Difficulty: 5</p>
            <p>Would take: Yes</p>
            <p>Attendance: No</p>
            <p>Grade recieved: A</p>
            <p>Tags: Inspirational, Get ready to read</p>
            <p>Review: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> 
            <p>Aenean gravida consequat tortor. Sed ipsum odio, sodales eu 
            condimentum ac, facilisis vel mauris. Integer vitae dolor.</p>
        </div>
        <div className="flex gap-x-5">
            <button className="w-full sm:w-[200px] mt-[30px] text-white mx-1 bg-black px-[30px] py-[10px]">Submit</button>
            <button className="w-full sm:w-[200px] mt-[30px] text-white mx-1 bg-black px-[30px] py-[10px]">Cancel</button>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ReviewFormSubmission;