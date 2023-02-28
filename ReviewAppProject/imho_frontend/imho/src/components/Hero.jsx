import React from 'react';
import styles from '../style';
import '../index.css';

import main_people from '../assets/main_people.png';
import search from '../assets/search.svg'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={`flex flex-col items-center pt-[80px]  mt-[80px]`}>
        <p className={`text-EC7467 text-[48px] font-[KumarOne] mb-[50px]`}>WELCOME TO IMHO</p>
        <form className="flex">
          <input className="w-[600px] border-[2px] border-primary 
          py-[10px] px-[20px] rounded-[30px] mb-[30px] outline-0 appearance-none" type="search" placeholder="Search..." />
          <button className="ml-[-40px] mt-[-30px]" type="submit">
            <img className="w-[30px]" src={search} alt=""/>
          </button>
        </form>
        <p className="text-[22px]" type="submit">Go ahead and write your first review</p>
        <Link to="/account">
          <button className="text-white mx-1 bg-EC7467 
          px-[30px] py-[5px] rounded-2xl mt-[20px]">Write a review</button>
        </Link>
    </section>
  )
}

export default Hero