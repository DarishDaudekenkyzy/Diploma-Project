import React, { useState } from 'react';
import styles from '../style';
import '../index.css';

import { Link, useNavigate } from 'react-router-dom';
import SearchProfessorsInput from './SearchProfessorsInput';
import SearchUniversitiesInput from './SearchUniversitiesInput';

const Hero = () => {
  const navigate = useNavigate();
  const [searchUniversity, setSearchUniversity] = useState(false);
  const [university, setUniversity] = useState();

  function handleUniversitySelect(uni) {
    setUniversity(uni);
    setSearchUniversity(false);
  }

  function handleProfessorSearch(searchInput) {
    navigate(`/search-professors`, {state: {searchInput: searchInput, uni: university}});
  }

  return (
    <section id="hero" className={`flex flex-col items-center md:h-[500px] py-[80px]  md:mt-[80px] 
      bg-[url('../assets/back_main.jpg')] bg-cover border-black border-b-2`}>
        <p className={`text-[24px] md:text-[48px] font-[KumarOne] mb-[24px] font-bold`}>
          RATE YOUR PROFESSORS</p>
        {searchUniversity ? 
        <p className='text-[18px] mb-[24px]'>Enter your <span className='font-bold'>school</span> to get started</p>
        :
          university ?
          <p className='text-[18px] mb-[24px]'>Find a <span className='font-bold'>professor</span>
          at <span className='underline'>{university.name}</span></p>
          :
          <p className='text-[18px] mb-[24px]'>Find a <span className='font-bold'>professor</span></p>
        }

        <div className='w-[312px] md:w-[700px] my-[30px]'>
          {searchUniversity ?
          <SearchUniversitiesInput onSelect={handleUniversitySelect}/>
          :
          <SearchProfessorsInput onSearch={handleProfessorSearch}/>
          }
        </div>

        {searchUniversity ?
        <p onClick={() => setSearchUniversity(false)}
        className='text-[16px] md:text-[20px] hover:underline cursor-pointer'>I'd like to look up a professor by name</p>
        :
        university ?
          <p onClick={() => setSearchUniversity(true)}
          className='text-[16px] md:text-[20px] hover:underline cursor-pointer'>
            I want to find a professor at a different university</p>
          :
          <p onClick={() => setSearchUniversity(true)}
          className='text-[16px] md:text-[20px] hover:underline cursor-pointer'>I want to find a professor at a school</p>
        }

        {/* <p className="text-[16px] md:text-[22px]" type="submit">Go ahead and write your first review</p>
        <Link to="/new-review">
          <button className="text-white mx-1 bg-black 
          px-[40px] py-[10px] mt-[20px] rounded-[6px]">Write a review</button>
        </Link> */}
    </section>
  )
}

export default Hero