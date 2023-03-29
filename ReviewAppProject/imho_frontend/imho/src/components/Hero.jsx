import React, { useState } from 'react';
import styles from '../style';
import '../index.css';

import { Link, useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';

const Hero = () => {
  const [searchBySchool, setSearchBySchool] = useState(false);
  const [school, setSchool] = useState();

  function handleSchoolChoose(choosedSchool) {
    setSchool(choosedSchool);
    setSearchBySchool(false);
  }

  return (
    <section id="hero" className={`flex flex-col items-center md:h-[500px] py-[80px]  md:mt-[80px] 
      bg-[url('../assets/back_main.jpg')] bg-cover border-black border-b-2`}>
        <p className={`text-[24px] md:text-[48px] font-[KumarOne] mb-[24px] font-bold`}>
          RATE YOUR PROFESSORS</p>
        {searchBySchool ? 
        <p className='text-[18px] mb-[24px]'>Enter your <span className='font-bold'>school</span> to get started</p>
        :
          school ?
          <p className='text-[18px] mb-[24px]'>Find a <span className='font-bold'>professor</span>
          at <span className='underline'>{school.name}</span></p>
          :
          <p className='text-[18px] mb-[24px]'>Find a <span className='font-bold'>professor</span></p>
        }

        <SearchInput searchSchools={searchBySchool} onSchoolChoose={handleSchoolChoose} school={school}/>

        {searchBySchool ?
        <p onClick={() => setSearchBySchool(false)}
        className='text-[16px] md:text-[20px] hover:underline cursor-pointer'>I'd like to look up a professor by name</p>
        :
        school ?
          <p onClick={() => setSearchBySchool(true)}
          className='text-[16px] md:text-[20px] hover:underline cursor-pointer'>
            I want to find a professor at a different university</p>
          :
          <p onClick={() => setSearchBySchool(true)}
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