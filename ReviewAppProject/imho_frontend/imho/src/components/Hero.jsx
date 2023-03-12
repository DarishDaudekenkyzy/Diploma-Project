import React, { useState } from 'react';
import styles from '../style';
import '../index.css';

import search from '../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('Search...');

  return (
    <section id="hero" className={`flex flex-col items-center md:h-[500px] py-[80px]  md:mt-[80px] 
      bg-[url('../assets/back_main.jpg')] bg-cover border-black border-b-2`}>
        <p className={`text-[24px] md:text-[48px] font-[KumarOne] mb-[30px] font-bold`}>RATE SDU PROFESSORS</p>
        <form className="flex">
          <input className="w-[312px] md:w-[600px] border-[2px] border-primary 
          py-[10px] px-[20px] rounded-[30px] mb-[30px] outline-0 appearance-none" 
          type="search" placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)} />
          <button className="ml-[-40px] mt-[-30px]" type="button" onClick={() => {navigate(`/search/${searchInput}`)}}>
            <img className="w-[30px]" src={search} alt=""/>
          </button>
        </form>
        <p className="text-[16px] md:text-[22px]" type="submit">Go ahead and write your first review</p>
        <Link to="/new-review">
          <button className="text-white mx-1 bg-black 
          px-[40px] py-[10px] mt-[20px] rounded-[6px]">Write a review</button>
        </Link>
    </section>
  )
}

export default Hero