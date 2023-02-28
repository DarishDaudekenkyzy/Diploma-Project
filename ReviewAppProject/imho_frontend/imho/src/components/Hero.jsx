import React from 'react';
import styles from '../style';
import '../index.css';

import main_people from '../assets/main_people.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={`flex justify-center items-center pt-[80px]  mt-[100px]`}>
      <div className={``}>
        <p className={`text-EC7467 text-[48px] font-[KumarOne] w-[400px]`}>WELCOME TO SDUNION</p>
        <p className={`w-[320px]`}>SDUNION is a platform of our university,
           where you can rate, review your experiences
           in SDU. 
        </p>
        <Link to="/account">
          <button className="text-white mx-1 bg-EC7467 
          px-[30px] py-[5px] rounded-2xl mt-[20px]">Get Started</button>
        </Link>
      </div>
      <div>
        <img class="img-responsive w-[500px]" src={main_people} alt="main_desc" />
      </div>
    </section>
  )
}

export default Hero